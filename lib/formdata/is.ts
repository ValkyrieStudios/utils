'use strict';

/**
 * Check whether or not a provided value is an instance of FormData
 *
 * @param val - Value to verify
 *
 * @returns Whether or not the value is an instance of FormData
 */
function isFormData (val:unknown):val is FormData {
    return val instanceof FormData;
}

export {isFormData, isFormData as default};
