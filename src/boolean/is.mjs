'use strict';

export default function isBoolean (val) {
    return val === true || val === false || typeof val === 'boolean' || val instanceof Boolean;
}
