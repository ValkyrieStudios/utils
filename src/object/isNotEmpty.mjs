'use strict';

export default function isNotEmptyObject (val) {
    return Object.prototype.toString.call(val) === '[object Object]' && Object.keys(val).length > 0;
}
