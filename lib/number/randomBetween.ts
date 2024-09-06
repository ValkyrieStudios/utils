/**
 * Generates a random number between the provided lower and upper bound
 *
 * @param {number} min - (default=0) Lower bound
 * @param {number} max - (default=10) Upper bound
 */
function randomBetween (
    min:number = 0,
    max:number = 10
):number {
    if (
        !Number.isFinite(min) ||
        !Number.isFinite(max)
    ) throw new TypeError('Min/Max should be numeric');

    return (Math.random() * (max - min)) + min;
}

export {randomBetween, randomBetween as default};
