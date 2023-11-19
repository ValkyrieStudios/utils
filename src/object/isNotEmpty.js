'use strict';

export default function isNotEmptyObject (val) {
    if (val === null || Object.prototype.toString.call(val) !== '[object Object]') return false;
    return Object.keys(val).length !== 0;
}
