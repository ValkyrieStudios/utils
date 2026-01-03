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
 * @param {number|string} val - Number or string value to humanize (string should be convertible to a number)
 * @param {humanizeNumberOptions} opts - (default={}) Pass to override options.
 */
function humanizeNumber (val:number|string, options:humanizeNumberOptions = {}):string {
    const DELIM:string = typeof options?.delim === 'string' ? options.delim : ',';
    const SEPARATOR:string = typeof options?.separator === 'string' && options.separator.length ? options.separator : '.';
    const PRECISION:number = Number.isInteger(options?.precision) && options.precision! >= 0 ? options.precision! : 2;
    const DIVIDER:number = Number.isInteger(options?.divider) && options.divider! >= 2 ? options.divider! : 1000;
    const INV_DIVIDER:number = 1.0 / DIVIDER;
    const REAL:boolean = options?.real === true;
    const UNITS:string[]|false = Array.isArray(options?.units) && options.units.length
        ? options.units
        : options?.units === false
            ? false
            : DEFAULT_UNITS;

    /* Normalize to a numerical value */
    let normalized = typeof val === 'string' ? parseFloat(val) : val;

    if (!Number.isFinite(normalized) || normalized === 0) return UNITS ? '0'+UNITS[0] : '0';

    if (REAL) normalized = Math.round(normalized);

    /* Determine original sign and normalize */
    const sign = normalized < 0 ? '-' : '';
    normalized = Math.abs(normalized);

    /* At each step, divide by divider, based on that we get the unit size */
    let unit_ix = 0;
    if (UNITS) {
        while (normalized >= DIVIDER && unit_ix < UNITS.length - 1) {
            normalized *= INV_DIVIDER;
            unit_ix++;
        }
    }

    /* Humanize from eg: 10023 to 10,023 */
    const humanized: string[] = (''+round(normalized, PRECISION)).split('.', 2);
    const integer_part: string = humanized[0];
    const integer_part_len = integer_part.length;
    let formattedIntegerPart: string = '';

    for (let i = 0; i < integer_part_len; i++) {
        if (i > 0 && (integer_part_len - i) % 3 === 0) {
            formattedIntegerPart += DELIM;
        }
        formattedIntegerPart += integer_part[i];
    }

    /* Include a decimal point and a tenths-place digit if presenting less than then of KB or greater units */
    return sign + formattedIntegerPart + (humanized[1] ? SEPARATOR + humanized[1] : '') + (UNITS ? UNITS[unit_ix] : '');
}

export {humanizeNumber, humanizeNumber as default};
