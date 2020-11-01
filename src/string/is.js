'use strict';

export default function (val) {
    return typeof val === 'string' || val instanceof String;
}
