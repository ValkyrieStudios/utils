'use strict';

export default function (val) {
    return val === true || val === false || typeof val === 'boolean' || val instanceof Boolean;
}
