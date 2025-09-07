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
 * Generate a unique hex id
 *
 * @param size number of random bytes (id length = size * 2 chars)
 */
function hexId (size: number): string {
    if (!Number.isInteger(size) || size <= 0) return '';

    if (poolIdx + size > pool.length) refill();

    const buf = pool.subarray(poolIdx, poolIdx + size);
    poolIdx += size;

    let out = '';
    for (let i = 0; i < buf.length; i++) {
        out += HEX[buf[i]];
    }
    return out;
}

export {hexId, hexId as default};
