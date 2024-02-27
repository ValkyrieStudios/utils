'use strict';

type deepInput = {[key:string]:any}|{[key:string]:any}[]|any[];

type Sealed<T> = {
    [K in keyof T]: Sealed<T[K]>
}

function deep (obj:deepInput) {
    if (Array.isArray(obj)) {
        for (const el of obj) deep(el);
    } else {
        for (const key of Object.keys(obj)) {
            if (
                Object.prototype.toString.call(obj[key]) === '[object Object]' ||
                Array.isArray(obj[key])
            ) deep(obj[key]);
        }
    }
    return Object.seal(obj);
}

/**
 * Recursively seals all properties of an object
 *
 * @param obj - Object to deep seal
 *
 * @returns Deeply sealed object
 */
export default function deepSeal <T extends deepInput> (obj:T):Sealed<T> {
    if (
        Object.prototype.toString.call(obj) !== '[object Object]' &&
        !Array.isArray(obj)
    ) throw new TypeError('Only objects/arrays can be sealed');
    return deep(obj) as Sealed<T>;
}
