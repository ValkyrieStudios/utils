'use strict';

export default function (val) {
    return (typeof FormData !== 'undefined') && (val instanceof FormData);
}
