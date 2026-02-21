/* eslint-disable max-statements */
/* eslint-disable complexity */

import {isDateFormat} from '../date/isFormat';
import {FORBIDDEN_KEYS} from '../string/forbiddenKeys';

type ToObjectConfig = {
    /**
     * Pass array of keys that should not be normalized into number/bool when seen
     */
    raw?: string[] | boolean;
    /**
     * Pass array of keys that should only have a single value (e.g., 'action')
     */
    single?: string[];
    /**
     * Whether or not we should normalize booleans, defaults to true if not set
     */
    normalize_bool?: boolean;
    /**
     * Whether or not we should normalize null, defaults to true if not set
     */
    normalize_null?: boolean;
    /**
     * Whether or not we should normalize dates, defaults to true if not set
     */
    normalize_date?: boolean;
    /**
     * Whether or not we should normalize numbers, defaults to true if not set
     */
    normalize_number?: boolean;
}

function assign (
    acc: Record<string, unknown>,
    rawkey: string,
    value: unknown,
    single: Set<string> | null
): void {
    /*
     * Most form keys are flat (e.g., "name", "email").
     * Checking for delimiters is much faster than running the parser.
     */
    if (rawkey.indexOf('.') === -1 && rawkey.indexOf('[') === -1) {
        // Prototype pollution guard for flat keys
        if (FORBIDDEN_KEYS.has(rawkey)) return;

        if (single?.has(rawkey)) {
            acc[rawkey] = value;
            return;
        }

        const existing = acc[rawkey];
        if (existing === undefined) {
            acc[rawkey] = value;
        } else if (Array.isArray(existing)) {
            existing.push(value);
        } else {
            acc[rawkey] = [existing, value];
        }
        return;
    }

    // Manual Tokenizer
    const keys: string[] = [];
    let start = 0;
    const len = rawkey.length;

    for (let i = 0; i < len; i++) {
        const code = rawkey.charCodeAt(i);
        // Delimiters: . (46), [ (91), ] (93)
        if (code === 46 || code === 91 || code === 93) {
            if (i > start) keys.push(rawkey.substring(start, i));
            start = i + 1;
        }
    }
    if (start < len) keys.push(rawkey.substring(start));

    // Traversal Logic
    let cursor: any = acc;
    const keys_len = keys.length;

    for (let i = 0; i < keys_len; i++) {
        const key = keys[i];

        // Prototype pollution guard for nested keys
        if (FORBIDDEN_KEYS.has(key)) return;

        const isLast = i === keys_len - 1;
        const cursorKey = Array.isArray(cursor) ? +key : key;

        /*
         * If we are deep in an object, we must ensure we don't access prototype props
         * We use simple undefined check because we are creating the structure ourselves
         */
        if (isLast) {
            if (cursor[cursorKey] === undefined || (single && single.has(key))) {
                cursor[cursorKey] = value;
            } else {
                const existing = cursor[cursorKey];
                if (Array.isArray(existing)) {
                    existing.push(value);
                } else {
                    cursor[cursorKey] = [existing, value];
                }
            }
        } else {
            // We need to go deeper, create array if next key is number, otherwise object
            if (cursor[cursorKey] === undefined) {
                cursor[cursorKey] = isNaN(+keys[i + 1]) ? {} : [];
            }
            cursor = cursor[cursorKey];
        }
    }
}

/**
 * Converts a FormData instance to a json object
 * Eg:
 *  const form = new FormData();
 *  form.append('name', 'Alice');
 *  form.append('hobbies', 'reading');
 *  form.append('hobbies', 'writing');
 *  form.append('emptyField', '');
 *  toObject(form);
 *
 *  {name: 'Alice', hobbies: ['reading', 'writing'], emptyField: ''}
 *
 * @param {FormData} val - FormData instance to convert to an object
 * @param {ToObjectConfig?} config - Config for conversion
 */
function toObject<T extends Record<string, unknown>> (form: FormData, config?: ToObjectConfig): T {
    if (!(form instanceof FormData)) throw new Error('formdata/toObject: Value is not an instance of FormData');

    const acc: Record<string, unknown> = {};
    const single = Array.isArray(config?.single) ? new Set(config!.single) : null;

    // If raw is true, we skip ALL normalization logic
    if (config?.raw === true) {
        /* @ts-expect-error Node 20+ iterator support */
        for (const [key, value] of form) {
            assign(acc, key, value, single);
        }
        return acc as T;
    }

    const rawConfig = config?.raw;
    const set = rawConfig ? new Set(Array.isArray(rawConfig) ? rawConfig : []) : null;
    const hasSet = set !== null && set.size > 0;

    const nBool = config?.normalize_bool !== false;
    const nNull = config?.normalize_null !== false;
    const nDate = config?.normalize_date !== false;
    const nNumber = config?.normalize_number !== false;

    /* @ts-expect-error Node 20+ iterator support */
    for (const [key, value] of form) {
        // 1. Skip normalization for specific keys in 'raw' array
        if (hasSet && set!.has(key)) {
            assign(acc, key, value, single);
            continue;
        }

        // 2. String Normalization
        if (typeof value === 'string') {
            const len = value.length;

            // Fail fast on empty strings
            if (len === 0) {
                assign(acc, key, value, single);
                continue;
            }

            // Bool / Null Normalization (length checks prevent string comparisons on long strings)
            if (len === 4) {
                if (nBool && (value === 'true' || value === 'TRUE' || value === 'True')) {
                    assign(acc, key, true, single);
                    continue;
                }
                if (nNull && (value === 'null' || value === 'NULL' || value === 'Null')) {
                    assign(acc, key, null, single);
                    continue;
                }
            } else if (len === 5) {
                if (nBool && (value === 'false' || value === 'FALSE' || value === 'False')) {
                    assign(acc, key, false, single);
                    continue;
                }
            }

            // Number Normalization
            if (nNumber && value.charCodeAt(0) !== 48) { // 48 is '0'
                const nVal = +value;
                if (nVal === nVal) { /// nVal === nVal is the fastest isNaN check
                    assign(acc, key, nVal, single);
                    continue;
                }
            }

            // Date Normalization
            if (nDate && len >= 10 &&
                value.charCodeAt(4) === 45 && // '-'
                value.charCodeAt(7) === 45 && // '-'
                isDateFormat(value, 'ISO')) {
                assign(acc, key, new Date(value), single);
                continue;
            }
        }

        // Default
        assign(acc, key, value, single);
    }

    return acc as T;
}

export {toObject, toObject as default};
