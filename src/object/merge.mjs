'use strict';

import {PROTO_OBJ} from './is.mjs';

const merge = (target, source = {}) => {
    if (
        Object.prototype.toString.call(target) !== PROTO_OBJ ||
        Object.prototype.toString.call(source) !== PROTO_OBJ
    ) throw new TypeError('Please pass a target and object to merge');

    return Object.keys(target).reduce((acc, key) => {
        if (
            Object.prototype.toString.call(target[key]) === PROTO_OBJ &&
            !Array.isArray(target[key])
        ) {
            acc[key] = merge(target[key], source[key] || {});
        } else {
            acc[key] = Object.prototype.hasOwnProperty.call(source, key)
                ? source[key]
                : target[key];
        }
        return acc;
    }, {});
};


export default merge;
