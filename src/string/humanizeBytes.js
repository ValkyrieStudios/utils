'use strict';

import isNotEmptyArray          from '../array/isNotEmpty';
import isIntegerAboveOrEqual    from '../number/isIntegerAboveOrEqual';
import isObject                 from '../object/is';
import isString                 from '../string/is';
import isNotEmptyString         from '../string/isNotEmpty';
import humanizeNumber           from './humanizeNumber';

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
        precision: isObject(options) && isIntegerAboveOrEqual(options.precision, 0)
            ? options.precision
            : 2,
        units: isObject(options) && isNotEmptyArray(options.units)
            ? options.units.filter(isNotEmptyString)
            : [' bytes', ' KB', ' MB', ' GB', ' TB', ' PB', ' EB', ' ZB', ' YB'],
        divider: 1024,
        real: true,
    });
}
