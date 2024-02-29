'use strict';

import isBoolean    from '../boolean/is';
import isString     from '../string/is';
import round        from '../number/round';

interface humanizeNumberOptions {
    /**
     *  Delimiter used
     *  (default=',')
     *  eg: 20000 -> 20,000
     */
    delim?:string;
    /**
     * Separator used for floats
     * (default='.')
     * eg: 20.034 -> 20,034
     */
    separator?:string;
    /**
     * Decimal precision for floats
     * (default=2)
     * eg: 20.0344233 with precision 2 -> 20.03
     */
    precision?:number;
    /**
     * Units used for conversion
     * default=['', 'k', 'm', 'b', 't', 'q'])
     * eg: 1073741823 with units ['', 'K']` -> 1.073.741,82K
     */
    units?:string[]|boolean;
    /**
     * Override default divider used for units
     * (default=1000)
     * eg: humanizeBytes uses 1024 as divider
     */
    divider?:number;
    /**
     * Set to true to automatically round input numbers
     * (default=false)
     */
    real?:boolean;
}

/**
 * Humanize a number
 *
 * Examples:
 *	humanizeNumber(1504230); // '1.5m'
 *	humanizeNumber('-1500'); // '-1.5k'
 *	humanizeNumber(47328748923747923479); // '47,328.75q'
 *
 * @param val - Number or string value to humanize (string should be convertible to a number)
 * @param opts - (default={}) Pass to override options.
 *
 * @returns Humanized number as string
 */
export default function humanizeNumber (val:number|string, options:humanizeNumberOptions = {}):string {
    const has_opts = Object.prototype.toString.call(options) === '[object Object]';
    const OPTS:humanizeNumberOptions = {
        delim: has_opts && typeof options.delim === 'string'
            ? options.delim
            : ',',
        separator: has_opts && typeof options.separator === 'string' && options.separator.trim().length
            ? options.separator
            : '.',
        precision: has_opts && Number.isInteger(options.precision) && options.precision >= 0
            ? options.precision
            : 2,
        units: has_opts && ((Array.isArray(options.units) && options.units.length) || options.units === false)
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

    //  Normalize to a numerical value
    let normalized:number;
    if (OPTS.real) {
        normalized = typeof val === 'string' ? parseInt(val.trim(), 10) : Number.isFinite(val) ? Math.round(val) : 0;
    } else {
        normalized = typeof val === 'string' ? parseFloat(val) : Number.isFinite(val) ? val : 0;
    }

    //  If not a valid value or 0, return
    if (!Number.isFinite(normalized) || normalized === 0) {
        return `0${Array.isArray(OPTS.units) && OPTS.units.length ? OPTS.units[0] : ''}`;
    }

    //  Determine sign
    const sign = normalized < 0 ? '-' : '';

    //  Ensure val here is absolute
    normalized = Math.abs(normalized);

    //  At each step, divide by divider, based on that we get the unit size
    let postfix = '';
    if (Array.isArray(OPTS.units) && OPTS.units.length) {
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
    const humanized:string[]= `${normalized}`.split('.');
    humanized[0] = humanized[0].split('').reverse().map((char, ix, original) => {
        if (ix > 0 && ix < original.length && ix % 3 === 0) return char + OPTS.delim;
        return char;
    }).reverse().join('');

    //  Include a decimal point and a tenths-place digit if presenting less than then of KB or greater units
    return `${sign}${humanized.join(OPTS.separator)}${postfix}`;
}
