'use strict';

import isDate       from '../../src/date/is';
import toUTC        from '../../src/date/toUTC';
import startOfUTC   from '../../src/date/startOfUTC';
import nowUnix      from '../../src/date/nowUnix';
import nowUnixMs    from '../../src/date/nowUnixMs';
import {
    fnNumericValues,
    fnBooleanValues,
    fnRegexValues,
    fnStringValues,
    fnObjectValues,
    fnDateValues,
    fnArrayValues,
    fnFunctionValues,
    fnNullables,
} from '../constants';

const chai = require('chai');
const spies = require('chai-spies');
chai.use(spies);

const expect = chai.expect;
const assert = chai.assert;
const should = chai.should();
const spy = chai.spy;

function getTime () {
    const hr_time = process.hrtime();
    return hr_time[0] * 1000 + hr_time[1] / 1000000;
}

const currentTZ = (new Date()).toJSON().split('.').pop();

describe("Date", () => {
    describe("isDate", () => {
        it ('not see a string as a date', () => {
            let vals = fnStringValues();
            for (let el of vals) expect(isDate(el)).to.eql(false);
        });

        it ('not see a numeric value as a date', () => {
            let vals = fnNumericValues();
            for (let el of vals) expect(isDate(el)).to.eql(false);
        });

        it ('not see a boolean as a date', () => {
            let vals = fnBooleanValues();
            for (let el of vals) expect(isDate(el)).to.eql(false);
        });

        it ('not see a regex as a date', () => {
            let vals = fnRegexValues();
            for (let el of vals) expect(isDate(el)).to.eql(false);
        });

        it ('not see an object as a date', () => {
            let vals = fnObjectValues();
            for (let el of vals) expect(isDate(el)).to.eql(false);
        });

        it ('not see a nullable as a date', () => {
            let vals = fnNullables();
            for (let el of vals) expect(isDate(el)).to.eql(false);
        });

        it ('see a date as a date', () => {
            let vals = fnDateValues();
            for (let el of vals) expect(isDate(el)).to.eql(true);
        });

        it ('not see an array as a date', () => {
            let vals = fnArrayValues();
            for (let el of vals) expect(isDate(el)).to.eql(false);
        });

        it ('not see a function as a date', () => {
            let vals = fnFunctionValues();
            for (let el of vals) expect(isDate(el)).to.eql(false);
        });
    });

    describe("toUTC", () => {
        it ('throw when passed a non-date', () => {
            for (const el of [
                ...fnStringValues(),
                ...fnNumericValues(),
                ...fnBooleanValues(),
                ...fnRegexValues(),
                ...fnObjectValues(),
                ...fnNullables(),
                ...fnArrayValues(),
                ...fnFunctionValues(),
            ]) {
                expect(function () {
                    toUTC(el);
                }).to.throw('');
            }
        });

        it ('return a date in UTC', () => {
            const date = new Date("2023-05-01T12:04:27+02:00");
            expect(toUTC(date)).to.eql(new Date("2023-05-01T10:04:27+00:00"));
            expect(toUTC(date).toISOString()).to.eql('2023-05-01T10:04:27.000Z');

            expect(date.toJSON()).to.eql('2023-05-01T10:04:27.000Z');
        });

        it ('not touch on the passed date', () => {
            const date = new Date("14 Jun 2017 00:00:00 PDT");
            const utc_date = toUTC(date);
            expect(utc_date.toJSON()).to.eql("2017-06-14T07:00:00.000Z");

            date.setHours(20);
            expect(date.toJSON()).to.eql("2017-06-14T18:00:00.000Z");
            expect(utc_date.toJSON()).to.eql("2017-06-14T07:00:00.000Z");
        });

        it ('should be blazing fast in its conversion (1.000.000 benchmark < 750ms)', () => {
            let start_time = getTime();
            for (let i = 0; i < 1000000; i++) {
                toUTC(new Date("2023-05-01T12:04:27+02:00"));
            }
            expect(getTime() - start_time).to.be.lt(750);
        });
    });

    describe("startOfUTC", () => {
        it ('throw when passed a non-date', () => {
            for (const el of [
                ...fnStringValues(),
                ...fnNumericValues(),
                ...fnBooleanValues(),
                ...fnRegexValues(),
                ...fnObjectValues(),
                ...fnNullables(),
                ...fnArrayValues(),
                ...fnFunctionValues(),
            ]) {
                expect(function () {
                    startOfUTC(el, 'day');
                }).to.throw('');
            }
        });

        it ('throw when passed a non-string key', () => {
            for (const el of [
                ...fnDateValues(),
                ...fnNumericValues(),
                ...fnBooleanValues(),
                ...fnRegexValues(),
                ...fnObjectValues(),
                ...fnNullables(),
                ...fnArrayValues(),
                ...fnFunctionValues(),
            ]) {
                expect(function () {
                    startOfUTC(new Date(), el);
                }).to.throw('');
            }
        });

        it ('[year] should correctly set to start of year utc', () => {
            expect(startOfUTC(new Date("2023-05-04T12:04:27+02:00"), 'year')).to.eql(new Date("2023-01-01T00:00:00.000Z"));
        });

        it ('[year] should be blazing fast in its conversion (1.000.000 benchmark < 750ms)', () => {
            let start_time = getTime();
            for (let i = 0; i < 1000000; i++) {
                startOfUTC(new Date("2023-05-01T12:04:27+02:00"), 'year');
            }
            expect(getTime() - start_time).to.be.lt(750);
        });

        it ('[quarter] should correctly set to start of year utc', () => {
            const qmap = {1: 1, 2: 1, 3: 1, 4: 4, 5: 4, 6: 4, 7: 7, 8: 7, 9: 7, 10: 10, 11: 10, 12: 10};
            for (let i = 1; i <= 12; i++) {
                let date = `2023-${i < 10 ? '0' : ''}${i}-04T12:04:27+02:00`;
                let date_q = `2023-${qmap[i] < 10 ? '0' : ''}${qmap[i]}-01T00:00:00.000Z`;
                expect(startOfUTC(new Date(date), 'quarter')).to.eql(new Date(date_q));
            }
        });

        it ('[quarter] should be blazing fast in its conversion (1.000.000 benchmark < 750ms)', () => {
            let start_time = getTime();
            for (let i = 0; i < 1000000; i++) {
                startOfUTC(new Date("2023-05-01T12:04:27+02:00"), 'quarter');
            }
            expect(getTime() - start_time).to.be.lt(750);
        });

        it ('[month] should correctly set to start of month utc', () => {
            expect(startOfUTC(new Date("2023-05-04T12:04:27+02:00"), 'month')).to.eql(new Date("2023-05-01T00:00:00.000Z"));
        });

        it ('[month] should be blazing fast in its conversion (1.000.000 benchmark < 750ms)', () => {
            let start_time = getTime();
            for (let i = 0; i < 1000000; i++) {
                startOfUTC(new Date("2023-05-01T12:04:27+02:00"), 'month');
            }
            expect(getTime() - start_time).to.be.lt(750);
        });

        it ('[day] should correctly set to start of day utc', () => {
            expect(startOfUTC(new Date("2023-05-04T12:04:27+02:00"), 'day')).to.eql(new Date("2023-05-04T00:00:00.000Z"));
        });

        it ('[day] should be blazing fast in its conversion (1.000.000 benchmark < 750ms)', () => {
            let start_time = getTime();
            for (let i = 0; i < 1000000; i++) {
                startOfUTC(new Date("2023-05-01T12:04:27+02:00"), 'day');
            }
            expect(getTime() - start_time).to.be.lt(750);
        });

        it ('[hour] should correctly set to start of hour utc', () => {
            expect(startOfUTC(new Date("2023-05-04T12:04:27+02:00"), 'hour')).to.eql(new Date("2023-05-04T10:00:00.000Z"));
        });

        it ('[hour] should be blazing fast in its conversion (1.000.000 benchmark < 750ms)', () => {
            let start_time = getTime();
            for (let i = 0; i < 1000000; i++) {
                startOfUTC(new Date("2023-05-01T12:04:27+02:00"), 'hour');
            }
            expect(getTime() - start_time).to.be.lt(750);
        });

        it ('[minute] should correctly set to start of minute utc', () => {
            expect(startOfUTC(new Date("2023-05-04T12:04:27+02:00"), 'minute')).to.eql(new Date("2023-05-04T10:04:00.000Z"));
        });

        it ('[minute] should be blazing fast in its conversion (1.000.000 benchmark < 750ms)', () => {
            let start_time = getTime();
            for (let i = 0; i < 1000000; i++) {
                startOfUTC(new Date("2023-05-01T12:04:27+02:00"), 'minute');
            }
            expect(getTime() - start_time).to.be.lt(750);
        });

        it ('[second] should correctly set to start of second utc', () => {
            expect(startOfUTC(new Date("2023-05-04T12:04:27.043+02:00"), 'second')).to.eql(new Date("2023-05-04T10:04:27.000Z"));
        });

        it ('[second] should be blazing fast in its conversion (1.000.000 benchmark < 750ms)', () => {
            let start_time = getTime();
            for (let i = 0; i < 1000000; i++) {
                startOfUTC(new Date("2023-05-01T12:04:27+02:00"), 'second');
            }
            expect(getTime() - start_time).to.be.lt(750);
        });

        it ('should return original date when passed a non-recognized key', () => {
            expect(startOfUTC(new Date("2023-05-01T12:04:27+02:00"), 'foobar')).to.eql(new Date("2023-05-01T12:04:27+02:00"));
        });
    });

    describe("nowUnix", () => {
        it ('returns second unix timestamp', () => {
            expect(nowUnix()).to.eql(Math.floor(Date.now()/1000));
        });
    });

    describe("nowUnixMs", () => {
        it ('returns millisecond unix timestamp when passing false', () => {
            expect(nowUnixMs()).to.eql(Math.floor(Date.now()));
        });
    });

});
