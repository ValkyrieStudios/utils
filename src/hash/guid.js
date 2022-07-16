'use strict';

/* eslint-disable no-bitwise */

//  RFC4122 Compliant

let performance = false;

if (typeof window !== 'undefined' && (window.performance || {}).now) {                  // eslint-disable-line no-undef
    performance = () => window.performance.now();                                       // eslint-disable-line no-undef
} else if (typeof process !== 'undefined') {                                            // eslint-disable-line no-undef
    performance = () => process.hrtime()[1];                                            // eslint-disable-line no-undef
} else {
    performance = () => 0;
}

export default function () {
    //  According to : rfc4122
    let d = new Date().getTime();

    //  use high-precision timer if available
    d += performance();

    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        const r = (d + (Math.random() * 16)) % 16 | 0;

        d = Math.floor(d / 16);

        if (c === 'x') return r.toString(16);

        return ((r & 0x3) | 0x8).toString(16);
    });
}
