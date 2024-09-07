import {describe, it}   from 'node:test';
import * as assert      from 'node:assert/strict';
import CONSTANTS        from '../../constants';
import isLeap           from '../../../lib/date/isLeap';

describe('Date - isLeap', () => {
    it('Should be a function', () => {
        assert.ok(typeof isLeap === 'function');
    });

    it('Should not be an async function', () => {
        assert.ok(isLeap.constructor.name !== 'AsyncFunction');
    });

    it('Should return false when passed a non-date value', () => {
        for (const el of CONSTANTS.NOT_DATE) {
            assert.ok(!isLeap(el));
        }
    });

    it('Should return true when passed a value that is a leap year', () => {
        for (const el of [
            new Date('1820-11-11'),
            new Date('1820-06-20'),
            new Date('1720-08-10'),
            new Date('1756-03-01'),
            new Date('1960-12-14'),
            new Date('1960-12-24'),
            new Date('1924-07-27'),
            new Date('1720-03-14'),
            new Date('1924-10-17'),
            new Date('2000-09-10'),
            new Date('2004-07-10'),
            new Date('1704-05-23'),
            new Date('1756-07-22'),
            new Date('1820-05-21'),
            new Date('1804-03-10'),
            new Date('1888-07-20'),
            new Date('1840-08-08'),
            new Date('1840-03-03'),
            new Date('2004-02-06'),
            new Date('1704-04-10'),
            new Date('2020-04-06'),
            new Date('1840-01-01'),
            new Date('2004-11-14'),
            new Date('1820-02-15'),
            new Date('2004-06-11'),
        ]) assert.ok(isLeap(el));
    });

    it('Should return false when passed a value that is not a leap year', () => {
        for (const el of [
            new Date('1821-03-24'),
            new Date('1887-05-26'),
            new Date('2019-04-21'),
            new Date('1721-05-05'),
            new Date('1841-08-21'),
            new Date('1887-12-28'),
            new Date('1757-03-30'),
            new Date('1961-05-02'),
            new Date('2019-11-15'),
            new Date('2001-09-10'),
            new Date('1887-10-29'),
            new Date('1701-04-01'),
            new Date('1757-05-10'),
            new Date('1999-11-20'),
            new Date('1887-02-22'),
            new Date('2019-09-26'),
            new Date('1961-03-15'),
            new Date('1999-08-03'),
            new Date('1887-01-06'),
            new Date('1821-06-03'),
            new Date('2019-03-05'),
            new Date('2019-10-25'),
            new Date('1701-04-13'),
            new Date('1841-05-27'),
            new Date('1757-11-13'),
        ]) assert.ok(!isLeap(el));
    });

    it('Should return false when passed a value that is in a year divisible by 4 and 100 but not 400', () => {
        for (const el of [
            new Date('1700-02-28'),
            new Date('1800-02-28'),
            new Date('1900-02-28'),
            new Date('2100-02-28'),
            new Date('2200-02-28'),
        ]) assert.ok(!isLeap(el));
    });
});