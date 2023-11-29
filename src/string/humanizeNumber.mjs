'use strict';

import isBoolean        from '../boolean/is.mjs';
import isString         from '../string/is.mjs';
import isNotEmptyString from '../string/isNotEmpty.mjs';
import round            from '../number/round.mjs';
import {PROTO_OBJ}      from '../object/is.mjs';

//  Humanize a numerical value into a unit base
//
//  @param int  val     Amount of bytes
export default function humanizeNumber (val, options = {}) {
    const has_opts = Object.prototype.toString.call(options) === PROTO_OBJ;
    const OPTS = {
        delim: has_opts && isString(options.delim)
            ? options.delim
            : ',',
        separator: has_opts && isNotEmptyString(options.separator)
            ? options.separator
            : '.',
        precision: has_opts && Number.isInteger(options.precision) && options.precision >= 0
            ? options.precision
            : 2,
        units: has_opts && ((Array.isArray(options.units) && options.units.length > 0) || options.units === false)
            ? options.units ? options.units.filter(isString) : false
            : ['', 'k', 'm', 'b', 't', 'q'],
        //  Have to have at least bigger than 1 to not end in infinite loop
        divider: has_opts && Number.isInteger(options.divider) && options.divider > 1
            ? options.divider
            : 1000,
        //  Should we auto parse as integer (true) or not (false)
        real: has_opts && isBoolean(options.real)
            ? options.real
            : false,
    };

    //  If not a valid value, return
    if (!(Number.isFinite(val) || isNotEmptyString(val))) {
        return `0${OPTS.units.length > 0 ? OPTS.units[0] : ''}`;
    }

    //  Ensure we are working with an integer
    let normalized;
    if (OPTS.real) {
        normalized = parseInt(isString(val) ? val.trim() : val) || 0;
    } else {
        normalized = parseFloat(isString(val) ? val.trim() : val) || 0;
    }
    if (!Number.isFinite(normalized) || normalized === 0) {
        return `0${OPTS.units.length > 0 ? OPTS.units[0] : ''}`;
    }

    //  Determine sign
    const sign = normalized < 0 ? '-' : '';

    //  Ensure val here is absolute
    normalized = Math.abs(normalized);

    //  At each step, divide by divider, based on that we get the unit size
    let postfix = '';
    if (OPTS.units) {
        let unit_ix = 0;
        while (normalized >= OPTS.divider) {
            unit_ix++;
            normalized = normalized/OPTS.divider;
            if (unit_ix === OPTS.units.length - 1) break;
        }
        postfix = OPTS.units[unit_ix];
    }

    //  Round with precision
    normalized = round(normalized, OPTS.precision);

    //  Humanize from eg: 10023 to 10,023
    normalized    = `${normalized}`.split('.');
    normalized[0] = normalized[0].split('').reverse().map((char, ix, original) => {
        if (ix > 0 && ix < original.length && ix % 3 === 0) return char + OPTS.delim;
        return char;
    }).reverse().join('');
    normalized    = normalized.join(OPTS.separator);

    //  Include a decimal point and a tenths-place digit if presenting less than then of KB or greater units
    return `${sign}${normalized}${postfix}`;
}
