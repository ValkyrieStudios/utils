'use strict';

/* eslint-disable no-bitwise, prefer-template */

//  RFC4122 Compliant

//  Generates a prebuilt hexmap from 0 to 255
const HEXMAP = [];
for (let i = 0; i < 256; i++) {
    HEXMAP[i] = (i < 16 ? '0' : '') + i.toString(16);
}

export default function guid () {
    const d0 = (Math.random()*0xffffffff) | 0;
    const d1 = (Math.random()*0xffffffff) | 0;
    const d2 = (Math.random()*0xffffffff) | 0;
    const d3 = (Math.random()*0xffffffff) | 0;
    return HEXMAP[d0 & 0xff] +
        HEXMAP[(d0 >> 8) & 0xff] +
        HEXMAP[(d0 >> 16) & 0xff] +
        HEXMAP[(d0 >> 24) & 0xff] +
        '-' +
        HEXMAP[d1 & 0xff] +
        HEXMAP[(d1 >> 8) & 0xff] +
        '-' +
        HEXMAP[((d1>>16) & 0x0f) | 0x40] +
        HEXMAP[(d1>>24) & 0xff] +
        '-' +
        HEXMAP[(d2 & 0x3f) | 0x80] +
        HEXMAP[(d2 >> 8) & 0xff] +
        '-' +
        HEXMAP[(d2 >> 16) & 0xff] +
        HEXMAP[(d2 >> 24) & 0xff] +
        HEXMAP[d3 & 0xff] +
        HEXMAP[(d3 >> 8) & 0xff] +
        HEXMAP[(d3 >> 16) & 0xff] +
        HEXMAP[(d3 >> 24) & 0xff];
}
