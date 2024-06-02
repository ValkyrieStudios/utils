/**
 * Check whether or not a provided value is an object
 *
 * @param val - Value to verify
 *
 * @returns Whether or not the value is an object
 */
function isObject (val:unknown):val is {[key:string]:any} {
    return Object.prototype.toString.call(val) === '[object Object]';
}

export {isObject, isObject as default};
