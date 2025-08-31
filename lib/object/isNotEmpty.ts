/**
 * Check whether or not a provided value is an object with content
 *
 * @param {unknown} val - Value to verify
 */
function isNotEmptyObject <T extends Record<string,unknown> = Record<string, unknown>> (val:T|unknown):val is T {
    if (Object.prototype.toString.call(val) !== '[object Object]') return false;
    for (const _ in val as Record<string, unknown>) {
        return true;
    }
    return false;
}

export {isNotEmptyObject, isNotEmptyObject as default};
