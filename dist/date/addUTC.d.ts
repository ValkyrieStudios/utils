/**
 * Adds the provided amount of a specific key to the provided date
 *
 * @param val - Date to set to end of
 * @param amount - (default=0) Amount of key to add
 * @param key - (default='millisecond') Key to set
 *
 * @returns New date with provided amount of key added
 */
export default function addUTC(val: Date, amount?: number, key?: 'years' | 'year' | 'months' | 'month' | 'days' | 'day' | 'hours' | 'hour' | 'minutes' | 'minute' | 'seconds' | 'second' | 'milliseconds' | 'millisecond'): Date;
