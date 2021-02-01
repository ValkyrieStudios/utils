'use strict';

//  Return a promise that only resolves after X milliseconds (interesting for async/await structures
//  where we want to sleep for X milliseconds)
//  example usage: await sleep(1000);
//
//  (default sleep = 1000ms)
export default function (milliseconds = 1000) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(), milliseconds);
    });
}

