import {describe, it} from 'node:test';
import * as assert from 'node:assert/strict';
import {Scheduler, type LogFn, type LogObject} from '../../../lib/modules/Scheduler';
import CONSTANTS from '../../constants';

describe('Modules - Scheduler', () => {
    describe('ctor', () => {
        it('Should throw when passed a non object', () => {
            for (const el of CONSTANTS.NOT_OBJECT) {
                if (el === undefined) continue;
                assert.throws(
                    () => new Scheduler(el),
                    new Error('Scheduler@ctor: options should be an object')
                );
            }
        });

        it('Should throw when passed a non function logger', () => {
            for (const el of CONSTANTS.NOT_FUNCTION) {
                if (el === undefined) continue;
                assert.throws(
                    () => new Scheduler({logger: el}),
                    new Error('Scheduler@ctor: logger should be a function')
                );
            }
        });

        it('Should throw when passed a non/empty string name', () => {
            for (const el of CONSTANTS.NOT_STRING_WITH_EMPTY) {
                if (el === undefined) continue;
                assert.throws(
                    () => new Scheduler({name: el}),
                    new Error('Scheduler@ctor: name should be a non-empty string')
                );
            }
        });

        it('Should throw when passed a non-null non/empty string timeZone', () => {
            for (const el of CONSTANTS.NOT_STRING_WITH_EMPTY) {
                if (el === undefined || el === null) continue;
                assert.throws(
                    () => new Scheduler({timeZone: el}),
                    new Error('Scheduler@ctor: timeZone should be null or a non-empty string')
                );
            }
        });

        it('Should have the correct name when passed in the config', () => {
            const myScheduler = new Scheduler({name: 'HappyScheduler'});
            assert.equal(myScheduler.name, 'HappyScheduler');
        });

        it('Should by default be called PubSub', () => {
            const myScheduler = new Scheduler();
            assert.equal(myScheduler.name, 'Scheduler');
        });
    });

    describe('isCronSchedule', () => {
        it('Should return false if passed a non/empty string', () => {
            for (const el of CONSTANTS.NOT_STRING_WITH_EMPTY) {
                assert.ok(!Scheduler.isCronSchedule(el as string));
            }
        });

        it('Should return true if passed valid schedules', () => {
            for (const el of [
                '0 * * * *',
                '0 * * * 2',
                '0 * 2 * *',
                '0 7 * * 2',
                '0,10,20,30,40,50 * * * *',
                '50 0 * * *',
                '0 0 * * *',
                '* * * * *',
                '0 6 * * *',
                '0 3 * * *',
                '40 * * * *',
                '50 * * * *',
                '20 3,6,9,12,15,18,21,23 * * *',
                '0 7,12,17,22 * * *',
                '0 21 * * *',
                '0 1-5 * * *',
                '20-40 1-5 * * *',
                '20-40 1-5 1-3 9-10 0',
                '*/5 1-5 1-3 9-10 0',
            ]) assert.ok(Scheduler.isCronSchedule(el));
        });

        it('Should return false if passed a wrong schedule', () => {
            for (const el of [
                'a b c d e',
                '| | | | |',
                '0 0 0 0',
                '. . . . .',
                '-1 0 0 0 0',
                '10 5 0 0 a',
                'a 5 0 10 1',
            ]) assert.ok(!Scheduler.isCronSchedule(el));
        });

        describe('minute', () => {
            it('Should return true if passed as wildcard', () => {
                assert.ok(Scheduler.isCronSchedule('* 0 1 1 0'));
            });

            it('Should return true for valid single values', () => {
                for (let i = 0; i <= 59; i++) {
                    assert.ok(Scheduler.isCronSchedule(`${i} 0 1 1 0`));
                }
            });

            it('Should return true for a valid comma-separated list', () => {
                assert.ok(Scheduler.isCronSchedule('0,15,30,45 0 1 1 0'));
            });

            it('Should return true for a valid range', () => {
                assert.ok(Scheduler.isCronSchedule('10-20 0 1 1 0'));
            });

            it('Should return true for a valid step expression with wildcard', () => {
                assert.ok(Scheduler.isCronSchedule('*/5 0 1 1 0'));
            });

            it('Should return true for a valid step expression with range', () => {
                assert.ok(Scheduler.isCronSchedule('10-50/10 0 1 1 0'));
            });

            it('Should return false for values that exceed the valid range', () => {
                assert.ok(!Scheduler.isCronSchedule('60 0 1 1 0'));
                assert.ok(!Scheduler.isCronSchedule('61 0 1 1 0'));
            });

            it('Should return false for negative values', () => {
                assert.ok(!Scheduler.isCronSchedule('-1 0 1 1 0'));
            });

            it('Should return false for an invalid step expression (step of zero)', () => {
                assert.ok(!Scheduler.isCronSchedule('*/0 0 1 1 0'));
                assert.ok(!Scheduler.isCronSchedule('10-20/0 0 1 1 0'));
            });

            it('Should return false for an invalid step expression (step outside of bounds)', () => {
                assert.ok(!Scheduler.isCronSchedule('*/0 0 1 1 0'));
                assert.ok(!Scheduler.isCronSchedule('10-20/68 0 1 1 0'));
            });

            it('Should return false for an invalid range (start greater than end)', () => {
                assert.ok(!Scheduler.isCronSchedule('50-10 0 1 1 0'));
            });

            it('Should return false for an invalid range (out-of-bounds end)', () => {
                assert.ok(!Scheduler.isCronSchedule('10-100 0 1 1 0'));
            });

            it('Should return false for an invalid range (out-of-bounds start)', () => {
                assert.ok(!Scheduler.isCronSchedule('90-100 0 1 1 0'));
            });
        });

        describe('hour', () => {
            it('Should return true if passed as wildcard', () => {
                assert.ok(Scheduler.isCronSchedule('0 * 1 1 0'));
            });

            it('Should return true for valid single values', () => {
                for (let i = 0; i <= 23; i++) {
                    assert.ok(Scheduler.isCronSchedule(`0 ${i} 1 1 0`));
                }
            });

            it('Should return true for a valid comma-separated list', () => {
                assert.ok(Scheduler.isCronSchedule('0 0,1,2,3,12,13,14,20,21,22 1 1 0'));
            });

            it('Should return true for a valid range', () => {
                assert.ok(Scheduler.isCronSchedule('0 6-9 1 1 0'));
            });

            it('Should return true for a valid step expression with wildcard', () => {
                assert.ok(Scheduler.isCronSchedule('0 */5 1 1 0'));
            });

            it('Should return true for a valid step expression with range', () => {
                assert.ok(Scheduler.isCronSchedule('0 12-20/2 1 1 0'));
            });

            it('Should return false for values that exceed the valid range', () => {
                assert.ok(!Scheduler.isCronSchedule('0 24 1 1 0'));
                assert.ok(!Scheduler.isCronSchedule('0 32 0 1 0'));
            });

            it('Should return false for negative values', () => {
                assert.ok(!Scheduler.isCronSchedule('0 -1 1 1 0'));
            });

            it('Should return false for an invalid step expression (step of zero)', () => {
                assert.ok(!Scheduler.isCronSchedule('0 */0 1 1 0'));
                assert.ok(!Scheduler.isCronSchedule('0 10-20/0 1 1 0'));
            });

            it('Should return false for an invalid step expression (step outside of bounds)', () => {
                assert.ok(!Scheduler.isCronSchedule('0 */0 1 1 0'));
                assert.ok(!Scheduler.isCronSchedule('0 10-20/68 1 1 0'));
            });

            it('Should return false for an invalid range (start greater than end)', () => {
                assert.ok(!Scheduler.isCronSchedule('0 23-10 1 1 0'));
            });

            it('Should return false for an invalid range (out-of-bounds end)', () => {
                assert.ok(!Scheduler.isCronSchedule('0 10-30 1 1 0'));
            });

            it('Should return false for an invalid range (out-of-bounds start)', () => {
                assert.ok(!Scheduler.isCronSchedule('0 90-100 1 1 0'));
            });
        });

        describe('day_of_month', () => {
            it('Should return true if passed as wildcard', () => {
                assert.ok(Scheduler.isCronSchedule('0 1 * 1 0'));
            });

            it('Should return true for valid single values', () => {
                for (let i = 1; i <= 31; i++) {
                    assert.ok(Scheduler.isCronSchedule(`0 1 ${i} 1 0`));
                }
            });

            it('Should return true for a valid comma-separated list', () => {
                assert.ok(Scheduler.isCronSchedule('0 1 1,2,3,12,13,14,20,21,22 1 0'));
            });

            it('Should return true for a valid range', () => {
                assert.ok(Scheduler.isCronSchedule('0 0 6-9 1 0'));
            });

            it('Should return true for a valid step expression with wildcard', () => {
                assert.ok(Scheduler.isCronSchedule('0 1 */5 1 0'));
            });

            it('Should return true for a valid step expression with range', () => {
                assert.ok(Scheduler.isCronSchedule('0 2 12-20/2 1 0'));
            });

            it('Should return false for values that exceed the valid range', () => {
                assert.ok(!Scheduler.isCronSchedule('0 1 32 1 0'));
                assert.ok(!Scheduler.isCronSchedule('0 1 64 1 0'));
            });

            it('Should return false for negative values', () => {
                assert.ok(!Scheduler.isCronSchedule('0 1 -1 1 0'));
            });

            it('Should return false for zero', () => {
                assert.ok(!Scheduler.isCronSchedule('0 1 0 1 0'));
            });

            it('Should return false for an invalid step expression (step of zero)', () => {
                assert.ok(!Scheduler.isCronSchedule('0 1 */0 1 0'));
                assert.ok(!Scheduler.isCronSchedule('0 1 10-20/0 1 0'));
            });

            it('Should return false for an invalid step expression (step outside of bounds)', () => {
                assert.ok(!Scheduler.isCronSchedule('0 2 */0 1 0'));
                assert.ok(!Scheduler.isCronSchedule('0 2 10-20/68 1 0'));
            });

            it('Should return false for an invalid range (start greater than end)', () => {
                assert.ok(!Scheduler.isCronSchedule('0 2 23-10 1 0'));
            });

            it('Should return false for an invalid range (out-of-bounds end)', () => {
                assert.ok(!Scheduler.isCronSchedule('0 2 10-33 1 0'));
            });

            it('Should return false for an invalid range (out-of-bounds start)', () => {
                assert.ok(!Scheduler.isCronSchedule('0 2 90-100 1 0'));
            });
        });

        describe('month', () => {
            it('Should return true if passed as wildcard', () => {
                assert.ok(Scheduler.isCronSchedule('0 1 1 * 0'));
            });

            it('Should return true for valid single values', () => {
                for (let i = 1; i <= 12; i++) {
                    assert.ok(Scheduler.isCronSchedule(`0 1 1 ${i} 0`));
                }
            });

            it('Should return true for a valid comma-separated list', () => {
                assert.ok(Scheduler.isCronSchedule('0 1 1 1,2,3,9,10,11,12,8 0'));
            });

            it('Should return true for a valid range', () => {
                assert.ok(Scheduler.isCronSchedule('0 0 1 6-9 0'));
            });

            it('Should return true for a valid step expression with wildcard', () => {
                assert.ok(Scheduler.isCronSchedule('0 1 1 */5 0'));
            });

            it('Should return true for a valid step expression with range', () => {
                assert.ok(Scheduler.isCronSchedule('0 2 1 6-9/1 0'));
            });

            it('Should return false for values that exceed the valid range', () => {
                assert.ok(!Scheduler.isCronSchedule('0 1 1 13 0'));
                assert.ok(!Scheduler.isCronSchedule('0 1 1 20 0'));
            });

            it('Should return false for negative values', () => {
                assert.ok(!Scheduler.isCronSchedule('0 1 1 -1 0'));
            });

            it('Should return false for zero', () => {
                assert.ok(!Scheduler.isCronSchedule('0 1 1 0 0'));
            });

            it('Should return false for an invalid step expression (step of zero)', () => {
                assert.ok(!Scheduler.isCronSchedule('0 1 1 */0 0'));
                assert.ok(!Scheduler.isCronSchedule('0 1 1 6-12/0 0'));
            });

            it('Should return false for an invalid step expression (step outside of bounds)', () => {
                assert.ok(!Scheduler.isCronSchedule('0 2 1 */0 0'));
                assert.ok(!Scheduler.isCronSchedule('0 2 1 6-12/68 0'));
            });

            it('Should return false for an invalid range (start greater than end)', () => {
                assert.ok(!Scheduler.isCronSchedule('0 2 1 9-6 0'));
            });

            it('Should return false for an invalid range (out-of-bounds end)', () => {
                assert.ok(!Scheduler.isCronSchedule('0 2 1 6-33 0'));
            });

            it('Should return false for an invalid range (out-of-bounds start)', () => {
                assert.ok(!Scheduler.isCronSchedule('0 2 1 90-100 0'));
            });
        });

        describe('day_of_week', () => {
            it('Should return true if passed as wildcard', () => {
                assert.ok(Scheduler.isCronSchedule('0 1 1 1 *'));
            });

            it('Should return true for valid single values', () => {
                for (let i = 0; i <= 7; i++) {
                    assert.ok(Scheduler.isCronSchedule(`0 1 1 1 ${i}`));
                }
            });

            it('Should return true for a valid comma-separated list', () => {
                assert.ok(Scheduler.isCronSchedule('0 1 1 1 1,2,3,4,5'));
            });

            it('Should return true for a valid range', () => {
                assert.ok(Scheduler.isCronSchedule('0 0 1 1 0-3'));
            });

            it('Should return true for a valid step expression with wildcard', () => {
                assert.ok(Scheduler.isCronSchedule('0 1 1 1 */2'));
            });

            it('Should return true for a valid step expression with range', () => {
                assert.ok(Scheduler.isCronSchedule('0 2 1 1 3-6/1'));
            });

            it('Should return false for values that exceed the valid range', () => {
                assert.ok(!Scheduler.isCronSchedule('0 1 1 1 8'));
                assert.ok(!Scheduler.isCronSchedule('0 1 1 1 9'));
            });

            it('Should return false for negative values', () => {
                assert.ok(!Scheduler.isCronSchedule('0 1 1 1 -1'));
            });

            it('Should return false for an invalid step expression (step of zero)', () => {
                assert.ok(!Scheduler.isCronSchedule('0 1 1 1 */0'));
                assert.ok(!Scheduler.isCronSchedule('0 1 1 1 3-5/0'));
            });

            it('Should return false for an invalid step expression (step outside of bounds)', () => {
                assert.ok(!Scheduler.isCronSchedule('0 2 1 1 4-6/8'));
            });

            it('Should return false for an invalid range (start greater than end)', () => {
                assert.ok(!Scheduler.isCronSchedule('0 2 1 1 8-6'));
            });

            it('Should return false for an invalid range (out-of-bounds end)', () => {
                assert.ok(!Scheduler.isCronSchedule('0 2 1 1 6-33'));
            });

            it('Should return false for an invalid range (out-of-bounds start)', () => {
                assert.ok(!Scheduler.isCronSchedule('0 2 1 1 90-100'));
            });
        });
    });
});
