import {isDateFormat} from '../date/isFormat';

type ToObjectConfig = {
    /**
     * Pass array of keys that should not be normalized into number/bool when seen
     */
    raw?: string[] | true;
    /**
     * Pass array of keys that should only have a single value (e.g., 'action')
     */
    single?: string[];
    /**
     * Whether or not we should normalize booleans, defaults to true if not set
     */
    normalize_bool?: boolean;
    /**
     * Whether or not we should normalize dates, defaults to true if not set
     */
    normalize_date?: boolean;
    /**
     * Whether or not we should normalize numbers, defaults to true if not set
     */
    normalize_number?: boolean;
}

const RGX_CLOSE = /\]/g;

function assignValue (acc: Record<string, unknown>, rawkey: string, value: unknown, single:Set<string>|null): void {
    let cursor: Record<string, unknown> | unknown[] = acc;
    const keys = rawkey.replace(RGX_CLOSE, '').split(/\[|\./);

    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];

        /* If this is the last key, assign the value */
        if (i === keys.length - 1) {
            const cursor_val = cursor[key];
            if (cursor_val !== undefined && (!single || !single.has(key))) {
                /* If the key already exists, convert it into an array if it isn’t already */
                if (Array.isArray(cursor_val)) {
                    (cursor[key] as Array<unknown>).push(value);
                } else {
                    cursor[key] = [cursor_val, value];
                }
            } else {
                cursor[key] = value;
            }
        } else if (Array.isArray(cursor)) {
            const index = Number(key);
            if (!cursor[index]) cursor[index] = isNaN(Number(keys[i + 1])) ? {} : [];
            cursor = cursor[index] as Record<string, unknown> | unknown[];
        } else {
            if (!cursor[key]) cursor[key] = isNaN(Number(keys[i + 1])) ? {} : [];
            cursor = cursor[key] as Record<string, unknown> | unknown[];
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

    const set:Set<string>|true = config?.raw === true ? true : new Set(Array.isArray(config?.raw) ? config?.raw : []);
    const single = Array.isArray(config?.single) && config?.single.length ? new Set(config.single) : null;
    const nBool = config?.normalize_bool !== false;
    const nDate = config?.normalize_date !== false;
    const nNumber = config?.normalize_number !== false;

    const acc:Record<string, unknown> = {};
    form.forEach((value, key) => {
        /* Handle string to boolean/number conversion */
        if (set !== true && typeof value === 'string' && !set.has(key)) {
            if (nBool) {
                const lower = value.toLowerCase();
                if (lower === 'true') {
                    assignValue(acc, key, true, single);
                    return;
                } else if (lower === 'false') {
                    assignValue(acc, key, false, single);
                    return;
                }
            }

            const trimmed = (value as string).trim();
            if (trimmed) {
                if (nNumber && !isNaN(Number(value))) {
                    assignValue(acc, key, Number(value), single);
                    return;
                }

                if (nDate && isDateFormat(value, 'ISO')) {
                    assignValue(acc, key, new Date(value), single);
                    return;
                }
            }
        }

        assignValue(acc, key, value, single);
    });
    return acc as T;
}

export {toObject, toObject as default};
