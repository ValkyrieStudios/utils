/**
 * Check whether or not a provided value is a string with content
 *
 * @param val - Value to verify
 * @param trimmed  - (default=true) Trim the string or not
 * 
 * @returns Whether or not the value is a string with content
 */
declare function isNotEmptyString(val:any, trimmed?:boolean):boolean;
export = isNotEmptyString;
