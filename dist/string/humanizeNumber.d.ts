interface humanizeNumberOptions {
    /**
     *  Delimiter used
     *  (default=',')
     *  eg: 20000 -> 20,000
     */
    delim?: string;
    /**
     * Separator used for floats
     * (default='.')
     * eg: 20.034 -> 20,034
     */
    separator?: string;
    /**
     * Decimal precision for floats
     * (default=2)
     * eg: 20.0344233 with precision 2 -> 20.03
     */
    precision?: number;
    /**
     * Units used for conversion
     * default=['', 'k', 'm', 'b', 't', 'q'])
     * eg: 1073741823 with units ['', 'K']` -> 1.073.741,82K
     */
    units?: string[] | boolean;
    /**
     * Override default divider used for units
     * (default=1000)
     * eg: humanizeBytes uses 1024 as divider
     */
    divider?: number;
    /**
     * Set to true to automatically round input numbers
     * (default=false)
     */
    real?: boolean;
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
export default function humanizeNumber(val: number | string, options?: humanizeNumberOptions): string;
export {};
