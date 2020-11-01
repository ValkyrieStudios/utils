'use strict';

//  RFC4122 Compliant

Object.defineProperty(exports, "__esModule", {
    value: !0
});

exports.default = function () {
    //  According to : rfc4122
    var d = new Date().getTime();

    //use high-precision timer if available
    d += performance();

    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;

        d = Math.floor(d / 16);
        return (c === 'x' ? r : r & 0x3 | 0x8).toString(16);
    });
};

var performance = !1;

if (typeof window !== 'undefined' && (window.performance || {}).now) {
    // eslint-disable-line no-undef
    performance = function performance() {
        return window.performance.now();
    }; // eslint-disable-line no-undef
} else if (typeof process !== 'undefined') {
    // eslint-disable-line no-undef
    performance = function performance() {
        return process.hrtime()[1];
    }; // eslint-disable-line no-undef
} else {
    performance = function performance() {
        return 0;
    };
}