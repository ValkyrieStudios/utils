'use strict';

Object.defineProperty(exports, "__esModule", {
    value: !0
});

exports.default = function (obj, path) {
    var value = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    var define = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : !1;

    if (!(0, _is2.default)(obj) && !(0, _is4.default)(obj)) throw new TypeError('Deepset is only supported for objects');

    var parts = interpolatePath(path);

    //  Build any unknown paths and set cursor
    for (var i = 0; i < parts.length - 1; i++) {
        //  If this part is an empty string, just continue
        if (parts[i] === '') continue;

        if (!obj[parts[i]]) obj[parts[i]] = {};

        //  Set cursor
        obj = obj[parts[i]];

        //  If not an array continue
        if (!(0, _is4.default)(obj)) continue;

        //  If an array and i is not the last index ... set the object to be the index on the array
        if (i < parts.length - 2) {
            obj = obj[parts[i + 1]];
            i++;
        }
    }

    //  Set the actual value on the cursor
    define ? Object.defineProperty(obj, parts[parts.length - 1], value) : obj[parts[parts.length - 1]] = value;

    return !0;
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

//  Set a value for a path in a json-like structure