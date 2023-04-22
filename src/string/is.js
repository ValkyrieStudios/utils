'use strict';

export default function isString (val) {
    return typeof val === 'string' || val instanceof String;
}
