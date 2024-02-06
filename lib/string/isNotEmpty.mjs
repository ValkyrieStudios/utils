'use strict';

export default function isNotEmptyString (val, trimmed = true) {
    if (typeof val !== 'string') return false;
    return (trimmed === true ? val.trim() : val).length > 0;
}
