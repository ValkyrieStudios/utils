'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});
exports["default"] = _default;
var _is = _interopRequireDefault(require("../string/is"));
var _is2 = _interopRequireDefault(require("../date/is"));
var _is3 = _interopRequireDefault(require("../object/is"));
var _is4 = _interopRequireDefault(require("../array/is"));
var _is5 = _interopRequireDefault(require("../number/is"));
var _isNumericalNaN = _interopRequireDefault(require("../number/isNumericalNaN"));
var _is6 = _interopRequireDefault(require("../regexp/is"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var FNV_OFFSET_BASIS_32 = 2166136261;
function _default() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : FNV_OFFSET_BASIS_32;
  var hash = offset;
  var sanitized_data = JSON.stringify(data);

  if ((0, _is["default"])(data)) {
    sanitized_data = data;
  } else if ((0, _is4["default"])(data) || (0, _is3["default"])(data)) {
    sanitized_data = JSON.stringify(data);
  } else if ((0, _is6["default"])(data)) {
    sanitized_data = String(data);
  } else if ((0, _is2["default"])(data)) {
    sanitized_data = "".concat(data.getTime());
  } else if ((0, _is5["default"])(data)) {
    sanitized_data = "".concat(data);
  } else if ((0, _isNumericalNaN["default"])(data)) {
    sanitized_data = 'NaN';
  }

  if (sanitized_data === !1) {
    throw new TypeError('An FNVA1 Hash could not be calculated for this datatype');
  }

  for (var i = 0; i < sanitized_data.length; i++) {
    hash ^= sanitized_data.charCodeAt(i);

    hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
  }
  return hash >>> 0;
}