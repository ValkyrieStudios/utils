'use strict';

import define from './define';

export default function (props = {}, obj = {}) {
    return Object.seal(define(props, obj));
}
