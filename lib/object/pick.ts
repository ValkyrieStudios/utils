import {deepGet} from '../deep/get';
import {type DottedKeys} from './types';

type ObjectType = { [key: string]: any };

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
        !Array.isArray(keys)
    ) throw new TypeError('Please pass an object to pick from and a keys array');

    const map: any = {};
    let val;
    for (let i = 0; i < keys.length; i++) {
        const key:string = keys[i];
        if (typeof key !== 'string' || !key) continue;

        if (key.indexOf('.') >= 0) {
            val = deepGet(obj, key);
            if (val === undefined) continue;
            const parts = key.split('.');
            const parts_len = parts.length;
            let cursor = map;
            for (let y = 0; y < parts_len - 1; y++) {
                const part = parts[y];
                if (!(part in cursor)) cursor[part] = {};
                cursor = cursor[part];
            }
            cursor[parts[parts_len - 1]] = val;
        } else if (key in obj) {
            map[key] = obj[key];
        }
    }
    return map as UnionToIntersection<PickFromObject<T, K[number]>>;
}

export {pick, pick as default};
