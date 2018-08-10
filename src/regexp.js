export function isRegExp (val) {
    return (Object.prototype.toString.call(val) === '[object RegExp]');
}
