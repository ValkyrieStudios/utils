import {round} from './round';

/**
 * Converts a number into a percentage respective to a provided range
 *
 * @param val - Value to convert into a percentage for the provided range
 * @param precision - (default=0) Amount of decimals precision to use
 * @param min - (default=0) Lower bound of the range the value is to be converted to percentage for
 * @param max - (default=1) Upper bound of the range the value is to be converted to percentage for
 *
 * @returns Percentage value respective to the provided range
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
