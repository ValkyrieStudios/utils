'use strict';

export default function define (props, obj = {}) {
    if (
        Object.prototype.toString.call(props) !== '[object Object]' ||
        Object.prototype.toString.call(obj) !== '[object Object]'
    ) throw new TypeError('Please pass an object as the value for props and obj');

    return Object.defineProperties(obj, props);
}
