'use strict';

/**
 * Generates a random number between the provided lower and upper bound
 *
 * @param min - (default=0) Lower bound
 * @param max - (default=10) Upper bound
 * 
 * @returns Random number between min and max
 */
export default function randomBetween (
    min:number = 0,
    max:number = 10
):number {
    if (
        !Number.isFinite(min) ||
        !Number.isFinite(max)
    ) throw new TypeError('Min/Max should be numeric');

    return (Math.random() * (max - min)) + min;
}
