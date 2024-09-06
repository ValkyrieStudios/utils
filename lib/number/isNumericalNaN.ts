/**
 * Check whether or not the provided value is a numerical NaN
 *
 * @param {unknown} val - Value to verify
 */
function isNumericalNaN (val:unknown):boolean {
    return Number.isNaN(val) || val === Infinity;
}

export {isNumericalNaN, isNumericalNaN as default};
