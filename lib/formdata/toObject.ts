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
const RGX_DIGIT = /^\d+$/;

function assignValue (acc: Record<string, unknown>, rawkey: string, value: unknown, single:Set<string>): void {
    let cursor: Record<string, unknown> | unknown[] = acc;
    const keys = rawkey.replace(RGX_CLOSE, '').split(/\[|\./);
    const keys_len = keys.length;
    for (let i = 0; i < keys_len; i++) {
        const key:string = keys[i];

        /* If more values */
        if (i < (keys_len - 1)) {
            const n_key: string | number = Array.isArray(cursor) ? Number(key) : key;

            /* Create array or object only if it doesn't exist */
            if (!cursor[n_key]) {
                cursor[n_key] = RGX_DIGIT.test(keys[i + 1]) ? [] : {};
            }

            cursor = cursor[n_key] as Record<string, unknown>;
        } else if (!(key in cursor) || single.has(key)) {
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
    const single = new Set(Array.isArray(config?.single) ? config!.single : []);
    const nBool = config?.normalize_bool !== false;
    const nDate = config?.normalize_date !== false;
    const nNumber = config?.normalize_number !== false;

    const acc:Record<string, unknown> = {};
    form.forEach((value, key) => {
        if (set !== true && typeof value === 'string' && value !== '' && !set.has(key)) {
            /* Bool normalization */
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

            /* Number normalization */
            if (nNumber) {
                const nVal = Number(value);
                if (!isNaN(nVal)) {
                    assignValue(acc, key, nVal, single);
                    return;
                }
            }

            /* Date normalization */
            if (nDate && isDateFormat(value, 'ISO')) {
                assignValue(acc, key, new Date(value), single);
                return;
            }
        }

        assignValue(acc, key, value, single);
    });
    return acc as T;
}

export {toObject, toObject as default};
