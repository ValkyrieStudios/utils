/**
 * Check whether or not a provided value is an object with content
 *
 * @param {unknown} val - Value to verify
 */
function isNotEmptyObject (val:unknown):val is Record<string, any> {
    if (Object.prototype.toString.call(val) !== '[object Object]') return false;
    for (const _ in val as Record<string, any>) {
        return true;
    }
    return false;
}

export {isNotEmptyObject, isNotEmptyObject as default};
