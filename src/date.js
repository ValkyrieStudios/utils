export function isDate (val) {
    return Object.prototype.toString.call(val) === '[object Date]';
}
