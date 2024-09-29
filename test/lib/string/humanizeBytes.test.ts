import {describe, it}   from 'node:test';
import * as assert      from 'node:assert/strict';
import CONSTANTS        from '../../constants';
import humanizeBytes    from '../../../lib/string/humanizeBytes';

const val_tests = [
    {val: 1024, out: '1 KB'},
    {val: 1500, out: '1.46 KB'},
    {val: 3584, out: '3.5 KB'},
    {val: 9799, out: '9.57 KB'},
    {val: 58432, out: '57.06 KB'},
    {val: 97432, out: '95.15 KB'},
    {val: 432443, out: '422.31 KB'},
    {val: 857534, out: '837.44 KB'},
    {val: 1000000, out: '976.56 KB'},
    {val: 1048575, out: '1,024 KB'},
    {val: 5242880, out: '5 MB'},
    {val: 1504230, out: '1.43 MB'},
    {val: 3584432, out: '3.42 MB'},
    {val: 9799432, out: '9.35 MB'},
    {val: 584324, out: '570.63 KB'},
    {val: 9743432, out: '9.29 MB'},
    {val: 43244332, out: '41.24 MB'},
    {val: 85753443, out: '81.78 MB'},
    {val: 100000032, out: '95.37 MB'},
    {val: 1073741823, out: '1,024 MB'},
    {val: 374237489237, out: '348.54 GB'},
    {val: 4893290423489, out: '4.45 TB'},
    {val: 4327963279469432, out: '3.84 PB'},
    {val: 84903298490, out: '79.07 GB'},
    {val: 4903278490, out: '4.57 GB'},
    {val: 438274237890, out: '408.17 GB'},
    {val: 4328904892322, out: '3.94 TB'},
    {val: 974238788, out: '929.11 MB'},
    {val: 47328748923747923479, out: '41.05 EB'}, // eslint-disable-line no-loss-of-precision
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
            assert.equal(humanizeBytes(el.val), el.out);
        }
    });

    it('Should correctly convert a negative number', () => {
        for (const el of val_tests) {
            assert.equal(humanizeBytes(-el.val), `-${el.out}`);
        }
    });

    it('Should correctly convert a positive number formatted as string', () => {
        for (const el of val_tests) {
            assert.equal(humanizeBytes(`${el.val}`), el.out);
        }
    });

    it('Should correctly convert a negative number formatted as string', () => {
        for (const el of val_tests) {
            assert.equal(humanizeBytes(`-${el.val}`), `-${el.out}`);
        }
    });

    it('Should allow overriding precision', () => {
        for (const el of [
            {val: 1024, precision: 10, out: '1 KB'},
            {val: 1500, precision: 1, out: '1.5 KB'},
            {val: 1500, precision: 2, out: '1.46 KB'},
            {val: 1500, precision: 3, out: '1.465 KB'},
            {val: 3584, precision: 1, out: '3.5 KB'},
            {val: 3584, precision: 2, out: '3.5 KB'},
            {val: 3584, precision: 3, out: '3.5 KB'},
            {val: 9799, precision: 1, out: '9.6 KB'},
            {val: 9799, precision: 4, out: '9.5693 KB'},
            {val: 58432, precision: 1, out: '57.1 KB'},
            {val: 58432, precision: 2, out: '57.06 KB'},
            {val: 58432, precision: 3, out: '57.063 KB'},
            {val: 4893290423489, precision: 5, out: '4.45042 TB'},
            {val: 4893290423489, precision: 4, out: '4.4504 TB'},
            {val: 4893290423489, precision: 3, out: '4.45 TB'},
            {val: 4893290423489, precision: 2, out: '4.45 TB'},
            {val: 4893290423489, precision: 1, out: '4.5 TB'},
            {val: 4893290423489, precision: 0, out: '4 TB'},
        ]) {
            assert.equal(
                humanizeBytes(`${el.val}`, {precision: el.precision}),
                el.out
            );
            assert.equal(
                humanizeBytes(el.val, {precision: el.precision}),
                el.out
            );
        }
    });

    it('Should allow overriding separator', () => {
        for (const el of [
            {val: 1024, precision: 10, out: '1 KB'},
            {val: 1500, precision: 1, out: '1,5 KB'},
            {val: 1500, precision: 2, out: '1,46 KB'},
            {val: 1500, precision: 3, out: '1,465 KB'},
            {val: 3584, precision: 1, out: '3,5 KB'},
            {val: 3584, precision: 2, out: '3,5 KB'},
            {val: 3584, precision: 3, out: '3,5 KB'},
            {val: 9799, precision: 1, out: '9,6 KB'},
            {val: 9799, precision: 4, out: '9,5693 KB'},
            {val: 58432, precision: 1, out: '57,1 KB'},
            {val: 58432, precision: 2, out: '57,06 KB'},
            {val: 58432, precision: 3, out: '57,063 KB'},
            {val: 4893290423489, precision: 5, out: '4,45042 TB'},
            {val: 4893290423489, precision: 4, out: '4,4504 TB'},
            {val: 4893290423489, precision: 3, out: '4,45 TB'},
            {val: 4893290423489, precision: 2, out: '4,45 TB'},
            {val: 4893290423489, precision: 1, out: '4,5 TB'},
            {val: 4893290423489, precision: 0, out: '4 TB'},
        ]) {
            assert.equal(
                humanizeBytes(`${el.val}`, {precision: el.precision, separator: ','}),
                el.out
            );
            assert.equal(
                humanizeBytes(el.val, {precision: el.precision, separator: ','}),
                el.out
            );
        }
    });

    it('Should allow overriding separator and not trim it', () => {
        for (const el of [
            {val: 1024, precision: 10, out: '1 KB'},
            {val: 1500, precision: 1, out: '1 | 5 KB'},
            {val: 1500, precision: 2, out: '1 | 46 KB'},
            {val: 1500, precision: 3, out: '1 | 465 KB'},
            {val: 3584, precision: 1, out: '3 | 5 KB'},
            {val: 3584, precision: 2, out: '3 | 5 KB'},
            {val: 3584, precision: 3, out: '3 | 5 KB'},
            {val: 9799, precision: 1, out: '9 | 6 KB'},
            {val: 9799, precision: 4, out: '9 | 5693 KB'},
            {val: 58432, precision: 1, out: '57 | 1 KB'},
            {val: 58432, precision: 2, out: '57 | 06 KB'},
            {val: 58432, precision: 3, out: '57 | 063 KB'},
            {val: 4893290423489, precision: 5, out: '4 | 45042 TB'},
            {val: 4893290423489, precision: 4, out: '4 | 4504 TB'},
            {val: 4893290423489, precision: 3, out: '4 | 45 TB'},
            {val: 4893290423489, precision: 2, out: '4 | 45 TB'},
            {val: 4893290423489, precision: 1, out: '4 | 5 TB'},
            {val: 4893290423489, precision: 0, out: '4 TB'},
        ]) {
            assert.equal(
                humanizeBytes(`${el.val}`, {precision: el.precision, separator: ' | '}),
                el.out
            );
            assert.equal(
                humanizeBytes(el.val, {precision: el.precision, separator: ' | '}),
                el.out
            );
        }
    });

    it('Should not allow turning off separator', () => {
        for (const el of [
            {val: 1024, precision: 10, out: '1 KB'},
            {val: 1500, precision: 1, out: '1.5 KB'},
            {val: 1500, precision: 2, out: '1.46 KB'},
            {val: 1500, precision: 3, out: '1.465 KB'},
            {val: 3584, precision: 1, out: '3.5 KB'},
            {val: 3584, precision: 2, out: '3.5 KB'},
            {val: 3584, precision: 3, out: '3.5 KB'},
            {val: 9799, precision: 1, out: '9.6 KB'},
            {val: 9799, precision: 4, out: '9.5693 KB'},
            {val: 58432, precision: 1, out: '57.1 KB'},
            {val: 58432, precision: 2, out: '57.06 KB'},
            {val: 58432, precision: 3, out: '57.063 KB'},
            {val: 4893290423489, precision: 5, out: '4.45042 TB'},
            {val: 4893290423489, precision: 4, out: '4.4504 TB'},
            {val: 4893290423489, precision: 3, out: '4.45 TB'},
            {val: 4893290423489, precision: 2, out: '4.45 TB'},
            {val: 4893290423489, precision: 1, out: '4.5 TB'},
            {val: 4893290423489, precision: 0, out: '4 TB'},
        ]) {
            assert.equal(
                humanizeBytes(`${el.val}`, {precision: el.precision, separator: ''}),
                el.out
            );
            assert.equal(
                humanizeBytes(el.val, {precision: el.precision, separator: ''}),
                el.out
            );
        }
    });

    it('Should allow overriding delimiter', () => {
        for (const el of [
            {val: 1024, precision: 10, out: '1 KB'},
            {val: 43244332, precision: 4, out: '42.230,793 KB'},
            {val: 85753443, precision: 3, out: '83.743,597 KB'},
            {val: 100000032, precision: 5, out: '97.656,28125 KB'},
            {val: 1073741823, precision: 2, out: '1.048.576 KB'},
            {val: 374237489237, precision: 1, out: '365.466.298,1 KB'},
            {val: 4893290423489, precision: 0, out: '4.778.603.929 KB'},
            {val: 4327963279469432, precision: 5, out: '4.226.526.640.106,8677 KB'},
        ]) {
            assert.equal(
                humanizeBytes(`${el.val}`, {precision: el.precision, units: [' bytes', ' KB'], delim: '.', separator: ','}),
                el.out
            );
            assert.equal(
                humanizeBytes(el.val, {precision: el.precision, units: [' bytes', ' KB'], delim: '.', separator: ','}),
                el.out
            );
        }
    });

    it('Should allow turning off delimiter by passing as empty string', () => {
        for (const el of [
            {val: 1024, precision: 10, out: '1 KB'},
            {val: 43244332, precision: 4, out: '42230,793 KB'},
            {val: 85753443, precision: 3, out: '83743,597 KB'},
            {val: 100000032, precision: 5, out: '97656,28125 KB'},
            {val: 1073741823, precision: 2, out: '1048576 KB'},
            {val: 374237489237, precision: 1, out: '365466298,1 KB'},
            {val: 4893290423489, precision: 0, out: '4778603929 KB'},
            {val: 4327963279469432, precision: 5, out: '4226526640106,8677 KB'},
        ]) {
            assert.equal(
                humanizeBytes(`${el.val}`, {precision: el.precision, units: [' bytes', ' KB'], delim: '', separator: ','}),
                el.out
            );
            assert.equal(
                humanizeBytes(el.val, {precision: el.precision, units: [' bytes', ' KB'], delim: '', separator: ','}),
                el.out
            );
        }
    });

    it('Should allow overriding units', () => {
        for (const el of [
            {val: 20, precision: 10, out: '20Jedi'},
            {val: 1024, precision: 10, out: '1Darth'},
            {val: 43244332, precision: 4, out: '41.241Vader'},
            {val: 85753443, precision: 3, out: '81.781Vader'},
            {val: 4893290423489, precision: 0, out: '4,557Force'},
            {val: 4327963279469432, precision: 5, out: '4,030,729.90428Force'},
        ]) {
            assert.equal(
                humanizeBytes(`${el.val}`, {precision: el.precision, units: ['Jedi', 'Darth', 'Vader', 'Force']}),
                el.out
            );
            assert.equal(
                humanizeBytes(el.val, {precision: el.precision, units: ['Jedi', 'Darth', 'Vader', 'Force']}),
                el.out
            );
        }
    });
});
