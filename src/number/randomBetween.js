'use strict';

import isNumber from './is';

//  Generate random between min and max
export default function randomBetween (min = 0, max = 10) {
    if (
        !isNumber(min) ||
        !isNumber(max)
    ) throw new TypeError('Min/Max should be numeric');

    return (Math.random() * (max - min)) + min;
}
