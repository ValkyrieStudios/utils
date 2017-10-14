'use strict';

export function isFormData (val) {
    return (typeof FormData !== 'undefined') && (val instanceof FormData);
}
