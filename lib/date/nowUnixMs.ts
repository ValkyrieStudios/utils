/**
 * Compute the current unix timestamp in milliseconds
 */
function nowUnixMs ():number {
    return Date.now();
}

export {nowUnixMs, nowUnixMs as default};
