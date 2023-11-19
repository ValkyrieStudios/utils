'use strict';

import isObject from './is.js';

const merge = (target = {}, obj = {}) => {
    if (!isObject(target)) throw new TypeError('Please pass an object to merge');

    return Object.keys(target).reduce((acc, key) => {
        if (isObject(target[key]) && !Array.isArray(target[key])) {
            acc[key] = merge(target[key], obj[key] || {});
        } else {
            acc[key] = obj.hasOwnProperty(key)
                ? obj[key]
                : target[key];
        }
        return acc;
    }, {});
};


export default merge;
