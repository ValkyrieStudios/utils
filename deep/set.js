'use strict';
Object.defineProperty(exports, "__esModule", {
  value: !0
});
exports["default"] = deepSet;
function deepSet(obj, path) {
  var value = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var define = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : !1;
  if (Object.prototype.toString.call(obj) !== '[object Object]' && !Array.isArray(obj)) throw new TypeError('Deepset is only supported for objects');
  if (typeof path !== 'string') throw new TypeError('No path was given');
  var path_s = path.trim();
  if (path_s.length === 0) throw new TypeError('No path was given');
  var parts = path_s.replace(/\[/g, '.').replace(/(\.){2,}/g, '.').replace(/(^\.|\.$|\])/g, '').split('.');
  for (var i = 0; i < parts.length - 1; i++) {
    if (parts[i] === '') continue;
    if (!obj[parts[i]]) obj[parts[i]] = {};
    obj = obj[parts[i]];
  }
  if (!Array.isArray(obj) && Object.prototype.toString.call(obj) !== '[object Object]') return !1;
  if (define) {
    Object.defineProperty(obj, parts[parts.length - 1], value);
  } else {
    obj[parts[parts.length - 1]] = value;
  }
  return !0;
}