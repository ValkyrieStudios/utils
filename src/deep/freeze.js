'use strict';

import isObject     from '../object/is';
import isArray      from '../array/is';

function deep (obj, cb = Object.seal) {
    (Object.keys(obj) || []).forEach((key) => {
        if (isObject(obj[key] || false) || isArray(obj[key] || false)) {
            deep(obj[key], cb);
        }
    });
    return cb(obj);
}

//  Freeze nested structures
export default function (obj) {
    if (!isObject(obj) && !isArray(obj)) {
        throw new TypeError('Only objects can be frozen');
    }

    return deep(obj, Object.freeze);
}
