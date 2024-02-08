'use strict';

/**
 * Deep merge two objects together while ensuring nested objects also get merged,
 * take note: this does not merge onto passed objects by reference but instead
 * returns a new object
 *
 * @param target - Base Object
 * @param source - (default={}) Object to merge onto base object
 *
 * @returns Combined target and source objects
 */
function merge (
    target:{[key:string]:any},
    source:{[key:string]:any} = {}
):{[key:string]:any} {
    if (
        Object.prototype.toString.call(target) !== '[object Object]' ||
        Object.prototype.toString.call(source) !== '[object Object]'
    ) throw new TypeError('Please pass a target and object to merge');

    return Object.keys(target).reduce((acc:{[key:string]:any}, key) => {
        if (
            Object.prototype.toString.call(target[key]) === '[object Object]' &&
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
}

export default merge;
