'use strict';

import define from './define';

export default function defineFrozen (props = {}, obj = {}) {
    return Object.freeze(define(props, obj));
}
