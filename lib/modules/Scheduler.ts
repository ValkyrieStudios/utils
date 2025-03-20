import {format} from '../date/format';
import {toUTC} from '../date/toUTC';
import {isNotEmptyString} from '../string/isNotEmpty';
import {isFunction} from '../function/is';
import {isIntegerAbove, isIntegerBetween} from '../number';
import {isObject} from '../object';
import {noop} from '../function';

export type LogObject = {
    name: string;
    msg: string;
    on: Date;
    data?: unknown;
    err: Error;
};

export type LogFn = (log: LogObject) => void;

export type SchedulerOptions = {
    /**
     * Custom logger function, will receive an instance of LogObject when an error is thrown
     */
    logger?: LogFn;
    /**
     * Name of the pubsub (used in logs as well)
     */
    name?: string;
    /**
     * Default timeZone to use
     */
    timeZone?: string|null;
};

export type SchedulerJob = {
    name?: string;
    schedule: string;
    fn: () => void|Promise<void>;
    timeZone?: string | null;
};

/**
 * A cron schedule processed into an ease-of-use utility where a schedule such as '* 5-10 * * *' is represented as a KV-map
 */
type CronMap = {
    minute: Set<number> | '*';
    hour: Set<number> | '*';
    day_of_month: Set<number> | '*';
    month: Set<number> | '*';
    day_of_week: Set<number> | '*';
}

/**
 * Parts of the date object that acts as an ease-of-use utility to compare against the cron map
 */
type TimeMap = {
    minute: number;
    hour: number;
    day_of_month: number;
    month: number;
    day_of_week: number;
}

const RGX_DIGITS = /^\d+$/;

/**
 * Converts a sub-part (eg: '*' in '* 0,5,10 * * *') to a wildcard or set of numbers
 *
 * @param {string} part - Part to convert
 * @param {number} min - Minimum for the range
 * @param {number} max - Maximum for the range
 */
function convertPart (part: string, min: number, max: number): '*' | Set<number> {
    /* Wildcard */
    if (part === '*') return '*';

    const set:Set<number> = new Set();
    if (part.indexOf('/') > -1) {
        /* Step expressions: e.g. "*\/5" or "10-20/2" */
        const [base, raw_step] = part.split('/', 2);
        const step = parseInt(raw_step, 10);
        let start: number;
        let end: number = max;
        if (base === '*') {
            start = min;
        } else if (base.indexOf('-') > -1) {
            const chunks = base.split('-', 2);
            start = parseInt(chunks[0], 10);
            end = parseInt(chunks[1], 10);
        } else {
            start = parseInt(base, 10);
        }
        for (let i = start; i <= end; i += step) set.add(i);
    } else if (part.indexOf('-') > -1) {
        /* Range without step */
        const chunks = part.split('-', 2);
        const start = parseInt(chunks[0], 10);
        const end = parseInt(chunks[1], 10);
        for (let i = start; i <= end; i++) set.add(i);
    } else if (part.indexOf(',') > -1) {
        /* Csv list (Eg: 5,10,15) */
        const chunks = part.split(',');
        for (let i = 0; i < chunks.length; i++) set.add(parseInt(chunks[i], 10));
    } else {
        /* Single number */
        set.add(parseInt(part, 10));
    }

    return set;
}

/**
 * Helper which converts a cron schedule to a map for easy processing down the line
 *
 * @param {string} schedule - Raw cron schedule to process
 */
function convertToMap (schedule:string):CronMap {
    const parts = schedule.split(' ');
    const map:CronMap = {
        minute: convertPart(parts[0], 0, 59),
        hour: convertPart(parts[1], 0, 23),
        day_of_month: convertPart(parts[2], 1, 31),
        month: convertPart(parts[3], 1, 12),
        day_of_week: convertPart(parts[4], 0, 7),
    };

    /* 7 is non-standard for day of week but allowed in the schedule, we convert this to 0 */
    if (map.day_of_week instanceof Set && map.day_of_week.has(7)) {
        map.day_of_week.add(0);
        map.day_of_week.delete(7);
    }
    return map;
}

/**
 * Checks a cron subpart (eg part of a range) and returns it as a number if valid, otherwise returns null
 *
 * @param {string} part - Raw part
 * @param {number} min - Minimum of the range for the part
 * @param {number} max - Maximum of the range for the part
 */
