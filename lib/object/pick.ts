import {deepGet} from '../deep/get';

type ObjectType = { [key: string]: any };

type DottedKeys<T> = (
  T extends ObjectType
    ? {
        [K in keyof T & string]: T[K] extends ObjectType
          ? K | `${K}.${DottedKeys<T[K]>}`
          : K;
      }[keyof T & string]
    : string
) & string;

/**
 * Returns a new object with the keys picked from the passed object
 *
 * @param obj - Object to pick from
 * @param keys - Array of keys to pick from object
 *
 * @returns Object containing the picked keys from source object
 */
function pick <T extends Record<string, any>, K extends DottedKeys<T>> (
    obj:T,
    keys:K[]
):{[key:string]:any} {
    if (
        Object.prototype.toString.call(obj) !== '[object Object]' ||
    !Array.isArray(keys) ||
    !keys.length
    ) throw new TypeError('Please pass an object to pick from and a keys array');

    const map:{[key:string]:any} = {};
    let val;
    let sanitized;
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        if (typeof key !== 'string') continue;

        sanitized = key.trim();
        if (!sanitized.length) continue;

        if (sanitized.includes('.')) {
            val = deepGet(obj, sanitized);
            if (val === undefined) continue;
            const parts = key.split('.');
            const parts_len = parts.length;
            let cursor = map;
            for (let y = 0; y < parts_len - 1; y++) {
                const part = parts[y].trim();
                if (!cursor[part]) {
                    cursor[part] = {};
                }
                cursor = cursor[part];
            }
            cursor[parts[parts_len - 1].trim()] = val;
        } else if (obj[sanitized] !== undefined) {
            map[sanitized] = obj[sanitized];
        }
    }
    return map;
}

export {pick, pick as default};
