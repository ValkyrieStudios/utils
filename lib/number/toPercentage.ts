import {round} from './round';

/**
 * Converts a number into a percentage respective to a provided range
 *
 * @param {number} val - Value to convert into a percentage for the provided range
 * @param {number} precision - (default=0) Amount of decimals precision to use
 * @param {number} min - (default=0) Lower bound of the range the value is to be converted to percentage for
 * @param {number} max - (default=1) Upper bound of the range the value is to be converted to percentage for
 */
function toPercentage (
    val:number,
    precision:number = 0,
    min:number = 0,
    max:number = 1
):number {
    if (
        !Number.isFinite(val) ||
        !Number.isFinite(min) ||
        !Number.isFinite(max)
    ) throw new TypeError('value/min/max should be numeric');

    return round(((val - min)/ (max - min)) * 100, precision);
}

export {toPercentage, toPercentage as default};
