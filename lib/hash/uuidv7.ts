const CRYPTO = globalThis.crypto;

const HEX: string[] = [];
for (let i = 0; i < 256; i++) {
    HEX[i] = (i + 256).toString(16).substring(1);
}

const POOL_SIZE = 16 * 1024;
const pool = new Uint8Array(POOL_SIZE);
let poolIdx = POOL_SIZE;

/**
 * Generate a UUID v7 (timestamp-based, RFC 9562).
 */
function uuidv7 (): string {
    if (poolIdx + 10 > POOL_SIZE) {
        CRYPTO.getRandomValues(pool);
        poolIdx = 0;
    }

    const p = poolIdx;
    poolIdx += 10;

    /*
     * Date.now() fits in 48 bits. JS Numbers have 53 bits of precision.
     * We split it into High (16 bits relevant) and Low (32 bits) integers.
     */
    const time = Date.now();

    // Division by 2^32 gets the upper bits. The bitwise OR (| 0) coerces to 32-bit int, stripping decimals.
    const timeHi = (time / 4294967296) | 0;

    // Unsigned right shift coerces to 32-bit unsigned integer (lower bits)
    const timeLo = time >>> 0;

    return (
        // Timestamp High (32 bits)
        HEX[(timeHi >>> 8) & 0xff] +
        HEX[timeHi & 0xff] +
        HEX[(timeLo >>> 24) & 0xff] +
        HEX[(timeLo >>> 16) & 0xff] +
        '-' +
        // Timestamp Low (16 bits)
        HEX[(timeLo >>> 8) & 0xff] +
        HEX[timeLo & 0xff] +
        '-' +
        // Version 7 (High 4 bits of byte 6)
        HEX[(pool[p] & 0x0f) | 0x70] +
        HEX[pool[p + 1]] +
        '-' +
        // Block 4: Variant 10xx (High 2 bits of byte 8)
        HEX[(pool[p + 2] & 0x3f) | 0x80] +
        HEX[pool[p + 3]] +
        '-' +
        // Block 5: Random (Bytes 10-15)
        HEX[pool[p + 4]] +
        HEX[pool[p + 5]] +
        HEX[pool[p + 6]] +
        HEX[pool[p + 7]] +
        HEX[pool[p + 8]] +
        HEX[pool[p + 9]]
    );
}

export {uuidv7, uuidv7 as default};
