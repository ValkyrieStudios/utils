import {describe, it}   from 'node:test';
import * as assert      from 'node:assert/strict';
import CONSTANTS        from '../../constants';
import humanizeNumber   from '../../../lib/string/humanizeNumber';

const val_tests = [
    {val: 1000, out: '1k'},
    {val: 1024, out: '1.02k'},
    {val: 1500, out: '1.5k'},
    {val: 3584, out: '3.58k'},
    {val: 9799, out: '9.8k'},
    {val: 58432, out: '58.43k'},
    {val: 97432, out: '97.43k'},
    {val: 432443, out: '432.44k'},
    {val: 857534, out: '857.53k'},
    {val: 1000000, out: '1m'},
    {val: 1048575, out: '1.05m'},
    {val: 5242880, out: '5.24m'},
    {val: 1504230, out: '1.5m'},
    {val: 3584432, out: '3.58m'},
    {val: 9799432, out: '9.8m'},
    {val: 584324, out: '584.32k'},
    {val: 9743432, out: '9.74m'},
    {val: 43244332, out: '43.24m'},
    {val: 85753443, out: '85.75m'},
    {val: 100000032, out: '100m'},
    {val: 1073741823, out: '1.07b'},
    {val: 374237489237, out: '374.24b'},
    {val: 4893290423489, out: '4.89t'},
    {val: 4327963279469432, out: '4.33q'},
    {val: 84903298490, out: '84.9b'},
    {val: 4903278490, out: '4.9b'},
    {val: 438274237890, out: '438.27b'},
    {val: 4328904892322, out: '4.33t'},
    {val: 974238788, out: '974.24m'},
    {val: 47328748923747923479, out: '47,328.75q'}, // eslint-disable-line no-loss-of-precision
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
                humanizeNumber(el.val),
                el.out
            );
        }
    });

    it('Should correctly convert a negative number', () => {
        for (const el of val_tests) {
            assert.equal(
                humanizeNumber(-el.val),
                `-${el.out}`
            );
        }
    });

    it('Should correctly convert a positive number formatted as string', () => {
        for (const el of val_tests) {
            assert.equal(
                humanizeNumber(`${el.val}`),
                el.out
            );
        }
    });

    it('Should correctly convert a negative number formatted as string', () => {
        for (const el of val_tests) {
            assert.equal(
                humanizeNumber(`-${el.val}`),
                `-${el.out}`
            );
        }
    });

    it('Should default to 2 decimals precision', () => {
        for (const el of [
            {val: 1024, out: '1.02k'},
            {val: 1500, out: '1.5k'},
            {val: 3584, out: '3.58k'},
            {val: 9799, out: '9.8k'},
            {val: 58432, out: '58.43k'},
            {val: 4893290423489, out: '4.89t'},
        ]) {
            assert.equal(
                humanizeNumber(`${el.val}`, {}),
                el.out
            );
            assert.equal(
                humanizeNumber(el.val, {}),
                el.out
            );
        }
    });

    it('Should allow overriding precision', () => {
        for (const el of [
            {val: 1024, precision: 10, out: '1.024k'},
            {val: 1500, precision: 1, out: '1.5k'},
            {val: 1500, precision: 2, out: '1.5k'},
            {val: 1500, precision: 3, out: '1.5k'},
            {val: 3584, precision: 1, out: '3.6k'},
            {val: 3584, precision: 2, out: '3.58k'},
            {val: 3584, precision: 3, out: '3.584k'},
            {val: 9799, precision: 1, out: '9.8k'},
            {val: 9799, precision: 4, out: '9.799k'},
            {val: 58432, precision: 1, out: '58.4k'},
            {val: 58432, precision: 2, out: '58.43k'},
            {val: 58432, precision: 3, out: '58.432k'},
            {val: 4893290423489, precision: 5, out: '4.89329t'},
            {val: 4893290423489, precision: 4, out: '4.8933t'},
            {val: 4893290423489, precision: 3, out: '4.893t'},
            {val: 4893290423489, precision: 2, out: '4.89t'},
            {val: 4893290423489, precision: 1, out: '4.9t'},
            {val: 4893290423489, precision: 0, out: '5t'},
        ]) {
            assert.equal(
                humanizeNumber(`${el.val}`, {precision: el.precision}),
                el.out
            );
            assert.equal(
                humanizeNumber(el.val, {precision: el.precision}),
                el.out
            );
        }
    });

    it('Should allow overriding separator', () => {
        for (const el of [
            {val: 1024, precision: 10, out: '1,024k'},
            {val: 1500, precision: 1, out: '1,5k'},
            {val: 1500, precision: 2, out: '1,5k'},
            {val: 1500, precision: 3, out: '1,5k'},
            {val: 3584, precision: 1, out: '3,6k'},
            {val: 3584, precision: 2, out: '3,58k'},
            {val: 3584, precision: 3, out: '3,584k'},
            {val: 9799, precision: 1, out: '9,8k'},
            {val: 9799, precision: 4, out: '9,799k'},
            {val: 58432, precision: 1, out: '58,4k'},
            {val: 58432, precision: 2, out: '58,43k'},
            {val: 58432, precision: 3, out: '58,432k'},
            {val: 4893290423489, precision: 5, out: '4,89329t'},
            {val: 4893290423489, precision: 4, out: '4,8933t'},
            {val: 4893290423489, precision: 3, out: '4,893t'},
            {val: 4893290423489, precision: 2, out: '4,89t'},
            {val: 4893290423489, precision: 1, out: '4,9t'},
            {val: 4893290423489, precision: 0, out: '5t'},
        ]) {
            assert.equal(
                humanizeNumber(`${el.val}`, {precision: el.precision, separator: ','}),
                el.out
            );
            assert.equal(
                humanizeNumber(el.val, {precision: el.precision, separator: ','}),
                el.out
            );
        }
    });

    it('Should allow overriding separator and not trim it', () => {
        for (const el of [
            {val: 1024, precision: 10, out: '1 | 024k'},
            {val: 1500, precision: 1, out: '1 | 5k'},
            {val: 1500, precision: 2, out: '1 | 5k'},
            {val: 1500, precision: 3, out: '1 | 5k'},
            {val: 3584, precision: 1, out: '3 | 6k'},
            {val: 3584, precision: 2, out: '3 | 58k'},
            {val: 3584, precision: 3, out: '3 | 584k'},
            {val: 9799, precision: 1, out: '9 | 8k'},
            {val: 9799, precision: 4, out: '9 | 799k'},
            {val: 58432, precision: 1, out: '58 | 4k'},
            {val: 58432, precision: 2, out: '58 | 43k'},
            {val: 58432, precision: 3, out: '58 | 432k'},
            {val: 4893290423489, precision: 5, out: '4 | 89329t'},
            {val: 4893290423489, precision: 4, out: '4 | 8933t'},
            {val: 4893290423489, precision: 3, out: '4 | 893t'},
            {val: 4893290423489, precision: 2, out: '4 | 89t'},
            {val: 4893290423489, precision: 1, out: '4 | 9t'},
            {val: 4893290423489, precision: 0, out: '5t'},
        ]) {
            assert.equal(
                humanizeNumber(`${el.val}`, {precision: el.precision, separator: ' | '}),
                el.out
            );
            assert.equal(
                humanizeNumber(el.val, {precision: el.precision, separator: ' | '}),
                el.out
            );
        }
    });

    it('Should not allow turning off separator', () => {
        for (const el of [
            {val: 1024, precision: 10, out: '1.024k'},
            {val: 1500, precision: 1, out: '1.5k'},
            {val: 1500, precision: 2, out: '1.5k'},
            {val: 1500, precision: 3, out: '1.5k'},
            {val: 3584, precision: 1, out: '3.6k'},
            {val: 3584, precision: 2, out: '3.58k'},
            {val: 3584, precision: 3, out: '3.584k'},
            {val: 9799, precision: 1, out: '9.8k'},
            {val: 9799, precision: 4, out: '9.799k'},
            {val: 58432, precision: 1, out: '58.4k'},
            {val: 58432, precision: 2, out: '58.43k'},
            {val: 58432, precision: 3, out: '58.432k'},
            {val: 4893290423489, precision: 5, out: '4.89329t'},
            {val: 4893290423489, precision: 4, out: '4.8933t'},
            {val: 4893290423489, precision: 3, out: '4.893t'},
            {val: 4893290423489, precision: 2, out: '4.89t'},
            {val: 4893290423489, precision: 1, out: '4.9t'},
            {val: 4893290423489, precision: 0, out: '5t'},
        ]) {
            assert.equal(
                humanizeNumber(`${el.val}`, {precision: el.precision, separator: ''}),
                el.out
            );
            assert.equal(
                humanizeNumber(el.val, {precision: el.precision, separator: ''}),
                el.out
            );
        }
    });

    it('Should allow overriding delimiter', () => {
        for (const el of [
            {val: 1024, precision: 10, out: '1,024K'},
            {val: 43244332, precision: 4, out: '43.244,332K'},
            {val: 85753443, precision: 3, out: '85.753,443K'},
            {val: 100000032, precision: 5, out: '100.000,032K'},
            {val: 1073741823, precision: 2, out: '1.073.741,82K'},
            {val: 374237489237, precision: 1, out: '374.237.489,2K'},
            {val: 4893290423489, precision: 0, out: '4.893.290.423K'},
            {val: 4327963279469432, precision: 5, out: '4.327.963.279.469,4336K'},
        ]) {
            assert.equal(
                humanizeNumber(`${el.val}`, {precision: el.precision, units: ['', 'K'], delim: '.', separator: ','}),
                el.out
            );
            assert.equal(
                humanizeNumber(el.val, {precision: el.precision, units: ['', 'K'], delim: '.', separator: ','}),
                el.out
            );
        }
    });

    it('Should allow turning off delimiter by passing as empty string', () => {
        for (const el of [
            {val: 1024, precision: 10, out: '1,024K'},
            {val: 43244332, precision: 4, out: '43244,332K'},
            {val: 85753443, precision: 3, out: '85753,443K'},
            {val: 100000032, precision: 5, out: '100000,032K'},
            {val: 1073741823, precision: 2, out: '1073741,82K'},
            {val: 374237489237, precision: 1, out: '374237489,2K'},
            {val: 4893290423489, precision: 0, out: '4893290423K'},
            {val: 4327963279469432, precision: 5, out: '4327963279469,4336K'},
        ]) {
            assert.equal(
                humanizeNumber(`${el.val}`, {precision: el.precision, units: ['', 'K'], delim: '', separator: ','}),
                el.out
            );
            assert.equal(
                humanizeNumber(el.val, {precision: el.precision, units: ['', 'K'], delim: '', separator: ','}),
                el.out
            );
        }
    });

    it('Should allow overriding units', () => {
        for (const el of [
            {val: 20, precision: 10, out: '20Jedi'},
            {val: 1024, precision: 10, out: '1.024Darth'},
            {val: 43244332, precision: 4, out: '43.2443Vader'},
            {val: 85753443, precision: 3, out: '85.753Vader'},
            {val: 4893290423489, precision: 0, out: '4,893Force'},
            {val: 4327963279469432, precision: 5, out: '4,327,963.27947Force'},
        ]) {
            assert.equal(
                humanizeNumber(`${el.val}`, {precision: el.precision, units: ['Jedi', 'Darth', 'Vader', 'Force']}),
                el.out
            );
            assert.equal(
                humanizeNumber(el.val, {precision: el.precision, units: ['Jedi', 'Darth', 'Vader', 'Force']}),
                el.out
            );
        }
    });

    it('Should allow simply humanizing without units', () => {
        for (const el of [
            {val: 0, precision: 10, out: '0'},
            {val: 20, precision: 10, out: '20'},
            {val: 1024, precision: 10, out: '1,024'},
            {val: 43244332.43244324, precision: 4, out: '43,244,332.4324'},
            {val: 85753443, precision: 3, out: '85,753,443'},
            {val: 4893290423489, precision: 0, out: '4,893,290,423,489'},
            {val: 3279469432.424236, precision: 5, out: '3,279,469,432.42424'},
        ]) {
            assert.equal(
                humanizeNumber(`${el.val}`, {precision: el.precision, units: false}),
                el.out
            );
            assert.equal(
                humanizeNumber(el.val, {precision: el.precision, units: false}),
                el.out
            );
        }
    });
});
