/* eslint-disable complexity */

import {isDateFormat} from '../date/isFormat';

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

const RGX_TOKENS = /[^.[\]]+/g;

function assign (
    acc: Record<string, unknown>,
    rawkey: string,
    value: unknown,
    single:Set<string>|null
): void {
    let cursor: Record<string, unknown> | unknown[] = acc;

    const keys = rawkey.match(RGX_TOKENS);
    const keys_len = keys!.length;
    for (let i = 0; i < keys_len; i++) {
        const key:string = keys![i];
        switch (key) {
            case '__proto__':
            case 'constructor':
            case 'prototype':
                return;
            default: {
                /* If more values */
                if (i < (keys_len - 1)) {
                    const n_key:string|number = Array.isArray(cursor) ? Number(key) : key;

                    /* Create array or object only if it doesn't exist */
                    if (!cursor[n_key]) cursor[n_key] = isNaN(Number(keys![i + 1])) ? {} : [];

                    cursor = cursor[n_key] as Record<string, unknown>;
                } else if (!(key in cursor) || (single && single.has(key))) {
                    (cursor as Record<string, unknown>)[key] = value;
                } else {
                    const cursor_val = (cursor as Record<string, unknown>)[key];
                    if (Array.isArray(cursor_val)) {
                        cursor_val.push(value);
                    } else {
                        (cursor as Record<string, unknown>)[key] = [cursor_val, value];
                    }
                }
            }
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
function toObject <T extends Record<string, unknown>> (form:FormData, config?:ToObjectConfig):T {
    if (!(form instanceof FormData)) throw new Error('formdata/toObject: Value is not an instance of FormData');

    const set:Set<string>|null = config?.raw === true ? null : new Set(Array.isArray(config?.raw) ? config?.raw : []);
    const set_guard:boolean = !!(set && set.size > 0);
    const single = Array.isArray(config?.single) ? new Set(config!.single) : null;
    const nBool = config?.normalize_bool !== false;
    const nNull = config?.normalize_null !== false;
    const nDate = config?.normalize_date !== false;
    const nNumber = config?.normalize_number !== false;

    const acc:Record<string, unknown> = {};
    if (set === null) {
        /* @ts-expect-error We're targeting node 20+ usage */
        for (const [key, value] of form) {
            assign(acc, key, value, single);
        }
        return acc as T;
    }

    /* @ts-expect-error We're targeting node 20+ usage */
    for (const [key, value] of form) {
        if (set_guard && set!.has(key)) {
            assign(acc, key, value, single);
            continue;
        }

        switch (value) {
            /* Bool true normalization */
            case 'true':
            case 'TRUE':
            case 'True':
                assign(acc, key, nBool ? true : value, single);
                continue;
            /* Bool false normalization */
            case 'false':
            case 'FALSE':
            case 'False':
                assign(acc, key, nBool ? false : value, single);
                continue;
            /* Null normalization */
            case 'null':
            case 'NULL':
            case 'Null':
                assign(acc, key, nNull ? null : value, single);
                continue;
            default: {
                if (typeof value === 'string' && value) {
                    /* Number normalization */
                    if (nNumber && value[0] !== '0') {
                        const nVal = Number(value);
                        if (!isNaN(nVal)) {
                            assign(acc, key, nVal, single);
                            continue;
                        }
                    }

                    /* Date normalization */
                    if (nDate && value[4] === '-' && value[7] === '-' && value[10] === 'T' && isDateFormat(value, 'ISO')) {
                        assign(acc, key, new Date(value), single);
                        continue;
                    }
                }
                assign(acc, key, value, single);
            }
        }
    }
    return acc as T;
}

export {toObject, toObject as default};
