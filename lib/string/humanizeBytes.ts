import {humanizeNumber} from './humanizeNumber';
import {isIntegerAboveOrEqual} from '../number/isIntegerAboveOrEqual';

interface humanizeBytesOptions {
    /**
     * Delimiter used
     * (default=',')
     * eg: 20000 -> 20,000
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
     * (default=['', 'k', 'm', 'b', 't', 'q'])
     * eg: 1073741823 with units ['', 'K']` -> 1.073.741,82K
     */
    units?:string[];
}

/**
 * Humanize a numerical byte value into a humanly readable file size
 *
 * Examples:
 * 	humanizeBytes(23); // '23 bytes'
 * 	humanizeBytes(-374237489237); // '-348.5 GB'
 *
 * @param {number|string} val - Number or string byte value to humanize (string should be convertible to a number)
 * @param {humanizeBytesOptions?} opts - Humanization options
 *
 * @returns Humanized byte value as string
 */
function humanizeBytes (val:number|string, options:humanizeBytesOptions = {}):string {
    return humanizeNumber(val, {
        delim: typeof options?.delim === 'string'
            ? options.delim
            : ',',
        separator: typeof options?.separator === 'string' && options.separator.trim().length
            ? options.separator
            : '.',
        precision: isIntegerAboveOrEqual(options?.precision, 0)
            ? options.precision
            : 2,
        units: Array.isArray(options?.units) && options.units.length
            ? options.units
            : [' bytes', ' KB', ' MB', ' GB', ' TB', ' PB', ' EB', ' ZB', ' YB'],
        divider: 1024,
        real: true,
    });
}

export {humanizeBytes, humanizeBytes as default};
