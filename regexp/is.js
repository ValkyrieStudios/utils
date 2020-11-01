'use strict';

Object.defineProperty(exports, "__esModule", {
    value: !0
});

exports.default = function (val) {
    return Object.prototype.toString.call(val) === '[object RegExp]';
};