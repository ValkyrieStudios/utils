/* eslint-disable no-confusing-arrow */

import {convertToDate} from './convertToDate';

const WEEK_STARTS = {
    mon: 'mon',
    sun: 'sun',
    sat: 'sat',
} as const;

export type WEEK_START = keyof typeof WEEK_STARTS;

type Formatter  = (d:Date, loc:string, sow:WEEK_START) => string;
type RawTuple = [string, Formatter];
type TokenTuple = [string, Formatter, number];

let DEFAULT_LOCALE          = 'en-US';
let DEFAULT_TZ              = 'UTC';
let DEFAULT_SOW:WEEK_START  = 'mon';

/* Try to get default timezone */
try {
    DEFAULT_TZ = Intl.DateTimeFormat().resolvedOptions().timeZone;
} catch {
    /* NOOP: If this doesn't work we simply work with UTC as default */
} finally {
    if (typeof DEFAULT_TZ !== 'string') DEFAULT_TZ = 'UTC';
}

/* Memoized escape regex, used to find escaped portions of the passed spec eg: '[today is] ...' */
const ESCAPE_RGX = /\[[\s\S]+?]/g;

/* Map storing Intl.DateTimeFormat instances for specific locale-token hashes */
const intl_formatters: Record<string, Intl.DateTimeFormat> = Object.create(null);

/* Memoize specs passed and their function chain */
type SpecCacheEntry = {base:string; chain: TokenTuple[]; chain_len:number; repl: [string, string][]; repl_len:number}|null;
const spec_cache: Record<string, SpecCacheEntry> = Object.create(null);

/* Memoize TZ offsets */
const zone_offset_cache: Record<string, number> = Object.create(null);

/**
 * Get the week number for a particular date
 *
 * @param {Date} d - Date to get the week number for
 * @param {WEEK_START} sow - First day of the week
 */
function WeekNr (d: Date, sow: WEEK_START): number {
    switch (sow) {
        case 'sun':
        case 'sat': {
            const OFFSET = sow === 'sat' ? 1 : 0;
            const jan1 = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));

            /* Adjust the date to the nearest previous Sunday (start of the week) */
            const near = new Date(d.getTime() - (((d.getDay() + OFFSET) % 7) * 86400000));

            /* Move January 1st back to the Sunday of its week if it's not already a Sunday */
            const first = new Date(jan1.getTime() - (((jan1.getDay() + OFFSET) % 7) * 86400000));

            /* Calculate the difference in weeks add 1 because weeks are 1-based */
            return 1 + Math.floor((near.valueOf() - first.valueOf()) / 604800000);
        }
        /* Take note: This is the ISO implementation with monday as first day */
        default: {
            const date = new Date(d.valueOf());

            /**
             * Adjust the copied date object to represent the Thursday of the current week we do this by
             * calculating the day number and adjust it to have Monday as the first day of the week and then
             * adding 3
             */
            date.setDate(date.getDate() - ((d.getDay() + 6) % 7) + 3);

            /* Store the value of the current Thursday of this week */
            const date_thu = date.valueOf();

            /* Set the cursor to Jan 1st */
            date.setMonth(0, 1);

            /* If January 1st is not a Thursday, find the date of the first Thursday of the year */
            if (date.getDay() !== 4) date.setMonth(0, (1 + ((4 - date.getDay()) + 7)) % 7);

            /**
             * Calculate the ISO 8601 week number
             * (monday first day of the week)
             * this computation is based on diff between the value of the first and current Thursday
             * divided by the number of milliseconds in a week
             */
            return 1 + Math.ceil((date_thu - date.valueOf()) / 604800000);
        }
    }
}

/**
 * Convert a particular date object to another timezone. We do this by first computing
 * the offset between the client and the date in the new timezone. We then store that knowledge for future use
 * and then return the date with the addition of the minutes (offset to the new zone).
 *
 * Why do we need the zone offset cache? Because toLocaleString with timeZone options is an incredibly
 * expensive operation.
 *
 * @param {Date} date - Original date object
 * @param {string} zone - Time Zone to convert to
 */
