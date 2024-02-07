'use strict';

/**
 * Compute the current unix timestamp in seconds
 *
 * @returns Current unix timestamp in seconds
 */
export default function nowUnix ():number {
    return Math.floor(Date.now()/1000);
}
