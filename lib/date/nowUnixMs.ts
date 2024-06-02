/**
 * Compute the current unix timestamp in milliseconds
 *
 * @returns Current unix timestamp in milliseconds
 */
function nowUnixMs ():number {
    return Math.floor(Date.now());
}

export {nowUnixMs, nowUnixMs as default};
