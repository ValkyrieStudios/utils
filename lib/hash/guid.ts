/* Prebuilt hex lookup from 0 to 255 */
const HEX:string[] = [];
for (let i = 0; i < 256; i++) {
    HEX[i] = (i < 16 ? '0' : '') + i.toString(16);
}

/* Pool of randomness */
let pool = new Uint8Array(0);
let poolIdx = 0;
function refill (size = 16 * 1024) {
    pool = new Uint8Array(size);
    crypto.getRandomValues(pool);
    poolIdx = 0;
}

/**
 * Generate a unique identifier (guid) according to RFC4122
 */
function guid (): string {
    if (poolIdx + 16 > pool.length) refill();

    const buf = pool.subarray(poolIdx, poolIdx + 16);
    poolIdx += 16;

    // Per RFC4122 section 4.4, set bits for version and `clock_seq_hi_and_reserved`
    buf[6] = (buf[6] & 0x0f) | 0x40; // version
    buf[8] = (buf[8] & 0x3f) | 0x80; // variant

    return (
        HEX[buf[0]] + HEX[buf[1]] + HEX[buf[2]] + HEX[buf[3]] + '-' +
        HEX[buf[4]] + HEX[buf[5]] + '-' +
        HEX[buf[6]] + HEX[buf[7]] + '-' +
        HEX[buf[8]] + HEX[buf[9]] + '-' +
        HEX[buf[10]] + HEX[buf[11]] + HEX[buf[12]] + HEX[buf[13]] + HEX[buf[14]] + HEX[buf[15]]
    );
}

export {guid, guid as default};
