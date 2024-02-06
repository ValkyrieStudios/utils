/**
 * Sets the provided date to end of UTC of provided key
 *
 * @param val - Date to set to end of
 * @param key - (default='millisecond') Key to set
 * 
 * @returns New date set to end of key
 */
declare function endOfUTC(
	val:Date,
	key?: 'year'
		| 'quarter'
		| 'month'
		| 'week'
		| 'week_sun'
		| 'week_mon'
		| 'week_tue'
		| 'week_wed'
		| 'week_thu'
		| 'week_fri'
		| 'week_sat'
		| 'day'
		| 'hour'
		| 'minute'
		| 'second'
		| 'millisecond'
):Date;
export = endOfUTC;
