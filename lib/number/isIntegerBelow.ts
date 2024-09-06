/**
 * Check whether or not the provided value is an integer below another value
 *
 * @param {unknown} val - Value to verify
 * @param {number} ref - Reference the provided value needs to be below
 */
function isIntegerBelow (val:unknown, ref:number):val is number {
    return !Number.isInteger(val) || !Number.isFinite(ref) ? false : (val as number) < ref;
}

export {isIntegerBelow, isIntegerBelow as default};
