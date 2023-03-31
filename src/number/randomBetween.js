'use strict';

import isNumber from './is';

//  Generate random between min and max
export default function (min = 0, max = 10) {
    if (!isNumber(min)) throw new TypeError('Min should be numeric');

    if (!isNumber(max)) throw new TypeError('Max should be numeric');

    return (Math.random() * (max - min)) + min;
}
