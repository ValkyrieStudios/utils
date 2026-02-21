/* eslint-disable max-statements */
import LRU from '../caching/LRU';

type Token = [string, string, (val: string) => boolean];

const SPECIAL_CHARS = /[.*+?^${}()|[\]\\]/g;
const CTX = {year: 0, month: 0, day: 0, hour: -1, is12: 0};

const TOKENS: Token[] = [
    ['YYYY', /\d{4}/.source, raw => {
        CTX.year = +raw;
        return CTX.year > 0;
    }],
    ['MM', /(?:0[1-9]|1[0-2])/.source, raw => {
        CTX.month = +raw;
        return CTX.month >= 1 && CTX.month <= 12;
    }],
    ['DD', /(?:0[1-9]|[12][0-9]|3[01])/.source, raw => {
        CTX.day = +raw;
        return CTX.day >= 1 && CTX.day <= 31;
    }],
    ['HH', /(?:[01][0-9]|2[0-3])/.source, raw => {
        CTX.hour = +raw;
        return CTX.hour >= 0 && CTX.hour <= 23;
    }],
    ['mm', /[0-5][0-9]/.source, () => true],
    ['ss', /[0-5][0-9]/.source, () => true],
    ['SSS', /\d{3}/.source, () => true],
    ['Q', /[1-4]/.source, () => true],
    ['A', /(?:AM|PM)/.source, raw => {
        CTX.is12 = 1;
        return raw === 'AM' || raw === 'PM';
    }],
    ['a', /(?:am|pm)/.source, raw => {
        CTX.is12 = 1;
        return raw === 'am' || raw === 'pm';
    }],
    ['Z', /Z|[+-](?:0[0-9]|1[0-4]):[0-5][0-9]/.source, raw => {
        if (raw === 'Z') return true;

        let hour = +(raw[1] + raw[2]);
        if (raw.charCodeAt(0) === 45) hour = -hour; // charCode 45 is '-'

        const minutes = +(raw[4] + raw[5]);

        if (hour === 14 || hour === -12) return minutes === 0;
        return hour >= -11 && hour < 14 && (minutes === 0 || minutes === 15 || minutes === 30 || minutes === 45);
    }],
];

// Pre-sort tokens by length descending so longer tokens match first (e.g. YYYY before YY)
TOKENS.sort((a, b) => b[0].length - a[0].length);

const SPEC_ALIASES:Record<string, string> = {
    ISO: 'YYYY-MM-DDTHH:mm:ss{.SSS}Z',
};

/* Cache for specs that have already been compiled */
const spec_pat_cache = new LRU<{rgx:RegExp;tokens:number[]}>({max_size: 100});

export const MONTHS_LEAP = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

export const MONTHS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function isValidDay (year:number, month:number, day:number):boolean {
    return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)
        ? day <= MONTHS_LEAP[month - 1]
        : day <= MONTHS[month - 1];
}

/**
 * Compiles a spec and stores it on the spec cache
 *
 * @param {string} spec - Spec to compile
 * @param {boolean} is_chunk - Whether or not this is a subchunk
 */
function compileSpec (spec:string, is_chunk:boolean = false) {
    let cached = spec_pat_cache.get(spec);
    if (cached !== undefined) return cached;

    const tokens:number[] = [];
    let pat = '';
    let cursor = 0;
    while (cursor < spec.length) {
        if (spec[cursor] === '[') {
            const end_idx = spec.indexOf(']', cursor);
            if (end_idx === -1) throw new Error('isDateFormat: Unmatched [ in format string');

            pat += spec.slice(cursor + 1, end_idx).replace(SPECIAL_CHARS, '\\$&');
            cursor = end_idx + 1;
        } else if (spec[cursor] === '{') {
            /* Handle optional parts indicated by { and } */
            const end_idx = spec.indexOf('}', cursor);
            if (end_idx === -1) throw new Error('isDateFormat: Unmatched { in format string');

            /* Compile chunk between brackets */
            const compiled = compileSpec(spec.slice(cursor + 1, end_idx), true);

            /* Wrap the optional part in a non-capturing group with "?" for optionality */
            pat += '(?:' + compiled.rgx.source + ')?';

            /* Append tokens for optional part (optional tokens are still validated if present) */
            tokens.push(...compiled.tokens);

            cursor = end_idx + 1;
        } else {
            let matched = false;
            for (let i = 0; i < TOKENS.length; i++) {
                const [token_key, token_rgx] = TOKENS[i];
                if (spec.startsWith(token_key, cursor)) {
                    pat += '(' + token_rgx + ')';
                    tokens.push(i);
                    cursor += token_key.length;
                    matched = true;
                    break;
                }
            }
            if (!matched) {
                pat += spec[cursor].replace(SPECIAL_CHARS, '\\$&');
                cursor++;
            }
        }
    }

    cached = {rgx: is_chunk ? new RegExp(pat) : new RegExp('^' + pat + '$'), tokens};
    spec_pat_cache.set(spec, cached);
    return cached;
}

/**
 * Checks if a given string is in a particular format
 * Eg:
 *  isDateFormat('2024-02-09', 'YYYY-MM-DD'); // true
 *  isDateFormat('2024-02-09T14:30', 'YYYY-MM-DD'); // false
 *
 * @param {unknown} input - String to format (eg: '2024-08-01')
 * @param {string} spec - Spec to validate (Eg: 'YYYY-MM-DD')
 */
function isDateFormat (input: unknown, spec: string): input is string {
    if (typeof input !== 'string') return false;
    if (typeof spec !== 'string') throw new TypeError('isDateFormat: spec must be a string');

    const compiled = compileSpec(SPEC_ALIASES[spec] || spec);
    if (!compiled.tokens.length) return false;

    const patMatch = compiled.rgx.exec(input);
    if (!patMatch) return false;

    // Reset our module-level flat context object instead of allocating memory
    CTX.year = 0;
    CTX.month = 0;
    CTX.day = 0;
    CTX.hour = -1;
    CTX.is12 = 0;

    const {tokens} = compiled;
    for (let i = 0; i < tokens.length; i++) {
        const match = patMatch[i + 1];
        if (match !== undefined && !TOKENS[tokens[i]][2](match)) return false;
    }

    /**
     * If we have enough intel for a 'specific' date, we will verify that it can be correct.
     * eg: '2023-02-29' is not valid as 2023 is not a leap year
     * eg: '2024-04-31' is not valid as there is no 31st day in april
     */
    if (CTX.day > 0 && CTX.month > 0 && !isValidDay(CTX.year || 2024, CTX.month, CTX.day)) return false;

    /* Hour check in AM/PM */
    if (CTX.is12 === 1 && CTX.hour > 11) return false;

    return true;
}

export {isDateFormat, isDateFormat as default};
