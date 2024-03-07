'use strict';

/* eslint-disable no-confusing-arrow */

import isDate from './is';

type Formatter  = (d:Date, loc?:string) => string;
type RawTuple   = [string, Formatter];
type TokenTuple = [string, RegExp, Formatter];

const DEFAULT_LOCALE    = 'en-US';
let DEFAULT_TZ          = 'UTC';
try {
    DEFAULT_TZ = Intl.DateTimeFormat().resolvedOptions().timeZone;
} catch (err) {
    //  NOOP: If this doesn't work we simply work with UTC as default
} finally {
    if (typeof DEFAULT_TZ !== 'string') DEFAULT_TZ = 'UTC';
}

/* Memoized escape regex, used to find escaped portions of the passed spec eg: '[today is] ...' */
const escape_rgx = /\[[\w\s]+]/g;

/* Map storing Intl.DateTimeFormat instances for specific locale-token hashes */
const intl_formatters:Map<string, Intl.DateTimeFormat> = new Map();

/* Memoize specs passed and their function chain */
const spec_cache:Map<string, TokenTuple[]> = new Map();

/* Memoize TZ offsets */
const zone_offset_cache:Map<string, number> = new Map();

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
    if (zone_offset_cache.has(zone)) return new Date(date.getTime() + zone_offset_cache.get(zone));

    /* Get the current client's timezone offset in minutes */
    const client_time:number = date.getTime();

    /* Get the target timezone offset in minutes */
    const zone_time:number = new Date(date.toLocaleString(DEFAULT_LOCALE, {timeZone: zone})).getTime();
    if (!Number.isFinite(zone_time)) throw new Error('format: Invalid zone passed');

    /* Calculate the time difference in minutes */
    const offset = zone_time - client_time;
        
    /* Store in offset cache so we don't need to do this again */
    zone_offset_cache.set(zone, offset);

    /* Return new date and time */
    return new Date(date.getTime() + offset);
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
    const hash = `${loc}:${token}`;

    /* Use existing formatter if we already have a formatter for this */
    if (intl_formatters.has(hash)) return intl_formatters.get(hash).format(val);

    try {
        /* Create new instance of Intl.DateTimeFormat and store it */
        const instance = new Intl.DateTimeFormat(loc, props);
        intl_formatters.set(hash, instance);

        return instance.format(val);
    } catch (err) {
        throw new Error(`format: Failed to run conversion for ${token} with locale ${loc}`);
    }
}

/**
 * Token Tuple array, this is a sorted array of tuples containing a RegEx and a formatting function.
 * 
 * Take Note: They are sorted by length initially to ensure shorter tokens don't replace what could have been a longer token (eg: DD vs D)
 * Take Note: RegExp memoization is done ahead of time to ensure no regex compilation needs to happen during formatting
 */
const Tokens:TokenTuple[] = ([
    ['YYYY', d => d.getFullYear()],                                     /* Full Year: eg (2021) */
    ['Q', d => Math.floor((d.getMonth() + 3) / 3)],                     /* Quarters of the year: eg (1 2 3 4) */
    ['MMMM', (d, loc) => runIntl(loc, 'MMMM', {month: 'long'}, d)],     /* Month in full: eg (January February ... November December) */
    ['MMM', (d, loc) => runIntl(loc, 'MMM', {month: 'short'}, d)],      /* Month as 3 char: eg (Jan Feb ... Nov Dec) */
    ['MM', d => `${d.getMonth() + 1}`.padStart(2, '0')],                /* Month as 2 char: eg (01 02 .. 11 12) */
    ['M', d => d.getMonth() + 1],                                       /* Month as pure digit: eg (1 2 .. 11 12) */
    ['DD', d => `${d.getDate()}`.padStart(2, '0')],                     /* Day of month as 2 char: eg (01 02 .. 30 31) */
    ['D', d => d.getDate()],                                            /* Day of month as 1 char: eg (1 2 .. 30 31) */
    ['dddd', (d, loc) => runIntl(loc, 'dddd', {weekday: 'long'}, d)],   /* Day of week as 3 char: eg (Sun Mon ... Fri Sat) */
    ['ddd', (d, loc) => runIntl(loc, 'ddd', {weekday: 'short'}, d)],    /* Day of week in full: eg (Sunday Monday ... Saturday) */
    ['HH', d => `${d.getHours()}`.padStart(2, '0')],                    /* Hours as 2-char: eg (00 01 .. 22 23) */
    ['H', d => d.getHours()],                                           /* Hours as pure digit: eg (0 1 .. 22 23) */
    ['hh', d => `${((d.getHours()+11)%12)+1}`.padStart(2, '0')],        /* Hours in 12 hour time as 2 char: eg (01 02 ... 11 12) */
    ['h', d => ((d.getHours()+11)%12)+1],                               /* Hours in 12 hour time as pure digit: eg (1 2 ... 11 12) */
    ['mm', d => `${d.getMinutes()}`.padStart(2, '0')],                  /* Minutes as 2-char: eg (00 01 .. 58 59) */
    ['m', d => d.getMinutes()],                                         /* Minutes as pure digit: eg (0 1 .. 58 59) */
    ['ss', d => `${d.getSeconds()}`.padStart(2, '0')],                  /* Seconds as 2-char: eg (00 01 .. 58 59) */
    ['s', d => d.getSeconds()],                                         /* Seconds as pure digit: eg (0 1 .. 58 59) */
    ['SSS', d => `${d.getMilliseconds()}`.padStart(3, '0')],            /* Milliseconds as 3-digit: eg (000 001 ... 998 999) */
    ['A', d => d.getHours() < 12 ? 'AM' : 'PM'],                        /* Uppercase AM/PM */
    ['a', d => d.getHours() < 12 ? 'am' : 'pm'],                        /* Lowercase AM/PM */
] as RawTuple[])
    .sort((a, b) => a[0].length > b[0].length ? -1 : 1)
    .map((el:RawTuple):TokenTuple => [el[0], new RegExp(el[0], 'g'), el[1]]);

