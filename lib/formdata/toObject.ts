type toObjectConfig = {
    /**
     * Pass array of keys that should not be normalized into number/bool when seen
     */
    raw?: string[];

    /**
     * Pass array of keys that should only have a single value (e.g., 'action')
     */
    single?: string[];
}

const RGX_CLOSE = /\]/g;

function assignValue (acc: Record<string, unknown>, rawkey: string, value: unknown, single:Set<string>|null): void {
    let cursor: Record<string, unknown> | unknown[] = acc;
    const keys = rawkey.replace(RGX_CLOSE, '').split(/\[|\./);

    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];

        /* If this is the last key, assign the value */
        if (i === keys.length - 1) {
            if (cursor[key] !== undefined && (!single || !single.has(key))) {
                /* If the key already exists, convert it into an array if it isn’t already */
                if (Array.isArray(cursor[key])) {
                    (cursor[key] as Array<unknown>).push(value);
                } else {
                    cursor[key] = [cursor[key], value];
                }
            } else {
                cursor[key] = value;
            }
            return;
        }

        /* Move the cursor deeper */
        if (Array.isArray(cursor)) {
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
 * @param {}
 */
function toObject <T extends Record<string, unknown>> (form:FormData, config?:toObjectConfig):T {
    if (!(form instanceof FormData)) throw new Error('formdata/toObject: Value is not an instance of FormData');

    const set = new Set(Array.isArray(config?.raw) ? config.raw : []);
    const single = Array.isArray(config?.single) && config?.single.length ? new Set(config.single) : null;

    const acc:Record<string, unknown> = {};
    form.forEach((value, key) => {
        let normalizedValue = value;

        /* Handle string to boolean/number conversion */
        if (typeof value === 'string' && !set.has(key)) {
            const lower = value.toLowerCase();
            normalizedValue = (lower === 'true'
                ? true
                : lower === 'false'
                    ? false
                    : !isNaN(Number(value)) && (value as string).trim() !== ''
                        ? Number(value)
                        : value) as FormDataEntryValue;
        }

        assignValue(acc, key, normalizedValue, single);
    });
    return acc as T;
}

export {toObject, toObject as default};
