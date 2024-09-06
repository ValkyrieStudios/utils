/**
 * Check whether or not a provided value is an instance of FormData
 *
 * @param {unknown} val - Value to verify
 */
function isFormData (val:unknown):val is FormData {
    return val instanceof FormData;
}

export {isFormData, isFormData as default};
