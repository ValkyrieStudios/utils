/**
 * Generates a random integer between the provided lower and upper bound,
 * not inclusive of the upper bound
 *
 * @param {number} min - (default=0) Lower bound
 * @param {number} max - (default=10) Upper bound
 */
function randomIntBetween (
    min:number = 0,
    max:number = 10
):number {
    if (
        !Number.isFinite(min) ||
        !Number.isFinite(max)
    ) throw new TypeError('Min/Max should be numeric');

    return ((Math.random() * (max - min)) + min) | 0;
}

export {randomIntBetween, randomIntBetween as default};
