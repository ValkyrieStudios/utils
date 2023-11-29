'use strict';

export const PROTO_OBJ = '[object Object]';

export default function isObject (val) {
    return Object.prototype.toString.call(val) === PROTO_OBJ;
}
