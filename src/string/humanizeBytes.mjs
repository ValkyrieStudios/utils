'use strict';

import isString         from '../string/is.mjs';
import isNotEmptyString from '../string/isNotEmpty.mjs';
import {PROTO_OBJ}      from '../object/is.mjs';
import humanizeNumber   from './humanizeNumber.mjs';

//  Humanize a numerical byte value into a readable file size
//
//  @param int  val     Amount of bytes
export default function humanizeBytes (val, options = {}) {
    const has_opts = Object.prototype.toString.call(options) === PROTO_OBJ;
    return humanizeNumber(val, {
        delim: has_opts && isString(options.delim)
            ? options.delim
            : ',',
        separator: has_opts && isNotEmptyString(options.separator)
            ? options.separator
            : '.',
        precision: has_opts && Number.isInteger(options.precision) && options.precision >= 0
            ? options.precision
            : 2,
        units: has_opts && Array.isArray(options.units) && options.units.length > 0
            ? options.units.filter(isNotEmptyString)
            : [' bytes', ' KB', ' MB', ' GB', ' TB', ' PB', ' EB', ' ZB', ' YB'],
        divider: 1024,
        real: true,
    });
}
