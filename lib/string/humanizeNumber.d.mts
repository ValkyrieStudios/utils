/**
 * Humanize a number
 *
 * Examples:
 *	humanizeNumber(4327963279469432); // '4.33q'
 *	humanizeNumber(1504230); // '1.5m'
 *	humanizeNumber(-432443); // '-432.44k'
 *	humanizeNumber('-1500'); // '-1.5k'
 *	humanizeNumber(47328748923747923479); // '47,328.75q'
 * 
 * The following are available options and their internal defaults
 *  - delim (default=','): delimiter used, eg: `20000 -> 20,000`
 *  - separator (default='.'): separator used for floats, eg: '20.034' -> '20,034'
 *  - precision (default=2): decimal precision for floats: eg: '20.0344233' with precision 2 -> '20.03'
 *  - units (default=['', 'k', 'm', 'b', 't', 'q']): units used, eg: `1073741823 with units ['', 'K']` -> `1.073.741,82K`
 *  - divider (default=1000): Override default divider used for units (used internally for humanizeBytes with 1024 as divider)
 *  - real (default=false): Set to true to automatically round input numbers
 *
 * @param val - Number or string value to humanize (string should be convertible to a number)
 * @param opts - (default={}) Pass to override options.
 *
 * @returns Humanized number as string
 */
declare function humanizeNumber(
	val:number|string,
	opts?:{
		delim?:string;
		separator?:string;
		precision?:number;
		units?:string[];
		divider?:number;
		real?:boolean;
	}
):string;
export = humanizeNumber;
