'use strict';

import {PROTO_OBJ} from './is.js';

export default function isNotEmptyObject (val) {
    return Object.prototype.toString.call(val) === PROTO_OBJ && Object.keys(val).length > 0;
}
