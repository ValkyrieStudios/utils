'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
function define(props, obj = {}) {
    if (Object.prototype.toString.call(props) !== '[object Object]' ||
        Object.prototype.toString.call(obj) !== '[object Object]')
        throw new TypeError('Please pass an object as the value for props and obj');
    return Object.defineProperties(obj, props);
}
exports.default = define;
