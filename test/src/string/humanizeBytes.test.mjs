'use strict';

import {describe, it}   from 'node:test';
import assert           from 'node:assert/strict';
import CONSTANTS        from '../../constants.mjs';
import humanizeBytes    from '../../../src/string/humanizeBytes.mjs';

const val_tests = [
    [1024, '1 KB'],
    [1500, '1.46 KB'],
    [3584, '3.5 KB'],
    [9799, '9.57 KB'],
    [58432, '57.06 KB'],
    [97432, '95.15 KB'],
    [432443, '422.31 KB'],
    [857534, '837.44 KB'],
    [1000000, '976.56 KB'],
    [1048575, '1,024 KB'],
    [5242880, '5 MB'],
    [1504230, '1.43 MB'],
    [3584432, '3.42 MB'],
    [9799432, '9.35 MB'],
    [584324, '570.63 KB'],
    [9743432, '9.29 MB'],
    [43244332, '41.24 MB'],
    [85753443, '81.78 MB'],
    [100000032, '95.37 MB'],
    [1073741823, '1,024 MB'],
    [374237489237, '348.54 GB'],
    [4893290423489, '4.45 TB'],
    [4327963279469432, '3.84 PB'],
    [84903298490, '79.07 GB'],
    [4903278490, '4.57 GB'],
    [438274237890, '408.17 GB'],
    [4328904892322, '3.94 TB'],
    [974238788, '929.11 MB'],
    [47328748923747923479, '41.05 EB'], // eslint-disable-line no-loss-of-precision
];

