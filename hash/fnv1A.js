'use strict';

Object.defineProperty(exports, "__esModule", {
    value: !0
});

exports.default = function () {
    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : FNV_OFFSET_BASIS_32;

    var hash = offset;
    var sanitized_data = JSON.stringify(data);

    //  Convert data to a format that is hashable
    if ((0, _is2.default)(data)) {
        sanitized_data = data;
    } else if ((0, _is8.default)(data) || (0, _is6.default)(data)) {
        sanitized_data = JSON.stringify(data);
    } else if ((0, _is12.default)(data)) {
        sanitized_data = String(data);
    } else if ((0, _is4.default)(data)) {
        sanitized_data = '' + data.getTime();
    } else if ((0, _is10.default)(data)) {
        sanitized_data = '' + data;
    } else if ((0, _isNumericalNaN2.default)(data)) {
        sanitized_data = 'NaN';
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
};

var _is = require('../string/is');

var _is2 = _interopRequireDefault(_is);

var _is3 = require('../date/is');

var _is4 = _interopRequireDefault(_is3);

var _is5 = require('../object/is');

var _is6 = _interopRequireDefault(_is5);

var _is7 = require('../array/is');

var _is8 = _interopRequireDefault(_is7);

var _is9 = require('../number/is');

var _is10 = _interopRequireDefault(_is9);

var _isNumericalNaN = require('../number/isNumericalNaN');

var _isNumericalNaN2 = _interopRequireDefault(_isNumericalNaN);

var _is11 = require('../regexp/is');

var _is12 = _interopRequireDefault(_is11);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//  https://tools.ietf.org/html/draft-eastlake-fnv-03

var FNV_OFFSET_BASIS_32 = 2166136261;