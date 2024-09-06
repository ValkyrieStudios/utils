const ROUND_EPSILON = 1 + Number.EPSILON;

/**
 * Rounds the provided value to a certain precision
 *
 * @param {number} val - Value to round
 * @param {number} precision - (default=0) Amount of decimals precision to round to
 */
function round (val:number, precision:number = 0):number {
    if (!Number.isFinite(val)) throw new TypeError('Value should be numeric');
    if (!Number.isInteger(precision) || precision <= 0) return Math.round(val * ROUND_EPSILON);

    const exp = Math.pow(10,  precision);
    return Math.round((val * exp) * ROUND_EPSILON)/exp;
}

export {round, round as default};