function isCronSubpart (part:string, min:number, max:number) {
    if (!RGX_DIGITS.test(part)) return null;
    const normalized = parseFloat(part);
    if (!isIntegerBetween(normalized, min, max)) return null;
    return normalized;
}

/**
 * Simple cron schedule validator.
 * (This implementation expects exactly 5 fields separated by whitespace.)
 */
function isCronPart (part:string, min:number, max:number): boolean {
    if (part === '*') {
        /* Wildcard */
        return true;
    } else if (part.indexOf('/') > -1) {
        /* Step expression */
        const [base, stepStr] = part.split('/', 2);
        const step = parseFloat(stepStr);
        if (!isIntegerAbove(step, 0) || !isIntegerBetween(step, min, max)) return false;

        /* Validate the base part */
        if (base === '*') {
            return true;
        } else if (base.indexOf('-') > -1) {
            const chunks = base.split('-', 2);
            if (chunks.length !== 2) return false;
            const start = isCronSubpart(chunks[0], min, max);
            const end = isCronSubpart(chunks[1], min, max);
            if (start === null || end === null) return false;
            if (start > end) return false;
            if (step > (end - start)) return false;
            return true;
        } else {
            return isCronSubpart(base, min, max) !== null;
        }
    } else if (part.indexOf('-') > -1) {
        /* Range (eg: 10-30) */
        const chunks = part.split('-', 2);

        /* Range has start and end, if a valid range is not provided return false */
        if (chunks.length !== 2) return false;

        /* The start and end need to be valid cron parts */
        const start = isCronSubpart(chunks[0], min, max);
        const end = isCronSubpart(chunks[1], min, max);
        if (start === null || end === null) return false;

        return start < end;
    } else if (part.indexOf(',') > -1) {
        /* Csv list (Eg: 5,10,15) */
        const chunks = part.split(',');
        for (let i = 0; i < chunks.length; i++) {
            if (isCronSubpart(chunks[i], min, max) === null) return false;
        }
        return true;
    } else {
        return isCronSubpart(part, min, max) !== null;
    }
}

/**
 * Returns the current time in the provided zone as an object of parts
 *
 * @param {string|null} timeZone - Zone to use
 */
function getTimeAsParts (timeZone:string | null):TimeMap {
    const now = toUTC(timeZone !== null
        ? new Date(format(new Date(), 'ISO', 'en-US', timeZone))
        : new Date()
    );

    return {
        minute: now.getUTCMinutes(),
        hour: now.getUTCHours(),
        day_of_month: now.getUTCDate(),
        month: now.getUTCMonth() + 1,
        day_of_week: now.getUTCDay(),
    };
}

/**
 * Checks the processed time against the processed map and returns true/false if matches or not
 *
 * @param {CronMap} map - Cron Map
 * @param {TimeMap} time - Time Map
 * @returns {boolean}
 */
function checkTimeAgainstMap (map:CronMap, time:TimeMap) {
    const {minute, hour, day_of_month, month, day_of_week} = map;

    /* Minute */
    if (minute !== '*' && !minute.has(time.minute)) return false;

    /* Hour */
    if (hour !== '*' && !hour.has(time.hour)) return false;

    /* Day of Month */
    if (day_of_month !== '*' && !day_of_month.has(time.day_of_month)) return false;

    /* Month */
    if (month !== '*' && !month.has(time.month)) return false;

    /* Day of Week */
    if (day_of_week !== '*' && !day_of_week.has(time.day_of_week)) return false;

    return true;
}

/**
 * The Scheduler class.
 *
 * Instantiate this module, add multiple scheduled tasks,
 * and then call run() to execute those whose cron schedule matches the current time.
 */
class Scheduler {