describe('String - humanizeBytes', () => {
    it('Should return 0 bytes when called with non-alpha-numerical value or 0', () => {
        for (const el of [...CONSTANTS.NOT_NUMERIC, 0]) {
            assert.equal(humanizeBytes(el), '0 bytes');
        }
    });

    it('Should return a positive number between 1 and 1024 (not including 1024) as bytes', () => {
        for (let i = 1; i < 1024; i++) {
            if (i < 1000) {
                assert.equal(humanizeBytes(i), `${i} bytes`);
            } else if (i < 1010) {
                assert.equal(humanizeBytes(i), `1,00${i - 1000} bytes`);
            } else {
                assert.equal(humanizeBytes(i), `1,0${i - 1000} bytes`);
            }
        }
    });

    it('Should return a negative number between 1 and 1024 (not including 1024) as bytes', () => {
        for (let i = -1; i > -1024; i--) {
            if (i > -1000) {
                assert.equal(humanizeBytes(i), `${i} bytes`);
            } else if (i > -1010) {
                assert.equal(humanizeBytes(i), `-1,00${Math.abs(i + 1000)} bytes`);
            } else {
                assert.equal(humanizeBytes(i), `-1,0${Math.abs(i + 1000)} bytes`);
            }
        }
    });

    it('Should return a positive number between 1 and 1024 formatted as string (not including 1024) as bytes', () => {
        for (let i = 1; i < 1024; i++) {
            if (i < 1000) {
                assert.equal(humanizeBytes(`${i}`), `${i} bytes`);
            } else if (i < 1010) {
                assert.equal(humanizeBytes(`${i}`), `1,00${i - 1000} bytes`);
            } else {
                assert.equal(humanizeBytes(`${i}`), `1,0${i - 1000} bytes`);
            }
        }
    });

    it('Should return a negative number between 1 and 1024 formatted as string (not including 1024) as bytes', () => {
        for (let i = -1; i > -1024; i--) {
            if (i > -1000) {
                assert.equal(humanizeBytes(`${i}`), `${i} bytes`);
            } else if (i > -1010) {
                assert.equal(humanizeBytes(`${i}`), `-1,00${Math.abs(i + 1000)} bytes`);
            } else {
                assert.equal(humanizeBytes(`${i}`), `-1,0${Math.abs(i + 1000)} bytes`);
            }
        }
    });

    it('Should correctly convert a positive number', () => {
        for (const el of val_tests) {
            assert.equal(humanizeBytes(el[0]), el[1]);
        }
    });

    it('Should correctly convert a negative number', () => {
        for (const el of val_tests) {
            assert.equal(humanizeBytes(-el[0]), `-${el[1]}`);
        }
    });

    it('Should correctly convert a positive number formatted as string', () => {
        for (const el of val_tests) {
            assert.equal(humanizeBytes(`${el[0]}`), el[1]);
        }
    });

    it('Should correctly convert a negative number formatted as string', () => {
        for (const el of val_tests) {
            assert.equal(humanizeBytes(`-${el[0]}`), `-${el[1]}`);
        }
    });

    it('Should allow overriding precision', () => {
        for (const el of [
            [1024, 10, '1 KB'],
            [1500, 1, '1.5 KB'],
            [1500, 2, '1.46 KB'],
            [1500, 3, '1.465 KB'],
            [3584, 1, '3.5 KB'],
            [3584, 2, '3.5 KB'],
            [3584, 3, '3.5 KB'],
            [9799, 1, '9.6 KB'],
            [9799, 4, '9.5693 KB'],
            [58432, 1, '57.1 KB'],
            [58432, 2, '57.06 KB'],
            [58432, 3, '57.063 KB'],
            [4893290423489, 5, '4.45042 TB'],
            [4893290423489, 4, '4.4504 TB'],
            [4893290423489, 3, '4.45 TB'],
            [4893290423489, 2, '4.45 TB'],
            [4893290423489, 1, '4.5 TB'],
            [4893290423489, 0, '4 TB'],
        ]) {
            assert.equal(
                humanizeBytes(`${el[0]}`, {precision: el[1]}),
                el[2]
            );
            assert.equal(
                humanizeBytes(el[0], {precision: el[1]}),
                el[2]
            );
        }
    });

    it('Should allow overriding separator', () => {
        for (const el of [
            [1024, 10, '1 KB'],
            [1500, 1, '1,5 KB'],
            [1500, 2, '1,46 KB'],
            [1500, 3, '1,465 KB'],
            [3584, 1, '3,5 KB'],
            [3584, 2, '3,5 KB'],
            [3584, 3, '3,5 KB'],
            [9799, 1, '9,6 KB'],
            [9799, 4, '9,5693 KB'],
            [58432, 1, '57,1 KB'],
            [58432, 2, '57,06 KB'],
            [58432, 3, '57,063 KB'],
            [4893290423489, 5, '4,45042 TB'],
            [4893290423489, 4, '4,4504 TB'],
            [4893290423489, 3, '4,45 TB'],
            [4893290423489, 2, '4,45 TB'],
            [4893290423489, 1, '4,5 TB'],
            [4893290423489, 0, '4 TB'],
        ]) {
            assert.equal(
                humanizeBytes(`${el[0]}`, {precision: el[1], separator: ','}),
                el[2]
            );
            assert.equal(
                humanizeBytes(el[0], {precision: el[1], separator: ','}),
                el[2]
            );
        }
    });

    it('Should allow overriding separator and not trim it', () => {
        for (const el of [
            [1024, 10, '1 KB'],
            [1500, 1, '1 | 5 KB'],
            [1500, 2, '1 | 46 KB'],
            [1500, 3, '1 | 465 KB'],
            [3584, 1, '3 | 5 KB'],
            [3584, 2, '3 | 5 KB'],
            [3584, 3, '3 | 5 KB'],
            [9799, 1, '9 | 6 KB'],
            [9799, 4, '9 | 5693 KB'],
            [58432, 1, '57 | 1 KB'],
            [58432, 2, '57 | 06 KB'],
            [58432, 3, '57 | 063 KB'],
            [4893290423489, 5, '4 | 45042 TB'],
            [4893290423489, 4, '4 | 4504 TB'],
            [4893290423489, 3, '4 | 45 TB'],
            [4893290423489, 2, '4 | 45 TB'],
            [4893290423489, 1, '4 | 5 TB'],
            [4893290423489, 0, '4 TB'],
        ]) {
            assert.equal(
                humanizeBytes(`${el[0]}`, {precision: el[1], separator: ' | '}),
                el[2]
            );
            assert.equal(
                humanizeBytes(el[0], {precision: el[1], separator: ' | '}),
                el[2]
            );
        }
    });

    it('Should not allow turning off separator', () => {
        for (const el of [
            [1024, 10, '1 KB'],
            [1500, 1, '1.5 KB'],
            [1500, 2, '1.46 KB'],
            [1500, 3, '1.465 KB'],
            [3584, 1, '3.5 KB'],
            [3584, 2, '3.5 KB'],
            [3584, 3, '3.5 KB'],
            [9799, 1, '9.6 KB'],
            [9799, 4, '9.5693 KB'],
            [58432, 1, '57.1 KB'],
            [58432, 2, '57.06 KB'],
            [58432, 3, '57.063 KB'],
            [4893290423489, 5, '4.45042 TB'],
            [4893290423489, 4, '4.4504 TB'],
            [4893290423489, 3, '4.45 TB'],
            [4893290423489, 2, '4.45 TB'],
            [4893290423489, 1, '4.5 TB'],
            [4893290423489, 0, '4 TB'],
        ]) {
            assert.equal(
                humanizeBytes(`${el[0]}`, {precision: el[1], separator: ''}),
                el[2]
            );
            assert.equal(
                humanizeBytes(el[0], {precision: el[1], separator: ''}),
                el[2]
            );
        }
    });

    it('Should allow overriding delimiter', () => {
        for (const el of [
            [1024, 10, '1 KB'],
            [43244332, 4, '42.230,793 KB'],
            [85753443, 3, '83.743,597 KB'],
            [100000032, 5, '97.656,28125 KB'],
            [1073741823, 2, '1.048.576 KB'],
            [374237489237, 1, '365.466.298,1 KB'],
            [4893290423489, 0, '4.778.603.929 KB'],
            [4327963279469432, 5, '4.226.526.640.106,8677 KB'],
        ]) {
            assert.equal(
                humanizeBytes(`${el[0]}`, {precision: el[1], units: [' bytes', ' KB'], delim: '.', separator: ','}),
                el[2]
            );
            assert.equal(
                humanizeBytes(el[0], {precision: el[1], units: [' bytes', ' KB'], delim: '.', separator: ','}),
                el[2]
            );
        }
    });

    it('Should allow turning off delimiter by passing as empty string', () => {
        for (const el of [
            [1024, 10, '1 KB'],
            [43244332, 4, '42230,793 KB'],
            [85753443, 3, '83743,597 KB'],
            [100000032, 5, '97656,28125 KB'],
            [1073741823, 2, '1048576 KB'],
            [374237489237, 1, '365466298,1 KB'],
            [4893290423489, 0, '4778603929 KB'],
            [4327963279469432, 5, '4226526640106,8677 KB'],
        ]) {
            assert.equal(
                humanizeBytes(`${el[0]}`, {precision: el[1], units: [' bytes', ' KB'], delim: '', separator: ','}),
                el[2]
            );
            assert.equal(
                humanizeBytes(el[0], {precision: el[1], units: [' bytes', ' KB'], delim: '', separator: ','}),
                el[2]
            );
        }
    });

    it('Should allow overriding units', () => {
        for (const el of [
            [20, 10, '20Jedi'],
            [1024, 10, '1Darth'],
            [43244332, 4, '41.241Vader'],
            [85753443, 3, '81.781Vader'],
            [4893290423489, 0, '4,557Force'],
            [4327963279469432, 5, '4,030,729.90428Force'],
        ]) {
            assert.equal(
                humanizeBytes(`${el[0]}`, {precision: el[1], units: ['Jedi', 'Darth', 'Vader', 'Force']}),
                el[2]
            );
            assert.equal(
                humanizeBytes(el[0], {precision: el[1], units: ['Jedi', 'Darth', 'Vader', 'Force']}),
                el[2]
            );
        }
    });
});
