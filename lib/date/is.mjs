'use strict';

export default function isDate (val) {
    return Object.prototype.toString.call(val) === '[object Date]' && !isNaN(val);
}
