/**
 * Check whether or not the provided value is a number below another value
 *
 * @param val - Value to verify
 * @param ref - Reference the provided value needs to be below
 *
 * @returns Whether or not the value is below the reference
 */
function isNumberBelow (val:unknown, ref:number):val is number {
    return !Number.isFinite(val) || !Number.isFinite(ref) ? false : (val as number) < ref;
}

export {isNumberBelow, isNumberBelow as default};
