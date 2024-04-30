'use strict';

import {round} from '../number/round';

const DEFAULT_UNITS = ['', 'k', 'm', 'b', 't', 'q'];

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
function humanizeNumber (val:number|string, options:humanizeNumberOptions|false = false):string {
    let DELIM:string            = ',';
    let SEPARATOR:string        = '.';
    let PRECISION:number        = 2;
    let UNITS:string[]|false    = DEFAULT_UNITS;
    let DIVIDER:number          = 1000;
    let REAL:boolean            = false;

    /* Process options */
    if (options && Object.prototype.toString.call(options) === '[object Object]') {
        if (typeof options.delim === 'string') DELIM = options.delim;
        if (typeof options.separator === 'string' && options.separator.trim().length) SEPARATOR = options.separator;
        if (Number.isInteger(options.precision) && options.precision >= 0) PRECISION = options.precision;
        if (Array.isArray(options.units) && options.units.length) {
            UNITS = options.units;
        } else if (options.units === false) {
            UNITS = false;
        }
        if (Number.isInteger(options.divider) && options.divider > 1) {
            DIVIDER = options.divider;
        }

        if (options.real === true) REAL = true;
    }

    /* Normalize to a numerical value */
    let normalized:number = 0;
    if (typeof val === 'string') {
        normalized = REAL ? parseInt(val.trim(), 10) : parseFloat(val);
    } else if (Number.isFinite(val)) {
        normalized = REAL ? Math.round(val) : val;
    }

    /* If not a valid value or 0, return */
    if (!Number.isFinite(normalized) || normalized === 0) return UNITS ? `0${UNITS[0]}` : '0';

    /* Determine original sign and normalize */
    const sign = normalized < 0 ? '-' : '';
    normalized = Math.abs(normalized);

    /* At each step, divide by divider, based on that we get the unit size */
    let unit_ix: number = 0;
    if (UNITS) {
        for (unit_ix; normalized >= DIVIDER && unit_ix < UNITS.length - 1; unit_ix++) {
            normalized /= DIVIDER;
        }
    }

    /* Humanize from eg: 10023 to 10,023 */
    const humanized:string[]= `${round(normalized, PRECISION)}`.split('.', 2);
    humanized[0] = humanized[0].split('').reverse().map((char, ix, original) => {
        if (ix > 0 && ix < original.length && ix % 3 === 0) return char + DELIM;
        return char;
    }).reverse().join('');

    /* Include a decimal point and a tenths-place digit if presenting less than then of KB or greater units */
    return `${sign}${humanized.join(SEPARATOR)}${UNITS ? UNITS[unit_ix] : ''}`;
}

export {humanizeNumber, humanizeNumber as default};
