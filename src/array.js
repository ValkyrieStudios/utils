'use strict';

import {fnv1A} from './hash';

export function isArray (val) {
    return Array.isArray(val);
}

export function dedupe (val = []) {
    const seen = {};
    return val.filter((item) => {
        const hash = fnv1A(item);
        return (Object.prototype.hasOwnProperty.call(seen, hash)) ? false : (seen[hash] = true);
    });
}
