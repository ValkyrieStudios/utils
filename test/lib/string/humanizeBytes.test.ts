'use strict';

import {describe, it}   from 'node:test';
import * as assert      from 'node:assert/strict';
import CONSTANTS        from '../../constants';
import humanizeBytes    from '../../../lib/string/humanizeBytes';

const val_tests = [
    {v: 1024, e: '1 KB'},
    {v: 1500, e: '1.46 KB'},
    {v: 3584, e: '3.5 KB'},
    {v: 9799, e: '9.57 KB'},
    {v: 58432, e: '57.06 KB'},
    {v: 97432, e: '95.15 KB'},
    {v: 432443, e: '422.31 KB'},
    {v: 857534, e: '837.44 KB'},
    {v: 1000000, e: '976.56 KB'},
    {v: 1048575, e: '1,024 KB'},
    {v: 5242880, e: '5 MB'},
    {v: 1504230, e: '1.43 MB'},
    {v: 3584432, e: '3.42 MB'},
    {v: 9799432, e: '9.35 MB'},
    {v: 584324, e: '570.63 KB'},
    {v: 9743432, e: '9.29 MB'},
    {v: 43244332, e: '41.24 MB'},
    {v: 85753443, e: '81.78 MB'},
    {v: 100000032, e: '95.37 MB'},
    {v: 1073741823, e: '1,024 MB'},
    {v: 374237489237, e: '348.54 GB'},
    {v: 4893290423489, e: '4.45 TB'},
    {v: 4327963279469432, e: '3.84 PB'},
    {v: 84903298490, e: '79.07 GB'},
    {v: 4903278490, e: '4.57 GB'},
    {v: 438274237890, e: '408.17 GB'},
    {v: 4328904892322, e: '3.94 TB'},
    {v: 974238788, e: '929.11 MB'},
    {v: 47328748923747923479, e: '41.05 EB'}, // eslint-disable-line no-loss-of-precision,@typescript-eslint/no-loss-of-precision
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
            assert.equal(humanizeBytes(el.v), el.e);
        }
    });

    it('Should correctly convert a negative number', () => {
        for (const el of val_tests) {
            assert.equal(humanizeBytes(-el.v), `-${el.e}`);
        }
    });

    it('Should correctly convert a positive number formatted as string', () => {
        for (const el of val_tests) {
            assert.equal(humanizeBytes(`${el.v}`), el.e);
        }
    });

    it('Should correctly convert a negative number formatted as string', () => {
        for (const el of val_tests) {
            assert.equal(humanizeBytes(`-${el.v}`), `-${el.e}`);
        }
    });

    it('Should allow overriding precision', () => {
        for (const el of [
            {v: 1024, p: 10, e: '1 KB'},
            {v: 1500, p: 1, e: '1.5 KB'},
            {v: 1500, p: 2, e: '1.46 KB'},
            {v: 1500, p: 3, e: '1.465 KB'},
            {v: 3584, p: 1, e: '3.5 KB'},
            {v: 3584, p: 2, e: '3.5 KB'},
            {v: 3584, p: 3, e: '3.5 KB'},
            {v: 9799, p: 1, e: '9.6 KB'},
            {v: 9799, p: 4, e: '9.5693 KB'},
            {v: 58432, p: 1, e: '57.1 KB'},
            {v: 58432, p: 2, e: '57.06 KB'},
            {v: 58432, p: 3, e: '57.063 KB'},
            {v: 4893290423489, p: 5, e: '4.45042 TB'},
            {v: 4893290423489, p: 4, e: '4.4504 TB'},
            {v: 4893290423489, p: 3, e: '4.45 TB'},
            {v: 4893290423489, p: 2, e: '4.45 TB'},
            {v: 4893290423489, p: 1, e: '4.5 TB'},
            {v: 4893290423489, p: 0, e: '4 TB'},
        ]) {
            assert.equal(
                humanizeBytes(`${el.v}`, {precision: el.p}),
                el.e
            );
            assert.equal(
                humanizeBytes(el.v, {precision: el.p}),
                el.e
            );
        }
    });

    it('Should allow overriding separator', () => {
        for (const el of [
            {v: 1024, p: 10, e: '1 KB'},
            {v: 1500, p: 1, e: '1,5 KB'},
            {v: 1500, p: 2, e: '1,46 KB'},
            {v: 1500, p: 3, e: '1,465 KB'},
            {v: 3584, p: 1, e: '3,5 KB'},
            {v: 3584, p: 2, e: '3,5 KB'},
            {v: 3584, p: 3, e: '3,5 KB'},
            {v: 9799, p: 1, e: '9,6 KB'},
            {v: 9799, p: 4, e: '9,5693 KB'},
            {v: 58432, p: 1, e: '57,1 KB'},
            {v: 58432, p: 2, e: '57,06 KB'},
            {v: 58432, p: 3, e: '57,063 KB'},
            {v: 4893290423489, p: 5, e: '4,45042 TB'},
            {v: 4893290423489, p: 4, e: '4,4504 TB'},
            {v: 4893290423489, p: 3, e: '4,45 TB'},
            {v: 4893290423489, p: 2, e: '4,45 TB'},
            {v: 4893290423489, p: 1, e: '4,5 TB'},
            {v: 4893290423489, p: 0, e: '4 TB'},
        ]) {
            assert.equal(
                humanizeBytes(`${el.v}`, {precision: el.p, separator: ','}),
                el.e
            );
            assert.equal(
                humanizeBytes(el.v, {precision: el.p, separator: ','}),
                el.e
            );
        }
    });

    it('Should allow overriding separator and not trim it', () => {
        for (const el of [
            {v: 1024, p: 10, e: '1 KB'},
            {v: 1500, p: 1, e: '1 | 5 KB'},
            {v: 1500, p: 2, e: '1 | 46 KB'},
            {v: 1500, p: 3, e: '1 | 465 KB'},
            {v: 3584, p: 1, e: '3 | 5 KB'},
            {v: 3584, p: 2, e: '3 | 5 KB'},
            {v: 3584, p: 3, e: '3 | 5 KB'},
            {v: 9799, p: 1, e: '9 | 6 KB'},
            {v: 9799, p: 4, e: '9 | 5693 KB'},
            {v: 58432, p: 1, e: '57 | 1 KB'},
            {v: 58432, p: 2, e: '57 | 06 KB'},
            {v: 58432, p: 3, e: '57 | 063 KB'},
            {v: 4893290423489, p: 5, e: '4 | 45042 TB'},
            {v: 4893290423489, p: 4, e: '4 | 4504 TB'},
            {v: 4893290423489, p: 3, e: '4 | 45 TB'},
            {v: 4893290423489, p: 2, e: '4 | 45 TB'},
            {v: 4893290423489, p: 1, e: '4 | 5 TB'},
            {v: 4893290423489, p: 0, e: '4 TB'},
        ]) {
            assert.equal(
                humanizeBytes(`${el.v}`, {precision: el.p, separator: ' | '}),
                el.e
            );
            assert.equal(
                humanizeBytes(el.v, {precision: el.p, separator: ' | '}),
                el.e
            );
        }
    });

    it('Should not allow turning off separator', () => {
        for (const el of [
            {v: 1024, p: 10, e: '1 KB'},
            {v: 1500, p: 1, e: '1.5 KB'},
            {v: 1500, p: 2, e: '1.46 KB'},
            {v: 1500, p: 3, e: '1.465 KB'},
            {v: 3584, p: 1, e: '3.5 KB'},
            {v: 3584, p: 2, e: '3.5 KB'},
            {v: 3584, p: 3, e: '3.5 KB'},
            {v: 9799, p: 1, e: '9.6 KB'},
            {v: 9799, p: 4, e: '9.5693 KB'},
            {v: 58432, p: 1, e: '57.1 KB'},
            {v: 58432, p: 2, e: '57.06 KB'},
            {v: 58432, p: 3, e: '57.063 KB'},
            {v: 4893290423489, p: 5, e: '4.45042 TB'},
            {v: 4893290423489, p: 4, e: '4.4504 TB'},
            {v: 4893290423489, p: 3, e: '4.45 TB'},
            {v: 4893290423489, p: 2, e: '4.45 TB'},
            {v: 4893290423489, p: 1, e: '4.5 TB'},
            {v: 4893290423489, p: 0, e: '4 TB'},
        ]) {
            assert.equal(
                humanizeBytes(`${el.v}`, {precision: el.p, separator: ''}),
                el.e
            );
            assert.equal(
                humanizeBytes(el.v, {precision: el.p, separator: ''}),
                el.e
            );
        }
    });

    it('Should allow overriding delimiter', () => {
        for (const el of [
            {v: 1024, p: 10, e: '1 KB'},
            {v: 43244332, p: 4, e: '42.230,793 KB'},
            {v: 85753443, p: 3, e: '83.743,597 KB'},
            {v: 100000032, p: 5, e: '97.656,28125 KB'},
            {v: 1073741823, p: 2, e: '1.048.576 KB'},
            {v: 374237489237, p: 1, e: '365.466.298,1 KB'},
            {v: 4893290423489, p: 0, e: '4.778.603.929 KB'},
            {v: 4327963279469432, p: 5, e: '4.226.526.640.106,8677 KB'},
        ]) {
            assert.equal(
                humanizeBytes(`${el.v}`, {precision: el.p, units: [' bytes', ' KB'], delim: '.', separator: ','}),
                el.e
            );
            assert.equal(
                humanizeBytes(el.v, {precision: el.p, units: [' bytes', ' KB'], delim: '.', separator: ','}),
                el.e
            );
        }
    });

    it('Should allow turning off delimiter by passing as empty string', () => {
        for (const el of [
            {v: 1024, p: 10, e: '1 KB'},
            {v: 43244332, p: 4, e: '42230,793 KB'},
            {v: 85753443, p: 3, e: '83743,597 KB'},
            {v: 100000032, p: 5, e: '97656,28125 KB'},
            {v: 1073741823, p: 2, e: '1048576 KB'},
            {v: 374237489237, p: 1, e: '365466298,1 KB'},
            {v: 4893290423489, p: 0, e: '4778603929 KB'},
            {v: 4327963279469432, p: 5, e: '4226526640106,8677 KB'},
        ]) {
            assert.equal(
                humanizeBytes(`${el.v}`, {precision: el.p, units: [' bytes', ' KB'], delim: '', separator: ','}),
                el.e
            );
            assert.equal(
                humanizeBytes(el.v, {precision: el.p, units: [' bytes', ' KB'], delim: '', separator: ','}),
                el.e
            );
        }
    });

    it('Should allow overriding units', () => {
        for (const el of [
            {v: 20, p: 10, e: '20Jedi'},
            {v: 1024, p: 10, e: '1Darth'},
            {v: 43244332, p: 4, e: '41.241Vader'},
            {v: 85753443, p: 3, e: '81.781Vader'},
            {v: 4893290423489, p: 0, e: '4,557Force'},
            {v: 4327963279469432, p: 5, e: '4,030,729.90428Force'},
        ]) {
            assert.equal(
                humanizeBytes(`${el.v}`, {precision: el.p, units: ['Jedi', 'Darth', 'Vader', 'Force']}),
                el.e
            );
            assert.equal(
                humanizeBytes(el.v, {precision: el.p, units: ['Jedi', 'Darth', 'Vader', 'Force']}),
                el.e
            );
        }
    });
});
