'use strict';

export default function (val) {
    return Number.isNaN(val) || val === Infinity;
}