/**
 * Create and return spec chain if spec does not exist in spec cache, otherwise return cached spec plan
 *  
 * Why? In real-world scenarios most apps only apply a handful of specs (eg: 'YYYY-MM-DD'). As such it's going to be faster
 * with continued issue to cache the chains that need to be executed for these specs.
 * 
 * @param {string} spec - Spec to be converted to spec chain
 * @returns {TokenTuple[]|false} Returns either a token tuple array or false in case the spec does not contain tokens
 */
function getSpecChain (spec:string):TokenTuple[]|false {
    if (spec_cache.has(spec)) return spec_cache.get(spec);
    
    const spec_chain:TokenTuple[] = [];
    let cursor;
    for (let i = 0; i < Tokens.length; i++) {
        cursor = Tokens[i];
        if (spec.indexOf(cursor[0]) < 0) continue;
        spec_chain.push(cursor);
    }
    if (spec_chain.length === 0) return false;
    spec_cache.set(spec, spec_chain);
    return spec_chain;
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
export default function format (val:Date, spec:string, locale:string = DEFAULT_LOCALE, zone:string = DEFAULT_TZ):string {
    /* Ensure val is a Date */
    if (!isDate(val)) throw new TypeError('format: val must be a Date');

    /* Ensure spec is a non-empty string */
    if (typeof spec !== 'string' || !spec.trim().length) throw new TypeError('format: spec must be a non-empty string');

    /* Ensure locale is a non-empty string */
    if (typeof locale !== 'string' || !locale.trim().length) throw new TypeError('format: locale must be a non-empty string');

    /* Ensure zone is a non-empty string */
    if (typeof zone !== 'string' || !zone.trim().length) throw new TypeError('format: zone must be a non-empty string');

    let formatted_string = spec;

    /**
     * Replacement of escaped characters
     * eg w/ 7 February 2021: '[year]YYYY [Q]Q [M]M [D]D' -> '$R0$YYYY $R0$Q $R1$M $R2$D' -> 2021 Q1 M2 D7
     */
    const escaped_acc:[string, string][] = [];
    if (formatted_string.indexOf('[') >= 0) {
        formatted_string = formatted_string.replace(escape_rgx, match => {
            const escape_token = `$R${escaped_acc.length}$`;
            escaped_acc.push([escape_token, match.replace('[', '').replace(']', '')]);
            return escape_token;
        });
    }

    /* Get spec chain, this is the chain of token tuples that need to be executed for the spec */
    const spec_chain:TokenTuple[]|false = getSpecChain(formatted_string);
    if (!spec_chain) return '';

    /* Convert date to zone if necessary */
    const d:Date = toZone(val, zone);

    /* Run spec chain */
    for (const el of spec_chain) {
        formatted_string = formatted_string.replace(el[1], el[2](d, locale));
    }

    /* Re-insert escaped tokens */
    if (escaped_acc.length) {
        for (const escape_token of escaped_acc) {
            formatted_string = formatted_string.replace(escape_token[0], escape_token[1]);
        }
    }

    return formatted_string;
}
