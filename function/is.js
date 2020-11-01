'use strict';

//  Check if a variable is a function or not

Object.defineProperty(exports, "__esModule", {
    value: !0
});

exports.default = function (val) {
    return !!(val && val.constructor && val.call && val.apply);
};