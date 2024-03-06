'use strict';

/* eslint-disable no-confusing-arrow */

import isDate from './is';

const EscapeRgx = /\[[\w\s]+]/g;

type Formatter  = (d:Date, loc?:string) => string;
type RawTuple   = [string, Formatter];
type TokenTuple = [RegExp, Formatter];

const DTFormatters:Map<string, Intl.DateTimeFormat> = new Map();

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
    if (DTFormatters.has(hash)) return DTFormatters.get(hash).format(val);

    /* Create new instance of Intl.DateTimeFormat and store it */
    const instance = new Intl.DateTimeFormat(loc, props);
    DTFormatters.set(hash, instance);
    
    return instance.format(val);
}

/**
 * Token Tuple array, this is a sorted array of tuples containing a RegEx and a formatting function.
 * 
 * Take Note: They are sorted by length initially to ensure shorter tokens don't replace what could have been a longer token (eg: DD vs D)
 * Take Note: RegExp memoization is done ahead of time to ensure no regex compilation needs to happen during formatting
 */
const Tokens:TokenTuple[] = ([
    ['YYYY', d => `${d.getUTCFullYear()}`],                             /* Full Year: eg (2021) */
    ['Q', d => `${(d.getUTCMonth() + 3) / 3}`],                         /* Quarters of the year: eg (1 2 3 4) */
    ['MMMM', (d, loc) => runIntl(loc, 'MMMM', {month: 'long'}, d)],     /* Month in full: eg (January February ... November December) */
    ['MMM', (d, loc) => runIntl(loc, 'MMM', {month: 'short'}, d)],      /* Month as 3 char: eg (Jan Feb ... Nov Dec) */
    ['MM', d => `${d.getUTCMonth() + 1}`.padStart(2, '0')],             /* Month as 2 char: eg (01 02 .. 11 12) */
    ['M', d => `${d.getUTCMonth() + 1}`],                               /* Month as pure digit: eg (1 2 .. 11 12) */
    ['DD', d => `${d.getUTCDate()}`.padStart(2, '0')],                  /* Day of month as 2 char: eg (01 02 .. 30 31) */
    ['D', d => `${d.getUTCDate()}`],                                    /* Day of month as 1 char: eg (1 2 .. 30 31) */
    ['dddd', (d, loc) => runIntl(loc, 'dddd', {weekday: 'long'}, d)],   /* Day of week as 3 char: eg (Sun Mon ... Fri Sat) */
    ['ddd', (d, loc) => runIntl(loc, 'ddd', {weekday: 'short'}, d)],    /* Day of week in full: eg (Sunday Monday ... Friday Saturday) */
    ['HH', d => `${d.getUTCHours()}`.padStart(2, '0')],                 /* Hours as 2-char: eg (00 01 .. 22 23) */
    ['H', d => `${d.getUTCHours()}`],                                   /* Hours as pure digit: eg (0 1 .. 22 23) */
    ['hh', d => `${((d.getUTCHours()+11)%12)+1}`.padStart(2, '0')],     /* Hours in 12 hour time as 2 char: eg (01 02 ... 11 12) */
    ['h', d => `${((d.getUTCHours()+11)%12)+1}`],                       /* Hours in 12 hour time as pure digit: eg (1 2 ... 11 12) */
    ['mm', d => `${d.getUTCMinutes()}`.padStart(2, '0')],               /* Minutes as 2-char: eg (00 01 .. 58 59) */
    ['m', d => `${d.getUTCMinutes()}`],                                 /* Minutes as pure digit: eg (0 1 .. 58 59) */
    ['ss', d => `${d.getUTCSeconds()}`.padStart(2, '0')],               /* Seconds as 2-char: eg (00 01 .. 58 59) */
    ['s', d => `${d.getUTCSeconds()}`],                                 /* Seconds as pure digit: eg (0 1 .. 58 59) */
    ['SSS', d => `${d.getUTCMilliseconds()}`.padStart(3, '0')],         /* Milliseconds as 3-digit: eg (000 001 ... 998 999) */
    ['X', d => `${Math.floor(d.valueOf()/1000)}`],                      /* Unix Timestamp */
    ['x', d => `${Math.floor(d.valueOf())}`],                           /* Unix Millisecond Timestamp */
    ['A', d => d.getUTCHours() < 12 ? 'AM' : 'PM'],                     /* Uppercase AM/PM */
    ['a', d => d.getUTCHours() < 12 ? 'am' : 'pm'],                     /* Lowercase AM/PM */
    ['G', d => d.getUTCFullYear() >= 0 ? 'AD' : 'BC'],                  /* AD or BC */
    ['Z', d => {                                                        /* Timezone offset, eg: +00:00 */
        const offset    = d.getTimezoneOffset();
        const sign      = offset > 0 ? '-' : '+';
        const hours     = Math.floor(Math.abs(offset)/60).toString().padStart(2, '0');
        const minutes   = (Math.abs(offset)%60).toString().padStart(2, '0');
        return `${sign}${hours}:${minutes}`;
    }],
] as RawTuple[])
    .sort((a, b) => a[0].length > b[0].length ? -1 : 1)
    .map((el:RawTuple):TokenTuple => [new RegExp(el[0], 'g'), el[1]]);

/**
 * Formats the provided date according to a specific spec
 *
 * @param {Date} val - Date to format
 * @param {string} spec - Spec to format the date to
 * @param {string} locale - Locale to format the date in (only used in certain tokens such as dddd and MMMM)
 * @returns {string} Formatted date as string 
 * @throws {TypeError} When provided invalid payload
 */
export default function format (val:Date, spec:string, locale:string = 'en'):string {
    /* Ensure val is a Date */
    if (!isDate(val)) throw new TypeError('format: val must be a Date');

    /* Ensure spec is a string */
    if (typeof spec !== 'string') throw new TypeError('format: spec must be a non-empty string');

    let formatted_string = spec;

    /**
     * Replacement of escaped characters
     * eg w/ 7 February 2021: '[year]YYYY [Q]Q [M]M [D]D' -> '$R0$YYYY $R0$Q $R1$M $R2$D' -> 2021 Q1 M2 D7
     */
    const escaped_acc:[string, string][] = [];
    formatted_string = formatted_string.replace(EscapeRgx, match => {
        const escape_token = `$R${escaped_acc.length}$`;
        escaped_acc.push([escape_token, match]);
        return escape_token;
    });

    /* Run format functons for found tokens*/
    let cursor;
    for (let i = 0; i < Tokens.length; i++) {
        cursor = Tokens[i];
        formatted_string = formatted_string.replace(cursor[0], cursor[1](val, locale));
    }

    /* Re-insert escaped tokens */
    for (const escape_token of escaped_acc) {
        formatted_string = formatted_string.replace(escape_token[0], escape_token[1]);
    }

    return formatted_string;
}
