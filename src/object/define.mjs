'use strict';

import {PROTO_OBJ} from './is.mjs';

export default function define (props, obj = {}) {
    if (
        Object.prototype.toString.call(props) !== PROTO_OBJ ||
        Object.prototype.toString.call(obj) !== PROTO_OBJ
    ) throw new TypeError('Please pass an object as the value for props and obj');

    return Object.defineProperties(obj, props);
}
