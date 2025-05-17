import LRU from '../caching/LRU';

type Token = [string, string, (val: string, context: Record<string, number>) => boolean];

const SPECIAL_CHARS = /[.*+?^${}()|[\]\\]/g;

const TOKENS: Token[] = [
    ['YYYY', /\d{4}/.source, (raw, context) => {
        context.year = parseInt(raw, 10);
        return context.year > 0;
    }],
    ['MM', /(?:0[1-9]|1[0-2])/.source, (raw, context) => {
        context.month = parseInt(raw, 10);
        return context.month >= 1 && context.month <= 12;
    }],
    ['DD', /(?:0[1-9]|[12][0-9]|3[01])/.source, (raw, context) => {
        context.day = parseInt(raw, 10);
        return context.day >= 1 && context.day <= 31;
    }],
    ['HH', /(?:[01][0-9]|2[0-3])/.source, (raw,context) => {
        context.hour = parseInt(raw, 10);
        return context.hour >= 0 && context.hour <= 23;
    }],
    ['mm', /[0-5][0-9]/.source, () => true],
    ['ss', /[0-5][0-9]/.source, () => true],
    ['SSS', /\d{3}/.source, () => true],
    ['Q', /[1-4]/.source, () => true],
    ['A', /(?:AM|PM)/.source, (raw, context) => {
        context.is12 = 1;
        return raw === 'AM' || raw === 'PM';
    }],
    ['a', /(?:am|pm)/.source, (raw, context) => {
        context.is12 = 1;
        return raw === 'am' || raw === 'pm';
    }],
    ['Z', /Z|[+-](?:0[0-9]|1[0-4]):[0-5][0-9]/.source, raw => {
        if (raw === 'Z') return true;

        let hour = parseInt(raw[1] + raw[2], 10);
        if (raw[0] === '-') hour = -hour;

        const minutes = parseInt(raw[4] + raw[5], 10);

        if (hour === 14 || hour === -12) return minutes === 0;
        return hour >= -11 && hour < 14 && [0, 15, 30, 45].indexOf(minutes) >= 0;
    }],
];

const SPEC_ALIASES:Record<string, string> = {
    ISO: 'YYYY-MM-DDTHH:mm:ss{.SSS}Z',
};

/* Cache for specs that have already been compiled */
const spec_pat_cache = new LRU<string, {rgx:RegExp;tokens:number[]}>({max_size: 100});

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
            const token_idx = TOKENS.findIndex(([token_key]) => spec.startsWith(token_key, cursor));
            if (token_idx >= 0) {
                const [token_key, token_rgx] = TOKENS[token_idx];
                pat += '(' + token_rgx + ')';
                tokens.push(token_idx);
                cursor += token_key.length;
            } else {
                pat += spec[cursor].replace(SPECIAL_CHARS, '\\$&');
                cursor++;
            }
        }
    }

    cached = {rgx: is_chunk ? RegExp(pat) : RegExp('^' + pat + '$'), tokens};
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

    /* Check for alias specs */
    const {tokens,rgx} = compileSpec(SPEC_ALIASES[spec] || spec);
    if (!tokens.length) return false;

    /* Create pattern and check if it matches */
    const patMatch = rgx.exec(input);
    if (!patMatch) return false;

    /* Get matches and check for each match with their token if they're valid, this will append to context */
    const matches = patMatch.slice(1);
    const context: Record<string, number> = {};
    for (let i = 0; i < matches.length; i++) {
        const match = matches[i];
        if (match !== undefined && !TOKENS[tokens[i]][2](match, context)) return false;
    }

    /**
     * If we have enough intel for a 'specific' date, we will verify that it can be correct.
     * eg: '2023-02-29' is not valid as 2023 is not a leap year
     * eg: '2024-04-31' is not valid as there is no 31st day in april
     */
    const {is12,day,month,year} = context;
    if (day && month) {
        const date = new Date(year || 2024, month - 1, day);
        if (date.getDate() !== day || date.getMonth() !== month - 1) return false;
    }

    /* Hour check in AM/PM */
    if (is12 && 'hour' in context && context.hour > 11) return false;

    return true;
}

export {isDateFormat, isDateFormat as default};
