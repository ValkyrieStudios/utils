'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});
exports["default"] = _default;
var _fnv1A = _interopRequireDefault(require("../hash/fnv1A"));
var _isNotEmpty = _interopRequireDefault(require("./isNotEmpty"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _default() {
  var val = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  if (!(0, _isNotEmpty["default"])(val)) return [];
  var seen = {};
  return val.filter(function (item) {
    var hash = (0, _fnv1A["default"])(item);

    if (Object.prototype.hasOwnProperty.call(seen, hash)) return !1;

    seen[hash] = !0;

    return !0;
  });
}