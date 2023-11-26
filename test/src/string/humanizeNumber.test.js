'use strict';

import {describe, it}   from 'node:test';
import assert           from 'node:assert/strict';
import CONSTANTS        from '../../constants.js';
import humanizeNumber    from '../../../src/string/humanizeNumber.js';

const val_tests = [
    [1000, '1k'],
    [1024, '1.02k'],
    [1500, '1.5k'],
    [3584, '3.58k'],
    [9799, '9.8k'],
    [58432, '58.43k'],
    [97432, '97.43k'],
    [432443, '432.44k'],
    [857534, '857.53k'],
    [1000000, '1m'],
    [1048575, '1.05m'],
    [5242880, '5.24m'],
    [1504230, '1.5m'],
    [3584432, '3.58m'],
    [9799432, '9.8m'],
    [584324, '584.32k'],
    [9743432, '9.74m'],
    [43244332, '43.24m'],
    [85753443, '85.75m'],
    [100000032, '100m'],
    [1073741823, '1.07b'],
    [374237489237, '374.24b'],
    [4893290423489, '4.89t'],
    [4327963279469432, '4.33q'],
    [84903298490, '84.9b'],
    [4903278490, '4.9b'],
    [438274237890, '438.27b'],
    [4328904892322, '4.33t'],
    [974238788, '974.24m'],
    [47328748923747923479, '47,328.75q'], // eslint-disable-line no-loss-of-precision
];

