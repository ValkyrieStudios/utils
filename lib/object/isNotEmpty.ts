/**
 * Check whether or not a provided value is an object with content
 *
 * @param val - Value to verify
 *
 * @returns Whether or not the value is an object with content
 */
function isNotEmptyObject (val:unknown):val is {[key:string]:any} {
    if (Object.prototype.toString.call(val) !== '[object Object]') return false;
    for (const _ in val as {[key:string]:any}) {
        return true;
    }
    return false;
}

export {isNotEmptyObject, isNotEmptyObject as default};
