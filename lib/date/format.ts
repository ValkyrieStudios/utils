/* eslint-disable no-confusing-arrow */

import {isDate} from './is';

export type WEEK_START = 'mon' | 'sun';

type Formatter  = (d:Date, loc:string, sow:WEEK_START) => string;
type RawTuple = [string, Formatter];
type TokenTuple = [string, Formatter, number];

const DEFAULT_LOCALE    = 'en-US';
let DEFAULT_TZ          = 'UTC';
try {
    DEFAULT_TZ = Intl.DateTimeFormat().resolvedOptions().timeZone;
} catch (err) {
    /* NOOP: If this doesn't work we simply work with UTC as default */
} finally {
    if (typeof DEFAULT_TZ !== 'string') DEFAULT_TZ = 'UTC';
}

/* Memoized escape regex, used to find escaped portions of the passed spec eg: '[today is] ...' */
const escape_rgx = /\[[\s\S]+?]/g;

/* Map storing Intl.DateTimeFormat instances for specific locale-token hashes */
const intl_formatters: Record<string, Intl.DateTimeFormat> = Object.create(null);

/* Memoize specs passed and their function chain */
const spec_cache: Record<string, TokenTuple[] | null> = Object.create(null);

/* Memoize TZ offsets */
const zone_offset_cache: Record<string, number> = Object.create(null);

/**
 * Get the day of the year for a particular date
 *
 * @param {Date} d - Date to get the day of the year for
 * @returns {number} Day of the year
 */
function DOY (d:Date):number {
    /* eslint-disable-next-line */
    /* @ts-ignore */
    return ((d - new Date(d.getFullYear(), 0, 0)) / 86400000) | 0;
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
 * @returns {Date} Date in the zone
 */
function toZone (date:Date, zone:string):Date {
    /* We make use of a 'month' key as offsets might differ between months due to daylight saving time */
    const ckey = `${zone}:${date.getUTCFullYear()}${DOY(date)}`;
    if (zone_offset_cache[ckey] !== undefined) return new Date(date.getTime() + zone_offset_cache[ckey]);

    /* Get the current client's timezone offset in minutes */
    const client_time = date.getTime();

    /* Get the target timezone offset in minutes */
    let zone_time:number|null = null;
    try {
        zone_time = new Date(date.toLocaleString(DEFAULT_LOCALE, {timeZone: zone})).getTime();
    } catch (err) {
        throw new Error(`format: Invalid zone passed - ${zone}`);
    }

    /* Calculate the time difference in minutes */
    const offset = zone_time - client_time;

    /* Store in offset cache so we don't need to do this again */
    zone_offset_cache[ckey] = offset;

    /* Return new date and time */
    return new Date(client_time + offset);
}

/**
 * Creates an Intl DateTimeFormat instance, caches it and runs the specific date against it
 *
 * @param {string} loc - Locale to use for the formatter
 * @param {string} token - Token key this formatter is for
 * @param {Intl.DateTimeFormatOptions} props - Options to pass to the formatter
 * @param {Date} val - Value to format
 * @returns {string} Formatted value
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
        } catch (err) {
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
    .map(el => [el[0], el[1], el[0].length])
    .sort((a, b) => a[0].length > b[0].length ? -1 : 1);

/**
 * Create and return spec chain if spec does not exist in spec cache, otherwise return cached spec plan
 *
 * Why? In real-world scenarios most apps only apply a handful of specs (eg: 'YYYY-MM-DD'). As such it's going to be faster
 * with continued issue to cache the chains that need to be executed for these specs.
 *
 * @param {string} spec - Spec to be converted to spec chain
 * @returns {TokenTuple[]|false} Returns either a token tuple array or false in case the spec does not contain tokens
 */
function getSpecChain (spec:string):TokenTuple[]|null {
    if (spec_cache[spec] !== undefined) return spec_cache[spec];

    const spec_chain: TokenTuple[] = [];
    const matched_positions: Set<number> = new Set();

    for (let i = 0; i < Tokens.length; i++) {
        const [token] = Tokens[i];
        let pos = spec.indexOf(token);

        const token_len = token.length;
        while (pos !== -1) {
            /* Check if this position has already been processed */
            if (!matched_positions.has(pos)) {
                spec_chain.push(Tokens[i]);
                /* Mark this position and the next characters as processed */
                for (let j = 0; j < token_len; j++) {
                    matched_positions.add(pos + j);
                }
            }
            pos = spec.indexOf(token, pos + 1);
        }
    }

    const result = spec_chain.length ? spec_chain : null;
    spec_cache[spec] = result;
    return result;
}

/**
 * Formats the provided date according to a specific spec
 *
 * @param {Date} val - Date to format
 * @param {string} spec - Spec to format the date to
 * @param {string} locale - Locale to format the date in (only used in certain tokens such as dddd and MMMM)
 * @param {string} zone - (default=current timezone) Pass the timezone to convert into. If not passed no conversion will happen
 * @returns {string} Formatted date as string
 * @throws {TypeError} When provided invalid payload
 */
function format (val:Date, spec:string, locale:string = DEFAULT_LOCALE, zone:string = DEFAULT_TZ):string {
    /* Ensure val is a Date */
    if (!isDate(val)) throw new TypeError('format: val must be a Date');

    /* Ensure spec is a non-empty string */
    if (typeof spec !== 'string') throw new TypeError('format: spec must be a string');

    /* Ensure locale is a non-empty string */
    if (typeof locale !== 'string') throw new TypeError('format: locale must be a string');

    /* Ensure zone is a non-empty string */
    if (typeof zone !== 'string') throw new TypeError('format: zone must be a string');

    let formatted_string = spec;

    /**
     * Replacement of escaped characters
     * eg w/ 7 February 2021: '[year]YYYY [Q]Q [M]M [D]D' -> '$R0$YYYY $R1$Q $R2$M $R3$D' -> 2021 Q1 M2 D7
     */
    const escaped_acc:[string, string][] = [];
    let escaped_count = 0;
    if (formatted_string.indexOf('[') >= 0) {
        formatted_string = formatted_string.replace(escape_rgx, match => {
            const escape_token = '$R' + escaped_count++ + '$';
            escaped_acc.push([escape_token, match.slice(1, -1)]);
            return escape_token;
        });
    }

    /* Get spec chain, this is the chain of token tuples that need to be executed for the spec */
    const spec_chain = getSpecChain(formatted_string);
    if (!spec_chain) return val.toISOString();

    /* Convert date to zone if necessary */
    const d = toZone(val, zone);

    /* Run spec chain */
    for (let i = 0; i < spec_chain.length; i++) {
        let pos = formatted_string.indexOf(spec_chain[i][0]);
        const formatted_val = spec_chain[i][1](d, locale);
        while (pos !== -1) {
            formatted_string = formatted_string.slice(0, pos) +
            formatted_val +
            formatted_string.slice(pos + spec_chain[i][2]);
            pos = formatted_string.indexOf(spec_chain[i][0], pos + spec_chain[i][2]);
        }
    }

    /* Re-insert escaped tokens */
    if (escaped_count) {
        for (let i = 0; i < escaped_count; i++) {
            const escape_token = escaped_acc[i];
            formatted_string = formatted_string.replace(escape_token[0], escape_token[1]);
        }
    }

    return formatted_string;
}

export {format, format as default};
