/**
 * Check whether or not the provided value is a string of length between a min and max
 * inclusive of min and max
 * equal to another value
 *
 * @param val - Value to verify
 * @param min - Lower boundary
 * @param max - Upper boundary
 * @param trimmed  - (default=true) Trim the string or not
 *
 * @returns Whether or not the value is a string of length between min and max inclusive
 */
declare function isStringBetween(val:any, min:number, max:number, trimmed?:boolean):boolean;
export = isStringBetween;