    /**
     * Internal array of Jobs
     */
    #jobs:{
        schedule: string;
        map: CronMap;
        fn: () => void|Promise<void>;
        timeZone: string | null;
        name?: string;
    }[] = [];

    /**
     * Name of the instance
     */
    #name:string = 'Scheduler';

    /**
     * Logger Function
     */
    #log:LogFn = noop;

    /**
     * Internal Default Timezone
     */
    #timeZone:string|null = null;

    constructor (options:SchedulerOptions = {}) {
        if (!isObject(options)) throw new Error('Scheduler@ctor: options should be an object');

        if ('logger' in options) {
            if (!isFunction(options.logger)) throw new Error('Scheduler@ctor: logger should be a function');
            this.#log = options.logger;
        }

        if ('name' in options) {
            if (!isNotEmptyString(options.name)) throw new Error('Scheduler@ctor: name should be a non-empty string');
            this.#name = options.name.trim();
        }

        if ('timeZone' in options) {
            if (
                options.timeZone !== null &&
                !isNotEmptyString(options.timeZone)
            ) throw new Error('Scheduler@ctor: timeZone should be null or a non-empty string');
            this.#timeZone = options.timeZone;
        }
    }

    /**
     * Getter returning the name of the scheduler.
     */
    get name () {
        return this.#name;
    }

    /**
     * Add a task to the scheduler.
     *
     * @param {SchedulerJob} job - Raw job object to be added to the jobs list
     */
    add (job:SchedulerJob): void {
        if (!Scheduler.isCronSchedule(job?.schedule)) throw new Error(`${this.#name}@add: Invalid cron schedule`);
        if (!isFunction(job?.fn)) throw new Error(`${this.#name}@add: Invalid function for job`);

        this.#jobs.push({
            schedule: job.schedule,
            map: convertToMap(job.schedule),
            fn: job.fn,
            timeZone: isNotEmptyString(job.timeZone) ? job.timeZone! : this.#timeZone,
            ...isNotEmptyString(job.name) && {name: job.name},
        });
    }

    /**
     * Iterate through all added jobs and execute those that should run at the current time.
     */
    async run (): Promise<void> {
        /* For each configured task check if we need to run it, if so push into promise array */
        const promises = [];
        for (let i = 0; i < this.#jobs.length; i++) {
            const job = this.#jobs[i];
            const time = getTimeAsParts(job.timeZone);

            /* Only if the job's processed cron map matches our current time do we run it */
            if (checkTimeAgainstMap(job.map, time)) {
                try {
                    /* Run the job handle */
                    const result = job.fn();

                    /* If the job was asynchronous we need to push it into our promises array for execution */
                    if (isFunction(result?.then) && isFunction(result?.catch)) {
                        promises.push(result.catch((err: Error) => this.#log({
                            name: this.#name,
                            msg: `${job.name || 'Async job'} error: ${err.message || 'Unknown error'}`,
                            on: new Date(),
                            data: {schedule: job.schedule, timeZone: job.timeZone, ...job.name && {job: job.name}},
                            err,
                        })));
                    }
                } catch (err: any) {
                    this.#log({
                        name: this.#name,
                        msg: `${job.name || 'Sync job'} error: ${err.message || 'Unknown error'}`,
                        on: new Date(),
                        data: {schedule: job.schedule, timeZone: job.timeZone, ...job.name && {job: job.name}},
                        err,
                    });
                }
            }
        }

        /* If promise array has content, await them */
        if (promises.length) await Promise.all(promises);
    }

    /**
     * Checks if a string is a valid cron schedule
     *
     * @param {string} raw - Value to verify is a valid schedule
     */
    static isCronSchedule (raw:string) {
        if (!isNotEmptyString(raw)) return false;

        const parts = raw.split(' ');
        return (
            parts.length === 5 &&
            /* Minute */
            isCronPart(parts[0], 0, 59) &&
            /* Hour */
            isCronPart(parts[1], 0, 23) &&
            /* Day of month */
            isCronPart(parts[2], 1, 31) &&
            /* Month */
            isCronPart(parts[3], 1, 12) &&
            /* Day of week */
            isCronPart(parts[4], 0, 7)
        );
    }

    /**
     * Check if a given cron schedule should run at the current (or specified) time.
     *
     * @param schedule A cron string (5 fields: minute, hour, day of month, month, day of week).
     * @param timeZone Optional IANA time zone string.
     * @returns true if the schedule matches the current time.
     */
    static cronShouldRun (schedule:string, timeZone: string | null = null) {
        if (!Scheduler.isCronSchedule(schedule)) return false;

        const map = convertToMap(schedule);
        const time = getTimeAsParts(isNotEmptyString(timeZone) ? timeZone : null);
        return checkTimeAgainstMap(map, time);
    }

}

export {Scheduler, Scheduler as default};
