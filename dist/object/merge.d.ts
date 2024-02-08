/**
 * Deep merge two objects together while ensuring nested objects also get merged,
 * take note: this does not merge onto passed objects by reference but instead
 * returns a new object
 *
 * @param target - Base Object
 * @param source - (default={}) Object to merge onto base object
 *
 * @returns Combined target and source objects
 */
declare function merge(target: {
    [key: string]: any;
}, source?: {
    [key: string]: any;
}): {
    [key: string]: any;
};
export default merge;
