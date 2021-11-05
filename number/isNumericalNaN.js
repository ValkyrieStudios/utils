'use strict';

Object.defineProperty(exports, "__esModule", {
    value: !0
});

exports.default = function (val) {
    return Number.isNaN(val) || val === Infinity;
};