'use strict';

Object.defineProperty(exports, "__esModule", {
    value: !0
});

exports.default = function (val) {
    return typeof FormData !== 'undefined' && val instanceof FormData;
};