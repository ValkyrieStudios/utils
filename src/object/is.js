'use strict';

export default function (val) {
    return val !== null && Object.prototype.toString.call(val) === '[object Object]';
}
