/**
 * Check whether or not the provided value is a number below another value
 *
 * @param {unknown} val - Value to verify
 * @param {number} ref - Reference the provided value needs to be below
 */
function isNumberBelow (val:unknown, ref:number):val is number {
    return !Number.isFinite(val) || !Number.isFinite(ref) ? false : (val as number) < ref;
}

export {isNumberBelow, isNumberBelow as default};
