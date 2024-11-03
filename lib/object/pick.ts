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

type PickFromObject<T, K extends string> = K extends `${infer Key}.${infer Rest}`
  ? Key extends keyof T
    ? T[Key] extends ObjectType
      ? { [P in Key]: PickFromObject<T[Key], Rest> }
      : object
    : object
  : K extends keyof T
  ? { [P in K]: T[K] }
  : object;

type UnionToIntersection<U> =
  (U extends any ? (k: U) => void : object) extends (k: infer I) => void ? I : object;

/**
 * Returns a new object with the keys picked from the passed object
 *
 * @param {Record<string, any>} obj - Object to pick from
 * @param {string[]} keys - Array of keys to pick from object
 */
function pick<T extends Record<string, any>, K extends readonly DottedKeys<T>[]> (
    obj: T,
    keys: K
): UnionToIntersection<PickFromObject<T, K[number]>> {
    if (
        Object.prototype.toString.call(obj) !== '[object Object]' ||
        !Array.isArray(keys) ||
        !keys.length
    ) throw new TypeError('Please pass an object to pick from and a keys array');

    const map: any = {};
    let val;
    let sanitized;
    for (let i = 0; i < keys.length; i++) {
        const key:string = keys[i];
        if (typeof key !== 'string') continue;

        sanitized = key.trim();
        if (!sanitized) continue;

        if (sanitized.indexOf('.') >= 0) {
            val = deepGet(obj, sanitized);
            if (val === undefined) continue;
            const parts = sanitized.split('.');
            const parts_len = parts.length;
            let cursor = map;
            for (let y = 0; y < parts_len - 1; y++) {
                const part = parts[y].trim();
                if (!(part in cursor)) cursor[part] = {};
                cursor = cursor[part];
            }
            cursor[parts[parts_len - 1].trim()] = val;
        } else if (sanitized in obj) {
            map[sanitized] = obj[sanitized];
        }
    }
    return map as UnionToIntersection<PickFromObject<T, K[number]>>;
}

export {pick, pick as default};
