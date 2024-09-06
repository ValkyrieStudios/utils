/**
 * Compute the current unix timestamp in seconds
 */
function nowUnix ():number {
    return (Date.now()/1000) | 0;
}

export {nowUnix, nowUnix as default};
