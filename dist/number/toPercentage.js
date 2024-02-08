'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const round_1 = __importDefault(require("./round"));
function toPercentage(val, precision = 0, min = 0, max = 1) {
    if (!Number.isFinite(val) ||
        !Number.isFinite(min) ||
        !Number.isFinite(max))
        throw new TypeError('value/min/max should be numeric');
    return (0, round_1.default)(((val - min) / (max - min)) * 100, precision);
}
exports.default = toPercentage;
