'use strict';

export const PROTO_RGX = '[object RegExp]';

export default function isRegExp (val) {
    return Object.prototype.toString.call(val) === PROTO_RGX;
}
