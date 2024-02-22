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

    const acc:{[key:string]:any} = {};
    for (const key in target) {
        if (!Object.prototype.hasOwnProperty.call(target, key)) continue;

        if (
            typeof target[key] === 'object' &&
            target[key] !== null &&
            !Array.isArray(target[key]) &&
            Object.prototype.hasOwnProperty.call(source, key) &&
            typeof source[key] === 'object' &&
            source[key] !== null &&
            !Array.isArray(source[key])
        ) {
            acc[key] = merge(target[key], source[key]);
        } else {
            acc[key] = Object.prototype.hasOwnProperty.call(source, key)
                ? source[key]
                : target[key];
        }
    }

    return acc;
}

export default merge;
