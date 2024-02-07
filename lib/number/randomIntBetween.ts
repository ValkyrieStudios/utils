'use strict';

/**
 * Generates a random integer between the provided lower and upper bound,
 * not inclusive of the upper bound
 *
 * @param min - (default=0) Lower bound
 * @param max - (default=10) Upper bound
 * 
 * @returns Random integer between min and max
 */
export default function randomIntBetween (
    min:number = 0,
    max:number = 10
):number {
    if (
        !Number.isFinite(min) ||
        !Number.isFinite(max)
    ) throw new TypeError('Min/Max should be numeric');

    return Math.floor((Math.random() * (max - min)) + min);
}
