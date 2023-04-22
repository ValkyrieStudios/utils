'use strict';

export default function isObject (val) {
    return val !== null && Object.prototype.toString.call(val) === '[object Object]';
}
