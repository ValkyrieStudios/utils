'use strict';

import isNotEmptyArray          from '../array/isNotEmpty';
import isBoolean                from '../boolean/is';
import isInteger                from '../number/isInteger';
import isIntegerAboveOrEqual    from '../number/isIntegerAboveOrEqual';
import isNumber                 from '../number/is';
import isObject                 from '../object/is';
import isString                 from '../string/is';
import isNotEmptyString         from '../string/isNotEmpty';
import round                    from '../number/round';

//  Humanize a numerical value into a unit base
//
//  @param int  val     Amount of bytes
export default function humanizeNumber (val, options = {}) {
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
        units: isObject(options) && (isNotEmptyArray(options.units) || options.units === false)
            ? (options.units ? options.units.filter(isString) : false)
            : ['', 'k', 'm', 'b', 't', 'q'],
        //  Have to have at least bigger than 1 to not end in infinite loop
        divider: isObject(options) && isIntegerAboveOrEqual(options.divider, 2)
            ? options.divider
            : 1000,
        //  Should we auto parse as integer (true) or not (false)
        real: isObject(options) && isBoolean(options.real)
            ? options.real
            : false,
    };

    //  If not a valid value, return
    if (!(isNumber(val) || isNotEmptyString(val))) {
        return `0${OPTS.units.length > 0 ? OPTS.units[0] : ''}`;
    }

    //  Ensure we are working with an integer
    let normalized;
    if (OPTS.real) {
        normalized = parseInt(isString(val) ? val.trim() : val) || 0;
    } else {
        normalized = parseFloat(isString(val) ? val.trim() : val) || 0;
    }
    if (!isNumber(normalized) || normalized === 0) {
        return `0${OPTS.units.length > 0 ? OPTS.units[0] : ''}`;
    }

    //  Determine sign
    const sign = normalized < 0 ? '-' : '';

    //  Ensure val here is absolute
    normalized = Math.abs(normalized);

    //  At each step, divide by divider, based on that we get the unit size
    let postfix = '';
    if (OPTS.units) {
        let unit_ix = 0
        while (normalized >= OPTS.divider) {
            unit_ix++;
            normalized = normalized/OPTS.divider;
            if (unit_ix === OPTS.units.length - 1) break;
        }
        postfix = OPTS.units[unit_ix];
    }

    //  Round with precision
    normalized = round(normalized, OPTS.precision);

    //  Humanize from eg: 10023 to 10,0234
    normalized    = normalized.toLocaleString('en-US', {maximumFractionDigits: OPTS.precision}).split('.');
    normalized[0] = `${normalized[0]}`.replace(/,/g, OPTS.delim);
    normalized    = normalized.join(OPTS.separator);

    //  Include a decimal point and a tenths-place digit if presenting less than then of KB or greater units
    return `${sign}${normalized}${postfix}`;
}
