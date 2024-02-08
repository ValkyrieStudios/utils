'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const is_1 = __importDefault(require("./is"));
function toUnix(val) {
    if (!(0, is_1.default)(val))
        throw new TypeError('toUnix requires a date object');
    return Math.floor(val.valueOf() / 1000);
}
exports.default = toUnix;
