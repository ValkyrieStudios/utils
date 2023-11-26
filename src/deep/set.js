'use strict';

import isNotEmptyString from '../string/isNotEmpty.js';
import {PROTO_OBJ}      from '../object/is.js';

//  Cleanup paths : a.b[2].c --> ['a', 'b', '2', 'c'] (faster processing)
function interpolatePath (path) {
    if (Array.isArray(path)) return [...path];
    if (isNotEmptyString(path)) return path.replace('[', '.').replace(']', '').split('.');
    throw new TypeError('No Path was given');
}

//  Set a value for a path in a json-like structure
export default function deepSet (obj, path, value = null, define = false) {
    if (
        Object.prototype.toString.call(obj) !== PROTO_OBJ &&
        !Array.isArray(obj)
    ) throw new TypeError('Deepset is only supported for objects');

    const parts = interpolatePath(path);

    //  Build any unknown paths and set cursor
    for (let i = 0; i < parts.length - 1; i++) {
        //  If this part is an empty string, just continue
        if (parts[i] === '') continue;

        if (!obj[parts[i]]) obj[parts[i]] = {};

        //  Set cursor
        obj = obj[parts[i]];

        //  If not an array continue
        if (!Array.isArray(obj)) continue;

        //  If an array and i is not the last index ... set the object to be the index on the array
        if (i < parts.length - 2) {
            obj = obj[parts[i + 1]];
            i++;
        }
    }

    //  Set the actual value on the cursor
    if (define) {
        Object.defineProperty(obj, parts[parts.length - 1], value);
    } else {
        obj[parts[parts.length - 1]] = value;
    }

    return true;
}
