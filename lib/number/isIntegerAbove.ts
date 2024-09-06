/**
 * Check whether or not the provided value is an integer above another value
 *
 * @param {unknown} val - Value to verify
 * @param {number} ref - Reference the provided value needs to be above
 */
function isIntegerAbove (val:unknown, ref:number):val is number {
    return !Number.isInteger(val) || !Number.isFinite(ref) ? false : (val as number) > ref;
}

export {isIntegerAbove, isIntegerAbove as default};
