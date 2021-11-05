'use strict';

import isString         from '../string/is';
import isDate           from '../date/is';
import isObject         from '../object/is';
import isArray          from '../array/is';
import isNumber         from '../number/is';
import isNumericalNaN   from '../number/isNumericalNaN';
import isRegExp         from '../regexp/is';

//  https://tools.ietf.org/html/draft-eastlake-fnv-03

const FNV_OFFSET_BASIS_32 = 2166136261;

export default function (data = '', offset = FNV_OFFSET_BASIS_32) {
    let hash = offset;
    let sanitized_data = JSON.stringify(data);

    //  Convert data to a format that is hashable
    if (isString(data)) {
        sanitized_data = data;
    } else if (isArray(data) || isObject(data)) {
        sanitized_data = JSON.stringify(data);
    } else if (isRegExp(data)) {
        sanitized_data = String(data);
    } else if (isDate(data)) {
        sanitized_data = `${data.getTime()}`;
    } else if (isNumber(data)) {
        sanitized_data = `${data}`;
    } else if (isNumericalNaN(data)) {
        sanitized_data = `NaN`;
    }

    //  If conversion failed due to an unsupported hash type, make sure to throw an error
    if (sanitized_data === false) {
        throw new TypeError('An FNVA1 Hash could not be calculated for this datatype');
    }

    //  Calculate the hash of the sanitized data by looping over each char
    for (let i = 0; i < sanitized_data.length; i++) {
        hash ^= sanitized_data.charCodeAt(i);

        // 32-bit FNV prime: 2**24 + 2**8 + 0x93 = 16777619
        // Using bitshift for accuracy and performance. Numbers in JS suck.
        hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
    }

    return hash >>> 0;
}
