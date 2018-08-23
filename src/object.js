import {isArray} from './array';
import {deepGet, deepSet} from './deep';
import {noopreturn} from './function.js';

export function isObject (val) {
    return val !== null && Object.prototype.toString.call(val) === "[object Object]";
}

export function pick (obj = {}, keys = []) {
    if (!isObject(obj) || isArray(obj)) {
        throw new TypeError('Please pass an object to pick as the value for obj');
    }

    if (!isArray(keys)) {
        throw new TypeError('Please pass an array as the value for keys');
    }

    return keys.reduce((acc, key) => {
        deepSet(acc, key, deepGet(obj, key) || undefined);
        return acc;
    }, {});
}

export function merge (target = {}, obj = {}) {
    if (!isObject(target) || isArray(target)) {
        throw new TypeError('Please pass an object to merge');
    }

    return Object.keys(target).reduce((acc, key) => {
        if (isObject(target[key]) && !isArray(target[key])) {
            acc[key] = merge(target[key], obj[key] || {});
        } else {
            acc[key] = (obj.hasOwnProperty(key))
                ? obj[key]
                : target[key];
        }
        return acc;
    }, {});
}

export function forValues (obj = {}, cb = noopreturn) {
    if (!isObject(obj) || isArray(obj)) {
        throw new TypeError('Please pass an object to forValues');
    }

    Object.keys(obj).forEach((key, index) => {
        obj[key] = cb(key, obj[key], index);
    });
    return obj;
}

export function zip (keys = [], values = [], default_to = null) {
    if (!isArray(keys)) {
         throw new TypeError('Please pass an array as value for keys');
    }

    if (!isArray(values) && values !== false) {
        throw new TypeError('Please pass an array or false as value for values');
    }

    return keys.reduce((acc, key, index) => {
        acc[key] = values ? (values[index] || default_to) : default_to;
        return acc;
    }, {});
}

export function define (props = {}, obj = {}) {
    if (!isObject(props) || !isObject(obj)) {
        throw new TypeError('Please pass an object as the value for props and obj');
    }

    return Object.defineProperties(obj, props);
}

export function defineFrozen (props = {}, obj = {}) {
    return Object.freeze(define(props, obj));
}

export function defineSealed (props = {}, obj = {}) {
    return Object.seal(define(props, obj));
}
