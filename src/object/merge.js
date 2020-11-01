'use strict';

import isArray  from '../array/is';
import isObject from './is';

const merge = (target = {}, obj = {}) => {
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
};


export default merge;
