'use strict';

import isInteger        from '../../src/number/isInteger';
import isNotEmptyString from '../../src/string/isNotEmpty';
import diff             from '../../src/date/diff';
import isDate           from '../../src/date/is';
import toUTC            from '../../src/date/toUTC';
import toUnix           from '../../src/date/toUnix';
import startOfUTC       from '../../src/date/startOfUTC';
import endOfUTC         from '../../src/date/endOfUTC';
import addUTC           from '../../src/date/addUTC';
import nowUnix          from '../../src/date/nowUnix';
import nowUnixMs        from '../../src/date/nowUnixMs';
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

const expect = require('chai').expect;
const assert = require('chai').assert;

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

    describe("diff", () => {
        it ('throw when passed a non-date for var_a', () => {
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
                    diff(el, new Date());
                }).to.throw('');
            }
        });

        it ('throw when passed a non-date for var_b', () => {
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
                    diff(new Date(), el);
                }).to.throw('');
            }
        });

        it ('throw when passed a non-false non-string for key', () => {
            for (const el of [
                ...fnStringValues(),
                ...fnNumericValues(),
                ...fnBooleanValues(),
                ...fnRegexValues(),
                ...fnObjectValues(),
                ...fnNullables(),
                ...fnArrayValues(),
                ...fnFunctionValues(),
                ...fnDateValues(),
            ]) {
                if (el === false || el === undefined || isNotEmptyString(el)) continue;

                expect(function () {
                    diff(new Date(), new Date(), el);
                }).to.throw('');
            }
        });

        it ('[week] Should correctly calculate difference in weeks when passing a var_a after var_b', () => {
            expect(diff(new Date("2022-10-05T13:12:11+02:00"), new Date("2032-10-05T11:12:11.000Z"), 'week')).to.eql(-521.8571428571429);
        });

        it ('[week] Should correctly calculate difference in weeks when passing a var_a before var_b', () => {
            expect(diff(new Date("2032-10-05T11:12:11.000Z"), new Date("2022-10-05T13:12:11+02:00"), 'week')).to.eql(521.8571428571429);
        });

        it ('[week] Should correctly calculate difference in weeks when passing a var_a equal to var_b', () => {
            expect(diff(new Date("2022-10-05T13:12:11+02:00"), new Date("2022-10-05T13:12:11+02:00"), 'week')).to.eql(0);
        });

        it ('[week] Should correctly calculate difference in weeks when passing a var_a equal to var_b and not care about timezones', () => {
            expect(diff(new Date("2022-10-05T13:12:11+02:00"), new Date("2022-11-05T13:12:11+06:00"), 'week')).to.eql(-4.404761904761905);
            expect(diff(new Date("2022-10-05T13:12:11+02:00"), new Date("2022-10-05T17:12:11+06:00"), 'week')).to.eql(0);
            expect(diff(new Date("2022-11-05T13:12:11+06:00"), new Date("2022-10-05T13:12:11+02:00"), 'week')).to.eql(4.404761904761905);
        });

        it ('[week] should be blazing fast in its conversion (1.000.000 benchmark < 750ms)', () => {
            let start_time = getTime();
            for (let i = 0; i < 1000000; i++) {
                diff(new Date("2022-10-05T13:12:11+02:00"), new Date("2022-11-05T13:12:11+06:00"), 'week');
            }
            expect(getTime() - start_time).to.be.lt(750);
        });

        it ('[weeks] Should correctly calculate difference in weeks when passing a var_a after var_b', () => {
            expect(diff(new Date("2022-10-05T13:12:11+02:00"), new Date("2032-10-05T11:12:11.000Z"), 'weeks')).to.eql(-521.8571428571429);
        });

        it ('[weeks] Should correctly calculate difference in weeks when passing a var_a before var_b', () => {
            expect(diff(new Date("2032-10-05T11:12:11.000Z"), new Date("2022-10-05T13:12:11+02:00"), 'weeks')).to.eql(521.8571428571429);
        });

        it ('[weeks] Should correctly calculate difference in weeks when passing a var_a equal to var_b', () => {
            expect(diff(new Date("2022-10-05T13:12:11+02:00"), new Date("2022-10-05T13:12:11+02:00"), 'weeks')).to.eql(0);
        });

        it ('[weeks] Should correctly calculate difference in weeks when passing a var_a equal to var_b and not care about timezones', () => {
            expect(diff(new Date("2022-10-05T13:12:11+02:00"), new Date("2022-11-05T13:12:11+06:00"), 'weeks')).to.eql(-4.404761904761905);
            expect(diff(new Date("2022-10-05T13:12:11+02:00"), new Date("2022-10-05T17:12:11+06:00"), 'weeks')).to.eql(0);
            expect(diff(new Date("2022-11-05T13:12:11+06:00"), new Date("2022-10-05T13:12:11+02:00"), 'weeks')).to.eql(4.404761904761905);
        });

        it ('[weeks] should be blazing fast in its conversion (1.000.000 benchmark < 750ms)', () => {
            let start_time = getTime();
            for (let i = 0; i < 1000000; i++) {
                diff(new Date("2022-10-05T13:12:11+02:00"), new Date("2022-11-05T13:12:11+06:00"), 'weeks');
            }
            expect(getTime() - start_time).to.be.lt(750);
        });

        it ('[day] Should correctly calculate difference in days when passing a var_a after var_b', () => {
            expect(diff(new Date("2022-10-05T13:12:11+02:00"), new Date("2032-10-05T11:12:11.000Z"), 'day')).to.eql(-3653);
        });

        it ('[day] Should correctly calculate difference in days when passing a var_a before var_b', () => {
            expect(diff(new Date("2032-10-05T11:12:11.000Z"), new Date("2022-10-05T13:12:11+02:00"), 'day')).to.eql(3653);
        });

        it ('[day] Should correctly calculate difference in days when passing a var_a equal to var_b', () => {
            expect(diff(new Date("2022-10-05T13:12:11+02:00"), new Date("2022-10-05T13:12:11+02:00"), 'day')).to.eql(0);
        });

        it ('[day] Should correctly calculate difference in days when passing a var_a equal to var_b and not care about timezones', () => {
            expect(diff(new Date("2022-10-05T13:12:11+02:00"), new Date("2022-11-05T13:12:11+06:00"), 'day')).to.eql(-30.83333333333333332);
            expect(diff(new Date("2022-10-05T13:12:11+02:00"), new Date("2022-10-05T17:12:11+06:00"), 'day')).to.eql(0);
            expect(diff(new Date("2022-11-05T13:12:11+06:00"), new Date("2022-10-05T13:12:11+02:00"), 'day')).to.eql(30.83333333333333332);
        });

        it ('[day] should be blazing fast in its conversion (1.000.000 benchmark < 750ms)', () => {
            let start_time = getTime();
            for (let i = 0; i < 1000000; i++) {
                diff(new Date("2022-10-05T13:12:11+02:00"), new Date("2022-11-05T13:12:11+06:00"), 'day');
            }
            expect(getTime() - start_time).to.be.lt(750);
        });

        it ('[days] Should correctly calculate difference in days when passing a var_a after var_b', () => {
            expect(diff(new Date("2022-10-05T13:12:11+02:00"), new Date("2032-10-05T11:12:11.000Z"), 'days')).to.eql(-3653);
        });

        it ('[days] Should correctly calculate difference in days when passing a var_a before var_b', () => {
            expect(diff(new Date("2032-10-05T11:12:11.000Z"), new Date("2022-10-05T13:12:11+02:00"), 'days')).to.eql(3653);
        });

        it ('[days] Should correctly calculate difference in days when passing a var_a equal to var_b', () => {
            expect(diff(new Date("2022-10-05T13:12:11+02:00"), new Date("2022-10-05T13:12:11+02:00"), 'days')).to.eql(0);
        });

        it ('[days] Should correctly calculate difference in days when passing a var_a equal to var_b and not care about timezones', () => {
            expect(diff(new Date("2022-10-05T13:12:11+02:00"), new Date("2022-11-05T13:12:11+06:00"), 'days')).to.eql(-30.83333333333333332);
            expect(diff(new Date("2022-10-05T13:12:11+02:00"), new Date("2022-10-05T17:12:11+06:00"), 'days')).to.eql(0);
            expect(diff(new Date("2022-11-05T13:12:11+06:00"), new Date("2022-10-05T13:12:11+02:00"), 'days')).to.eql(30.83333333333333332);
        });

        it ('[days] should be blazing fast in its conversion (1.000.000 benchmark < 750ms)', () => {
            let start_time = getTime();
            for (let i = 0; i < 1000000; i++) {
                diff(new Date("2022-10-05T13:12:11+02:00"), new Date("2022-11-05T13:12:11+06:00"), 'days');
            }
            expect(getTime() - start_time).to.be.lt(750);
        });

        it ('[hour] Should correctly calculate difference in hours when passing a var_a after var_b', () => {
            expect(diff(new Date("2022-10-05T13:12:11+02:00"), new Date("2032-10-05T11:12:11.000Z"), 'hour')).to.eql(-87672);
        });

        it ('[hour] Should correctly calculate difference in hours when passing a var_a before var_b', () => {
            expect(diff(new Date("2032-10-05T11:12:11.000Z"), new Date("2022-10-05T13:12:11+02:00"), 'hour')).to.eql(87672);
        });

        it ('[hour] Should correctly calculate difference in hours when passing a var_a equal to var_b', () => {
            expect(diff(new Date("2022-10-05T13:12:11+02:00"), new Date("2022-10-05T13:12:11+02:00"), 'hour')).to.eql(0);
        });

        it ('[hour] Should correctly calculate difference in hours when passing a var_a equal to var_b and not care about timezones', () => {
            expect(diff(new Date("2022-10-05T13:12:11+02:00"), new Date("2022-11-05T13:12:11+06:00"), 'hour')).to.eql(-740);
            expect(diff(new Date("2022-10-05T13:12:11+02:00"), new Date("2022-10-05T17:12:11+06:00"), 'hour')).to.eql(0);
            expect(diff(new Date("2022-11-05T13:12:11+06:00"), new Date("2022-10-05T13:12:11+02:00"), 'hour')).to.eql(740);
            expect(diff(new Date("2022-10-05T13:12:11+02:00"), new Date("2022-11-05T13:25:11+06:00"), 'hour')).to.eql(-740.2166666666667);
            expect(diff(new Date("2022-11-05T13:12:11+06:00"), new Date("2022-10-05T13:25:11+02:00"), 'hour')).to.eql(739.78333333333333);
        });

        it ('[hour] should be blazing fast in its conversion (1.000.000 benchmark < 750ms)', () => {
            let start_time = getTime();
            for (let i = 0; i < 1000000; i++) {
                diff(new Date("2022-10-05T13:12:11+02:00"), new Date("2022-11-05T13:12:11+06:00"), 'hour');
            }
            expect(getTime() - start_time).to.be.lt(750);
        });

        it ('[hours] Should correctly calculate difference in hours when passing a var_a after var_b', () => {
            expect(diff(new Date("2022-10-05T13:12:11+02:00"), new Date("2032-10-05T11:12:11.000Z"), 'hours')).to.eql(-87672);
        });

        it ('[hours] Should correctly calculate difference in hours when passing a var_a before var_b', () => {
            expect(diff(new Date("2032-10-05T11:12:11.000Z"), new Date("2022-10-05T13:12:11+02:00"), 'hours')).to.eql(87672);
        });

        it ('[hours] Should correctly calculate difference in hours when passing a var_a equal to var_b', () => {
            expect(diff(new Date("2022-10-05T13:12:11+02:00"), new Date("2022-10-05T13:12:11+02:00"), 'hours')).to.eql(0);
        });

        it ('[hours] Should correctly calculate difference in hours when passing a var_a equal to var_b and not care about timezones', () => {
            expect(diff(new Date("2022-10-05T13:12:11+02:00"), new Date("2022-11-05T13:12:11+06:00"), 'hours')).to.eql(-740);
            expect(diff(new Date("2022-10-05T13:12:11+02:00"), new Date("2022-10-05T17:12:11+06:00"), 'hours')).to.eql(0);
            expect(diff(new Date("2022-11-05T13:12:11+06:00"), new Date("2022-10-05T13:12:11+02:00"), 'hours')).to.eql(740);
            expect(diff(new Date("2022-10-05T13:12:11+02:00"), new Date("2022-11-05T13:25:11+06:00"), 'hours')).to.eql(-740.2166666666667);
            expect(diff(new Date("2022-11-05T13:12:11+06:00"), new Date("2022-10-05T13:25:11+02:00"), 'hours')).to.eql(739.78333333333333);
        });

        it ('[hours] should be blazing fast in its conversion (1.000.000 benchmark < 750ms)', () => {
            let start_time = getTime();
            for (let i = 0; i < 1000000; i++) {
                diff(new Date("2022-10-05T13:12:11+02:00"), new Date("2022-11-05T13:12:11+06:00"), 'hours');
            }
            expect(getTime() - start_time).to.be.lt(750);
        });

        it ('[minute] Should correctly calculate difference in minutes when passing a var_a after var_b', () => {
            expect(diff(new Date("2022-10-05T13:12:11+02:00"), new Date("2032-10-05T11:12:11.000Z"), 'minute')).to.eql(-5260320);
        });

        it ('[minute] Should correctly calculate difference in minutes when passing a var_a before var_b', () => {
            expect(diff(new Date("2032-10-05T11:12:11.000Z"), new Date("2022-10-05T13:12:11+02:00"), 'minute')).to.eql(5260320);
        });

        it ('[minute] Should correctly calculate difference in minutes when passing a var_a equal to var_b', () => {
            expect(diff(new Date("2022-10-05T13:12:11+02:00"), new Date("2022-10-05T13:12:11+02:00"), 'minute')).to.eql(0);
        });

        it ('[minute] Should correctly calculate difference in minutes when passing a var_a equal to var_b and not care about timezones', () => {
            expect(diff(new Date("2022-10-05T13:12:11+02:00"), new Date("2022-11-05T13:12:11.454+06:00"), 'minute')).to.eql(-44400.00756666667);
            expect(diff(new Date("2022-10-05T13:12:11+02:00"), new Date("2022-10-05T17:12:11.000+06:00"), 'minute')).to.eql(0);
            expect(diff(new Date("2022-10-05T13:12:11+02:00"), new Date("2022-10-05T17:43:09.344+06:00"), 'minute')).to.eql(-30.9724);
            expect(diff(new Date("2022-11-05T13:12:11+06:00"), new Date("2022-10-05T13:34:43.874+02:00"), 'minute')).to.eql(44377.4521);
            expect(diff(new Date("2022-10-05T13:12:11+02:00"), new Date("2022-11-05T13:53:21.672+06:00"), 'minute')).to.eql(-44441.177866666665);
            expect(diff(new Date("2022-11-05T13:12:11+06:00"), new Date("2022-10-05T13:25:43.898+02:00"), 'minute')).to.eql(44386.4517);
        });

        it ('[minute] should be blazing fast in its conversion (1.000.000 benchmark < 750ms)', () => {
            let start_time = getTime();
            for (let i = 0; i < 1000000; i++) {
                diff(new Date("2022-10-05T13:12:11+02:00"), new Date("2022-11-05T13:12:11+06:00"), 'minute');
            }
            expect(getTime() - start_time).to.be.lt(750);
        });

        it ('[minutes] Should correctly calculate difference in minutes when passing a var_a after var_b', () => {
            expect(diff(new Date("2022-10-05T13:12:11+02:00"), new Date("2032-10-05T11:12:11.000Z"), 'minutes')).to.eql(-5260320);
        });

        it ('[minutes] Should correctly calculate difference in minutes when passing a var_a before var_b', () => {
            expect(diff(new Date("2032-10-05T11:12:11.000Z"), new Date("2022-10-05T13:12:11+02:00"), 'minutes')).to.eql(5260320);
        });

        it ('[minutes] Should correctly calculate difference in minutes when passing a var_a equal to var_b', () => {
            expect(diff(new Date("2022-10-05T13:12:11+02:00"), new Date("2022-10-05T13:12:11+02:00"), 'minutes')).to.eql(0);
        });

        it ('[minutes] Should correctly calculate difference in minutes when passing a var_a equal to var_b and not care about timezones', () => {
            expect(diff(new Date("2022-10-05T13:12:11+02:00"), new Date("2022-11-05T13:12:11.454+06:00"), 'minutes')).to.eql(-44400.00756666667);
            expect(diff(new Date("2022-10-05T13:12:11+02:00"), new Date("2022-10-05T17:12:11.000+06:00"), 'minutes')).to.eql(0);
            expect(diff(new Date("2022-10-05T13:12:11+02:00"), new Date("2022-10-05T17:43:09.344+06:00"), 'minutes')).to.eql(-30.9724);
            expect(diff(new Date("2022-11-05T13:12:11+06:00"), new Date("2022-10-05T13:34:43.874+02:00"), 'minutes')).to.eql(44377.4521);
            expect(diff(new Date("2022-10-05T13:12:11+02:00"), new Date("2022-11-05T13:53:21.672+06:00"), 'minutes')).to.eql(-44441.177866666665);
            expect(diff(new Date("2022-11-05T13:12:11+06:00"), new Date("2022-10-05T13:25:43.898+02:00"), 'minutes')).to.eql(44386.4517);
        });

        it ('[minutes] should be blazing fast in its conversion (1.000.000 benchmark < 750ms)', () => {
            let start_time = getTime();
            for (let i = 0; i < 1000000; i++) {
                diff(new Date("2022-10-05T13:12:11+02:00"), new Date("2022-11-05T13:12:11+06:00"), 'minutes');
            }
            expect(getTime() - start_time).to.be.lt(750);
        });

        it ('[second] Should correctly calculate difference in seconds when passing a var_a after var_b', () => {
            expect(diff(new Date("2022-10-05T13:12:11+02:00"), new Date("2032-10-05T11:12:11.000Z"), 'second')).to.eql(-315619200);
        });

        it ('[second] Should correctly calculate difference in seconds when passing a var_a before var_b', () => {
            expect(diff(new Date("2032-10-05T11:12:11.000Z"), new Date("2022-10-05T13:12:11+02:00"), 'second')).to.eql(315619200);
        });

        it ('[second] Should correctly calculate difference in seconds when passing a var_a equal to var_b', () => {
            expect(diff(new Date("2022-10-05T13:12:11+02:00"), new Date("2022-10-05T13:12:11+02:00"), 'second')).to.eql(0);
        });

        it ('[second] Should correctly calculate difference in seconds when passing a var_a equal to var_b and not care about timezones', () => {
            expect(diff(new Date("2022-10-05T13:12:11+02:00"), new Date("2022-11-05T13:12:11.454+06:00"), 'second')).to.eql(-2664000.454);
            expect(diff(new Date("2022-10-05T13:12:11+02:00"), new Date("2022-10-05T17:12:11.000+06:00"), 'second')).to.eql(0);
            expect(diff(new Date("2022-10-05T13:12:11+02:00"), new Date("2022-10-05T17:43:09.344+06:00"), 'second')).to.eql(-1858.344);
            expect(diff(new Date("2022-11-05T13:12:11+06:00"), new Date("2022-10-05T13:34:43.874+02:00"), 'second')).to.eql(2662647.126);
            expect(diff(new Date("2022-10-05T13:12:11+02:00"), new Date("2022-11-05T13:53:21.672+06:00"), 'second')).to.eql(-2666470.672);
            expect(diff(new Date("2022-11-05T13:12:11+06:00"), new Date("2022-10-05T13:25:43.898+02:00"), 'second')).to.eql(2663187.102);
        });

        it ('[second] should be blazing fast in its conversion (1.000.000 benchmark < 750ms)', () => {
            let start_time = getTime();
            for (let i = 0; i < 1000000; i++) {
                diff(new Date("2022-10-05T13:12:11+02:00"), new Date("2022-11-05T13:12:11+06:00"), 'second');
            }
            expect(getTime() - start_time).to.be.lt(750);
        });

        it ('[seconds] Should correctly calculate difference in seconds when passing a var_a after var_b', () => {
            expect(diff(new Date("2022-10-05T13:12:11+02:00"), new Date("2032-10-05T11:12:11.000Z"), 'seconds')).to.eql(-315619200);
        });

        it ('[seconds] Should correctly calculate difference in seconds when passing a var_a before var_b', () => {
            expect(diff(new Date("2032-10-05T11:12:11.000Z"), new Date("2022-10-05T13:12:11+02:00"), 'seconds')).to.eql(315619200);
        });

        it ('[seconds] Should correctly calculate difference in seconds when passing a var_a equal to var_b', () => {
            expect(diff(new Date("2022-10-05T13:12:11+02:00"), new Date("2022-10-05T13:12:11+02:00"), 'seconds')).to.eql(0);
        });

        it ('[seconds] Should correctly calculate difference in seconds when passing a var_a equal to var_b and not care about timezones', () => {
            expect(diff(new Date("2022-10-05T13:12:11+02:00"), new Date("2022-11-05T13:12:11.454+06:00"), 'seconds')).to.eql(-2664000.454);
            expect(diff(new Date("2022-10-05T13:12:11+02:00"), new Date("2022-10-05T17:12:11.000+06:00"), 'seconds')).to.eql(0);
            expect(diff(new Date("2022-10-05T13:12:11+02:00"), new Date("2022-10-05T17:43:09.344+06:00"), 'seconds')).to.eql(-1858.344);
            expect(diff(new Date("2022-11-05T13:12:11+06:00"), new Date("2022-10-05T13:34:43.874+02:00"), 'seconds')).to.eql(2662647.126);
            expect(diff(new Date("2022-10-05T13:12:11+02:00"), new Date("2022-11-05T13:53:21.672+06:00"), 'seconds')).to.eql(-2666470.672);
            expect(diff(new Date("2022-11-05T13:12:11+06:00"), new Date("2022-10-05T13:25:43.898+02:00"), 'seconds')).to.eql(2663187.102);
        });

        it ('[seconds] should be blazing fast in its conversion (1.000.000 benchmark < 750ms)', () => {
            let start_time = getTime();
            for (let i = 0; i < 1000000; i++) {
                diff(new Date("2022-10-05T13:12:11+02:00"), new Date("2022-11-05T13:12:11+06:00"), 'seconds');
            }
            expect(getTime() - start_time).to.be.lt(750);
        });

        it ('[millisecond] Should correctly calculate difference in milliseconds when passing a var_a after var_b', () => {
            expect(diff(new Date("2022-10-05T13:12:11+02:00"), new Date("2032-10-05T11:12:11.000Z"), 'millisecond')).to.eql(-315619200000);
        });

        it ('[millisecond] Should correctly calculate difference in milliseconds when passing a var_a before var_b', () => {
            expect(diff(new Date("2032-10-05T11:12:11.000Z"), new Date("2022-10-05T13:12:11+02:00"), 'millisecond')).to.eql(315619200000);
        });

        it ('[millisecond] Should correctly calculate difference in milliseconds when passing a var_a equal to var_b', () => {
            expect(diff(new Date("2022-10-05T13:12:11+02:00"), new Date("2022-10-05T13:12:11+02:00"), 'millisecond')).to.eql(0);
        });

        it ('[millisecond] Should correctly calculate difference in milliseconds when passing a var_a equal to var_b and not care about timezones', () => {
            expect(diff(new Date("2022-10-05T13:12:11+02:00"), new Date("2022-11-05T13:12:11.454+06:00"), 'millisecond')).to.eql(-2664000454);
            expect(diff(new Date("2022-10-05T13:12:11+02:00"), new Date("2022-10-05T17:12:11.000+06:00"), 'millisecond')).to.eql(0);
            expect(diff(new Date("2022-10-05T13:12:11+02:00"), new Date("2022-10-05T17:43:09.344+06:00"), 'millisecond')).to.eql(-1858344);
            expect(diff(new Date("2022-11-05T13:12:11+06:00"), new Date("2022-10-05T13:34:43.874+02:00"), 'millisecond')).to.eql(2662647126);
            expect(diff(new Date("2022-10-05T13:12:11+02:00"), new Date("2022-11-05T13:53:21.672+06:00"), 'millisecond')).to.eql(-2666470672);
            expect(diff(new Date("2022-11-05T13:12:11+06:00"), new Date("2022-10-05T13:25:43.898+02:00"), 'millisecond')).to.eql(2663187102);
        });

        it ('[millisecond] should be blazing fast in its conversion (1.000.000 benchmark < 750ms)', () => {
            let start_time = getTime();
            for (let i = 0; i < 1000000; i++) {
                diff(new Date("2022-10-05T13:12:11+02:00"), new Date("2022-11-05T13:12:11+06:00"), 'millisecond');
            }
            expect(getTime() - start_time).to.be.lt(750);
        });

        it ('[milliseconds] Should correctly calculate difference in milliseconds when passing a var_a after var_b', () => {
            expect(diff(new Date("2022-10-05T13:12:11+02:00"), new Date("2032-10-05T11:12:11.000Z"), 'milliseconds')).to.eql(-315619200000);
        });

        it ('[milliseconds] Should correctly calculate difference in milliseconds when passing a var_a before var_b', () => {
            expect(diff(new Date("2032-10-05T11:12:11.000Z"), new Date("2022-10-05T13:12:11+02:00"), 'milliseconds')).to.eql(315619200000);
        });

        it ('[milliseconds] Should correctly calculate difference in milliseconds when passing a var_a equal to var_b', () => {
            expect(diff(new Date("2022-10-05T13:12:11+02:00"), new Date("2022-10-05T13:12:11+02:00"), 'milliseconds')).to.eql(0);
        });

        it ('[milliseconds] Should correctly calculate difference in milliseconds when passing a var_a equal to var_b and not care about timezones', () => {
            expect(diff(new Date("2022-10-05T13:12:11+02:00"), new Date("2022-11-05T13:12:11.454+06:00"), 'milliseconds')).to.eql(-2664000454);
            expect(diff(new Date("2022-10-05T13:12:11+02:00"), new Date("2022-10-05T17:12:11.000+06:00"), 'milliseconds')).to.eql(0);
            expect(diff(new Date("2022-10-05T13:12:11+02:00"), new Date("2022-10-05T17:43:09.344+06:00"), 'milliseconds')).to.eql(-1858344);
            expect(diff(new Date("2022-11-05T13:12:11+06:00"), new Date("2022-10-05T13:34:43.874+02:00"), 'milliseconds')).to.eql(2662647126);
            expect(diff(new Date("2022-10-05T13:12:11+02:00"), new Date("2022-11-05T13:53:21.672+06:00"), 'milliseconds')).to.eql(-2666470672);
            expect(diff(new Date("2022-11-05T13:12:11+06:00"), new Date("2022-10-05T13:25:43.898+02:00"), 'milliseconds')).to.eql(2663187102);
        });

        it ('[milliseconds] should be blazing fast in its conversion (1.000.000 benchmark < 750ms)', () => {
            let start_time = getTime();
            for (let i = 0; i < 1000000; i++) {
                diff(new Date("2022-10-05T13:12:11+02:00"), new Date("2022-11-05T13:12:11+06:00"), 'milliseconds');
            }
            expect(getTime() - start_time).to.be.lt(750);
        });

        it ('[false] Should correctly calculate difference in milliseconds when passing a var_a after var_b and false for key', () => {
            expect(diff(new Date("2022-10-05T13:12:11+02:00"), new Date("2032-10-05T11:12:11.000Z"), false)).to.eql(-315619200000);
        });

        it ('[] Should correctly calculate difference in milliseconds when passing a var_a after var_b and nothing for key', () => {
            expect(diff(new Date("2022-10-05T13:12:11+02:00"), new Date("2032-10-05T11:12:11.000Z"))).to.eql(-315619200000);
        });

        it ('[random] Should correctly calculate difference in milliseconds when passing a var_a after var_b and a random key', () => {
            for (const el of ['foo', 'bar', 'hello world']) {
                expect(diff(new Date("2022-10-05T13:12:11+02:00"), new Date("2032-10-05T11:12:11.000Z"), el)).to.eql(-315619200000);
            }
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

    describe("toUnix", () => {
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
                    toUnix(el);
                }).to.throw('');
            }
        });

        it ('return a date in unix as seconds', () => {
            const date = new Date("2023-05-01T12:04:27+02:00");
            expect(toUnix(date)).to.eql(1682935467);

            const date2 = new Date("2023-05-01T10:04:27.000Z");
            expect(toUnix(date2)).to.eql(1682935467);
        });

        it ('not touch on the passed date', () => {
            const date = new Date("14 Jun 2017 00:00:00 PDT");
            expect(toUnix(date)).to.eql(1497423600);

            date.setHours(20);
            expect(toUnix(date)).to.eql(1497463200);
            expect(date.toJSON()).to.eql("2017-06-14T18:00:00.000Z");
        });

        it ('should be blazing fast in its conversion (1.000.000 benchmark < 300ms)', () => {
            let start_time = getTime();
            for (let i = 0; i < 1000000; i++) {
                toUnix(new Date("2023-05-01T12:04:27+02:00"));
            }
            expect(getTime() - start_time).to.be.lt(300);
        });
    });

    describe("addUTC", () => {
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
                    addUTC(el, 10, 'day');
                }).to.throw('');
            }
        });

        it ('throw when passed a non-integer amount', () => {
            for (const el of [
                ...fnDateValues(),
                ...fnStringValues(),
                ...fnNumericValues(),
                ...fnBooleanValues(),
                ...fnRegexValues(),
                ...fnObjectValues(),
                ...fnNullables(),
                ...fnArrayValues(),
                ...fnFunctionValues(),
            ]) {
                if (isInteger(el)) continue;
                expect(function () {
                    addUTC(new Date(), el, 'day');
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
                    addUTC(new Date(), 10, el);
                }).to.throw('');
            }
        });

        it ('[year] Should correctly add when passing a positive integer', () => {
            expect(addUTC(new Date("2022-10-05T13:12:11+02:00"), 10, 'year')).to.eql(new Date("2032-10-05T11:12:11.000Z"));
        });

        it ('[year] Should correctly add when passing a negative integer', () => {
            expect(addUTC(new Date("2022-10-05T13:12:11+02:00"), -10, 'year')).to.eql(new Date("2012-10-05T11:12:11.000Z"));
        });

        it ('[year] Should correctly keep and just convert to utc when passing 0', () => {
            expect(addUTC(new Date("2022-10-05T13:12:11+02:00"), 0, 'year')).to.eql(new Date("2022-10-05T11:12:11.000Z"));
        });

        it ('[year] Should correctly set when going before the unix timestamp', () => {
            expect(addUTC(new Date("2022-10-05T13:12:11+02:00"), -100, 'year')).to.eql(new Date("1922-10-05T11:12:11.000Z"));
        });

        it ('[year] should be blazing fast (1.000.000 benchmark < 1000ms)', () => {
            let start_time = getTime();
            for (let i = 0; i < 1000000; i++) {
                addUTC(new Date("2022-10-05T13:12:11+02:00"), -100, 'year')
            }
            expect(getTime() - start_time).to.be.lt(1000);
        });

        it ('[years] Should correctly add when passing a positive integer', () => {
            expect(addUTC(new Date("2022-10-05T13:12:11+02:00"), 10, 'years')).to.eql(new Date("2032-10-05T11:12:11.000Z"));
        });

        it ('[years] Should correctly add when passing a negative integer', () => {
            expect(addUTC(new Date("2022-10-05T13:12:11+02:00"), -10, 'years')).to.eql(new Date("2012-10-05T11:12:11.000Z"));
        });

        it ('[years] Should correctly keep and just convert to utc when passing 0', () => {
            expect(addUTC(new Date("2022-10-05T13:12:11+02:00"), 0, 'years')).to.eql(new Date("2022-10-05T11:12:11.000Z"));
        });

        it ('[years] Should correctly set when going before the unix timestamp', () => {
            expect(addUTC(new Date("2022-10-05T13:12:11+02:00"), -100, 'years')).to.eql(new Date("1922-10-05T11:12:11.000Z"));
        });

        it ('[years] should be blazing fast (1.000.000 benchmark < 1000ms)', () => {
            let start_time = getTime();
            for (let i = 0; i < 1000000; i++) {
                addUTC(new Date("2022-10-05T13:12:11+02:00"), -100, 'years')
            }
            expect(getTime() - start_time).to.be.lt(1000);
        });

        it ('[month] Should correctly add when passing a positive integer', () => {
            expect(addUTC(new Date("2022-10-05T13:12:11+02:00"), 10, 'month')).to.eql(new Date("2023-08-05T11:12:11.000Z"));
        });

        it ('[month] Should correctly add when passing a negative integer', () => {
            expect(addUTC(new Date("2022-10-05T13:12:11+02:00"), -10, 'month')).to.eql(new Date("2021-12-05T11:12:11.000Z"));
        });

        it ('[month] Should correctly keep and just convert to utc when passing 0', () => {
            expect(addUTC(new Date("2022-10-05T13:12:11+02:00"), 0, 'month')).to.eql(new Date("2022-10-05T11:12:11.000Z"));
        });

        it ('[month] Should correctly set when going before the unix timestamp', () => {
            expect(addUTC(new Date("2022-10-05T13:12:11+02:00"), -8970, 'month')).to.eql(new Date("1275-04-05T11:12:11.000Z"));
        });

        it ('[month] should be blazing fast (1.000.000 benchmark < 1000ms)', () => {
            let start_time = getTime();
            for (let i = 0; i < 1000000; i++) {
                addUTC(new Date("2022-10-05T13:12:11+02:00"), -4832, 'month')
            }
            expect(getTime() - start_time).to.be.lt(1000);
        });

        it ('[months] Should correctly add when passing a positive integer', () => {
            expect(addUTC(new Date("2022-10-05T13:12:11+02:00"), 10, 'months')).to.eql(new Date("2023-08-05T11:12:11.000Z"));
        });

        it ('[months] Should correctly add when passing a negative integer', () => {
            expect(addUTC(new Date("2022-10-05T13:12:11+02:00"), -10, 'months')).to.eql(new Date("2021-12-05T11:12:11.000Z"));
        });

        it ('[months] Should correctly keep and just convert to utc when passing 0', () => {
            expect(addUTC(new Date("2022-10-05T13:12:11+02:00"), 0, 'months')).to.eql(new Date("2022-10-05T11:12:11.000Z"));
        });

        it ('[months] Should correctly set when going before the unix timestamp', () => {
            expect(addUTC(new Date("2022-10-05T13:12:11+02:00"), -4832, 'months')).to.eql(new Date("1620-02-05T11:12:11.000Z"));
        });

        it ('[months] should be blazing fast (1.000.000 benchmark < 1000ms)', () => {
            let start_time = getTime();
            for (let i = 0; i < 1000000; i++) {
                addUTC(new Date("2022-10-05T13:12:11+02:00"), -4832, 'months')
            }
            expect(getTime() - start_time).to.be.lt(1000);
        });

        it ('[day] Should correctly add when passing a positive integer', () => {
            expect(addUTC(new Date("2022-10-05T13:12:11+02:00"), 10, 'day')).to.eql(new Date("2022-10-15T11:12:11.000Z"));
        });

        it ('[day] Should correctly add when passing a positive integer and it would go into next year', () => {
            expect(addUTC(new Date("2022-10-05T13:12:11+02:00"), 200, 'day')).to.eql(new Date("2023-04-23T11:12:11.000Z"));
        });

        it ('[day] Should correctly add when passing a negative integer', () => {
            expect(addUTC(new Date("2022-10-05T13:12:11+02:00"), -10, 'day')).to.eql(new Date("2022-09-25T11:12:11.000Z"));
        });

        it ('[day] Should correctly add when passing a negative integer and it would go into previous year', () => {
            expect(addUTC(new Date("2022-10-05T13:12:11+02:00"), -400, 'day')).to.eql(new Date("2021-08-31T11:12:11.000Z"));
        });

        it ('[day] Should correctly keep and just convert to utc when passing 0', () => {
            expect(addUTC(new Date("2022-10-05T13:12:11+02:00"), 0, 'day')).to.eql(new Date("2022-10-05T11:12:11.000Z"));
        });

        it ('[day] Should correctly set when going before the unix timestamp', () => {
            expect(addUTC(new Date("2022-10-05T13:12:11+02:00"), -89700, 'day')).to.eql(new Date("1777-03-03T11:12:11.000Z"));
        });

        it ('[day] should be blazing fast (1.000.000 benchmark < 1000ms)', () => {
            let start_time = getTime();
            for (let i = 0; i < 1000000; i++) {
                addUTC(new Date("2022-10-05T13:12:11+02:00"), -48320, 'day')
            }
            expect(getTime() - start_time).to.be.lt(1000);
        });

        it ('[days] Should correctly add when passing a positive integer', () => {
            expect(addUTC(new Date("2022-10-05T13:12:11+02:00"), 10, 'days')).to.eql(new Date("2022-10-15T11:12:11.000Z"));
        });

        it ('[days] Should correctly add when passing a positive integer and it would go into next year', () => {
            expect(addUTC(new Date("2022-10-05T13:12:11+02:00"), 200, 'days')).to.eql(new Date("2023-04-23T11:12:11.000Z"));
        });

        it ('[days] Should correctly add when passing a negative integer', () => {
            expect(addUTC(new Date("2022-10-05T13:12:11+02:00"), -10, 'days')).to.eql(new Date("2022-09-25T11:12:11.000Z"));
        });

        it ('[days] Should correctly add when passing a negative integer and it would go into previous year', () => {
            expect(addUTC(new Date("2022-10-05T13:12:11+02:00"), -400, 'days')).to.eql(new Date("2021-08-31T11:12:11.000Z"));
        });

        it ('[days] Should correctly keep and just convert to utc when passing 0', () => {
            expect(addUTC(new Date("2022-10-05T13:12:11+02:00"), 0, 'days')).to.eql(new Date("2022-10-05T11:12:11.000Z"));
        });

        it ('[days] Should correctly set when going before the unix timestamp', () => {
            expect(addUTC(new Date("2022-10-05T13:12:11+02:00"), -48320, 'days')).to.eql(new Date("1890-06-19T11:12:11.000Z"));
        });

        it ('[days] should be blazing fast (1.000.000 benchmark < 1000ms)', () => {
            let start_time = getTime();
            for (let i = 0; i < 1000000; i++) {
                addUTC(new Date("2022-10-05T13:12:11+02:00"), -48320, 'days')
            }
            expect(getTime() - start_time).to.be.lt(1000);
        });

        it ('[hour] Should correctly add when passing a positive integer', () => {
            expect(addUTC(new Date("2022-10-05T13:12:11+02:00"), 10, 'hour')).to.eql(new Date("2022-10-05T21:12:11.000Z"));
        });

        it ('[hour] Should correctly add when passing a positive integer and it would go into next year', () => {
            expect(addUTC(new Date("2022-10-05T13:12:11+02:00"), 2200, 'hour')).to.eql(new Date("2023-01-05T03:12:11.000Z"));
        });

        it ('[hour] Should correctly add when passing a negative integer', () => {
            expect(addUTC(new Date("2022-10-05T13:12:11+02:00"), -10, 'hour')).to.eql(new Date("2022-10-05T01:12:11.000Z"));
        });

        it ('[hour] Should correctly add when passing a negative integer and it would go into previous year', () => {
            expect(addUTC(new Date("2022-10-05T13:12:11+02:00"), -8400, 'hour')).to.eql(new Date("2021-10-20T11:12:11.000Z"));
        });

        it ('[hour] Should correctly keep and just convert to utc when passing 0', () => {
            expect(addUTC(new Date("2022-10-05T13:12:11+02:00"), 0, 'hour')).to.eql(new Date("2022-10-05T11:12:11.000Z"));
        });

        it ('[hour] Should correctly set when going before the unix timestamp', () => {
            expect(addUTC(new Date("2022-10-05T13:12:11+02:00"), -897000, 'hour')).to.eql(new Date("1920-06-07T11:12:11.000Z"));
        });

        it ('[hour] should be blazing fast (1.000.000 benchmark < 1000ms)', () => {
            let start_time = getTime();
            for (let i = 0; i < 1000000; i++) {
                addUTC(new Date("2022-10-05T13:12:11+02:00"), -483200, 'hour')
            }
            expect(getTime() - start_time).to.be.lt(1000);
        });

        it ('[hours] Should correctly add when passing a positive integer', () => {
            expect(addUTC(new Date("2022-10-05T13:12:11+02:00"), 10, 'hours')).to.eql(new Date("2022-10-05T21:12:11.000Z"));
        });

        it ('[hours] Should correctly add when passing a positive integer and it would go into next year', () => {
            expect(addUTC(new Date("2022-10-05T13:12:11+02:00"), 2200, 'hours')).to.eql(new Date("2023-01-05T03:12:11.000Z"));
        });

        it ('[hours] Should correctly add when passing a negative integer', () => {
            expect(addUTC(new Date("2022-10-05T13:12:11+02:00"), -10, 'hours')).to.eql(new Date("2022-10-05T01:12:11.000Z"));
        });

        it ('[hours] Should correctly add when passing a negative integer and it would go into previous year', () => {
            expect(addUTC(new Date("2022-10-05T13:12:11+02:00"), -8400, 'hours')).to.eql(new Date("2021-10-20T11:12:11.000Z"));
        });

        it ('[hours] Should correctly keep and just convert to utc when passing 0', () => {
            expect(addUTC(new Date("2022-10-05T13:12:11+02:00"), 0, 'hours')).to.eql(new Date("2022-10-05T11:12:11.000Z"));
        });

        it ('[hours] Should correctly set when going before the unix timestamp', () => {
            expect(addUTC(new Date("2022-10-05T13:12:11+02:00"), -483200, 'hours')).to.eql(new Date("1967-08-22T03:12:11.000Z"));
        });

        it ('[hours] should be blazing fast (1.000.000 benchmark < 1000ms)', () => {
            let start_time = getTime();
            for (let i = 0; i < 1000000; i++) {
                addUTC(new Date("2022-10-05T13:12:11+02:00"), -483200, 'hours')
            }
            expect(getTime() - start_time).to.be.lt(1000);
        });

        it ('[minute] Should correctly add when passing a positive integer', () => {
            expect(addUTC(new Date("2022-10-05T13:12:11+02:00"), 10, 'minute')).to.eql(new Date("2022-10-05T11:22:11.000Z"));
        });

        it ('[minute] Should correctly add when passing a positive integer and it would go into next hour', () => {
            expect(addUTC(new Date("2022-10-05T13:12:11+02:00"), 59, 'minute')).to.eql(new Date("2022-10-05T12:11:11.000Z"));
        });

        it ('[minute] Should correctly add when passing a positive integer and it would go into next day', () => {
            expect(addUTC(new Date("2022-10-05T13:12:11+02:00"), 2873, 'minute')).to.eql(new Date("2022-10-07T11:05:11.000Z"));
        });

        it ('[minute] Should correctly add when passing a positive integer and it would go into next month', () => {
            expect(addUTC(new Date("2022-10-05T13:12:11+02:00"), 92053, 'minute')).to.eql(new Date("2022-12-08T09:25:11.000Z"));
        });

        it ('[minute] Should correctly add when passing a positive integer and it would go into next year', () => {
            expect(addUTC(new Date("2022-10-05T13:12:11+02:00"), 336000, 'minute')).to.eql(new Date("2023-05-26T19:12:11.000Z"));
        });

        it ('[minute] Should correctly add when passing a negative integer', () => {
            expect(addUTC(new Date("2022-10-05T13:12:11+02:00"), -10, 'minute')).to.eql(new Date("2022-10-05T11:02:11.000Z"));
        });

        it ('[minute] Should correctly add when passing a negative integer and it would go into previous hour', () => {
            expect(addUTC(new Date("2022-10-05T13:12:11+02:00"), -34, 'minute')).to.eql(new Date("2022-10-05T10:38:11.000Z"));
        });

        it ('[minute] Should correctly add when passing a negative integer and it would go into previous day', () => {
            expect(addUTC(new Date("2022-10-05T13:12:11+02:00"), -769, 'minute')).to.eql(new Date("2022-10-04T22:23:11.000Z"));
        });

        it ('[minute] Should correctly add when passing a negative integer and it would go into previous month', () => {
            expect(addUTC(new Date("2022-10-05T13:12:11+02:00"), -14923, 'minute')).to.eql(new Date("2022-09-25T02:29:11.000Z"));
        });

        it ('[minute] Should correctly add when passing a negative integer and it would go into previous year', () => {
            expect(addUTC(new Date("2022-10-05T13:12:11+02:00"), -414005, 'minute')).to.eql(new Date("2021-12-21T23:07:11.000Z"));
        });

        it ('[minute] Should correctly keep and just convert to utc when passing 0', () => {
            expect(addUTC(new Date("2022-10-05T13:12:11+02:00"), 0, 'minute')).to.eql(new Date("2022-10-05T11:12:11.000Z"));
        });

        it ('[minute] Should correctly set when going before the unix timestamp', () => {
            expect(addUTC(new Date("2022-10-05T13:12:11+02:00"), -38970000, 'minute')).to.eql(new Date("1948-08-31T23:12:11.000Z"));
        });

        it ('[minute] should be blazing fast (1.000.000 benchmark < 1000ms)', () => {
            let start_time = getTime();
            for (let i = 0; i < 1000000; i++) {
                addUTC(new Date("2022-10-05T13:12:11+02:00"), -38970000, 'minute')
            }
            expect(getTime() - start_time).to.be.lt(1000);
        });

        it ('[minutes] Should correctly add when passing a positive integer', () => {
            expect(addUTC(new Date("2022-10-05T13:12:11+02:00"), 10, 'minutes')).to.eql(new Date("2022-10-05T11:22:11.000Z"));
        });

        it ('[minutes] Should correctly add when passing a positive integer and it would go into next hour', () => {
            expect(addUTC(new Date("2022-10-05T13:12:11+02:00"), 59, 'minutes')).to.eql(new Date("2022-10-05T12:11:11.000Z"));
        });

        it ('[minutes] Should correctly add when passing a positive integer and it would go into next day', () => {
            expect(addUTC(new Date("2022-10-05T13:12:11+02:00"), 2873, 'minutes')).to.eql(new Date("2022-10-07T11:05:11.000Z"));
        });

        it ('[minutes] Should correctly add when passing a positive integer and it would go into next month', () => {
            expect(addUTC(new Date("2022-10-05T13:12:11+02:00"), 92053, 'minutes')).to.eql(new Date("2022-12-08T09:25:11.000Z"));
        });

        it ('[minutes] Should correctly add when passing a positive integer and it would go into next year', () => {
            expect(addUTC(new Date("2022-10-05T13:12:11+02:00"), 336000, 'minutes')).to.eql(new Date("2023-05-26T19:12:11.000Z"));
        });

        it ('[minutes] Should correctly add when passing a negative integer', () => {
            expect(addUTC(new Date("2022-10-05T13:12:11+02:00"), -10, 'minutes')).to.eql(new Date("2022-10-05T11:02:11.000Z"));
        });

        it ('[minutes] Should correctly add when passing a negative integer and it would go into previous hour', () => {
            expect(addUTC(new Date("2022-10-05T13:12:11+02:00"), -34, 'minutes')).to.eql(new Date("2022-10-05T10:38:11.000Z"));
        });

        it ('[minutes] Should correctly add when passing a negative integer and it would go into previous day', () => {
            expect(addUTC(new Date("2022-10-05T13:12:11+02:00"), -769, 'minutes')).to.eql(new Date("2022-10-04T22:23:11.000Z"));
        });

        it ('[minutes] Should correctly add when passing a negative integer and it would go into previous month', () => {
            expect(addUTC(new Date("2022-10-05T13:12:11+02:00"), -14923, 'minutes')).to.eql(new Date("2022-09-25T02:29:11.000Z"));
        });

        it ('[minutes] Should correctly add when passing a negative integer and it would go into previous year', () => {
            expect(addUTC(new Date("2022-10-05T13:12:11+02:00"), -414005, 'minutes')).to.eql(new Date("2021-12-21T23:07:11.000Z"));
        });

        it ('[minutes] Should correctly keep and just convert to utc when passing 0', () => {
            expect(addUTC(new Date("2022-10-05T13:12:11+02:00"), 0, 'minutes')).to.eql(new Date("2022-10-05T11:12:11.000Z"));
        });

        it ('[minutes] Should correctly set when going before the unix timestamp', () => {
            expect(addUTC(new Date("2022-10-05T13:12:11+02:00"), -38970000, 'minutes')).to.eql(new Date("1948-08-31T23:12:11.000Z"));
        });

        it ('[minutes] should be blazing fast (1.000.000 benchmark < 1000ms)', () => {
            let start_time = getTime();
            for (let i = 0; i < 1000000; i++) {
                addUTC(new Date("2022-10-05T13:12:11+02:00"), -38970000, 'minutes')
            }
            expect(getTime() - start_time).to.be.lt(1000);
        });

        it ('[second] Should correctly add when passing a positive integer', () => {
            expect(addUTC(new Date("2022-10-05T13:12:11+02:00"), 10, 'second')).to.eql(new Date("2022-10-05T11:12:21.000Z"));
        });

        it ('[second] Should correctly add when passing a positive integer and it would go into next minute', () => {
            expect(addUTC(new Date("2022-10-05T13:12:11+02:00"), 59, 'second')).to.eql(new Date("2022-10-05T11:13:10.000Z"));
        });

        it ('[second] Should correctly add when passing a positive integer and it would go into next hour', () => {
            expect(addUTC(new Date("2022-10-05T13:12:11+02:00"), 59 * 60, 'second')).to.eql(new Date("2022-10-05T12:11:11.000Z"));
        });

        it ('[second] Should correctly add when passing a positive integer and it would go into next day', () => {
            expect(addUTC(new Date("2022-10-05T13:12:11+02:00"), 2873 * 60, 'second')).to.eql(new Date("2022-10-07T11:05:11.000Z"));
        });

        it ('[second] Should correctly add when passing a positive integer and it would go into next month', () => {
            expect(addUTC(new Date("2022-10-05T13:12:11+02:00"), 92053 * 60, 'second')).to.eql(new Date("2022-12-08T09:25:11.000Z"));
        });

        it ('[second] Should correctly add when passing a positive integer and it would go into next year', () => {
            expect(addUTC(new Date("2022-10-05T13:12:11+02:00"), 336000 * 60, 'second')).to.eql(new Date("2023-05-26T19:12:11.000Z"));
        });

        it ('[second] Should correctly add when passing a negative integer', () => {
            expect(addUTC(new Date("2022-10-05T13:12:11+02:00"), -10, 'second')).to.eql(new Date("2022-10-05T11:12:01.000Z"));
        });

        it ('[second] Should correctly add when passing a negative integer and it would go into previous minute', () => {
            expect(addUTC(new Date("2022-10-05T13:12:11+02:00"), -34 * 60, 'second')).to.eql(new Date("2022-10-05T10:38:11.000Z"));
        });

        it ('[second] Should correctly add when passing a negative integer and it would go into previous hour', () => {
            expect(addUTC(new Date("2022-10-05T13:12:11+02:00"), -34 * 60, 'second')).to.eql(new Date("2022-10-05T10:38:11.000Z"));
        });

        it ('[second] Should correctly add when passing a negative integer and it would go into previous day', () => {
            expect(addUTC(new Date("2022-10-05T13:12:11+02:00"), -769 * 60, 'second')).to.eql(new Date("2022-10-04T22:23:11.000Z"));
        });

        it ('[second] Should correctly add when passing a negative integer and it would go into previous month', () => {
            expect(addUTC(new Date("2022-10-05T13:12:11+02:00"), -14923 * 60, 'second')).to.eql(new Date("2022-09-25T02:29:11.000Z"));
        });

        it ('[second] Should correctly add when passing a negative integer and it would go into previous year', () => {
            expect(addUTC(new Date("2022-10-05T13:12:11+02:00"), -414005 * 60, 'second')).to.eql(new Date("2021-12-21T23:07:11.000Z"));
        });

        it ('[second] Should correctly keep and just convert to utc when passing 0', () => {
            expect(addUTC(new Date("2022-10-05T13:12:11+02:00"), 0, 'second')).to.eql(new Date("2022-10-05T11:12:11.000Z"));
        });

        it ('[second] Should correctly set when going before the unix timestamp', () => {
            expect(addUTC(new Date("2022-10-05T13:12:11+02:00"), -38970000 * 60, 'second')).to.eql(new Date("1948-08-31T23:12:11.000Z"));
        });

        it ('[second] should be blazing fast (1.000.000 benchmark < 1000ms)', () => {
            let start_time = getTime();
            for (let i = 0; i < 1000000; i++) {
                addUTC(new Date("2022-10-05T13:12:11+02:00"), -38970000 * 60, 'second');
            }
            expect(getTime() - start_time).to.be.lt(1000);
        });

        it ('[seconds] Should correctly add when passing a positive integer', () => {
            expect(addUTC(new Date("2022-10-05T13:12:11+02:00"), 10, 'seconds')).to.eql(new Date("2022-10-05T11:12:21.000Z"));
        });

        it ('[seconds] Should correctly add when passing a positive integer and it would go into next minute', () => {
            expect(addUTC(new Date("2022-10-05T13:12:11+02:00"), 59, 'seconds')).to.eql(new Date("2022-10-05T11:13:10.000Z"));
        });

        it ('[seconds] Should correctly add when passing a positive integer and it would go into next hour', () => {
            expect(addUTC(new Date("2022-10-05T13:12:11+02:00"), 59 * 60, 'seconds')).to.eql(new Date("2022-10-05T12:11:11.000Z"));
        });

        it ('[seconds] Should correctly add when passing a positive integer and it would go into next day', () => {
            expect(addUTC(new Date("2022-10-05T13:12:11+02:00"), 2873 * 60, 'seconds')).to.eql(new Date("2022-10-07T11:05:11.000Z"));
        });

        it ('[seconds] Should correctly add when passing a positive integer and it would go into next month', () => {
            expect(addUTC(new Date("2022-10-05T13:12:11+02:00"), 92053 * 60, 'seconds')).to.eql(new Date("2022-12-08T09:25:11.000Z"));
        });

        it ('[seconds] Should correctly add when passing a positive integer and it would go into next year', () => {
            expect(addUTC(new Date("2022-10-05T13:12:11+02:00"), 336000 * 60, 'seconds')).to.eql(new Date("2023-05-26T19:12:11.000Z"));
        });

        it ('[seconds] Should correctly add when passing a negative integer', () => {
            expect(addUTC(new Date("2022-10-05T13:12:11+02:00"), -10, 'seconds')).to.eql(new Date("2022-10-05T11:12:01.000Z"));
        });

        it ('[seconds] Should correctly add when passing a negative integer and it would go into previous minute', () => {
            expect(addUTC(new Date("2022-10-05T13:12:11+02:00"), -34 * 60, 'seconds')).to.eql(new Date("2022-10-05T10:38:11.000Z"));
        });

        it ('[seconds] Should correctly add when passing a negative integer and it would go into previous hour', () => {
            expect(addUTC(new Date("2022-10-05T13:12:11+02:00"), -34 * 60, 'seconds')).to.eql(new Date("2022-10-05T10:38:11.000Z"));
        });

        it ('[seconds] Should correctly add when passing a negative integer and it would go into previous day', () => {
            expect(addUTC(new Date("2022-10-05T13:12:11+02:00"), -769 * 60, 'seconds')).to.eql(new Date("2022-10-04T22:23:11.000Z"));
        });

        it ('[seconds] Should correctly add when passing a negative integer and it would go into previous month', () => {
            expect(addUTC(new Date("2022-10-05T13:12:11+02:00"), -14923 * 60, 'seconds')).to.eql(new Date("2022-09-25T02:29:11.000Z"));
        });

        it ('[seconds] Should correctly add when passing a negative integer and it would go into previous year', () => {
            expect(addUTC(new Date("2022-10-05T13:12:11+02:00"), -414005 * 60, 'seconds')).to.eql(new Date("2021-12-21T23:07:11.000Z"));
        });

        it ('[seconds] Should correctly keep and just convert to utc when passing 0', () => {
            expect(addUTC(new Date("2022-10-05T13:12:11+02:00"), 0, 'seconds')).to.eql(new Date("2022-10-05T11:12:11.000Z"));
        });

        it ('[seconds] Should correctly set when going before the unix timestamp', () => {
            expect(addUTC(new Date("2022-10-05T13:12:11+02:00"), -38970000 * 60, 'seconds')).to.eql(new Date("1948-08-31T23:12:11.000Z"));
        });

        it ('[seconds] should be blazing fast (1.000.000 benchmark < 1000ms)', () => {
            let start_time = getTime();
            for (let i = 0; i < 1000000; i++) {
                addUTC(new Date("2022-10-05T13:12:11+02:00"), -38970000 * 60, 'seconds');
            }
            expect(getTime() - start_time).to.be.lt(1000);
        });

        it ('should return original date in utc when passed a non-recognized key', () => {
            expect(addUTC(new Date("2022-10-05T13:12:11+02:00"), -38970000 * 60, 'jedis')).to.eql(new Date("2022-10-05T11:12:11.000Z"));
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

        it ('[quarter] should correctly set to start of quarter utc', () => {
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

        it ('[week] should correctly set to start of week utc with monday as first day of the week', () => {
            expect(startOfUTC(new Date("2023-05-04T12:04:27+02:00"), 'week')).to.eql(new Date("2023-05-01T00:00:00.000Z"));
            expect(startOfUTC(new Date("2023-05-14T12:04:27+02:00"), 'week')).to.eql(new Date("2023-05-08T00:00:00.000Z"));
        });

        it ('[week] should correctly set to start of week utc with monday as first day of the week when already on that day', () => {
            expect(startOfUTC(new Date("2023-05-08T12:04:27+02:00"), 'week')).to.eql(new Date("2023-05-08T00:00:00.000Z"));
        });

        it ('[week] should correctly set to start of week utc with monday as first day of the week when start of week is in different month', () => {
            expect(startOfUTC(new Date("2023-02-03T12:04:27+02:00"), 'week')).to.eql(new Date("2023-01-30T00:00:00.000Z"));
        });

        it ('[week] should correctly set to start of week utc with monday as first day of the week when start of week is in different year', () => {
            expect(startOfUTC(new Date("2023-01-01T12:04:27+02:00"), 'week')).to.eql(new Date("2022-12-26T00:00:00.000Z"));
        });

        it ('[week] should be blazing fast in its conversion (1.000.000 benchmark < 750ms)', () => {
            let start_time = getTime();
            for (let i = 0; i < 1000000; i++) {
                startOfUTC(new Date("2023-05-04T12:04:27+02:00"), 'week');
            }
            expect(getTime() - start_time).to.be.lt(750);
        });

        it ('[week_sun] should correctly set to start of week utc with sunday as first day of the week', () => {
            expect(startOfUTC(new Date("2023-05-04T12:04:27+02:00"), 'week_sun')).to.eql(new Date("2023-04-30T00:00:00.000Z"));
            expect(startOfUTC(new Date("2023-05-13T12:04:27+02:00"), 'week_sun')).to.eql(new Date("2023-05-07T00:00:00.000Z"));
        });

        it ('[week_sun] should correctly set to start of week utc with sunday as first day of the week when already on that day', () => {
            expect(startOfUTC(new Date("2023-05-07T12:04:27+02:00"), 'week_sun')).to.eql(new Date("2023-05-07T00:00:00.000Z"));
        });

        it ('[week_sun] should correctly set to start of week utc with sunday as first day of the week when start of week is in different month', () => {
            expect(startOfUTC(new Date("2023-02-03T12:04:27+02:00"), 'week_sun')).to.eql(new Date("2023-01-29T00:00:00.000Z"));
        });

        it ('[week_sun] should correctly set to start of week utc with sunday as first day of the week when start of week is in different year', () => {
            expect(startOfUTC(new Date("2022-01-01T12:04:27+02:00"), 'week_sun')).to.eql(new Date("2021-12-26T00:00:00.000Z"));
        });

        it ('[week_sun] should be blazing fast in its conversion (1.000.000 benchmark < 750ms)', () => {
            let start_time = getTime();
            for (let i = 0; i < 1000000; i++) {
                startOfUTC(new Date("2023-05-04T12:04:27+02:00"), 'week_sun');
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

    describe("endOfUTC", () => {
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
                    endOfUTC(el, 'day');
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
                    endOfUTC(new Date(), el);
                }).to.throw('');
            }
        });

        it ('[year] should correctly set to end of year utc', () => {
            expect(endOfUTC(new Date("2023-05-04T12:04:27+02:00"), 'year')).to.eql(new Date("2023-12-31T23:59:59.999Z"));
        });

        it ('[year] should be blazing fast in its conversion (1.000.000 benchmark < 750ms)', () => {
            let start_time = getTime();
            for (let i = 0; i < 1000000; i++) {
                endOfUTC(new Date("2023-05-01T12:04:27+02:00"), 'year');
            }
            expect(getTime() - start_time).to.be.lt(750);
        });

        it ('[quarter] should correctly set to end of quarter utc', () => {
            const qmap = {
                1: {m: 3, d: 31},
                2: {m: 3, d: 31},
                3: {m: 3, d: 31},
                4: {m: 6, d: 30},
                5: {m: 6, d: 30},
                6: {m: 6, d: 30},
                7: {m: 9, d: 30},
                8: {m: 9, d: 30},
                9: {m: 9, d: 30},
                10: {m: 12, d: 31},
                11: {m: 12, d: 31},
                12: {m: 12, d: 31},
            };
            for (let i = 1; i <= 12; i++) {
                let date = `2023-${i < 10 ? '0' : ''}${i}-04T12:04:27+02:00`;
                let date_q = `2023-${qmap[i].m < 10 ? '0' : ''}${qmap[i].m}-${qmap[i].d}T23:59:59.999Z`;
                expect(endOfUTC(new Date(date), 'quarter')).to.eql(new Date(date_q));
            }
        });

        it ('[quarter] should be blazing fast in its conversion (1.000.000 benchmark < 750ms)', () => {
            let start_time = getTime();
            for (let i = 0; i < 1000000; i++) {
                endOfUTC(new Date("2023-05-01T12:04:27+02:00"), 'quarter');
            }
            expect(getTime() - start_time).to.be.lt(750);
        });

        it ('[month] should correctly set to end of month utc', () => {
            expect(endOfUTC(new Date("2023-01-04T12:04:27+02:00"), 'month')).to.eql(new Date("2023-01-31T23:59:59.999Z"));
            expect(endOfUTC(new Date("2023-02-04T12:04:27+02:00"), 'month')).to.eql(new Date("2023-02-28T23:59:59.999Z"));
            expect(endOfUTC(new Date("2023-03-04T12:04:27+02:00"), 'month')).to.eql(new Date("2023-03-31T23:59:59.999Z"));
            expect(endOfUTC(new Date("2023-04-04T12:04:27+02:00"), 'month')).to.eql(new Date("2023-04-30T23:59:59.999Z"));
            expect(endOfUTC(new Date("2023-05-04T12:04:27+02:00"), 'month')).to.eql(new Date("2023-05-31T23:59:59.999Z"));
            expect(endOfUTC(new Date("2023-06-04T12:04:27+02:00"), 'month')).to.eql(new Date("2023-06-30T23:59:59.999Z"));
            expect(endOfUTC(new Date("2023-07-04T12:04:27+02:00"), 'month')).to.eql(new Date("2023-07-31T23:59:59.999Z"));
            expect(endOfUTC(new Date("2023-08-04T12:04:27+02:00"), 'month')).to.eql(new Date("2023-08-31T23:59:59.999Z"));
            expect(endOfUTC(new Date("2023-09-04T12:04:27+02:00"), 'month')).to.eql(new Date("2023-09-30T23:59:59.999Z"));
            expect(endOfUTC(new Date("2023-10-04T12:04:27+02:00"), 'month')).to.eql(new Date("2023-10-31T23:59:59.999Z"));
            expect(endOfUTC(new Date("2023-11-04T12:04:27+02:00"), 'month')).to.eql(new Date("2023-11-30T23:59:59.999Z"));
            expect(endOfUTC(new Date("2023-12-04T12:04:27+02:00"), 'month')).to.eql(new Date("2023-12-31T23:59:59.999Z"));
        });

        it ('[month] should correctly set to end of month utc for february when in a leap year', () => {
            expect(endOfUTC(new Date("2024-02-04T12:04:27+02:00"), 'month')).to.eql(new Date("2024-02-29T23:59:59.999Z"));
        });

        it ('[month] should be blazing fast in its conversion (1.000.000 benchmark < 750ms)', () => {
            let start_time = getTime();
            for (let i = 0; i < 1000000; i++) {
                endOfUTC(new Date("2023-05-01T12:04:27+02:00"), 'month');
            }
            expect(getTime() - start_time).to.be.lt(750);
        });

        it ('[week] should correctly set to end of week utc with monday as first day of the week', () => {
            expect(endOfUTC(new Date("2023-05-04T12:04:27+02:00"), 'week')).to.eql(new Date("2023-05-07T23:59:59.999Z"));
            expect(endOfUTC(new Date("2023-05-13T12:04:27+02:00"), 'week')).to.eql(new Date("2023-05-14T23:59:59.999Z"));
        });

        it ('[week] should correctly set to end of week utc with monday as first day of the week when already on that day', () => {
            expect(endOfUTC(new Date("2023-05-14T12:04:27+02:00"), 'week')).to.eql(new Date("2023-05-14T23:59:59.999Z"));
        });

        it ('[week] should correctly set to end of week utc with monday as first day of the week when end of week is in different month', () => {
            expect(endOfUTC(new Date("2023-02-27T12:04:27+02:00"), 'week')).to.eql(new Date("2023-03-05T23:59:59.999Z"));
        });

        it ('[week] should correctly set to end of week utc with monday as first day of the week when end of week is in different year', () => {
            expect(endOfUTC(new Date("2022-12-29T12:04:27+02:00"), 'week')).to.eql(new Date("2023-01-01T23:59:59.999Z"));
        });

        it ('[week] should be blazing fast in its conversion (1.000.000 benchmark < 750ms)', () => {
            let start_time = getTime();
            for (let i = 0; i < 1000000; i++) {
                endOfUTC(new Date("2023-05-04T12:04:27+02:00"), 'week');
            }
            expect(getTime() - start_time).to.be.lt(750);
        });

        it ('[week_sun] should correctly set to end of week utc with sunday as first day of the week', () => {
            expect(endOfUTC(new Date("2023-05-04T12:04:27+02:00"), 'week_sun')).to.eql(new Date("2023-05-06T23:59:59.999Z"));
            expect(endOfUTC(new Date("2023-05-12T12:04:27+02:00"), 'week_sun')).to.eql(new Date("2023-05-13T23:59:59.999Z"));
        });

        it ('[week_sun] should correctly set to end of week utc with sunday as first day of the week when already on that day', () => {
            expect(endOfUTC(new Date("2023-05-06T12:04:27+02:00"), 'week_sun')).to.eql(new Date("2023-05-06T23:59:59.999Z"));
        });

        it ('[week_sun] should correctly set to end of week utc with sunday as first day of the week when end of week is in different month', () => {
            expect(endOfUTC(new Date("2023-03-29T12:04:27+02:00"), 'week_sun')).to.eql(new Date("2023-04-01T23:59:59.999Z"));
        });

        it ('[week_sun] should correctly set to end of week utc with sunday as first day of the week when end of week is in different year', () => {
            expect(endOfUTC(new Date("2021-12-28T12:04:27+02:00"), 'week_sun')).to.eql(new Date("2022-01-01T23:59:59.999Z"));
        });

        it ('[week_sun] should be blazing fast in its conversion (1.000.000 benchmark < 750ms)', () => {
            let start_time = getTime();
            for (let i = 0; i < 1000000; i++) {
                endOfUTC(new Date("2023-05-04T12:04:27+02:00"), 'week_sun');
            }
            expect(getTime() - start_time).to.be.lt(750);
        });

        it ('[day] should correctly set to end of day utc', () => {
            expect(endOfUTC(new Date("2023-05-04T12:04:27+02:00"), 'day')).to.eql(new Date("2023-05-04T23:59:59.999Z"));
        });

        it ('[day] should be blazing fast in its conversion (1.000.000 benchmark < 750ms)', () => {
            let start_time = getTime();
            for (let i = 0; i < 1000000; i++) {
                endOfUTC(new Date("2023-05-01T12:04:27+02:00"), 'day');
            }
            expect(getTime() - start_time).to.be.lt(750);
        });

        it ('[hour] should correctly set to end of hour utc', () => {
            expect(endOfUTC(new Date("2023-05-04T12:04:27+02:00"), 'hour')).to.eql(new Date("2023-05-04T10:59:59.999Z"));
        });

        it ('[hour] should be blazing fast in its conversion (1.000.000 benchmark < 750ms)', () => {
            let start_time = getTime();
            for (let i = 0; i < 1000000; i++) {
                endOfUTC(new Date("2023-05-01T12:04:27+02:00"), 'hour');
            }
            expect(getTime() - start_time).to.be.lt(750);
        });

        it ('[minute] should correctly set to end of minute utc', () => {
            expect(endOfUTC(new Date("2023-05-04T12:04:27+02:00"), 'minute')).to.eql(new Date("2023-05-04T10:04:59.999Z"));
        });

        it ('[minute] should be blazing fast in its conversion (1.000.000 benchmark < 750ms)', () => {
            let start_time = getTime();
            for (let i = 0; i < 1000000; i++) {
                endOfUTC(new Date("2023-05-01T12:04:27+02:00"), 'minute');
            }
            expect(getTime() - start_time).to.be.lt(750);
        });

        it ('[second] should correctly set to end of second utc', () => {
            expect(endOfUTC(new Date("2023-05-04T12:04:27.043+02:00"), 'second')).to.eql(new Date("2023-05-04T10:04:27.999Z"));
        });

        it ('[second] should be blazing fast in its conversion (1.000.000 benchmark < 750ms)', () => {
            let start_time = getTime();
            for (let i = 0; i < 1000000; i++) {
                endOfUTC(new Date("2023-05-01T12:04:27+02:00"), 'second');
            }
            expect(getTime() - start_time).to.be.lt(750);
        });

        it ('should return original date when passed a non-recognized key', () => {
            expect(endOfUTC(new Date("2023-05-01T12:04:27+02:00"), 'foobar')).to.eql(new Date("2023-05-01T12:04:27+02:00"));
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
