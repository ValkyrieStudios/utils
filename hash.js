'use strict';

Object.defineProperty(exports, "__esModule", {
    value: !0
});
exports.guid = guid;
exports.fnv1A = fnv1A;

var _string = require('./string');

var _date = require('./date');

var _object = require('./object');

var _array = require('./array');

var _number = require('./number');

var _regexp = require('./regexp');

//
//  GUID : [RFC4122 Compliant]
//

var performance = !1;

if (typeof window !== 'undefined' && (window.performance || {}).now) {
    // eslint-disable-line no-undef
    performance = function performance() {
        return window.performance.now();
    }; // eslint-disable-line no-undef
} else if (typeof process !== 'undefined') {
    // eslint-disable-line no-undef
    performance = function performance() {
        return process.hrtime()[1];
    }; // eslint-disable-line no-undef
} else {
    performance = function performance() {
        return 0;
    };
}

function guid() {
    //  According to : rfc4122
    var d = new Date().getTime();

    //use high-precision timer if available
    d += performance();

    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;

        d = Math.floor(d / 16);
        return (c === 'x' ? r : r & 0x3 | 0x8).toString(16);
    });
}

//
//  FNV 1A : https://tools.ietf.org/html/draft-eastlake-fnv-03
//

//  32 Bit OFFSET_BASIS
var FNV_OFFSET_BASIS_32 = 2166136261;

function fnv1A() {
    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : FNV_OFFSET_BASIS_32;

    var hash = offset;
    var sanitized_data = JSON.stringify(data);

    //  Convert data to a format that is hashable
    if ((0, _string.isString)(data)) {
        sanitized_data = data;
    } else if ((0, _array.isArray)(data) || (0, _object.isObject)(data)) {
        sanitized_data = JSON.stringify(data);
    } else if ((0, _regexp.isRegExp)(data)) {
        sanitized_data = String(data);
    } else if ((0, _date.isDate)(data)) {
        sanitized_data = '' + data.getTime();
    } else if ((0, _number.isNumber)(data)) {
        sanitized_data = '' + data;
    }

    //  If conversion failed due to an unsupported hash type, make sure to throw an error
    if (sanitized_data === !1) {
        throw new TypeError('An FNVA1 Hash could not be calculated for this datatype');
    }

    //  Calculate the hash of the sanitized data by looping over each char
    for (var i = 0; i < sanitized_data.length; i++) {
        hash ^= sanitized_data.charCodeAt(i);

        // 32-bit FNV prime: 2**24 + 2**8 + 0x93 = 16777619
        // Using bitshift for accuracy and performance. Numbers in JS suck.
        hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
    }

    return hash >>> 0;
}