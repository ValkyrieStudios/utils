/* Prebuilt hex lookup from 0 to 255 */
const HEX: string[] = [];
for (let i = 0; i < 256; i++) {
    HEX[i] = (i < 16 ? '0' : '') + i.toString(16);
}

let pool = new Uint8Array(0);
let poolIdx = 0;
function refill (size = 16 * 1024) {
    pool = new Uint8Array(size);
    crypto.getRandomValues(pool);
    poolIdx = 0;
}

/**
 * Generate a UUID v7 (timestamp-based, RFC 9562).
 */
function uuidv7 (): string {
    if (poolIdx + 10 > pool.length) refill();
    const rand = pool.subarray(poolIdx, poolIdx + 10);
    poolIdx += 10;

    const time = BigInt(Date.now());

    return (
        // Timestamp (48 bits = 6 bytes, big-endian)
        HEX[Number((time >> 40n) & 0xffn)] +
        HEX[Number((time >> 32n) & 0xffn)] +
        HEX[Number((time >> 24n) & 0xffn)] +
        HEX[Number((time >> 16n) & 0xffn)] +
        '-' +
        // Version 7 in high 4 bits of byte 6
        HEX[Number((time >> 8n) & 0xffn)] +
        HEX[Number(time & 0xffn)] +
        '-' +
        // Variant 10xx in high 2 bits of byte 8
        HEX[(rand[0] & 0x0f) | 0x70] +
        HEX[rand[1]] +
        '-' +
        HEX[(rand[2] & 0x3f) | 0x80] +
        HEX[rand[3]] +
        '-' +
        // Remaining random bytes
        HEX[rand[4]] +
        HEX[rand[5]] +
        HEX[rand[6]] +
        HEX[rand[7]] +
        HEX[rand[8]] +
        HEX[rand[9]]
    );
}

export {uuidv7, uuidv7 as default};
