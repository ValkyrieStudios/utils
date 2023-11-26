'use strict';

import isNotEmptyString from '../string/isNotEmpty.js';
import {PROTO_OBJ}      from '../object/is.js';

//  Set a value for a path in a json-like structure
export default function deepSet (obj, path, value = null, define = false) {
    if (
        Object.prototype.toString.call(obj) !== PROTO_OBJ &&
        !Array.isArray(obj)
    ) throw new TypeError('Deepset is only supported for objects');

    //  If no path is provided, do nothing
    if (!isNotEmptyString(path)) throw new TypeError('No path was given');

    //  Cleanup paths : a.b[2].c --> ['a', 'b', '2', 'c'] (faster processing)
    const parts = path.replace('[', '.').replace(']', '').split('.');

    //  Build any unknown paths and set cursor
    for (let i = 0; i < parts.length - 1; i++) {
        //  If this part is an empty string, just continue
        if (parts[i] === '') continue;

        if (!obj[parts[i]]) obj[parts[i]] = {};

        //  Set cursor
        obj = obj[parts[i]];
    }

    //  Prevent overriding of properties, eg: {d: 'hello'} -> deepSet('d.a.b', 'should not work')
    if (!Array.isArray(obj) && Object.prototype.toString.call(obj) !== PROTO_OBJ) return false;

    //  Set the actual value on the cursor
    if (define) {
        Object.defineProperty(obj, parts[parts.length - 1], value);
    } else {
        obj[parts[parts.length - 1]] = value;
    }

    return true;
}
