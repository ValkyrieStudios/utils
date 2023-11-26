'use strict';

import isNotEmptyString from '../string/isNotEmpty.js';
import {PROTO_OBJ}      from '../object/is.js';

//  Get a value from a path in a json-like structure
export default function deepGet (obj, path, get_parent = false) {
    if (
        Object.prototype.toString.call(obj) !== PROTO_OBJ &&
        !Array.isArray(obj)
    ) throw new TypeError('Deepget is only supported for objects');

    //  If no path is provided, do nothing
    if (!isNotEmptyString(path)) throw new TypeError('No path was given');

    //  Cleanup paths : a.b[2].c --> ['a', 'b', '2', 'c'] (faster processing)
    const parts = path.replace('[', '.').replace(']', '').split('.');

    //  Return obj if no parts were passed or if only 1 part and get_parent is true
    if (parts.length === 0 || (parts.length === 1 && get_parent)) return obj;

    //  Cut last part if get_parent
    if (get_parent) parts.pop();

    let cursor = obj;
    while (parts.length > 0) {
        if (Array.isArray(cursor)) {
            const ix = parseInt(parts.shift());
            if (!Number.isInteger(ix) || ix < 0 || ix > (cursor.length - 1)) return undefined;
            cursor = cursor[ix];
        } else {
            const key = parts.shift();
            if (!cursor.hasOwnProperty(key)) return undefined;
            cursor = cursor[key];
        }

        //  If we have more parts and cursor is not an array or object -> immediately return undefined
        if (
            (!Array.isArray(cursor) && Object.prototype.toString.call(cursor) !== PROTO_OBJ) &&
            parts.length > 0
        ) return undefined;
    }

    //  Certain values will negate the ternary, hence we do extra checks here
    //  to make sure none of them comes back as undefined
    return cursor;
}
