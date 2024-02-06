/**
 * Returns a new object with the keys picked from the passed object
 *
 * @param obj - Object to pick from
 * @param keys - Array of keys to pick from object
 * 
 * @returns Object containing the picked keys from source object
 */
declare function pick(obj:{[key:string]:any}, keys:string[]):{[key:string]:any};
export = pick;
