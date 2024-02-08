/**
 * Compute the diff between two dates in the provided key
 *
 * @param val_a - Date to diff against
 * @param val_b - Date to diff with
 * @param key - (default='millisecond') Key to diff in
 *
 * @returns Numerical diff between two dates
 */
export default function diff(val_a: Date, val_b: Date, key?: 'week' | 'weeks' | 'day' | 'days' | 'hour' | 'hours' | 'minute' | 'minutes' | 'second' | 'seconds' | 'millisecond' | 'milliseconds'): number;
