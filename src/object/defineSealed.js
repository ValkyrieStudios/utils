'use strict';

import define from './define';

export default function defineSealed (props = {}, obj = {}) {
    return Object.seal(define(props, obj));
}
