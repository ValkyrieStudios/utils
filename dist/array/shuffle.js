'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
function shuffle(arr) {
    if (!Array.isArray(arr) || arr.length === 0)
        return;
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}
exports.default = shuffle;
