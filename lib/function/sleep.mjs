'use strict';

export default function sleep (ms = 1000) {
    return new Promise(resolve => {
        setTimeout(() => resolve(), Number.isFinite(ms) && ms > 0 ? parseInt(ms) : 0);
    });
}
