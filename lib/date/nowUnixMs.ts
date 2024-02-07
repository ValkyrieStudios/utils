'use strict';

/**
 * Compute the current unix timestamp in milliseconds
 *
 * @returns Current unix timestamp in milliseconds
 */
export default function nowUnixMs ():number {
    return Math.floor(Date.now());
}
