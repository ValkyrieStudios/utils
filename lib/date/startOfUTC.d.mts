/**
 * Sets the provided date to start of UTC of provided key
 *
 * @param val - Date to set to start of
 * @param key - (default='millisecond') Key to set
 * 
 * @returns New date set to start of key
 */
declare function startOfUTC(
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
export = startOfUTC;
