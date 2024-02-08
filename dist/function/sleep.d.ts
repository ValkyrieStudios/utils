/**
 * Returns a promise that resolves after X milliseconds, useful in
 * async scenarios where we wish to wait for a specific periodic of time
 *
 * @param ms - (default=1000) Amount of milliseconds to wait for
 *
 * @returns Promise that resolves after X milliseconds
 */
export default function sleep(ms?: number): Promise<void>;
