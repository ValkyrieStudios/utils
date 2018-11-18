'use strict';

Object.defineProperty(exports, "__esModule", {
    value: !0
});
exports.isNumber = isNumber;
exports.isNumericalNaN = isNumericalNaN;
exports.toPercentage = toPercentage;
exports.round = round;
exports.randomBetween = randomBetween;

var _boolean = require('./boolean');

function isNumber(val) {
    return typeof val === 'number' || isNumericalNaN(val) || val instanceof Number;
}

function isNumericalNaN(val) {
    return Number.isNaN(val);
}

//  Convert a float value to a percentage
function toPercentage(val) {
    var precision = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var min = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var max = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;

    if (!isNumber(val) || isNumericalNaN(val)) {
        throw new TypeError('Value should be numeric');
    }

    if (!isNumber(min) || isNumericalNaN(min)) {
        throw new TypeError('Value should be numeric');
    }

    if (!isNumber(max) || isNumericalNaN(max)) {
        throw new TypeError('Value should be numeric');
    }

    return round((val - min) / (max - min) * 100, precision);
}

//  Round a decimal value
function round(val) {
    var precision = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    if (!isNumber(val) || isNumericalNaN(val)) {
        throw new TypeError('Value should be numeric');
    }

    if (precision === !1 || precision < 1) {
        return Math.round(val);
    }

    var exp = Math.pow(10, Math.round(precision));
    return Math.round(val * exp) / exp;
}

//  Generate random between min and max
function randomBetween() {
    var min = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var max = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;

    if (!isNumber(min) || isNumericalNaN(min)) {
        throw new TypeError('Min should be numeric');
    }

    if (!isNumber(max) || isNumericalNaN(max)) {
        throw new TypeError('Max should be numeric');
    }

    return Math.random() * max + min;
}