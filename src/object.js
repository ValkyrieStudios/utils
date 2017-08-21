'use strict';

import {isArray} from './array';

export function isObject (val) {
    const type = typeof val;

    return val !== null && (type === 'object' || type === 'function');
}

export function pick (obj = {}, keys = []) {
    return keys.reduce((acc, key) => {
        acc[key] = obj[key] || undefined;
        return acc;
    }, {});
}

export function merge (target = {}, obj = {}) {
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

export function zip (keys = [], values = []) {
    return keys.reduce((acc, key, index) => {
        acc[key] = values[index] || null;
        return acc;
    }, {});
}

export function define (props, obj = {}) {
    return Object.defineProperties(obj, props);
}

export function defineFrozen (props, obj = {}) {
    return Object.freeze(define(props, obj));
}

export function defineSealed (props, obj = {}) {
    return Object.seal(define(props, obj));
}
