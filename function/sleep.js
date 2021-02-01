'use strict';

//  Return a promise that only resolves after X milliseconds (interesting for async/await structures
//  where we want to sleep for X milliseconds)
//  example usage: await sleep(1000);
//
//  (default sleep = 1000ms)

Object.defineProperty(exports, "__esModule", {
    value: !0
});

exports.default = function () {
    var milliseconds = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1000;

    return new Promise(function (resolve) {
        setTimeout(function () {
            return resolve();
        }, milliseconds);
    });
};