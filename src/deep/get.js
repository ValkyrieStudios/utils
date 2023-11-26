'use strict';

import isNotEmptyString from '../string/isNotEmpty.js';
import {PROTO_OBJ}      from '../object/is.js';

//  Cleanup paths : a.b[2].c --> ['a', 'b', '2', 'c'] (faster processing)
function interpolatePath (path) {
    if (Array.isArray(path)) return [...path];
    if (isNotEmptyString(path)) return path.replace('[', '.').replace(']', '').split('.');
    throw new TypeError('No Path was given');
}

//  Get a value from a path in a json-like structure
export default function deepGet (obj, path, get_parent = false) {
    if (
        Object.prototype.toString.call(obj) !== PROTO_OBJ &&
        !Array.isArray(obj)
    ) throw new TypeError('Deepget is only supported for objects');

    const parts = interpolatePath(path);

    //  Return obj if no parts were passed or if only 1 part and get_parent is true
    if (parts.length === 0 || (parts.length === 1 && get_parent)) return obj;

    //  Cut last part if get_parent
    if (get_parent) parts.pop();

    let cursor = obj;
    while (parts.length > 0) {
        cursor = Array.isArray(cursor) ? cursor[parseInt(parts.shift())] : cursor[parts.shift()];
    }

    //  Certain values will negate the ternary, hence we do extra checks here
    //  to make sure none of them comes back as undefined
    return cursor || cursor === false || cursor === 0 ? cursor : undefined;
}
