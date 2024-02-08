'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
function sleep(ms = 1000) {
    return new Promise(resolve => {
        setTimeout(() => resolve(), Number.isFinite(ms) && ms > 0 ? Math.round(ms) : 0);
    });
}
exports.default = sleep;
