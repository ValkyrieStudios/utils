/**
 * Deep merge two objects together while ensuring nested objects also get merged,
 * take note: this does not merge onto passed objects and returns a new object
 *
 * @param target - Base Object
 * @param source - (default={}) Object to merge onto base object
 * @returns Combined target and source objects
 */
declare function merge(val:{[key:string]:any}, source?:{[key:string]:any}):{[key:string]:any};
export = merge;
