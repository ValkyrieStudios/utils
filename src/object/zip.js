'use strict';

import isArray from '../array/is.js';

export default function zip (keys = [], values = [], default_to = null) {
    if (!isArray(keys)) throw new TypeError('Please pass an array as value for keys');
    if (!isArray(values) && values !== false) throw new TypeError('Please pass an array or false as value for values');

    return keys.reduce((acc, key, index) => {
        acc[key] = values
            ? values[index] || default_to
            : default_to;
        return acc;
    }, {});
}
