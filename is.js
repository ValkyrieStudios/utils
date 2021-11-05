'use strict';

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var _is = require('./array/is');

var _is2 = _interopRequireDefault(_is);

var _isNotEmpty = require('./array/isNotEmpty');

var _isNotEmpty2 = _interopRequireDefault(_isNotEmpty);

var _is3 = require('./boolean/is');

var _is4 = _interopRequireDefault(_is3);

var _is5 = require('./date/is');

var _is6 = _interopRequireDefault(_is5);

var _is7 = require('./formdata/is');

var _is8 = _interopRequireDefault(_is7);

var _is9 = require('./function/is');

var _is10 = _interopRequireDefault(_is9);

var _is11 = require('./number/is');

var _is12 = _interopRequireDefault(_is11);

var _isBetween = require('./number/isBetween');

var _isBetween2 = _interopRequireDefault(_isBetween);

var _is13 = require('./regexp/is');

var _is14 = _interopRequireDefault(_is13);

var _is15 = require('./object/is');

var _is16 = _interopRequireDefault(_is15);

var _isNotEmpty3 = require('./object/isNotEmpty');

var _isNotEmpty4 = _interopRequireDefault(_isNotEmpty3);

var _is17 = require('./string/is');

var _is18 = _interopRequireDefault(_is17);

var _isBetween3 = require('./string/isBetween');

var _isBetween4 = _interopRequireDefault(_isBetween3);

var _isNotEmpty5 = require('./string/isNotEmpty');

var _isNotEmpty6 = _interopRequireDefault(_isNotEmpty5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Is = Object.freeze(Object.defineProperties(Object.create(null), {
    Array: { enumerable: !0, writable: !1, configurable: !1, value: _is2.default },
    NotEmptyArray: { enumerable: !0, writable: !1, configurable: !1, value: _isNotEmpty2.default },
    Boolean: { enumerable: !0, writable: !1, configurable: !1, value: _is4.default },
    Date: { enumerable: !0, writable: !1, configurable: !1, value: _is6.default },
    FormData: { enumerable: !0, writable: !1, configurable: !1, value: _is8.default },
    Function: { enumerable: !0, writable: !1, configurable: !1, value: _is10.default },
    Number: { enumerable: !0, writable: !1, configurable: !1, value: _is12.default },
    NumberBetween: { enumerable: !0, writable: !1, configurable: !1, value: _isBetween2.default },
    RegExp: { enumerable: !0, writable: !1, configurable: !1, value: _is14.default },
    Object: { enumerable: !0, writable: !1, configurable: !1, value: _is16.default },
    NotEmptyObject: { enumerable: !0, writable: !1, configurable: !1, value: _isNotEmpty4.default },
    String: { enumerable: !0, writable: !1, configurable: !1, value: _is18.default },
    StringBetween: { enumerable: !0, writable: !1, configurable: !1, value: _isBetween4.default },
    NotEmptyString: { enumerable: !0, writable: !1, configurable: !1, value: _isNotEmpty6.default }
}));

exports.default = Is;