describe('String - humanizeNumber', () => {
    it('Should return 0 when called with non-alpha-numerical value or 0', () => {
        for (const el of [...CONSTANTS.NOT_NUMERIC, 0]) {
            assert.equal(humanizeNumber(el), '0');
        }
    });

    it('Should return a positive number between 1 and 1000 (not including 1000) without any unit', () => {
        for (let i = 1; i < 1000; i++) {
            assert.equal(humanizeNumber(i), `${i}`);
        }
    });

    it('Should return a negative number between 1 and 1000 (not including 1000) without any unit', () => {
        for (let i = -1; i > -1000; i--) {
            assert.equal(humanizeNumber(i), `${i}`);
        }
    });

    it('Should return a positive number between 1 and 1000 formatted as string (not including 1000) without any unit', () => {
        for (let i = 1; i < 1000; i++) {
            assert.equal(humanizeNumber(`${i}`), `${i}`);
        }
    });

    it('Should return a negative number between 1 and 1000 formatted as string (not including 1000) without any unit', () => {
        for (let i = -1; i > -1000; i--) {
            assert.equal(humanizeNumber(`${i}`), `${i}`);
        }
    });

    it('Should correctly convert a positive number', () => {
        for (const el of val_tests) {
            assert.equal(
                humanizeNumber(el[0]),
                el[1]
            );
        }
    });

    it('Should correctly convert a negative number', () => {
        for (const el of val_tests) {
            assert.equal(
                humanizeNumber(-el[0]),
                `-${el[1]}`
            );
        }
    });

    it('Should correctly convert a positive number formatted as string', () => {
        for (const el of val_tests) {
            assert.equal(
                humanizeNumber(`${el[0]}`),
                el[1]
            );
        }
    });

    it('Should correctly convert a negative number formatted as string', () => {
        for (const el of val_tests) {
            assert.equal(
                humanizeNumber(`-${el[0]}`),
                `-${el[1]}`
            );
        }
    });

    it('Should allow overriding precision', () => {
        for (const el of [
            [1024, 10, '1.024k'],
            [1500, 1, '1.5k'],
            [1500, 2, '1.5k'],
            [1500, 3, '1.5k'],
            [3584, 1, '3.6k'],
            [3584, 2, '3.58k'],
            [3584, 3, '3.584k'],
            [9799, 1, '9.8k'],
            [9799, 4, '9.799k'],
            [58432, 1, '58.4k'],
            [58432, 2, '58.43k'],
            [58432, 3, '58.432k'],
            [4893290423489, 5, '4.89329t'],
            [4893290423489, 4, '4.8933t'],
            [4893290423489, 3, '4.893t'],
            [4893290423489, 2, '4.89t'],
            [4893290423489, 1, '4.9t'],
            [4893290423489, 0, '5t'],
        ]) {
            assert.equal(
                humanizeNumber(`${el[0]}`, {precision: el[1]}),
                el[2]
            );
            assert.equal(
                humanizeNumber(el[0], {precision: el[1]}),
                el[2]
            );
        }
    });

    it('Should allow overriding separator', () => {
        for (const el of [
            [1024, 10, '1,024k'],
            [1500, 1, '1,5k'],
            [1500, 2, '1,5k'],
            [1500, 3, '1,5k'],
            [3584, 1, '3,6k'],
            [3584, 2, '3,58k'],
            [3584, 3, '3,584k'],
            [9799, 1, '9,8k'],
            [9799, 4, '9,799k'],
            [58432, 1, '58,4k'],
            [58432, 2, '58,43k'],
            [58432, 3, '58,432k'],
            [4893290423489, 5, '4,89329t'],
            [4893290423489, 4, '4,8933t'],
            [4893290423489, 3, '4,893t'],
            [4893290423489, 2, '4,89t'],
            [4893290423489, 1, '4,9t'],
            [4893290423489, 0, '5t'],
        ]) {
            assert.equal(
                humanizeNumber(`${el[0]}`, {precision: el[1], separator: ','}),
                el[2]
            );
            assert.equal(
                humanizeNumber(el[0], {precision: el[1], separator: ','}),
                el[2]
            );
        }
    });

    it('Should allow overriding separator and not trim it', () => {
        for (const el of [
            [1024, 10, '1 | 024k'],
            [1500, 1, '1 | 5k'],
            [1500, 2, '1 | 5k'],
            [1500, 3, '1 | 5k'],
            [3584, 1, '3 | 6k'],
            [3584, 2, '3 | 58k'],
            [3584, 3, '3 | 584k'],
            [9799, 1, '9 | 8k'],
            [9799, 4, '9 | 799k'],
            [58432, 1, '58 | 4k'],
            [58432, 2, '58 | 43k'],
            [58432, 3, '58 | 432k'],
            [4893290423489, 5, '4 | 89329t'],
            [4893290423489, 4, '4 | 8933t'],
            [4893290423489, 3, '4 | 893t'],
            [4893290423489, 2, '4 | 89t'],
            [4893290423489, 1, '4 | 9t'],
            [4893290423489, 0, '5t'],
        ]) {
            assert.equal(
                humanizeNumber(`${el[0]}`, {precision: el[1], separator: ' | '}),
                el[2]
            );
            assert.equal(
                humanizeNumber(el[0], {precision: el[1], separator: ' | '}),
                el[2]
            );
        }
    });

    it('Should not allow turning off separator', () => {
        for (const el of [
            [1024, 10, '1.024k'],
            [1500, 1, '1.5k'],
            [1500, 2, '1.5k'],
            [1500, 3, '1.5k'],
            [3584, 1, '3.6k'],
            [3584, 2, '3.58k'],
            [3584, 3, '3.584k'],
            [9799, 1, '9.8k'],
            [9799, 4, '9.799k'],
            [58432, 1, '58.4k'],
            [58432, 2, '58.43k'],
            [58432, 3, '58.432k'],
            [4893290423489, 5, '4.89329t'],
            [4893290423489, 4, '4.8933t'],
            [4893290423489, 3, '4.893t'],
            [4893290423489, 2, '4.89t'],
            [4893290423489, 1, '4.9t'],
            [4893290423489, 0, '5t'],
        ]) {
            assert.equal(
                humanizeNumber(`${el[0]}`, {precision: el[1], separator: ''}),
                el[2]
            );
            assert.equal(
                humanizeNumber(el[0], {precision: el[1], separator: ''}),
                el[2]
            );
        }
    });

    it('Should allow overriding delimiter', () => {
        for (const el of [
            [1024, 10, '1,024K'],
            [43244332, 4, '43.244,332K'],
            [85753443, 3, '85.753,443K'],
            [100000032, 5, '100.000,032K'],
            [1073741823, 2, '1.073.741,82K'],
            [374237489237, 1, '374.237.489,2K'],
            [4893290423489, 0, '4.893.290.423K'],
            [4327963279469432, 5, '4.327.963.279.469,4336K'],
        ]) {
            assert.equal(
                humanizeNumber(`${el[0]}`, {precision: el[1], units: ['', 'K'], delim: '.', separator: ','}),
                el[2]
            );
            assert.equal(
                humanizeNumber(el[0], {precision: el[1], units: ['', 'K'], delim: '.', separator: ','}),
                el[2]
            );
        }
    });

    it('Should allow turning off delimiter by passing as empty string', () => {
        for (const el of [
            [1024, 10, '1,024K'],
            [43244332, 4, '43244,332K'],
            [85753443, 3, '85753,443K'],
            [100000032, 5, '100000,032K'],
            [1073741823, 2, '1073741,82K'],
            [374237489237, 1, '374237489,2K'],
            [4893290423489, 0, '4893290423K'],
            [4327963279469432, 5, '4327963279469,4336K'],
        ]) {
            assert.equal(
                humanizeNumber(`${el[0]}`, {precision: el[1], units: ['', 'K'], delim: '', separator: ','}),
                el[2]
            );
            assert.equal(
                humanizeNumber(el[0], {precision: el[1], units: ['', 'K'], delim: '', separator: ','}),
                el[2]
            );
        }
    });

    it('Should allow overriding units', () => {
        for (const el of [
            [20, 10, '20Jedi'],
            [1024, 10, '1.024Darth'],
            [43244332, 4, '43.2443Vader'],
            [85753443, 3, '85.753Vader'],
            [4893290423489, 0, '4,893Force'],
            [4327963279469432, 5, '4,327,963.27947Force'],
        ]) {
            assert.equal(
                humanizeNumber(`${el[0]}`, {precision: el[1], units: ['Jedi', 'Darth', 'Vader', 'Force']}),
                el[2]
            );
            assert.equal(
                humanizeNumber(el[0], {precision: el[1], units: ['Jedi', 'Darth', 'Vader', 'Force']}),
                el[2]
            );
        }
    });

    it('Should allow simply humanizing without units', () => {
        for (const el of [
            [0, 10, '0'],
            [20, 10, '20'],
            [1024, 10, '1,024'],
            [43244332.43244324, 4, '43,244,332.4324'],
            [85753443, 3, '85,753,443'],
            [4893290423489, 0, '4,893,290,423,489'],
            [3279469432.424236, 5, '3,279,469,432.42424'],
        ]) {
            assert.equal(
                humanizeNumber(`${el[0]}`, {precision: el[1], units: false}),
                el[2]
            );
            assert.equal(
                humanizeNumber(el[0], {precision: el[1], units: false}),
                el[2]
            );
        }
    });
});
