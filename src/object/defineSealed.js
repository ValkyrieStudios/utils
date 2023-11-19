'use strict';

import define from './define.js';

export default function defineSealed (props = {}, obj = {}) {
    return Object.seal(define(props, obj));
}
