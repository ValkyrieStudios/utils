/**
 * Convert a value to a Date object if possible, handles Date objects and strings
 *
 * @param {Date|string} val - Value to convert
 */
function convertToDate (val: Date | string | number): Date | null {
    switch (typeof val) {
        case 'number': {
            if (val !== val) return null;
            const d = new Date(val);
            return d.getTime() === d.getTime() ? d : null;
        }
        case 'object':
            return val instanceof Date && val.getTime() === val.getTime() ? val : null;
        case 'string': {
            const d = new Date(val);
            return d.getTime() === d.getTime() ? d : null;
        }
        default:
            return null;
    }
}

export {convertToDate, convertToDate as default};
