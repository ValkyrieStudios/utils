/**
 * Humanize a numerical byte value into a humanly readable file size
 *
 * Examples:
 * 	humanizeBytes(1504230); // '1.4 MB'
 * 	humanizeBytes(23); // '23 bytes'
 * 	humanizeBytes(-374237489237); // '-348.5 GB'
 * 	humanizeBytes('-1504230'); // '-1.4 MB'
 * 
 * The following are available options and their internal defaults
 *  - delim (default=','): delimiter used, eg: `20000 -> 20,000`
 *  - separator (default='.'): separator used for floats, eg: '20.034' -> '20,034'
 *  - precision (default=2): decimal precision for floats: eg: '20.0344233' with precision 2 -> '20.03'
 *  - units (default=['', 'k', 'm', 'b', 't', 'q']): units used, eg: `1073741823 with units ['', 'K']` -> `1.073.741,82K`
 *
 * @param val - Number or string byte value to humanize (string should be convertible to a number)
 * @param opts - (default={}) Pass to override options.
 *
 * @returns Humanized byte value as string
 */
declare function humanizeBytes(
	val:number|string,
	opts?:{
		delim?:string;
		separator?:string;
		precision?:number;
		units?:string[];
	}
):string;
export = humanizeBytes;
