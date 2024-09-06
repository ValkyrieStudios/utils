type deepInput = {[key:string]:any}|{[key:string]:any}[]|any[];

type Sealed<T> = {
    [K in keyof T]: Sealed<T[K]>
}

function deep (obj:deepInput) {
    if (Array.isArray(obj)) {
        for (let i = 0; i < obj.length; i++) deep(obj[i]);
    } else {
        for (const key in obj) {
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
 * @param {deepInput} obj - Object to deep seal
 */
function deepSeal <T extends deepInput> (obj:T):Sealed<T> {
    if (
        Object.prototype.toString.call(obj) !== '[object Object]' &&
        !Array.isArray(obj)
    ) throw new TypeError('Only objects/arrays can be sealed');
    return deep(obj) as Sealed<T>;
}

export {deepSeal, deepSeal as default};
