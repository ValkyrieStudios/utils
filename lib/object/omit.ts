import {type DottedKeysWithArray, type ExpandWildcardWithArray} from './types';

type OmitFromObject<T, K extends string> =
    T extends (infer U)[]
        ? OmitFromObject<U, K>[]
        : T extends Record<string, any>
            ? K extends `${infer Key}.${infer Rest}`
                ? Key extends keyof T
                    ? T[Key] extends Record<string, any> | any[]
                        ? {
                            [P in keyof T]: P extends Key
                                ? OmitFromObject<T[Key], Rest>
                                : T[P];
                        }
                        : T
                    : T
                : Omit<T, K>
            : T;

function wildcardProp (target:any, source:any, prop:string):void {
    if (Array.isArray(target)) {
        for (let i = 0; i < target.length; i++) {
            const t = target[i];
            const s = source[i];
            if (typeof t === 'object' && t !== null && typeof s === 'object' && s !== null) {
                if (t === s) target[i] = {...t};
                wildcardProp(target[i], s, prop);
            }
        }
    } else if (Object.prototype.toString.call(target) === '[object Object]') {
        for (const key in target) {
            if (key === prop && key in source) {
                delete target[key];
            } else {
                const val = target[key];
                const s_val = source?.[key];
                if (typeof val === 'object' && typeof s_val === 'object' && val !== null && s_val !== null) {
                    if (val === s_val) {
                        target[key] = Array.isArray(val) ? [...val] : {...val};
                    }
                    wildcardProp(target[key], s_val, prop);
                }
            }
        }
    }
}

function standardProp (target:any, source:any, path:string[]):void {
    const last = path.length - 1;

    for (let i = 0; i < last; i++) {
        const key = path[i];
        const val = target[key];
        const src_val = source?.[key];

        if (Array.isArray(val)) {
            target[key] = val.map((item, idx) => {
                const src_item = src_val[idx];
                if (Object.prototype.toString.call(item) === '[object Object]') {
                    const clone = {...item};
                    standardProp(clone, src_item, path.slice(i + 1));
                    return clone;
                }
                return item;
            });
            return;
        }

        if (Object.prototype.toString.call(val) === '[object Object]') {
            if (val === src_val) {
                target[key] = {...val};
            }
            target = target[key];
            source = src_val;
        } else {
            return;
        }
    }

    if (target && typeof target === 'object' && path[last] in source) {
        delete target[path[last]];
    }
}

/**
 * Returns a new object with the provided keys omitted
 * Supports:
 * - omitting keys in nested arrays
 * - omitting wildcard patterns: '*.password'
 * - omitting standard keys
 *
 * @param {Record<string, any>} obj - Object to omit from
 * @param {string[]} keys - Array of keys to omit from object
 */
function omit<
  T extends Record<string, any>,
  K extends readonly (DottedKeysWithArray<T> | `*.${string}`)[]
> (
    obj:T,
    keys:K
):OmitFromObject<T, ExpandWildcardWithArray<T, K[number]>> {
    if (
        Object.prototype.toString.call(obj) !== '[object Object]' ||
        !Array.isArray(keys)
    ) throw new TypeError('Please pass an object to omit from and a keys array');

    const result:Record<string, any> = {...obj};
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        if (typeof key === 'string') {
            if (key.length > 2 && key[0] === '*' && key[1] === '.') {
                wildcardProp(result, obj, key.slice(2));
            } else {
                standardProp(result, obj, key.split('.'));
            }
        }
    }

    return result as any;
}

export {omit, omit as default};
