/**
 * Rounds the provided value to a certain precision
 *
 * @param {number} val - Value to round
 * @param {number} precision - (default=0) Amount of decimals precision to round to
 */
function round (val:number, precision:number = 0):number {
    if (!Number.isFinite(val)) throw new TypeError('Value should be numeric');

    const exp = Math.pow(10, Number.isInteger(precision) && precision > 0 ? precision : 0);
    const num = (val * exp) * (1 + Number.EPSILON);
    return Math.round(num)/exp;
}

export {round, round as default};
