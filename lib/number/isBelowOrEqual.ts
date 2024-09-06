/**
 * Check whether or not the provided value is a number below or
 * equal to another value
 *
 * @param {unknown} val - Value to verify
 * @param {number} ref - Reference the provided value needs to be below or equal to
 */
function isNumberBelowOrEqual (val:unknown, ref:number):val is number {
    return !Number.isFinite(val) || !Number.isFinite(ref) ? false : (val as number) <= ref;
}

export {isNumberBelowOrEqual, isNumberBelowOrEqual as default};