function toZone (d:Date, zone:string):Date {
    const year = d.getUTCFullYear();
    const month = d.getUTCMonth();
    const day = d.getUTCDate();
    const time = d.getTime();

    /* Precomputed days in each month for a non-leap year */
    const daysInMonths = [31, (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    /* Calculate day of the year (DOY) */
    let doy = day;
    for (let i = 0; i <= month; i++) doy += daysInMonths[i];

    /* We make use of a cache key including year/doy as offsets might differ between months due to daylight saving time */
    const ckey = zone + ':' + year + ':' + doy;
    if (zone_offset_cache[ckey] !== undefined) return new Date(time + zone_offset_cache[ckey]);

    /* Get the target timezone offset in minutes */
    let zone_time:number|null = null;
    try {
        zone_time = new Date(d.toLocaleString(DEFAULT_LOCALE, {timeZone: zone})).getTime() + d.getMilliseconds();
    } catch {
        throw new Error(`format: Invalid zone passed - ${zone}`);
    }

    /* Calculate the time difference in minutes */
    const offset = zone_time - time;

    /* Store in offset cache so we don't need to do this again */
    zone_offset_cache[ckey] = offset;

    /* Return new date and time */
    return new Date(time + offset);
}

/**
 * Creates an Intl DateTimeFormat instance, caches it and runs the specific date against it
 *
 * @param {string} loc - Locale to use for the formatter
 * @param {string} token - Token key this formatter is for
 * @param {Intl.DateTimeFormatOptions} props - Options to pass to the formatter
 * @param {Date} val - Value to format
 */
function runIntl (
    loc:string,
    token:string,
    props:Intl.DateTimeFormatOptions,
    val:Date
):string {
    const hash = loc + ':' + token;

    let formatter = intl_formatters[hash];
    if (!formatter) {
        try {
            formatter = new Intl.DateTimeFormat(loc, props);
            intl_formatters[hash] = formatter;
        } catch {
            throw new Error(`format: Failed to run conversion for ${token} with locale ${loc}`);
        }
    }

    return formatter.format(val);
}

/**
 * Token Tuple array, this is a sorted array of tuples containing a RegEx and a formatting function.
 *
 * Take Note: They are sorted by length initially to ensure shorter tokens don't replace what could have been a longer token (eg: DD vs D)
 * Take Note: RegExp memoization is done ahead of time to ensure no regex compilation needs to happen during formatting
 */
const Tokens:TokenTuple[] = ([
    /* Full Year: eg (2021) */
    ['YYYY', d => d.getFullYear()],
    /* Quarters of the year: eg (1 2 3 4) */
    ['Q', d => ((d.getMonth() + 3) / 3) | 0],
    /* Month in full: eg (January February ... November December) */
    ['MMMM', (d, loc) => runIntl(loc, 'MMMM', {month: 'long'}, d)],
    /* Month as 3 char: eg (Jan Feb ... Nov Dec) */
    ['MMM', (d, loc) => runIntl(loc, 'MMM', {month: 'short'}, d)],
    /* Month as 2 char: eg (01 02 .. 11 12) */
    ['MM', d => {
        const val = d.getMonth() + 1;
        return (val < 10 ? '0' : '') + val;
    }],
    /* Month as pure digit: eg (1 2 .. 11 12) */
    ['M', d => d.getMonth() + 1],
    /* ISO Week Number: eg (01 02 .. 52 53) */
    ['WW', (d, loc, sow) => {
        const val = WeekNr(d, sow);
        return (val < 10 ? '0' : '') + val;
    }],
    /* ISO Week Number without leading zero: eg (1 2 .. 52 53) */
    ['W', (d, loc, sow) => WeekNr(d, sow)],
    /* Day of month as 2 char: eg (01 02 .. 30 31) */
    ['DD', d => {
        const val = d.getDate();
        return (val < 10 ? '0' : '') + val;
    }],
    /* Day of month as 1 char: eg (1 2 .. 30 31) */
    ['D', d => d.getDate()],
    /* Day of week as 3 char: eg (Sun Mon ... Fri Sat) */
    ['dddd', (d, loc) => runIntl(loc, 'dddd', {weekday: 'long'}, d)],
    /* Day of week in full: eg (Sunday Monday ... Saturday) */
    ['ddd', (d, loc) => runIntl(loc, 'ddd', {weekday: 'short'}, d)],
    /* Hours as 2-char: eg (00 01 .. 22 23) */
    ['HH', d => {
        const val = d.getHours();
        return (val < 10 ? '0' : '') + val;
    }],
    /* Hours as pure digit: eg (0 1 .. 22 23) */
    ['H', d => d.getHours()],
    /* Hours in 12 hour time as 2 char: eg (01 02 ... 11 12) */
    ['hh', d => {
        const val = ((d.getHours()+11)%12)+1;
        return (val < 10 ? '0' : '') + val;
    }],
    /* Hours in 12 hour time as pure digit: eg (1 2 ... 11 12) */
    ['h', d => ((d.getHours()+11)%12)+1],
    /* Minutes as 2-char: eg (00 01 .. 58 59) */
    ['mm', d => {
        const val = d.getMinutes();
        return (val < 10 ? '0' : '') + val;
    }],
    /* Minutes as pure digit: eg (0 1 .. 58 59) */
    ['m', d => d.getMinutes()],
    /* Seconds as 2-char: eg (00 01 .. 58 59) */
    ['ss', d => {
        const val = d.getSeconds();
        return (val < 10 ? '0' : '') + val;
    }],
    /* Seconds as pure digit: eg (0 1 .. 58 59) */
    ['s', d => d.getSeconds()],
    /* Milliseconds as 3-digit: eg (000 001 ... 998 999) */
    ['SSS', d => {
        const val = d.getMilliseconds();
        return val < 10
            ? '00' + val
            : val < 100
                ? '0' + val
                : val;
    }],
    /* Uppercase AM/PM */
    ['A', d => d.getHours() < 12 ? 'AM' : 'PM'],
    /* Lowercase AM/PM */
    ['a', d => d.getHours() < 12 ? 'am' : 'pm'],
    /* Locale-specific date mark: eg (15/07/2024 vs 7/15/24) */
    ['l', (d, loc) => runIntl(loc, 'l', {dateStyle: 'short'}, d)],
    /* Locale-specific date: eg (Jul 15, 2024 vs 15 jul 2024) */
    ['L', (d, loc) => runIntl(loc, 'L', {dateStyle: 'medium'}, d)],
    /* Locale-specific time: eg(10:28 PM vs 22:28) */
    ['t', (d, loc) => runIntl(loc, 't', {timeStyle: 'short'}, d)],
     /* Locale-specific time+sec: eg(10:28:30 PM vs 22:28:30) */
    ['T', (d, loc) => runIntl(loc, 'T', {timeStyle: 'medium'}, d)],
] as RawTuple[])
    .map(el => [el[0], el[1], el[0].length] as TokenTuple)
    .sort((a, b) => a[0].length > b[0].length ? -1 : 1);

/**
 * Create and return spec chain if spec does not exist in spec cache, otherwise return cached spec plan
 *
 * Why? In real-world scenarios most apps only apply a handful of specs (eg: 'YYYY-MM-DD'). As such it's going to be faster
 * with continued issue to cache the chains that need to be executed for these specs.
 *
 * @param {string} spec - Spec to be converted to spec chain
 */
function getSpecChain (spec:string):SpecCacheEntry {
    if (spec_cache[spec] !== undefined) return spec_cache[spec];

    let base = spec;

    /**
     * Replacement of escaped characters
     * eg w/ 7 February 2021: '[year]YYYY [Q]Q [M]M [D]D' -> '$R0$YYYY $R1$Q $R2$M $R3$D' -> 2021 Q1 M2 D7
     */
    const repl:[string, string][] = [];
    let repl_len = 0;
    if (base.indexOf('[') >= 0) {
        base = base.replace(ESCAPE_RGX, match => {
            const escape_token = '$R' + repl_len++ + '$';
            repl.push([escape_token, match.slice(1, -1)]);
            return escape_token;
        });
    }

    const chain: TokenTuple[] = [];
    const matched_positions: Set<number> = new Set();

    for (let i = 0; i < Tokens.length; i++) {
        const [token] = Tokens[i];
        let pos = base.indexOf(token);

        const token_len = token.length;
        while (pos !== -1) {
            /* Check if this position has already been processed */
            if (!matched_positions.has(pos)) {
                chain.push(Tokens[i]);
                /* Mark this position and the next characters as processed */
                for (let j = 0; j < token_len; j++) {
                    matched_positions.add(pos + j);
                }
            }
            pos = base.indexOf(token, pos + 1);
        }
    }
    const chain_len = chain.length;
    const result = chain_len ? {base, chain, chain_len, repl, repl_len} : null;
    spec_cache[spec] = result;
    return result;
}

/**
 * Formats the provided date according to a specific spec
 *
 * @param {Date|string} val - Date to format
 * @param {string} spec - Spec to format the date to
 * @param {string} locale - Locale to format the date in (only used in certain tokens such as dddd and MMMM)
 * @param {string} zone - (default=current timezone) Pass the timezone to convert into. If not passed no conversion will happen
 * @param {string} sow - (default='mon') Start of week (only useful when working with the 'W' and 'w' tokens for week numbers
 * @throws {TypeError} When provided invalid payload
 */
function format (
    val:Date|string,
    spec:string,
    locale:string = DEFAULT_LOCALE,
    zone:string = DEFAULT_TZ,
    sow:WEEK_START = DEFAULT_SOW
):string {
    /* Normalize onto n_val and convert eg strings to dates */
    const n_val = convertToDate(val);
    if (n_val === null) throw new TypeError('format: val must be a Date');

    /* Ensure spec is a non-empty string */
    if (typeof spec !== 'string') throw new TypeError('format: spec must be a string');

    /* Ensure locale is a non-empty string */
    if (typeof locale !== 'string') throw new TypeError('format: locale must be a string');

    /* Ensure zone is a non-empty string */
    if (typeof zone !== 'string') throw new TypeError('format: zone must be a string');

    /* Get spec chain, this is the chain of token tuples that need to be executed for the spec */
    const n_spec = getSpecChain(spec);
    if (!n_spec) return n_val.toISOString();

    /* Convert date to zone if necessary */
    const d = toZone(n_val, zone);
    let base = n_spec.base;
    const {chain_len, chain, repl_len, repl} = n_spec;

    /* Run spec chain */
    for (let i = 0; i < chain_len; i++) {
        let pos = base.indexOf(chain[i][0]);
        const formatted_val = chain[i][1](d, locale, sow);
        while (pos !== -1) {
            base = base.slice(0, pos) +
            formatted_val +
            base.slice(pos + chain[i][2]);
            pos = base.indexOf(chain[i][0], pos + chain[i][2]);
        }
    }

    /* Re-insert escaped tokens */
    for (let i = 0; i < repl_len; i++) {
        base = base.replace(repl[i][0], repl[i][1]);
    }

    return base;
}

/**
 * Returns the current locale the format function will use by default
 */
format.getLocale = function () {
    return DEFAULT_LOCALE;
};

/**
 * Configures the global default locale the format function will use
 *
 * @param {string} locale - Locale to use
 */
format.setLocale = function (locale:string) {
    if (typeof locale !== 'string' || !locale.trim().length) throw new Error('format/setLocale: locale should be a string');
    DEFAULT_LOCALE = locale.trim();
};

/**
 * Returns the current time zone the format function will use by default
 */
format.getZone = function () {
    return DEFAULT_TZ;
};

/**
 * Configures the global default timezone the format function will use
 *
 * @param {string} zone - Time zone to use
 */
format.setZone = function (zone:string) {
    if (typeof zone !== 'string') throw new Error('format/setZone: zone should be a string');
    try {
        new Intl.DateTimeFormat('en-US', {timeZone: zone});
        DEFAULT_TZ = zone;
    } catch {
        throw new Error(`format/setZone: '${zone}' is not a valid zone`);
    }
};

/**
 * Returns the current start of week the format function will use by default
 */
format.getStartOfWeek = function () {
    return DEFAULT_SOW;
};

/**
 * Configures the global default start of week the format function will use
 *
 * @param {WEEK_START} sow - Start of week to use
 */
format.setStartOfWeek = function (sow:WEEK_START) {
    if (
        typeof sow !== 'string' ||
        !Object.values(WEEK_STARTS).includes(sow)
    ) throw new Error('format/setStartOfWeek: sow should be a valid start of week');
    DEFAULT_SOW = sow;
};

export {format, format as default};
