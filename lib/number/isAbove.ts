/**
 * Check whether or not the provided value is a number above another value
 *
 * @param val - Value to verify
 * @param ref - Reference the provided value needs to be above
 *
 * @returns Whether or not the value is above the reference
 */
function isNumberAbove (val:unknown, ref:number):val is number {
    return !Number.isFinite(val) || !Number.isFinite(ref) ? false : (val as number) > ref;
}

export {isNumberAbove, isNumberAbove as default};
