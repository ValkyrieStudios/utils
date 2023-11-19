'use strict';

import isObject         from '../object/is.js';
import isString         from '../string/is.js';
import isNotEmptyString from '../string/isNotEmpty.js';
import humanizeNumber   from './humanizeNumber.js';

//  Humanize a numerical byte value into a readable file size
//
//  @param int  val     Amount of bytes
export default function humanizeBytes (val, options = {}) {
    return humanizeNumber(val, {
        delim: isObject(options) && isString(options.delim)
            ? options.delim
            : ',',
        separator: isObject(options) && isNotEmptyString(options.separator)
            ? options.separator
            : '.',
        precision: isObject(options) && Number.isInteger(options.precision) && options.precision > 0
            ? options.precision
            : 2,
        units: isObject(options) && Array.isArray(options.units) && options.units.length > 0
            ? options.units.filter(isNotEmptyString)
            : [' bytes', ' KB', ' MB', ' GB', ' TB', ' PB', ' EB', ' ZB', ' YB'],
        divider: 1024,
        real: true,
    });
}
