/**
 * Check whether or not a provided value is an object
 *
 * @param {unknown} val - Value to verify
 */
function isObject (val:unknown):val is {[key:string]:any} {
    return Object.prototype.toString.call(val) === '[object Object]';
}

export {isObject, isObject as default};
