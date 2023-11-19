'use strict';

export default function isNotEmptyArray (val) {
    return Array.isArray(val) && val.length !== 0;
}
