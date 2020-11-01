'use strict';

Object.defineProperty(exports, "__esModule", {
    value: !0
});

exports.default = function (obj, path) {
    var get_parent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : !1;

    if (!(0, _is2.default)(obj) && !(0, _is4.default)(obj)) throw new TypeError('Deepget is only supported for objects');

    var parts = interpolatePath(path);

    //  Return obj if no parts were passed or if only 1 part and get_parent is true
    if (parts.length === 0 || parts.length === 1 && get_parent) return obj;

    //  Cut last part if get_parent
    if (get_parent) parts.pop();

    var cursor = obj;

    while (parts.length > 0) {
        cursor = (0, _is4.default)(cursor) ? cursor[parseInt(parts.shift())] : cursor[parts.shift()];
    }

    //  false | 0 | '' will all negate the ternary, hence we do extra checks here
    //  to make sure none of them comes back as undefined
    return cursor || cursor === !1 || cursor === 0 || cursor === '' ? cursor : undefined;
};

var _is = require('../object/is');

var _is2 = _interopRequireDefault(_is);

var _is3 = require('../array/is');

var _is4 = _interopRequireDefault(_is3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

//  Cleanup paths : a.b[2].c --> ['a', 'b', '2', 'c'] ( faster processing )
function interpolatePath(path) {
    if (!path) throw new TypeError('No Path was given');
    if ((0, _is4.default)(path)) return [].concat(_toConsumableArray(path));
    return path.replace('[', '.').replace(']', '').split('.');
}

//  Get a value from a path in a json-like structure