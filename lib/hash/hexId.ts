const CRYPTO = globalThis.crypto;

const HEX: string[] = [];
for (let i = 0; i < 256; i++) {
    HEX[i] = (i + 256).toString(16).substring(1);
}

const POOL_SIZE = 16 * 1024;
const pool = new Uint8Array(POOL_SIZE);
let poolIdx = POOL_SIZE; // Start at end to force initial refill

/**
 * Generate a unique hex id
 *
 * @param size number of random bytes (id length = size * 2 chars)
 */
function hexId (size: number): string {
    if (typeof size !== 'number' || size <= 0 || (size | 0) !== size) return '';

    // If request is larger than the entire pool, skip the pool logic to avoid thrashing/multiple refills.
    if (size > POOL_SIZE) {
        const buf = new Uint8Array(size);
        CRYPTO.getRandomValues(buf);
        let out = '';
        for (let i = 0; i < size; i++) {
            out += HEX[buf[i]];
        }
        return out;
    }

    // Refill if necessary
    if (poolIdx + size > POOL_SIZE) {
        CRYPTO.getRandomValues(pool);
        poolIdx = 0;
    }

    let i = poolIdx;
    const end = i + size;
    poolIdx += size;

    let out = '';
    while (i < end) out += HEX[pool[i++]];
    return out;
}

export {hexId, hexId as default};
