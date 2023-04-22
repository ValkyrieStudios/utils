'use strict';

import isNotEmptyArray          from '../array/isNotEmpty';
import isInteger                from '../number/isInteger';
import isIntegerAboveOrEqual    from '../number/isIntegerAboveOrEqual';
import isNumber                 from '../number/is';
import isObject                 from '../object/is';
import isString                 from '../string/is';
import isNotEmptyString         from '../string/isNotEmpty';
import round                    from '../number/round';

//  Humanize a numerical byte value into a readable file size
//
//  @param int  val     Amount of bytes
export default function humanizeBytes (val, options = {}) {
    const OPTS = {
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
    };

    //  If not a valid value, return
    if (!(isNumber(val) || isNotEmptyString(val))) {
        return `0${OPTS.units.length > 0 ? OPTS.units[0] : ''}`;
    }

    //  Ensure we are working with an integer
    let normalized = parseInt(isString(val) ? val.trim() : val) || 0;
    if (!isInteger(normalized) || normalized === 0) {
        return `0${OPTS.units.length > 0 ? OPTS.units[0] : ''}`;
    }

    //  Determine sign
    const sign = normalized < 0 ? '-' : '';

    //  Ensure val here is absolute
    normalized = Math.abs(normalized);

    //  At each step, divide by 2^8, based on that we get the unit size
    let unit_ix = 0;
    while (normalized >= 1024) {
        unit_ix++;
        normalized = normalized/1024;
        if (unit_ix === OPTS.units.length - 1) break;
    }

    //  Round with precision
    normalized = round(normalized, OPTS.precision);

    //  Humanize from eg: 10023 to 10,0234
    normalized    = normalized.toLocaleString('en-US', {maximumFractionDigits: OPTS.precision}).split('.');
    normalized[0] = normalized[0].replace(/,/g, OPTS.delim);
    normalized    = normalized.join(OPTS.separator);

    //  Include a decimal point and a tenths-place digit if presenting less than then of KB or greater units
    return `${sign}${normalized}${OPTS.units[unit_ix]}`;
}
