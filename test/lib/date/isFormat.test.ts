import {describe, it}   from 'node:test';
import * as assert      from 'node:assert/strict';
import CONSTANTS        from '../../constants';
import isDateFormat     from '../../../lib/date/isFormat';

describe('Date - isDateFormat', () => {
    it('Throw when passed a non-string for val', () => {
        for (const el of CONSTANTS.NOT_STRING) {
            assert.throws(
                () => isDateFormat(el, 'YYYY-MM-DD'),
                new TypeError('isDateFormat: input must be a string')
            );
        }
    });

    it('Throw when passed a non-string for spec', () => {
        for (const el of CONSTANTS.NOT_STRING) {
            assert.throws(
                () => isDateFormat('2024-04-06', el),
                new TypeError('isDateFormat: spec must be a string')
            );
        }
    });

    it('Should throw when passed a spec with incorrect brackets', () => {
        assert.throws(
            () => isDateFormat('2024-04-06', 'YYYY-[MM-DD'),
            new Error('isDateFormat: Unmatched [ in format string')
        );
    });

    it('Should return false if the spec contains no valid tokens', () => {
        for (const {input, spec} of [
            // Year-Month-Day
            {input: '2024-04-06', spec: '--'},
            {input: '2024-Q[5]', spec: '[Q]'},
        ]) {
            assert.ok(!isDateFormat(input, spec));
        }
    });

    it('Should correctly handle values valid to the spec', () => {
        for (const {input, spec} of [
            // Year-Month-Day
            {input: '2024-04-06', spec: 'YYYY-MM-DD'},
            {input: '0001-01-01', spec: 'YYYY-MM-DD'},
            {input: '1999-12-31', spec: 'YYYY-MM-DD'},
            {input: '2024-02-29', spec: 'YYYY-MM-DD'},
            {input: '2999-12-31', spec: 'YYYY-MM-DD'},

            // Hour-Minute-Second
            {input: '12:30:45', spec: 'HH:mm:ss'},
            {input: '00:00:00', spec: 'HH:mm:ss'},
            {input: '23:59:59', spec: 'HH:mm:ss'},
            {input: '15:45:30', spec: 'HH:mm:ss'},
            {input: '09:07:05', spec: 'HH:mm:ss'},

            // Hour-Minute
            {input: '12:00', spec: 'HH:mm'},
            {input: '15:45', spec: 'HH:mm'},
            {input: '09:07', spec: 'HH:mm'},
            {input: '23:59', spec: 'HH:mm'},
            {input: '00:00', spec: 'HH:mm'},

            // Year-Quarter
            {input: '2024-Q1', spec: 'YYYY-[Q]Q'},
            {input: '2024-Q2', spec: 'YYYY-[Q]Q'},
            {input: '2024-Q3', spec: 'YYYY-[Q]Q'},
            {input: '2024-Q4', spec: 'YYYY-[Q]Q'},

            // Year-Month-Day Hour-Minute-Second
            {input: '2024-04-06 12:30:45', spec: 'YYYY-MM-DD HH:mm:ss'},
            {input: '1999-12-31 23:59:59', spec: 'YYYY-MM-DD HH:mm:ss'},
            {input: '2024-02-29 00:00:00', spec: 'YYYY-MM-DD HH:mm:ss'},
            {input: '2024-12-25 15:45:30', spec: 'YYYY-MM-DD HH:mm:ss'},

            // Year-Month-Day Hour-Minute-Second.Millisecond
            {input: '2024-03-09 15:45:30.123', spec: 'YYYY-MM-DD HH:mm:ss.SSS'},
            {input: '1999-12-31 23:59:59.999', spec: 'YYYY-MM-DD HH:mm:ss.SSS'},
            {input: '2024-01-01 00:00:00.001', spec: 'YYYY-MM-DD HH:mm:ss.SSS'},
            {input: '2024-07-04 12:00:00.000', spec: 'YYYY-MM-DD HH:mm:ss.SSS'},

            // Edge Cases
            {input: '01:01:01.001', spec: 'HH:mm:ss.SSS'},
            {input: '23:59', spec: 'HH:mm'},
            {input: '11:59 AM', spec: 'HH:mm A'},
            {input: '11:59 PM', spec: 'HH:mm A'},
            {input: '11:59 am', spec: 'HH:mm a'},
            {input: '11:59 pm', spec: 'HH:mm a'},
            {input: '2024-04-06T12:30:45', spec: 'YYYY-MM-DDTHH:mm:ss'},
            {input: '2024-04-06T12:30:45.123', spec: 'YYYY-MM-DDTHH:mm:ss.SSS'},

            // Custom cases
            {input: '2024-04', spec: 'YYYY-MM'},
            {input: '2024', spec: 'YYYY'},
            {input: '04-2024', spec: 'MM-YYYY'},
            {input: '06-04-2024', spec: 'DD-MM-YYYY'},
            {input: '15:30', spec: 'HH:mm'},
            {input: '04-30', spec: 'MM-DD'},
            {input: '12', spec: 'HH'},
            {input: '45', spec: 'mm'},
            {input: '30', spec: 'ss'},
        ]) {
            assert.ok(isDateFormat(input, spec), `Expected ${input} to match spec ${spec}`);
        }
    });

    it('Should correctly handle values invalid to the spec', () => {
        for (const {input, spec} of [
            // Invalid dates
            {input: '2024-00-01', spec: 'YYYY-MM-DD'},
            {input: '2024-13-01', spec: 'YYYY-MM-DD'},
            {input: '2024-02-30', spec: 'YYYY-MM-DD'},
            {input: '2024-04-31', spec: 'YYYY-MM-DD'},
            {input: '2024-06-31', spec: 'YYYY-MM-DD'},

            // Invalid times
            {input: '25:00:00', spec: 'HH:mm:ss'},
            {input: '12:60:00', spec: 'HH:mm:ss'},
            {input: '12:30:60', spec: 'HH:mm:ss'},
            {input: '12:34:56.9999', spec: 'HH:mm:ss.SSS'},
            {input: '12:34', spec: 'HH:mm:ss'},

            // Invalid quarters
            {input: '2024-Q0', spec: 'YYYY-Q'},
            {input: '2024-Q5', spec: 'YYYY-Q'},
            {input: '2024-Q5', spec: 'YYYY-[Q]Q'},

            // Missing parts
            {input: '2024-04', spec: 'YYYY-MM-DD'},
            {input: '12:34', spec: 'HH:mm:ss'},
            {input: '2:34:14', spec: 'HH:mm:ss'},
            {input: '02:4:14', spec: 'HH:mm:ss'},
            {input: '02:04:4', spec: 'HH:mm:ss'},
            {input: '2024-04-06', spec: 'YYYY-MM'},

            // Completely wrong format
            {input: '06/04/2024', spec: 'YYYY-MM-DD'},
            {input: '12:34:56', spec: 'YYYY-MM-DD'},
            {input: '2024-06-04', spec: 'HH:mm:ss'},

            // Additional invalid dates and times
            {input: '2023-02-29', spec: 'YYYY-MM-DD'},
            {input: '2024-04-06 12:30', spec: 'YYYY-MM-DD HH:mm:ss'},
            {input: '2024-12-25T12:00:00Z', spec: 'YYYY-MM-DD HH:mm:ss'},
            {input: '2024-04-06T12:30:45.12', spec: 'YYYY-MM-DDTHH:mm:ss.SSS'},
            {input: '2024-04-06 12:30:45.', spec: 'YYYY-MM-DD HH:mm:ss.SSS'},
            {input: '21:59 AM', spec: 'HH:mm A'},
            {input: '21:59 PM', spec: 'HH:mm A'},
            {input: '12:59 am', spec: 'HH:mm a'},
            {input: '12:59 pm', spec: 'HH:mm a'},

            // Additional wrong formats
            {input: '123456', spec: 'HH:mm:ss'},
            {input: '99:99', spec: 'HH:mm'},
            {input: '2024-14', spec: 'YYYY-MM'},
            {input: '45', spec: 'HH:mm:ss'},
            {input: 'abc', spec: 'YYYY-MM-DD'},
            {input: '2024-Q', spec: 'YYYY-[Q]Q'},
            {input: '2024-Q1', spec: 'YYYY-[Q][Q]'},
            {input: ' a2024-02-01 ', spec: 'YYYY-MM-DD'},
            {input: ' a06:20:29 ', spec: 'HH:mm:ss'},
            {input: ' 06:20:29 ', spec: 'HH:mm:ss'},
            {input: '24:00:00', spec: 'HH:mm:ss'},
            {input: '12:60:60', spec: 'HH:mm:ss'},
            {input: '2024-4-6', spec: 'YYYY-M-D'},
            {input: '2024-4-06', spec: 'YYYY-M-DD'},

            // Edge cases
            {input: '2024-W15-7', spec: 'YYYY-MM-DD'},
            {input: '24:00:00', spec: 'HH:mm:ss'},
            {input: '2024-12-25', spec: 'MM-DD-YYYY'},
            {input: '2024-01', spec: 'YYYY'},
            {input: '01', spec: 'HH:mm'},

            // Boundary violations
            {input: '12:34:56.1234', spec: 'HH:mm:ss.SSS'},
            {input: '2024-00-00', spec: 'YYYY-MM-DD'},
            {input: '2024-Q', spec: 'YYYY-Q'},
            {input: '15:61', spec: 'HH:mm'},
            {input: '99:99:99', spec: 'HH:mm:ss'},
            {input: '2024-01-00', spec: 'YYYY-MM-DD'},
            {input: '2024-12-32', spec: 'YYYY-MM-DD'},
            {input: '04-31', spec: 'MM-DD'},
            {input: '00:00:60', spec: 'HH:mm:ss'},
            {input: '2024/04/06', spec: 'YYYY-MM-DD'},
            {input: '20240406', spec: 'YYYY-MM-DD'},
        ]) {
            assert.ok(!isDateFormat(input, spec), `Expected ${input} not to match spec ${spec}`);
        }
    });

    describe('Optional Format Handling', () => {
        it('Should throw when passed a spec with a missing close }', () => {
            assert.throws(
                () => isDateFormat('2024-02-07', 'YYYY-MM-DD{THH:mm:ss'),
                new Error('isDateFormat: Unmatched { in format string')
            );
        });

        it('Should correctly handle valid values', () => {
            for (const {input, spec} of [
                {input: '2024-02-07', spec: 'YYYY-MM-DD{THH:mm:ss}'},
                {input: '2024-02-07T14:20:25', spec: 'YYYY-MM-DD{THH:mm:ss}'},
                {input: '2024-02-07T14:20:25Z', spec: 'YYYY-MM-DDTHH:mm:ss{.SSS}Z'},
                {input: '2024-02-07T14:20:25.000Z', spec: 'YYYY-MM-DDTHH:mm:ss{.SSS}Z'},
                {input: '2024-02-07', spec: 'YYYY-MM-DD{THH:mm:ss}{Z}'},
                {input: '2024-02-07T14:20:25Z', spec: 'YYYY-MM-DD{THH:mm:ss}{Z}'},
                {input: '2024-02-07T14:20:25', spec: 'YYYY-MM-DDTHH:mm:ss{.SSS}'},
                {input: '2024-02-07T14:20:25.123', spec: 'YYYY-MM-DDTHH:mm:ss{.SSS}'},
                {input: '2024-02-07', spec: 'YYYY-MM-DD{THH:mm}{:ss}'},
                {input: '2024-02-07T14:20:45', spec: 'YYYY-MM-DDTHH:mm{:ss}'},
                {input: '2024-02-07T14:20:25-12:00', spec: 'YYYY-MM-DDTHH:mm:ss{.SSS}Z'},
                {input: '2024-02-07T14:20:25', spec: 'YYYY-MM-DDTHH:mm:ss{.SSS}{Z}'},
                {input: '2024-02-07T14:20:25.123', spec: 'YYYY-MM-DDTHH:mm:ss{.SSS}{Z}'},
                {input: '2024-02-07T14:20:25.123Z', spec: 'YYYY-MM-DDTHH:mm:ss{.SSS}{Z}'},
                {input: '2024-02-07T14:20:25-05:00', spec: 'YYYY-MM-DDTHH:mm:ss{.SSS}{Z}'},
            ]) {
                assert.ok(isDateFormat(input, spec), `Expected ${input} to match spec ${spec}`);
            }
        });

        it('Should correctly handle invalid values', () => {
            for (const {input, spec} of [
                {input: '2024-02-30', spec: 'YYYY-MM-DD{THH:mm:ss}'},
                {input: '2024-02-0714:20:25', spec: 'YYYY-MM-DD{THH:mm:ss}'},
                {input: '2024-02-07T14:20:2Z', spec: 'YYYY-MM-DDTHH:mm:ss{.SSS}Z'},
                {input: '2024-02-07T14:20:25.50Z', spec: 'YYYY-MM-DDTHH:mm:ss{.SSS}Z'},
                {input: '2024-02-07T14:20', spec: 'YYYY-MM-DDTHH:mm:ss{Z}'},
                {input: '2024-02-07T14:61:00', spec: 'YYYY-MM-DDTHH:mm:ss'},
                {input: '2024-02-07T25:00:00', spec: 'YYYY-MM-DDTHH:mm:ss'},
                {input: '2024-02-07T14:20:25.12Z', spec: 'YYYY-MM-DDTHH:mm:ss{.SSS}Z'},
                {input: '2024-02-07T14:20:25-15:00', spec: 'YYYY-MM-DDTHH:mm:ss{.SSS}Z'},
            ]) {
                assert.ok(!isDateFormat(input, spec), `Expected ${input} not to match spec ${spec}`);
            }
        });

        it('Should correctly handle edge cases with optional parts', () => {
            for (const {input, spec} of [
                {input: '2024-02-07T14:20:25Z', spec: 'YYYY-MM-DDTHH:mm:ss{.SSS}{Z}'},
                {input: '2024-02-07T14:20:25', spec: 'YYYY-MM-DDTHH:mm:ss{.SSS}{Z}'},
                {input: '2024-02-07', spec: 'YYYY-MM-DD{THH:mm:ss}{.SSS}{Z}'},
                {input: '2024-02-07T14:20:25.123Z', spec: 'YYYY-MM-DDTHH:mm:ss{.SSS}{Z}'},
                {input: '2024-02-07T14:20:25.000', spec: 'YYYY-MM-DDTHH:mm:ss{.SSS}'},
                {input: '2024-02-07T14:20:25.000Z', spec: 'YYYY-MM-DDTHH:mm:ss{.SSS}Z'},
            ]) {
                assert.ok(isDateFormat(input, spec), `Expected ${input} to match spec ${spec}`);
            }
        });
    });

    describe('ISO', () => {
        it('Should correctly handle valid values', () => {
            for (const {input, spec} of [
                {input: '2024-04-06T12:30:45.123Z', spec: 'ISO'},
                {input: '1990-02-07T19:20:00.000Z', spec: 'ISO'},
                {input: '2024-04-06T12:30:45.123+02:00', spec: 'ISO'},
                {input: '2024-04-06T12:30:45.123-05:00', spec: 'ISO'},
                {input: '2024-12-31T23:59:59.999Z', spec: 'ISO'},
                {input: '2024-02-29T00:00:00.000Z', spec: 'ISO'},
                {input: '2024-04-06T12:30:00.000+00:00', spec: 'ISO'},
                {input: '2024-04-06T12:30:00.000-00:00', spec: 'ISO'},
                {input: '2024-04-06T12:30:45.123+14:00', spec: 'ISO'},
                {input: '2024-04-06T12:30:45.123-12:00', spec: 'ISO'},
                {input: '2024-04-06T12:30:00.000+09:30', spec: 'ISO'},
                {input: '2024-04-06T12:00:00.000Z', spec: 'ISO'},
                {input: '2024-04-06T23:59:59.000+01:00', spec: 'ISO'},
                {input: '2024-04-06T00:00:00.000-01:00', spec: 'ISO'},
                {input: '2024-12-31T23:59:59.123+00:00', spec: 'ISO'},
                {input: '2024-04-06T12:30:45.123+01:00', spec: 'ISO'},
                {input: '2024-04-06T12:30:45Z', spec: 'ISO'},
            ]) {
                assert.ok(isDateFormat(input, spec), `Expected ${input} to match spec ${spec}`);
            }
        });

        it('Should correctly handle invalid values', () => {
            for (const {input, spec} of [
                {input: '2024-02-30T19:20:00.000Z', spec: 'ISO'},
                {input: '1990-02-07T24:00:00.000Z', spec: 'ISO'},
                {input: '2024-04-06T12:30:45.123+25:00', spec: 'ISO'},
                {input: '2024-04-06T12:30:45.123-13:00', spec: 'ISO'},
                {input: '2024-04-06T12:30:45.123+14:01', spec: 'ISO'},
                {input: '2024-04-06T12:30:45.123+14:60', spec: 'ISO'},
                {input: '2024-04-06T12:30:45.123Z+02:00', spec: 'ISO'},
                {input: '2024-04-06T12:30:45.123+02:60', spec: 'ISO'},
                {input: '2024-04-06T12:30:45.123-25:00', spec: 'ISO'},
                {input: '2024-04-06T12:30:60.123Z', spec: 'ISO'},
                {input: '2024-04-06T12:61:45.123Z', spec: 'ISO'},
                {input: '2024-04-06T24:30:45.123Z', spec: 'ISO'},
                {input: '2024-04-06T12:30:45.123+15:00', spec: 'ISO'},
                {input: '2024-04-06T12:30:45.123+02:09', spec: 'ISO'},
                {input: '2024-04-06T12:30:45.9999Z', spec: 'ISO'},
                {input: '2024-04-06T12:30Z', spec: 'ISO'},
                {input: '2024-04-06T12:30:45.Z', spec: 'ISO'},
                {input: '2024-04-06T12:30:45.12345Z', spec: 'ISO'},
                {input: '2024-04-06T12:30:45.12Z', spec: 'ISO'},
                {input: '2024-04-06T12:30:45.1234+02:00', spec: 'ISO'},
                {input: '2023-02-29T12:30:45.123+02:00', spec: 'ISO'},
            ]) {
                assert.ok(!isDateFormat(input, spec), `Expected ${input} not to match spec ${spec}`);
            }
        });
    });
});
