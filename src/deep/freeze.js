'use strict';

import {PROTO_OBJ} from '../object/is.js';

function deep (obj) {
    for (const key of Object.keys(obj)) {
        if (
            Object.prototype.toString.call(obj[key]) === PROTO_OBJ ||
            Array.isArray(obj[key])
        ) deep(obj[key]);
    }
    return Object.freeze(obj);
}

//  Freeze nested structures
export default function deepFreeze (obj) {
    if (
        Object.prototype.toString.call(obj) !== PROTO_OBJ &&
        !Array.isArray(obj)
    ) throw new TypeError('Only objects/arrays can be frozen');
    return deep(obj);
}
