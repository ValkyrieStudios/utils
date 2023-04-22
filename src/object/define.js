'use strict';

import isObject from './is';

export default function define (props = {}, obj = {}) {
    if (
        !isObject(props) ||
        !isObject(obj)
    ) throw new TypeError('Please pass an object as the value for props and obj');

    return Object.defineProperties(obj, props);
}
