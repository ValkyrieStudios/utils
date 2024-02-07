'use strict';

const PROTO_OBJ = '[object Object]';

/**
 * Check whether or not a provided value is an object
 *
 * @param val - Value to verify
 * 
 * @returns Whether or not the value is an object
 */
export default function isObject (val:any):boolean {
    return Object.prototype.toString.call(val) === PROTO_OBJ;
}
