'use strict';

/**
 * Check whether or not a provided value is an object with content
 *
 * @param val - Value to verify
 *
 * @returns Whether or not the value is an object with content
 */
function isNotEmptyObject (val:unknown):val is {[key:string]:any} {
    return Object.prototype.toString.call(val) === '[object Object]' && Object.keys(val).length > 0;
}

export {isNotEmptyObject, isNotEmptyObject as default};
