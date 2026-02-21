/* eslint-disable no-confusing-arrow */

import {convertToDate} from './convertToDate';
import LRU from '../caching/LRU';

const WEEK_STARTS = {
    mon: 'mon',
    sun: 'sun',
    sat: 'sat',
} as const;

export type WEEK_START = keyof typeof WEEK_STARTS;

type Formatter  = (d:Date, loc:string, sow:WEEK_START) => string;
type RawTuple = [string, Formatter];
type TokenTuple = [string, Formatter, number];
type Part = string | Formatter;

let DEFAULT_LOCALE          = 'en-US';
let DEFAULT_TZ              = Intl?.DateTimeFormat?.().resolvedOptions?.().timeZone || 'UTC';
let DEFAULT_SOW:WEEK_START  = 'mon';

/* Map storing Intl.DateTimeFormat instances for specific locale-token hashes */
const intl_formatters = new LRU<Intl.DateTimeFormat>({max_size: 100});

/* Memoize specs passed and their function chain */
type SpecCacheEntry = Part[] | null;
const spec_cache = new LRU<SpecCacheEntry>({max_size: 100});

/* Memoize TZ offsets */
const zone_offset_cache = new LRU<number>({max_size: 100});

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
    const time = d.getTime();

    /* We chunk time into 15-minute epochs (900,000 ms) for the cache key. perfectly respects mid-day DST shifts */
    const ckey = zone + ':' + Math.floor(time / 900000);
    const cached = zone_offset_cache.get(ckey);
    if (cached !== undefined) return new Date(time + cached);

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
    zone_offset_cache.set(ckey, offset);

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

    let formatter = intl_formatters.get(hash);
    if (!formatter) {
        try {
            formatter = new Intl.DateTimeFormat(loc, props);
            intl_formatters.set(hash, formatter);
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
 */
const Tokens:TokenTuple[] = ([
    /* Full Year: eg (2021) */
    ['YYYY', d => d.getFullYear().toString()],
    /* Quarters of the year: eg (1 2 3 4) */
    ['Q', d => (((d.getMonth() + 3) / 3) | 0).toString()],
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
    ['M', d => (d.getMonth() + 1).toString()],
    /* ISO Week Number: eg (01 02 .. 52 53) */
    ['WW', (d, loc, sow) => {
        const val = WeekNr(d, sow);
        return (val < 10 ? '0' : '') + val;
    }],
    /* ISO Week Number without leading zero: eg (1 2 .. 52 53) */
    ['W', (d, loc, sow) => WeekNr(d, sow).toString()],
    /* Day of month as 2 char: eg (01 02 .. 30 31) */
    ['DD', d => {
        const val = d.getDate();
        return (val < 10 ? '0' : '') + val;
    }],
    /* Day of month as 1 char: eg (1 2 .. 30 31) */
    ['D', d => d.getDate().toString()],
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
    ['H', d => d.getHours().toString()],
    /* Hours in 12 hour time as 2 char: eg (01 02 ... 11 12) */
    ['hh', d => {
        const val = ((d.getHours()+11)%12)+1;
        return (val < 10 ? '0' : '') + val;
    }],
    /* Hours in 12 hour time as pure digit: eg (1 2 ... 11 12) */
    ['h', d => (((d.getHours()+11)%12)+1).toString()],
    /* Minutes as 2-char: eg (00 01 .. 58 59) */
    ['mm', d => {
        const val = d.getMinutes();
        return (val < 10 ? '0' : '') + val;
    }],
    /* Minutes as pure digit: eg (0 1 .. 58 59) */
    ['m', d => d.getMinutes().toString()],
    /* Seconds as 2-char: eg (00 01 .. 58 59) */
    ['ss', d => {
        const val = d.getSeconds();
        return (val < 10 ? '0' : '') + val;
    }],
    /* Seconds as pure digit: eg (0 1 .. 58 59) */
    ['s', d => d.getSeconds().toString()],
    /* Milliseconds as 3-digit: eg (000 001 ... 998 999) */
    ['SSS', d => {
        const val = d.getMilliseconds();
        return val < 10
            ? '00' + val
            : val < 100
                ? '0' + val
                : val.toString();
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

const token_map: Record<string, TokenTuple> = {};
for (const t of Tokens) token_map[t[0]] = t;

/* Memoized parser regex, used to find escaped portions of the passed spec eg: '[today is]' and valid tokens */
const PARSE_RGX = new RegExp('\\[[^\\]]*\\]|' + Tokens.map(([tok]) => tok).join('|'), 'g');

/**
 * Create and return spec chain if spec does not exist in spec cache, otherwise return cached spec plan
 *
 * Why? In real-world scenarios most apps only apply a handful of specs (eg: 'YYYY-MM-DD'). As such it's going to be faster
 * with continued issue to cache the chains that need to be executed for these specs.
 *
 * @param {string} spec - Spec to be converted to spec chain
 */
function getSpecChain (spec:string):SpecCacheEntry {
    const cached = spec_cache.get(spec);
    if (cached !== undefined) return cached;

    const parts: Part[] = [];
    PARSE_RGX.lastIndex = 0;

    let last_idx = 0;
    let has_token = false;
    let m: RegExpExecArray | null;

    // eslint-disable-next-line no-cond-assign
    while (m = PARSE_RGX.exec(spec)) {
        const match = m[0];
        const match_start = m.index;

        if (match_start > last_idx) {
            parts.push(spec.slice(last_idx, match_start));
        }

        /* Ascii 91 is '[' */
        if (match.charCodeAt(0) === 91) {
            parts.push(match.slice(1, -1));
        } else {
            parts.push(token_map[match][1]);
            has_token = true;
        }

        last_idx = match_start + match.length;
    }

    if (last_idx < spec.length) {
        parts.push(spec.slice(last_idx));
    }

    const result = has_token ? parts : null;
    spec_cache.set(spec, result);
    return result;
}

/* Pre-defined specs */
const SPEC_ALIASES:Record<string, string> = {
    ISO: 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]',
};

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
    const parts = getSpecChain(SPEC_ALIASES[spec] || spec);
    if (!parts) return n_val.toISOString();

    /* Convert date to zone if necessary */
    const d = toZone(n_val, zone);

    /* Run spec chain */
    let out = '';
    for (let i = 0; i < parts.length; i++) {
        const part = parts[i];
        out += typeof part === 'string' ? part : part(d, locale, sow);
    }

    return out;
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
    const normalized = typeof locale === 'string' ? locale.trim() : false;
    if (!normalized) throw new Error('format/setLocale: locale should be a string');
    DEFAULT_LOCALE = normalized;
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
