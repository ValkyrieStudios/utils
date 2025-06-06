import {type DottedKeysWithArray} from './types';

function wildcardProp (target:any, source:any, prop:string, repl:string):void {
    if (Array.isArray(target)) {
        for (let i = 0; i < target.length; i++) {
            const t = target[i];
            const s = source[i];
            if (Object.prototype.toString.call(t) === '[object Object]') {
                if (t === s) target[i] = {...t};
                wildcardProp(target[i], s, prop, repl);
            }
        }
    } else if (Object.prototype.toString.call(target) === '[object Object]') {
        for (const key in target) {
            if (key === prop && key in source) {
                target[key] = repl;
            } else {
                const val = target[key];
                const s_val = source?.[key];
                if (Object.prototype.toString.call(val) === '[object Object]' || Array.isArray(val)) {
                    if (val === s_val) {
                        target[key] = Array.isArray(val) ? [...val] : {...val};
                    }
                    wildcardProp(target[key], s_val, prop, repl);
                }
            }
        }
    }
}

function standardProp (target:any, source:any, path:string[], repl:string):void {
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
                    standardProp(clone, src_item, path.slice(i + 1), repl);
                    return clone;
                }
                return item;
            });
            return;
        } else if (Object.prototype.toString.call(val) === '[object Object]') {
            if (val === src_val) {
                target[key] = {...val};
            }
            target = target[key];
            source = src_val;
        } else {
            return;
        }
    }

    if (target && path[last] in source) target[path[last]] = repl;
}

/**
 * Returns a new object with the provided keys obfuscated
 * Supports:
 * - scrambling keys in nested arrays
 * - scrambling wildcard patterns: '*.password'
 * - scrambling standard keys
 *
 * @param {Record<string, any>} obj - Object to omit from
 * @param {string[]} keys - Array of keys to omit from object
 */
function scramble<
    T extends Record<string, any>,
    K extends readonly (DottedKeysWithArray<T> | `*.${string}`)[]
> (
    obj:T,
    keys:K,
    options?:{replacement?:string}
):T {
    if (
        Object.prototype.toString.call(obj) !== '[object Object]' ||
        !Array.isArray(keys)
    ) throw new TypeError('Please pass an object to scramble and a keys array');

    const repl = typeof options?.replacement === 'string' ? options.replacement : '***';

    const result:Record<string, any> = {...obj};
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        if (typeof key === 'string') {
            if (key.length > 2 && key[0] === '*' && key[1] === '.') {
                wildcardProp(result, obj, key.slice(2), repl);
            } else {
                standardProp(result, obj, key.split('.'), repl);
            }
        }
    }

    return result as T;
}

export {scramble, scramble as default};
