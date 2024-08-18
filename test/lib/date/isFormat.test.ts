import {describe, it}   from 'node:test';
import * as assert      from 'node:assert/strict';
import CONSTANTS        from '../../constants';
import isDateFormat     from '../../../lib/date/isFormat';

describe('Date - isDateFormat', () => {
    it('Throw when passed a non-string for val', () => {
        for (const el of CONSTANTS.NOT_STRING_WITH_EMPTY) {
            assert.throws(
                () => isDateFormat(el, 'YYYY-MM-DD'),
                new TypeError('isDateFormat: input must be a non-empty string')
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

    it('Should correctly handle values valid to the spec', () => {
        for (const {input, spec} of [
            // Year-Month-Day
            {input: '2024-04-06', spec: 'YYYY-MM-DD'},
            {input: '0001-01-01', spec: 'YYYY-MM-DD'}, // Earliest possible date
            {input: '1999-12-31', spec: 'YYYY-MM-DD'},
            {input: '2024-02-29', spec: 'YYYY-MM-DD'}, // Leap year date
            {input: '2999-12-31', spec: 'YYYY-MM-DD'}, // Far future date

            // Hour-Minute-Second
            {input: '12:30:45', spec: 'HH:mm:ss'},
            {input: '00:00:00', spec: 'HH:mm:ss'}, // Midnight
            {input: '23:59:59', spec: 'HH:mm:ss'}, // Just before midnight
            {input: '15:45:30', spec: 'HH:mm:ss'}, // Random time
            {input: '09:07:05', spec: 'HH:mm:ss'}, // Leading zeros in time

            // Hour-Minute
            {input: '12:00', spec: 'HH:mm'},
            {input: '15:45', spec: 'HH:mm'},
            {input: '09:07', spec: 'HH:mm'}, // Single-digit hour
            {input: '23:59', spec: 'HH:mm'},
            {input: '00:00', spec: 'HH:mm'}, // Midnight

            // Year-Quarter
            {input: '2024-Q1', spec: 'YYYY-[Q]Q'},
            {input: '2024-Q2', spec: 'YYYY-[Q]Q'},
            {input: '2024-Q3', spec: 'YYYY-[Q]Q'},
            {input: '2024-Q4', spec: 'YYYY-[Q]Q'}, // Last quarter

            // Year-Month-Day Hour-Minute-Second
            {input: '2024-04-06 12:30:45', spec: 'YYYY-MM-DD HH:mm:ss'},
            {input: '1999-12-31 23:59:59', spec: 'YYYY-MM-DD HH:mm:ss'},
            {input: '2024-02-29 00:00:00', spec: 'YYYY-MM-DD HH:mm:ss'}, // Leap year, midnight
            {input: '2024-12-25 15:45:30', spec: 'YYYY-MM-DD HH:mm:ss'}, // Christmas afternoon

            // Year-Month-Day Hour-Minute-Second.Millisecond
            {input: '2024-03-09 15:45:30.123', spec: 'YYYY-MM-DD HH:mm:ss.SSS'},
            {input: '1999-12-31 23:59:59.999', spec: 'YYYY-MM-DD HH:mm:ss.SSS'}, // Just before the millennium
            {input: '2024-01-01 00:00:00.001', spec: 'YYYY-MM-DD HH:mm:ss.SSS'}, // First millisecond of the year
            {input: '2024-07-04 12:00:00.000', spec: 'YYYY-MM-DD HH:mm:ss.SSS'}, // Independence Day noon

            // Edge Cases
            {input: '01:01:01.001', spec: 'HH:mm:ss.SSS'}, // All single digits
            {input: '23:59', spec: 'HH:mm'}, // 24-hour clock boundary
            {input: '11:59 AM', spec: 'HH:mm A'}, // 12-hour clock boundary
            {input: '11:59 PM', spec: 'HH:mm A'}, // 12-hour clock boundary
            {input: '11:59 am', spec: 'HH:mm a'}, // 12-hour clock boundary
            {input: '11:59 pm', spec: 'HH:mm a'}, // 12-hour clock boundary
            {input: '2024-04-06T12:30:45', spec: 'YYYY-MM-DDTHH:mm:ss'}, // ISO format with 'T'
            {input: '2024-04-06T12:30:45.123', spec: 'YYYY-MM-DDTHH:mm:ss.SSS'}, // ISO format with 'T' and milliseconds

            // Custom cases
            {input: '2024-04', spec: 'YYYY-MM'}, // Year and month
            {input: '2024', spec: 'YYYY'}, // Year only
            {input: '04-2024', spec: 'MM-YYYY'}, // Month and year
            {input: '06-04-2024', spec: 'DD-MM-YYYY'}, // Day-Month-Year
            {input: '15:30', spec: 'HH:mm'}, // Time with no seconds
            {input: '12', spec: 'HH'}, // Hour only
            {input: '45', spec: 'mm'}, // Minute only
            {input: '30', spec: 'ss'}, // Second only
        ]) {
            assert.ok(isDateFormat(input, spec), `Expected ${input} to match spec ${spec}`);
        }
    });

    it('Should correctly handle values invalid to the spec', () => {
        for (const {input, spec} of [
            // Invalid dates
            {input: '2024-00-01', spec: 'YYYY-MM-DD'}, // Invalid month 00
            {input: '2024-13-01', spec: 'YYYY-MM-DD'}, // Invalid month 13
            {input: '2024-02-30', spec: 'YYYY-MM-DD'}, // Invalid February 30th
            {input: '2024-04-31', spec: 'YYYY-MM-DD'}, // Invalid April 31st
            {input: '2024-06-31', spec: 'YYYY-MM-DD'}, // Invalid June 31st

            // Invalid times
            {input: '25:00:00', spec: 'HH:mm:ss'}, // Invalid hour 25
            {input: '12:60:00', spec: 'HH:mm:ss'}, // Invalid minute 60
            {input: '12:30:60', spec: 'HH:mm:ss'}, // Invalid second 60
            {input: '12:34:56.9999', spec: 'HH:mm:ss.SSS'}, // Too many decimals in milliseconds
            {input: '12:34', spec: 'HH:mm:ss'}, // Missing seconds

            // Invalid quarters
            {input: '2024-Q0', spec: 'YYYY-Q'}, // Invalid quarter 0
            {input: '2024-Q5', spec: 'YYYY-Q'}, // Invalid quarter 5
            {input: '2024-Q5', spec: 'YYYY-[Q]Q'}, // Incorrect, should fail on Q5

            // Missing parts
            {input: '2024-04', spec: 'YYYY-MM-DD'}, // Missing day
            {input: '12:34', spec: 'HH:mm:ss'}, // Missing seconds
            {input: '2:34:14', spec: 'HH:mm:ss'}, // Missing leading 0 in hour
            {input: '02:4:14', spec: 'HH:mm:ss'}, // Missing leading 0 in minute
            {input: '02:04:4', spec: 'HH:mm:ss'}, // Missing leading 0 in seconds
            {input: '2024-04-06', spec: 'YYYY-MM'}, // Day included but not expected

            // Completely wrong format
            {input: '06/04/2024', spec: 'YYYY-MM-DD'}, // Slashes instead of dashes
            {input: '12:34:56', spec: 'YYYY-MM-DD'}, // Time instead of date
            {input: '2024-06-04', spec: 'HH:mm:ss'}, // Date instead of time

            // Additional invalid dates and times
            {input: '2023-02-29', spec: 'YYYY-MM-DD'}, // Invalid leap year date (for non-leap years)
            {input: '2024-04-06 12:30', spec: 'YYYY-MM-DD HH:mm:ss'}, // Missing seconds
            {input: '2024-12-25T12:00:00Z', spec: 'YYYY-MM-DD HH:mm:ss'}, // UTC indicator not expected
            {input: '2024-04-06T12:30:45.12', spec: 'YYYY-MM-DDTHH:mm:ss.SSS'}, // Incomplete milliseconds
            {input: '2024-04-06 12:30:45.', spec: 'YYYY-MM-DD HH:mm:ss.SSS'}, // Missing milliseconds after decimal
            {input: '21:59 AM', spec: 'HH:mm A'}, // 12-hour clock boundary
            {input: '21:59 PM', spec: 'HH:mm A'}, // 12-hour clock boundary
            {input: '12:59 am', spec: 'HH:mm a'}, // 12-hour clock boundary
            {input: '12:59 pm', spec: 'HH:mm a'}, // 12-hour clock boundary

            // Additional wrong formats
            {input: '123456', spec: 'HH:mm:ss'}, // Not enough separators
            {input: '99:99', spec: 'HH:mm'}, // Completely invalid time
            {input: '2024-14', spec: 'YYYY-MM'}, // Invalid month
            {input: '45', spec: 'HH:mm:ss'}, // Not enough digits
            {input: 'abc', spec: 'YYYY-MM-DD'}, // Non-numeric input
            {input: '2024-Q', spec: 'YYYY-[Q]Q'},  // Incorrect, should fail on missing digit
            {input: '2024-Q1', spec: 'YYYY-[Q][Q]'}, // Incorrect, [Q] should be treated as literal
            {input: ' a2024-02-01 ', spec: 'YYYY-MM-DD'}, // Empty input should be invalid
            {input: ' a06:20:29 ', spec: 'HH:mm:ss'},
            {input: ' 06:20:29 ', spec: 'HH:mm:ss'},
            {input: '24:00:00', spec: 'HH:mm:ss'}, // 24:00:00 should be invalid
            {input: '12:60:60', spec: 'HH:mm:ss'}, // Invalid minutes and seconds
            {input: '2024-4-6', spec: 'YYYY-M-D'}, // No leading zeros
            {input: '2024-4-06', spec: 'YYYY-M-DD'}, // Mixed leading zeros

            // Edge cases
            {input: '2024-W15-7', spec: 'YYYY-MM-DD'}, // Week-based date format in wrong spec
            {input: '24:00:00', spec: 'HH:mm:ss'}, // Invalid 24-hour clock boundary
            {input: '2024-12-25', spec: 'MM-DD-YYYY'}, // Wrong format order
            {input: '2024-01', spec: 'YYYY'}, // Year and month, but only year expected
            {input: '01', spec: 'HH:mm'}, // Incomplete time

            // Boundary violations
            {input: '12:34:56.1234', spec: 'HH:mm:ss.SSS'}, // Too many milliseconds
            {input: '2024-00-00', spec: 'YYYY-MM-DD'}, // Completely invalid date
            {input: '2024-Q', spec: 'YYYY-Q'}, // Missing quarter
            {input: '15:61', spec: 'HH:mm'}, // Invalid minutes
            {input: '99:99:99', spec: 'HH:mm:ss'}, // Completely invalid time
            {input: '2024-01-00', spec: 'YYYY-MM-DD'}, // Day 00 should be invalid
            {input: '2024-12-32', spec: 'YYYY-MM-DD'}, // Day 32 should be invalid
            {input: '00:00:60', spec: 'HH:mm:ss'}, // Second 60 should be invalid
            {input: '2024/04/06', spec: 'YYYY-MM-DD'}, // Slashes instead of dashes
            {input: '20240406', spec: 'YYYY-MM-DD'}, // Missing delimiters
        ]) {
            assert.ok(!isDateFormat(input, spec), `Expected ${input} not to match spec ${spec}`);
        }
    });

    describe('ISO', () => {
        it('Should correctly handle valid values', () => {
            for (const {input, spec} of [
                {input: '2024-04-06T12:30:45.123Z', spec: 'ISO'},
                {input: '1990-02-07T19:20:00.000Z', spec: 'ISO'},
                {input: '2024-04-06T12:30:45.123+02:00', spec: 'ISO'}, // Positive offset
                {input: '2024-04-06T12:30:45.123-05:00', spec: 'ISO'}, // Negative offset
                {input: '2024-12-31T23:59:59.999Z', spec: 'ISO'}, // Just before midnight UTC
                {input: '2024-02-29T00:00:00.000Z', spec: 'ISO'}, // Leap year at midnight
                {input: '2024-04-06T12:30:00.000+00:00', spec: 'ISO'}, // UTC with +00:00 offset
                {input: '2024-04-06T12:30:00.000-00:00', spec: 'ISO'}, // UTC with -00:00 offset
                {input: '2024-04-06T12:30:45.123+14:00', spec: 'ISO'}, // Maximum positive offset
                {input: '2024-04-06T12:30:45.123-12:00', spec: 'ISO'}, // Maximum negative offset
                {input: '2024-04-06T12:30:00.000+09:30', spec: 'ISO'}, // Non-standard offset (+09:30)
                {input: '2024-04-06T12:00:00.000Z', spec: 'ISO'}, // Noon UTC with milliseconds
                {input: '2024-04-06T23:59:59.000+01:00', spec: 'ISO'}, // Just before midnight with +01:00 offset
                {input: '2024-04-06T00:00:00.000-01:00', spec: 'ISO'}, // Midnight with -01:00 offset
                {input: '2024-12-31T23:59:59.123+00:00', spec: 'ISO'}, // End of the year with UTC
                {input: '2024-04-06T12:30:45.123+01:00', spec: 'ISO'}, // Standard positive offset
            ]) {
                assert.ok(isDateFormat(input, spec), `Expected ${input} to match spec ${spec}`);
            }
        });

        it('Should correctly handle invalid values', () => {
            for (const {input, spec} of [
                {input: '2024-02-30T19:20:00.000Z', spec: 'ISO'}, // Invalid date (Feb 30)
                {input: '1990-02-07T24:00:00.000Z', spec: 'ISO'}, // Invalid time (24:00:00)
                {input: '2024-04-06T12:30:45Z', spec: 'ISO'}, // Without milliseconds
                {input: '2024-04-06T12:30:45.123+25:00', spec: 'ISO'}, // Invalid timezone offset (+25:00)
                {input: '2024-04-06T12:30:45.123-13:00', spec: 'ISO'}, // Invalid timezone offset (-13:00)
                {input: '2024-04-06T12:30:45.123+14:01', spec: 'ISO'}, // Invalid minute in timezone (+14:01)
                {input: '2024-04-06T12:30:45.123+14:60', spec: 'ISO'}, // Invalid minute in timezone (+14:60)
                {input: '2024-04-06T12:30:45.123Z+02:00', spec: 'ISO'}, // Redundant timezone indicators
                {input: '2024-04-06T12:30:45.123+02:60', spec: 'ISO'}, // Invalid minute in timezone (+02:60)
                {input: '2024-04-06T12:30:45.123-25:00', spec: 'ISO'}, // Invalid timezone offset (-25:00)
                {input: '2024-04-06T12:30:60.123Z', spec: 'ISO'}, // Invalid seconds (60 seconds)
                {input: '2024-04-06T12:61:45.123Z', spec: 'ISO'}, // Invalid minutes (61 minutes)
                {input: '2024-04-06T24:30:45.123Z', spec: 'ISO'}, // Invalid hour (24 hours)
                {input: '2024-04-06T12:30:45.123+15:00', spec: 'ISO'}, // Invalid hour in timezone (+15:00)
                {input: '2024-04-06T12:30:45.123+02:09', spec: 'ISO'}, // Invalid minute in timezone (+02:09)
                {input: '2024-04-06T12:30:45.9999Z', spec: 'ISO'}, // Too many milliseconds digits
                {input: '2024-04-06T12:30Z', spec: 'ISO'}, // Missing seconds
                {input: '2024-04-06T12:30:45.Z', spec: 'ISO'}, // Missing milliseconds
                {input: '2024-04-06T12:30:45.12345Z', spec: 'ISO'}, // Too many digits in milliseconds
                {input: '2024-04-06T12:30:45.12Z', spec: 'ISO'}, // Too few digits in milliseconds
                {input: '2024-04-06T12:30:45.1234+02:00', spec: 'ISO'}, // Too many digits in milliseconds with offset
                {input: '2023-02-29T12:30:45.123+02:00', spec: 'ISO'}, // Invalid due to non-leap year
            ]) {
                assert.ok(!isDateFormat(input, spec), `Expected ${input} not to match spec ${spec}`);
            }
        });
    });
});
