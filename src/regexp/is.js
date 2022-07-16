'use strict';

export default function (val) {
    return Object.prototype.toString.call(val) === '[object RegExp]';
}
