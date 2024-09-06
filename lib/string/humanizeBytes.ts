import {humanizeNumber} from './humanizeNumber';

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

const DEFAULT_UNITS = [' bytes', ' KB', ' MB', ' GB', ' TB', ' PB', ' EB', ' ZB', ' YB'];

/**
 * Humanize a numerical byte value into a humanly readable file size
 *
 * Examples:
 * 	humanizeBytes(23); // '23 bytes'
 * 	humanizeBytes(-374237489237); // '-348.5 GB'
 *
 * @param {number|string} val - Number or string byte value to humanize (string should be convertible to a number)
 * @param {humanizeBytesOptions} opts - Humanization options
 */
function humanizeBytes (val:number|string, options:humanizeBytesOptions = {}):string {
    return humanizeNumber(val, {
        delim: 'delim' in options ? options.delim : ',',
        separator: 'separator' in options ? options.separator : '.',
        precision: 'precision' in options ? options.precision : 2,
        units: Array.isArray(options?.units) && options.units.length
            ? options.units
            : DEFAULT_UNITS,
        divider: 1024,
        real: true,
    });
}

export {humanizeBytes, humanizeBytes as default};
