'use strict';

//  Generate random between min and max (max not inclusive)
export default function randomIntBetween (min = 0, max = 10) {
    if (
        !Number.isFinite(min) ||
        !Number.isFinite(max)
    ) throw new TypeError('Min/Max should be numeric');

    return Math.floor((Math.random() * (max - min)) + min);
}
