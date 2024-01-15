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
declare function round(val:number, precision?:number, min?:number, max?:number):number;
export = round;
