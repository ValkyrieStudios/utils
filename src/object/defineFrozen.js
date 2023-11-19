'use strict';

import define from './define.js';

export default function defineFrozen (props = {}, obj = {}) {
    return Object.freeze(define(props, obj));
}
