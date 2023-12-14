'use strict';

export default function isRegExp (val) {
    return Object.prototype.toString.call(val) === '[object RegExp]';
}
