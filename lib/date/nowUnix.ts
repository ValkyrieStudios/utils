'use strict';

/**
 * Compute the current unix timestamp in seconds
 *
 * @returns Current unix timestamp in seconds
 */
function nowUnix ():number {
    return Math.floor(Date.now()/1000);
}

export {nowUnix, nowUnix as default};
