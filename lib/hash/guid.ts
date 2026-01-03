const CRYPTO = globalThis.crypto;

const HEX: string[] = [];
for (let i = 0; i < 256; i++) {
    HEX[i] = (i + 256).toString(16).substring(1);
}

const POOL_SIZE = 16 * 1024; // 16KB
const pool = new Uint8Array(POOL_SIZE);
let poolIdx = POOL_SIZE; // Start at end to trigger initial refill

/**
 * Generate a unique identifier (guid) according to RFC4122
 */
function guid (): string {
    // Refill check
    if (poolIdx + 16 > POOL_SIZE) {
        CRYPTO.getRandomValues(pool);
        poolIdx = 0;
    }

    // Capture current pointer
    const p = poolIdx;
    poolIdx += 16;

    return (
        HEX[pool[p]] +
        HEX[pool[p + 1]] +
        HEX[pool[p + 2]] +
        HEX[pool[p + 3]] +
        '-' +
        HEX[pool[p + 4]] +
        HEX[pool[p + 5]] +
        '-' +
        HEX[(pool[p + 6] & 0x0f) | 0x40] + // Version 4
        HEX[pool[p + 7]] +
        '-' +
        HEX[(pool[p + 8] & 0x3f) | 0x80] + // Variant 10...
        HEX[pool[p + 9]] +
        '-' +
        HEX[pool[p + 10]] +
        HEX[pool[p + 11]] +
        HEX[pool[p + 12]] +
        HEX[pool[p + 13]] +
        HEX[pool[p + 14]] +
        HEX[pool[p + 15]]
    );
}

export {guid, guid as default};
