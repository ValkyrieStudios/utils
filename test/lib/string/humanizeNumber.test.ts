'use strict';

import {describe, it}   from 'node:test';
import * as assert      from 'node:assert/strict';
import CONSTANTS        from '../../constants';
import humanizeNumber   from '../../../lib/string/humanizeNumber';

const val_tests = [
    {v: 1000, e: '1k'},
    {v: 1024, e: '1.02k'},
    {v: 1500, e: '1.5k'},
    {v: 3584, e: '3.58k'},
    {v: 9799, e: '9.8k'},
    {v: 58432, e: '58.43k'},
    {v: 97432, e: '97.43k'},
    {v: 432443, e: '432.44k'},
    {v: 857534, e: '857.53k'},
    {v: 1000000, e: '1m'},
    {v: 1048575, e: '1.05m'},
    {v: 5242880, e: '5.24m'},
    {v: 1504230, e: '1.5m'},
    {v: 3584432, e: '3.58m'},
    {v: 9799432, e: '9.8m'},
    {v: 584324, e: '584.32k'},
    {v: 9743432, e: '9.74m'},
    {v: 43244332, e: '43.24m'},
    {v: 85753443, e: '85.75m'},
    {v: 100000032, e: '100m'},
    {v: 1073741823, e: '1.07b'},
    {v: 374237489237, e: '374.24b'},
    {v: 4893290423489, e: '4.89t'},
    {v: 4327963279469432, e: '4.33q'},
    {v: 84903298490, e: '84.9b'},
    {v: 4903278490, e: '4.9b'},
    {v: 438274237890, e: '438.27b'},
    {v: 4328904892322, e: '4.33t'},
    {v: 974238788, e: '974.24m'},
    {v: 47328748923747923479, e: '47,328.75q'}, // eslint-disable-line no-loss-of-precision,@typescript-eslint/no-loss-of-precision
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
                humanizeNumber(el.v),
                el.e
            );
        }
    });

    it('Should correctly convert a negative number', () => {
        for (const el of val_tests) {
            assert.equal(
                humanizeNumber(-el.v),
                `-${el.e}`
            );
        }
    });

    it('Should correctly convert a positive number formatted as string', () => {
        for (const el of val_tests) {
            assert.equal(
                humanizeNumber(`${el.v}`),
                el.e
            );
        }
    });

    it('Should correctly convert a negative number formatted as string', () => {
        for (const el of val_tests) {
            assert.equal(
                humanizeNumber(`-${el.v}`),
                `-${el.e}`
            );
        }
    });

    it('Should allow overriding precision', () => {
        for (const el of [
            {v: 1024, p: 10, e: '1.024k'},
            {v: 1500, p: 1, e: '1.5k'},
            {v: 1500, p: 2, e: '1.5k'},
            {v: 1500, p: 3, e: '1.5k'},
            {v: 3584, p: 1, e: '3.6k'},
            {v: 3584, p: 2, e: '3.58k'},
            {v: 3584, p: 3, e: '3.584k'},
            {v: 9799, p: 1, e: '9.8k'},
            {v: 9799, p: 4, e: '9.799k'},
            {v: 58432, p: 1, e: '58.4k'},
            {v: 58432, p: 2, e: '58.43k'},
            {v: 58432, p: 3, e: '58.432k'},
            {v: 4893290423489, p: 5, e: '4.89329t'},
            {v: 4893290423489, p: 4, e: '4.8933t'},
            {v: 4893290423489, p: 3, e: '4.893t'},
            {v: 4893290423489, p: 2, e: '4.89t'},
            {v: 4893290423489, p: 1, e: '4.9t'},
            {v: 4893290423489, p: 0, e: '5t'},
        ]) {
            assert.equal(
                humanizeNumber(`${el.v}`, {precision: el.p}),
                el.e
            );
            assert.equal(
                humanizeNumber(el.v, {precision: el.p}),
                el.e
            );
        }
    });

    it('Should allow overriding separator', () => {
        for (const el of [
            {v: 1024, p: 10, e: '1,024k'},
            {v: 1500, p: 1, e: '1,5k'},
            {v: 1500, p: 2, e: '1,5k'},
            {v: 1500, p: 3, e: '1,5k'},
            {v: 3584, p: 1, e: '3,6k'},
            {v: 3584, p: 2, e: '3,58k'},
            {v: 3584, p: 3, e: '3,584k'},
            {v: 9799, p: 1, e: '9,8k'},
            {v: 9799, p: 4, e: '9,799k'},
            {v: 58432, p: 1, e: '58,4k'},
            {v: 58432, p: 2, e: '58,43k'},
            {v: 58432, p: 3, e: '58,432k'},
            {v: 4893290423489, p: 5, e: '4,89329t'},
            {v: 4893290423489, p: 4, e: '4,8933t'},
            {v: 4893290423489, p: 3, e: '4,893t'},
            {v: 4893290423489, p: 2, e: '4,89t'},
            {v: 4893290423489, p: 1, e: '4,9t'},
            {v: 4893290423489, p: 0, e: '5t'},
        ]) {
            assert.equal(
                humanizeNumber(`${el.v}`, {precision: el.p, separator: ','}),
                el.e
            );
            assert.equal(
                humanizeNumber(el.v, {precision: el.p, separator: ','}),
                el.e
            );
        }
    });

    it('Should allow overriding separator and not trim it', () => {
        for (const el of [
            {v: 1024, p: 10, e: '1 | 024k'},
            {v: 1500, p: 1, e: '1 | 5k'},
            {v: 1500, p: 2, e: '1 | 5k'},
            {v: 1500, p: 3, e: '1 | 5k'},
            {v: 3584, p: 1, e: '3 | 6k'},
            {v: 3584, p: 2, e: '3 | 58k'},
            {v: 3584, p: 3, e: '3 | 584k'},
            {v: 9799, p: 1, e: '9 | 8k'},
            {v: 9799, p: 4, e: '9 | 799k'},
            {v: 58432, p: 1, e: '58 | 4k'},
            {v: 58432, p: 2, e: '58 | 43k'},
            {v: 58432, p: 3, e: '58 | 432k'},
            {v: 4893290423489, p: 5, e: '4 | 89329t'},
            {v: 4893290423489, p: 4, e: '4 | 8933t'},
            {v: 4893290423489, p: 3, e: '4 | 893t'},
            {v: 4893290423489, p: 2, e: '4 | 89t'},
            {v: 4893290423489, p: 1, e: '4 | 9t'},
            {v: 4893290423489, p: 0, e: '5t'},
        ]) {
            assert.equal(
                humanizeNumber(`${el.v}`, {precision: el.p, separator: ' | '}),
                el.e
            );
            assert.equal(
                humanizeNumber(el.v, {precision: el.p, separator: ' | '}),
                el.e
            );
        }
    });

    it('Should not allow turning off separator', () => {
        for (const el of [
            {v: 1024, p: 10, e: '1.024k'},
            {v: 1500, p: 1, e: '1.5k'},
            {v: 1500, p: 2, e: '1.5k'},
            {v: 1500, p: 3, e: '1.5k'},
            {v: 3584, p: 1, e: '3.6k'},
            {v: 3584, p: 2, e: '3.58k'},
            {v: 3584, p: 3, e: '3.584k'},
            {v: 9799, p: 1, e: '9.8k'},
            {v: 9799, p: 4, e: '9.799k'},
            {v: 58432, p: 1, e: '58.4k'},
            {v: 58432, p: 2, e: '58.43k'},
            {v: 58432, p: 3, e: '58.432k'},
            {v: 4893290423489, p: 5, e: '4.89329t'},
            {v: 4893290423489, p: 4, e: '4.8933t'},
            {v: 4893290423489, p: 3, e: '4.893t'},
            {v: 4893290423489, p: 2, e: '4.89t'},
            {v: 4893290423489, p: 1, e: '4.9t'},
            {v: 4893290423489, p: 0, e: '5t'},
        ]) {
            assert.equal(
                humanizeNumber(`${el.v}`, {precision: el.p, separator: ''}),
                el.e
            );
            assert.equal(
                humanizeNumber(el.v, {precision: el.p, separator: ''}),
                el.e
            );
        }
    });

    it('Should allow overriding delimiter', () => {
        for (const el of [
            {v: 1024, p: 10, e: '1,024K'},
            {v: 43244332, p: 4, e: '43.244,332K'},
            {v: 85753443, p: 3, e: '85.753,443K'},
            {v: 100000032, p: 5, e: '100.000,032K'},
            {v: 1073741823, p: 2, e: '1.073.741,82K'},
            {v: 374237489237, p: 1, e: '374.237.489,2K'},
            {v: 4893290423489, p: 0, e: '4.893.290.423K'},
            {v: 4327963279469432, p: 5, e: '4.327.963.279.469,4336K'},
        ]) {
            assert.equal(
                humanizeNumber(`${el.v}`, {precision: el.p, units: ['', 'K'], delim: '.', separator: ','}),
                el.e
            );
            assert.equal(
                humanizeNumber(el.v, {precision: el.p, units: ['', 'K'], delim: '.', separator: ','}),
                el.e
            );
        }
    });

    it('Should allow turning off delimiter by passing as empty string', () => {
        for (const el of [
            {v: 1024, p: 10, e: '1,024K'},
            {v: 43244332, p: 4, e: '43244,332K'},
            {v: 85753443, p: 3, e: '85753,443K'},
            {v: 100000032, p: 5, e: '100000,032K'},
            {v: 1073741823, p: 2, e: '1073741,82K'},
            {v: 374237489237, p: 1, e: '374237489,2K'},
            {v: 4893290423489, p: 0, e: '4893290423K'},
            {v: 4327963279469432, p: 5, e: '4327963279469,4336K'},
        ]) {
            assert.equal(
                humanizeNumber(`${el.v}`, {precision: el.p, units: ['', 'K'], delim: '', separator: ','}),
                el.e
            );
            assert.equal(
                humanizeNumber(el.v, {precision: el.p, units: ['', 'K'], delim: '', separator: ','}),
                el.e
            );
        }
    });

    it('Should allow overriding units', () => {
        for (const el of [
            {v: 20, p: 10, e: '20Jedi'},
            {v: 1024, p: 10, e: '1.024Darth'},
            {v: 43244332, p: 4, e: '43.2443Vader'},
            {v: 85753443, p: 3, e: '85.753Vader'},
            {v: 4893290423489, p: 0, e: '4,893Force'},
            {v: 4327963279469432, p: 5, e: '4,327,963.27947Force'},
        ]) {
            assert.equal(
                humanizeNumber(`${el.v}`, {precision: el.p, units: ['Jedi', 'Darth', 'Vader', 'Force']}),
                el.e
            );
            assert.equal(
                humanizeNumber(el.v, {precision: el.p, units: ['Jedi', 'Darth', 'Vader', 'Force']}),
                el.e
            );
        }
    });

    it('Should allow simply humanizing without units', () => {
        for (const el of [
            {v: 0, p: 10, e: '0'},
            {v: 20, p: 10, e: '20'},
            {v: 1024, p: 10, e: '1,024'},
            {v: 43244332.43244324, p: 4, e: '43,244,332.4324'},
            {v: 85753443, p: 3, e: '85,753,443'},
            {v: 4893290423489, p: 0, e: '4,893,290,423,489'},
            {v: 3279469432.424236, p: 5, e: '3,279,469,432.42424'},
        ]) {
            assert.equal(
                humanizeNumber(`${el.v}`, {precision: el.p, units: false}),
                el.e
            );
            assert.equal(
                humanizeNumber(el.v, {precision: el.p, units: false}),
                el.e
            );
        }
    });
});
