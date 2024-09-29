/* Prebuilt hexmap from 0 to 255 */
const HEX:string[] = [];
for (let i = 0; i < 256; i++) {
    HEX[i] = (i < 16 ? '0' : '') + i.toString(16);
}

/**
 * Generate a unique identifier (guid) according to RFC4122
 */
function guid ():string {
    const d0 = (Math.random()*0xffffffff) | 0;
    const d1 = (Math.random()*0xffffffff) | 0;
    const d2 = (Math.random()*0xffffffff) | 0;
    const d3 = (Math.random()*0xffffffff) | 0;
    return HEX[d0 & 0xff] +
        HEX[(d0 >> 8) & 0xff] +
        HEX[(d0 >> 16) & 0xff] +
        HEX[(d0 >> 24) & 0xff] +
        '-' +
        HEX[d1 & 0xff] +
        HEX[(d1 >> 8) & 0xff] +
        '-' +
        HEX[((d1>>16) & 0x0f) | 0x40] +
        HEX[(d1>>24) & 0xff] +
        '-' +
        HEX[(d2 & 0x3f) | 0x80] +
        HEX[(d2 >> 8) & 0xff] +
        '-' +
        HEX[(d2 >> 16) & 0xff] +
        HEX[(d2 >> 24) & 0xff] +
        HEX[d3 & 0xff] +
        HEX[(d3 >> 8) & 0xff] +
        HEX[(d3 >> 16) & 0xff] +
        HEX[(d3 >> 24) & 0xff];
}

export {guid, guid as default};
