/* eslint-disable max-lines */

import {describe, it, expect, afterEach, beforeEach} from 'vitest';
import {LogObject, Scheduler} from '../../../lib/modules/Scheduler';
import CONSTANTS from '../../constants';
import MockFn from '../../MockFn';

describe('Modules - Scheduler', () => {
    describe('ctor', () => {
        it('Should throw when passed a non object', () => {
            for (const el of CONSTANTS.NOT_OBJECT) {
                if (el === undefined) continue;
                expect(
                    () => new Scheduler(el)
                ).toThrowError(/Scheduler@ctor: options should be an object/);
            }
        });

        it('Should throw when passed a non function logger', () => {
            for (const el of CONSTANTS.NOT_FUNCTION) {
                if (el === undefined) continue;
                expect(
                    () => new Scheduler({logger: el})
                ).toThrowError(/Scheduler@ctor: logger should be a function/);
            }
        });

        it('Should throw when passed a non/empty string name', () => {
            for (const el of CONSTANTS.NOT_STRING_WITH_EMPTY) {
                if (el === undefined) continue;
                expect(
                    () => new Scheduler({name: el})
                ).toThrowError(/Scheduler@ctor: name should be a non-empty string/);
            }
        });

        it('Should throw when passed a non-null non/empty string timeZone', () => {
            for (const el of CONSTANTS.NOT_STRING_WITH_EMPTY) {
                if (el === undefined || el === null) continue;
                expect(
                    () => new Scheduler({timeZone: el})
                ).toThrowError(/Scheduler@ctor: timeZone should be null or a non-empty string/);
            }
        });

        it('Should throw when passed a non-boolean non-int parallel', () => {
            for (const el of CONSTANTS.NOT_BOOLEAN) {
                if (el === undefined || Number.isInteger(el)) continue;
                expect(
                    () => new Scheduler({parallel: el})
                ).toThrowError(/Scheduler@ctor: parallel should be passed as a boolean or int above 0/);
            }

            for (const el of [...CONSTANTS.NOT_INTEGER, 0, -10]) {
                if (el === undefined || el === false || el === true) continue;
                expect(
                    () => new Scheduler({parallel: el})
                ).toThrowError(/Scheduler@ctor: parallel should be passed as a boolean or int above 0/);
            }
        });

        it('Should have the correct name when passed in the config', () => {
            const myScheduler = new Scheduler({name: 'HappyScheduler'});
            expect(myScheduler.name).toBe('HappyScheduler');
        });

        it('Should by default be called Scheduler', () => {
            const myScheduler = new Scheduler();
            expect(myScheduler.name).toBe('Scheduler');
            expect(myScheduler.timeZone).toBe(null);
            expect(myScheduler.parallel).toBe(true);
            expect(myScheduler.isAutomatic).toBe(false);
        });

        it('Should be able to receive the full option-set and successfully instantiate', () => {
            const myScheduler = new Scheduler({
                name: 'HappyScheduler',
                timeZone: 'Europe/Brussels',
                logger: obj => `${obj.name}: ${obj.msg} (${obj.on})`,
                parallel: false,
                auto: true,
            });
            expect(myScheduler.name).toBe('HappyScheduler');
            expect(myScheduler.timeZone).toBe('Europe/Brussels');
            expect(myScheduler.parallel).toBe(false);
            expect(myScheduler.isAutomatic).toBe(true);
            myScheduler.stopAutomaticRun();
        });
    });

    describe('add', () => {
        it('Should throw an error if passed a non/empty string job schedule', () => {
            let logs:LogObject[] = [];
            const scheduler = new Scheduler({
                logger: el => logs.push(el),
            });
            for (const el of CONSTANTS.NOT_STRING_WITH_EMPTY) {
                const out = scheduler.add({
                    name: 'myjob',
                    schedule: el,
                    fn: () => {},
                });
                expect(out).toBe(false);
                expect(logs.length).toBe(1);
                expect(logs[0].msg).toBe('Scheduler@add: Invalid cron schedule');
                logs = [];
            }
            expect(scheduler.jobs).toEqual([]);
        });

        it('Should throw an error if job schedule is invalid', () => {
            let logs:LogObject[] = [];
            const scheduler = new Scheduler({
                logger: el => logs.push(el),
            });
            const out = scheduler.add({
                name: 'myjob',
                schedule: 'invalid schedule',
                fn: () => {},
            });
            expect(out).toBe(false);
            expect(logs.length).toBe(1);
            expect(logs[0].msg).toBe('Scheduler@add: Invalid cron schedule');
            logs = [];
            expect(scheduler.jobs).toEqual([]);
        });

        it('Should throw an error if passed a non function job fn', () => {
            let logs:LogObject[] = [];
            const scheduler = new Scheduler({
                logger: el => logs.push(el),
            });
            for (const el of CONSTANTS.NOT_FUNCTION) {
                const out = scheduler.add({
                    name: 'myjob',
                    schedule: '0 * * * *',
                    fn: el,
                });
                expect(out).toBe(false);
                expect(logs.length).toBe(1);
                expect(logs[0].msg).toBe('Scheduler@add: Invalid function for job');
                logs = [];
            }
            expect(scheduler.jobs).toEqual([]);
        });

        it('Should throw an error if passed a non function job fn', () => {
            let logs:LogObject[] = [];
            const scheduler = new Scheduler({
                name: 'MyScheduler',
                logger: el => logs.push(el),
            });
            for (const el of CONSTANTS.NOT_FUNCTION) {
                const out = scheduler.add({
                    name: 'myjob',
                    schedule: '0 * * * *',
                    fn: el,
                });
                expect(out).toBe(false);
                expect(logs.length).toBe(1);
                expect(logs[0].msg).toBe('MyScheduler@add: Invalid function for job');
                logs = [];
            }
            expect(scheduler.jobs).toEqual([]);
        });

        it('Should throw an error if passed a non/empty string for job name', () => {
            let logs:LogObject[] = [];
            const scheduler = new Scheduler({
                name: 'MyScheduler',
                logger: el => logs.push(el),
            });
            for (const el of CONSTANTS.NOT_STRING_WITH_EMPTY) {
                const out = scheduler.add({
                    schedule: '0 * * * *',
                    fn: () => {},
                    name: el,
                });
                expect(out).toBe(false);
                expect(logs.length).toBe(1);
                expect(logs[0].msg).toBe('MyScheduler@add: Invalid name for job');
                logs = [];
            }
            expect(scheduler.jobs).toEqual([]);
        });

        it('Should throw an error if passed a non object for job data', () => {
            let logs:LogObject[] = [];
            const scheduler = new Scheduler({
                name: 'MyScheduler',
                logger: el => logs.push(el),
            });
            for (const el of CONSTANTS.NOT_OBJECT) {
                const out = scheduler.add({
                    schedule: '0 * * * *',
                    fn: () => {},
                    name: 'happy job',
                    data: el,
                });
                expect(out).toBe(false);
                expect(logs.length).toBe(1);
                expect(logs[0].msg).toBe('MyScheduler@add: Job data should be an object');
                logs = [];
            }
            expect(scheduler.jobs).toEqual([]);
        });

        it('Should add the job to our jobs array and fallback to null as timeZone', () => {
            const logs:LogObject[] = [];
            const happyFunc = () => {};
            const scheduler = new Scheduler({
                name: 'MyScheduler',
                logger: el => logs.push(el),
            });
            const out = scheduler.add({
                schedule: '0 * * * *',
                name: 'happy_job',
                fn: happyFunc,
            });
            expect(out).toBe(true);
            expect(logs.length).toBe(0);
            expect(scheduler.jobs).toEqual([
                {
                    name: 'happy_job',
                    schedule: '0 * * * *',
                    timeZone: null,
                },
            ]);
        });

        it('Should add the job to our jobs array and fallback to our configured timeZone', () => {
            const logs:LogObject[] = [];
            const happyFunc = () => {};
            const scheduler = new Scheduler({
                name: 'MyScheduler',
                timeZone: 'Europe/Brussels',
                logger: el => logs.push(el),
            });
            const out = scheduler.add({
                schedule: '0 * * * *',
                name: 'happy_job',
                fn: happyFunc,
            });
            expect(out).toBe(true);
            expect(logs.length).toBe(0);
            expect(scheduler.jobs).toEqual([
                {
                    name: 'happy_job',
                    schedule: '0 * * * *',
                    timeZone: 'Europe/Brussels',
                },
            ]);
        });

        it('Should add the job to our jobs array and use the provided timeZone', () => {
            const logs:LogObject[] = [];
            const happyFunc = () => {};
            const scheduler = new Scheduler({
                name: 'MyScheduler',
                timeZone: 'Europe/Brussels',
                logger: el => logs.push(el),
            });
            const out = scheduler.add({
                schedule: '0 * * * *',
                name: 'happy_job',
                fn: happyFunc,
                timeZone: 'UTC',
            });
            expect(out).toBe(true);
            expect(logs.length).toBe(0);
            expect(scheduler.jobs).toEqual([
                {
                    name: 'happy_job',
                    schedule: '0 * * * *',
                    timeZone: 'UTC',
                },
            ]);
        });

        it('Should add the job to our jobs array and configure the provided data', () => {
            const logs:LogObject[] = [];
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const happyFunc = (val:{hello:string}) => {};
            const scheduler = new Scheduler({
                name: 'MyScheduler',
                timeZone: 'Europe/Brussels',
                logger: el => logs.push(el),
            });
            const out = scheduler.add({
                schedule: '0 * * * *',
                name: 'happy_job',
                fn: happyFunc,
                timeZone: 'UTC',
                data: {hello: 'world'},
            });
            expect(out).toBe(true);
            expect(logs.length).toBe(0);
            expect(scheduler.jobs).toEqual([
                {
                    name: 'happy_job',
                    schedule: '0 * * * *',
                    timeZone: 'UTC',
                    data: {hello: 'world'},
                },
            ]);
        });
    });

    describe('remove', () => {
        it('Should allow removing a job by name', () => {
            const scheduler = new Scheduler();
            scheduler.add({schedule: '0 * * * *', name: 'happy_job', fn: () => {}});
            scheduler.add({schedule: '0 * * * *', name: 'happy_job_2', fn: () => {}});
            scheduler.add({schedule: '0 * * * *', name: 'happy_job_3', fn: () => {}});
            scheduler.add({schedule: '0 * * * *', name: 'happy_job_4', fn: () => {}});
            expect(scheduler.jobs).toEqual([
                {name: 'happy_job', schedule: '0 * * * *', timeZone: null},
                {name: 'happy_job_2', schedule: '0 * * * *', timeZone: null},
                {name: 'happy_job_3', schedule: '0 * * * *', timeZone: null},
                {name: 'happy_job_4', schedule: '0 * * * *', timeZone: null},
            ]);
            scheduler.remove('happy_job_2');
            expect(scheduler.jobs).toEqual([
                {name: 'happy_job', schedule: '0 * * * *', timeZone: null},
                {name: 'happy_job_3', schedule: '0 * * * *', timeZone: null},
                {name: 'happy_job_4', schedule: '0 * * * *', timeZone: null},
            ]);
            scheduler.remove('happy_job_3');
            expect(scheduler.jobs).toEqual([
                {name: 'happy_job', schedule: '0 * * * *', timeZone: null},
                {name: 'happy_job_4', schedule: '0 * * * *', timeZone: null},
            ]);
            scheduler.remove('happy_job_4');
            expect(scheduler.jobs).toEqual([
                {name: 'happy_job', schedule: '0 * * * *', timeZone: null},
            ]);
        });

        it('Should allow removing a job by passing an array of names', () => {
            const scheduler = new Scheduler();
            scheduler.add({schedule: '0 * * * *', name: 'happy_job', fn: () => {}});
            scheduler.add({schedule: '0 * * * *', name: 'happy_job_2', fn: () => {}});
            scheduler.add({schedule: '0 * * * *', name: 'happy_job_3', fn: () => {}});
            scheduler.add({schedule: '0 * * * *', name: 'happy_job_4', fn: () => {}});
            expect(scheduler.jobs).toEqual([
                {name: 'happy_job', schedule: '0 * * * *', timeZone: null},
                {name: 'happy_job_2', schedule: '0 * * * *', timeZone: null},
                {name: 'happy_job_3', schedule: '0 * * * *', timeZone: null},
                {name: 'happy_job_4', schedule: '0 * * * *', timeZone: null},
            ]);
            scheduler.remove(['happy_job_2', 'happy_job_3', 'happy_job_4']);
            expect(scheduler.jobs).toEqual([
                {name: 'happy_job', schedule: '0 * * * *', timeZone: null},
            ]);
            scheduler.remove('happy_job');
            expect(scheduler.jobs).toEqual([]);
        });

        it('Should do nothing if not passed a string/array', () => {
            const scheduler = new Scheduler();
            scheduler.add({schedule: '0 * * * *', name: 'happy_job', fn: () => {}});
            scheduler.add({schedule: '0 * * * *', name: 'happy_job_2', fn: () => {}});
            scheduler.add({schedule: '0 * * * *', name: 'happy_job_3', fn: () => {}});
            scheduler.add({schedule: '0 * * * *', name: 'happy_job_4', fn: () => {}});
            expect(scheduler.jobs).toEqual([
                {name: 'happy_job', schedule: '0 * * * *', timeZone: null},
                {name: 'happy_job_2', schedule: '0 * * * *', timeZone: null},
                {name: 'happy_job_3', schedule: '0 * * * *', timeZone: null},
                {name: 'happy_job_4', schedule: '0 * * * *', timeZone: null},
            ]);
            /* @ts-ignore */
            scheduler.remove(null);
            expect(scheduler.jobs).toEqual([
                {name: 'happy_job', schedule: '0 * * * *', timeZone: null},
                {name: 'happy_job_2', schedule: '0 * * * *', timeZone: null},
                {name: 'happy_job_3', schedule: '0 * * * *', timeZone: null},
                {name: 'happy_job_4', schedule: '0 * * * *', timeZone: null},
            ]);
        });
    });

    describe('run', () => {
        const mockCheckTimeAgainstMap = new MockFn();
        const mockGetTimeParts = new MockFn();

        beforeEach(() => {
            mockCheckTimeAgainstMap.mock(Scheduler, 'checkTimeAgainstMap');
            mockCheckTimeAgainstMap.return = true;
            mockGetTimeParts.mock(Scheduler, 'getTimeParts');
            mockGetTimeParts.return = {hello: 'world'};
        });

        afterEach(() => {
            mockCheckTimeAgainstMap.restore();
            mockGetTimeParts.restore();
        });

        it('should execute a synchronous job whose schedule matches', async () => {
            let executed = false;
            const scheduler = new Scheduler();
            scheduler.add({
                name: 'syncJob',
                schedule: '* * * * *',
                fn: () => {
                    executed = true;
                },
            });
            await scheduler.run();
            expect(executed).toBe(true);
            expect(mockCheckTimeAgainstMap.calls.length).toBe(1);
        });

        it('should not execute a job whose schedule does not match', async () => {
            mockCheckTimeAgainstMap.return = false;
            let executed = false;
            const scheduler = new Scheduler();
            scheduler.add({
                name: 'nonMatchingJob',
                schedule: '0 0 1 1 *',
                fn: () => {
                    executed = true;
                },
            });
            await scheduler.run();
            expect(executed).toBe(false);
            expect(mockCheckTimeAgainstMap.calls.length).toBe(1);
        });

        it('should not execute a job whose schedule does not match', async () => {
            mockCheckTimeAgainstMap.return = false;
            let executed = false;
            const scheduler = new Scheduler();
            scheduler.add({
                name: 'nonMatchingJob',
                schedule: '0 0 1 1 *',
                fn: () => {
                    executed = true;
                },
            });
            await scheduler.run();
            expect(executed).toBe(false);
            expect(mockCheckTimeAgainstMap.calls.length).toBe(1);
        });

        it('should log an error if a synchronous job throws', async () => {
            let errorLogged = false;
            const logger = () => {
                errorLogged = true;
            };
            const scheduler = new Scheduler({logger});
            scheduler.add({
                name: 'errorJob',
                schedule: '* * * * *',
                fn: () => {
                    throw new Error('Test error');
                },
            });
            await scheduler.run();
            expect(errorLogged).toBe(true);
            expect(mockCheckTimeAgainstMap.calls.length).toBe(1);
        });

        it('should wait for async jobs to complete', async () => {
            let resolved = false;
            const scheduler = new Scheduler();
            scheduler.add({
                name: 'asyncJob',
                schedule: '* * * * *',
                fn: async function handler () {
                    await new Promise(resolve => setTimeout(resolve, 50));
                    resolved = true;
                },
            });
            await scheduler.run();
            expect(resolved).toBe(true);
            expect(mockCheckTimeAgainstMap.calls.length).toBe(1);
        });

        it('should log an error if an asynchronous job throws', async () => {
            const messages:string[] = [];
            const logger = el => messages.push(el.msg);
            const scheduler = new Scheduler({logger});
            scheduler.add({
                name: 'errorJob',
                schedule: '* * * * *',
                fn: async () => {
                    await new Promise(resolve => setTimeout(resolve, 10));
                    throw new Error('Test error');
                },
            });
            await scheduler.run();
            expect(messages).toEqual(['errorJob: Test error']);
            expect(mockCheckTimeAgainstMap.calls.length).toBe(1);
        });

        it('should run async jobs in parallel when parallel is true (default)', async () => {
            const scheduler = new Scheduler({parallel: true});
            let count = 0;
            const job = async () => {
                await new Promise(resolve => setTimeout(resolve, 100));
                count++;
            };
            scheduler.add({
                name: 'job1',
                schedule: '* * * * *',
                fn: job,
            });
            scheduler.add({
                name: 'job2',
                schedule: '* * * * *',
                fn: job,
            });
            const start = Date.now();
            await scheduler.run();
            const elapsed = Date.now() - start;
            expect(count).toBe(2);
            expect(elapsed < 180).toBe(true);
            expect(mockCheckTimeAgainstMap.calls.length).toBe(2);
        });

        it('should run async jobs sequentially when parallel is false', async () => {
            const scheduler = new Scheduler({parallel: false});
            let count = 0;
            const job = async () => {
                await new Promise(resolve => setTimeout(resolve, 100));
                count++;
            };
            scheduler.add({
                name: 'job1',
                schedule: '* * * * *',
                fn: job,
            });
            scheduler.add({
                name: 'job2',
                schedule: '* * * * *',
                fn: job,
            });
            const start = Date.now();
            await scheduler.run();
            const elapsed = Date.now() - start;
            expect(count).toBe(2);
            expect(elapsed >= 190).toBe(true);
            expect(mockCheckTimeAgainstMap.calls.length).toBe(2);
        });

        it('should run async jobs sequentially when parallel is false and catch independent errors', async () => {
            const logs:string[] = [];
            const scheduler = new Scheduler({parallel: false, logger: el => logs.push(el.msg)});
            let count = 0;
            scheduler.add({
                name: 'job1',
                schedule: '* * * * *',
                fn: async () => {
                    await new Promise(resolve => setTimeout(resolve, 100));
                    count++;
                },
            });
            scheduler.add({
                name: 'job2',
                schedule: '* * * * *',
                fn: async () => {
                    await new Promise(resolve => setTimeout(resolve, 100));
                    throw new Error('Oh No');
                },
            });
            const start = Date.now();
            await scheduler.run();
            const elapsed = Date.now() - start;
            expect(count).toBe(1);
            expect(elapsed >= 190).toBe(true);
            expect(mockCheckTimeAgainstMap.calls.length).toBe(2);
            expect(logs).toEqual(['job2: Oh No']);
        });

        it('should run async jobs 2 at a time when parallel is 2 and catch independent errors', async () => {
            const logs:string[] = [];
            const scheduler = new Scheduler({parallel: 2, logger: el => logs.push(el.msg)});
            let count = 0;
            scheduler.add({
                name: 'job1',
                schedule: '* * * * *',
                fn: async () => {
                    await new Promise(resolve => setTimeout(resolve, 100));
                    count++;
                },
            });
            scheduler.add({
                name: 'job1',
                schedule: '* * * * *',
                fn: async () => {
                    await new Promise(resolve => setTimeout(resolve, 100));
                    count++;
                },
            });
            scheduler.add({
                name: 'job2',
                schedule: '* * * * *',
                fn: async () => {
                    await new Promise(resolve => setTimeout(resolve, 100));
                    throw new Error('Oh No');
                },
            });
            const start = Date.now();
            await scheduler.run();
            const elapsed = Date.now() - start;
            expect(count).toBe(2);
            expect(elapsed >= 190).toBe(true);
            expect(mockCheckTimeAgainstMap.calls.length).toBe(3);
            expect(logs).toEqual(['job2: Oh No']);
        });
    });

    describe('stopAutomaticRun', () => {
        it('Should do nothing if scheduler is not on automatic run', () => {
            const myScheduler = new Scheduler({auto: false});
            expect(myScheduler.isAutomatic).toBe(false);
            myScheduler.stopAutomaticRun();
            expect(myScheduler.isAutomatic).toBe(false);
        });

        it('Should turn off automatic run if scheduler is auto by default', () => {
            const myScheduler = new Scheduler({auto: true});
            expect(myScheduler.isAutomatic).toBe(true);
            myScheduler.stopAutomaticRun();
            expect(myScheduler.isAutomatic).toBe(false);
        });

        it('Should turn off automatic run if scheduler is not auto by default but was made auto', () => {
            const myScheduler = new Scheduler({auto: false});
            expect(myScheduler.isAutomatic).toBe(false);
            myScheduler.startAutomaticRun();
            expect(myScheduler.isAutomatic).toBe(true);
            myScheduler.stopAutomaticRun();
            expect(myScheduler.isAutomatic).toBe(false);
        });
    });

    describe('startAutomaticRun', () => {
        it('Should do nothing if scheduler is on automatic run', () => {
            const myScheduler = new Scheduler({auto: true});
            expect(myScheduler.isAutomatic).toBe(true);
            myScheduler.startAutomaticRun();
            expect(myScheduler.isAutomatic).toBe(true);
            myScheduler.stopAutomaticRun();
        });

        it('Should turn on automatic run if scheduler is not auto by default', () => {
            const myScheduler = new Scheduler({auto: false});
            expect(myScheduler.isAutomatic).toBe(false);
            myScheduler.startAutomaticRun();
            expect(myScheduler.isAutomatic).toBe(true);
            myScheduler.stopAutomaticRun();
        });

        it('Should turn on automatic run if scheduler is auto by default but was turned off', () => {
            const myScheduler = new Scheduler({auto: true});
            expect(myScheduler.isAutomatic).toBe(true);
            myScheduler.stopAutomaticRun();
            expect(myScheduler.isAutomatic).toBe(false);
            myScheduler.startAutomaticRun();
            expect(myScheduler.isAutomatic).toBe(true);
            myScheduler.stopAutomaticRun();
        });
    });

    describe('convertToMap', () => {
        /* @ts-ignore */
        const fn = Scheduler.convertToMap;

        it('Should return the correct map for different schedules', () => {
            for (const el of [
                ['0 * * * *', {
                    minute: new Set([0]),
                    hour: '*',
                    day_of_month: '*',
                    month: '*',
                    day_of_week: '*',
                }],
                ['0 * * * 2', {
                    minute: new Set([0]),
                    hour: '*',
                    day_of_month: '*',
                    month: '*',
                    day_of_week: new Set([2]),
                }],
                ['0 * 2 * *', {
                    minute: new Set([0]),
                    hour: '*',
                    day_of_month: new Set([2]),
                    month: '*',
                    day_of_week: '*',
                }],
                ['0 7 * * 2', {
                    minute: new Set([0]),
                    hour: new Set([7]),
                    day_of_month: '*',
                    month: '*',
                    day_of_week: new Set([2]),
                }],
                ['0,10,20,30,40,50 * * * *', {
                    minute: new Set([0,10,20,30,40,50]),
                    hour: '*',
                    day_of_month: '*',
                    month: '*',
                    day_of_week: '*',
                }],
                ['50 0 * * *', {
                    minute: new Set([50]),
                    hour: new Set([0]),
                    day_of_month: '*',
                    month: '*',
                    day_of_week: '*',
                }],
                ['0 0 * * *', {
                    minute: new Set([0]),
                    hour: new Set([0]),
                    day_of_month: '*',
                    month: '*',
                    day_of_week: '*',
                }],
                ['* * * * *', {
                    minute: '*',
                    hour: '*',
                    day_of_month: '*',
                    month: '*',
                    day_of_week: '*',
                }],
                ['0 6 * * *', {
                    minute: new Set([0]),
                    hour: new Set([6]),
                    day_of_month: '*',
                    month: '*',
                    day_of_week: '*',
                }],
                ['0 3 * * *', {
                    minute: new Set([0]),
                    hour: new Set([3]),
                    day_of_month: '*',
                    month: '*',
                    day_of_week: '*',
                }],
                ['40 * * * *', {
                    minute: new Set([40]),
                    hour: '*',
                    day_of_month: '*',
                    month: '*',
                    day_of_week: '*',
                }],
                ['50 * * * *', {
                    minute: new Set([50]),
                    hour: '*',
                    day_of_month: '*',
                    month: '*',
                    day_of_week: '*',
                }],
                ['20 3,6,9,12,15,18,21,23 * * *', {
                    minute: new Set([20]),
                    hour: new Set([3,6,9,12,15,18,21,23]),
                    day_of_month: '*',
                    month: '*',
                    day_of_week: '*',
                }],
                ['0 7,12,17,22 * * *', {
                    minute: new Set([0]),
                    hour: new Set([7,12,17,22]),
                    day_of_month: '*',
                    month: '*',
                    day_of_week: '*',
                }],
                ['0 21 * * *', {
                    minute: new Set([0]),
                    hour: new Set([21]),
                    day_of_month: '*',
                    month: '*',
                    day_of_week: '*',
                }],
                ['0 1-5 * * *', {
                    minute: new Set([0]),
                    hour: new Set([1,2,3,4,5]),
                    day_of_month: '*',
                    month: '*',
                    day_of_week: '*',
                }],
                ['20-40 1-5 * * *', {
                    minute: new Set([20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40]),
                    hour: new Set([1,2,3,4,5]),
                    day_of_month: '*',
                    month: '*',
                    day_of_week: '*',
                }],
                ['20-40 1-5 1-3 9-10 *', {
                    minute: new Set([20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40]),
                    hour: new Set([1,2,3,4,5]),
                    day_of_month: new Set([1,2,3]),
                    month: new Set([9,10]),
                    day_of_week: '*',
                }],
                ['*/5 1-5 1-3 9-10 0', {
                    minute: new Set([0,5,10,15,20,25,30,35,40,45,50,55]),
                    hour: new Set([1,2,3,4,5]),
                    day_of_month: new Set([1,2,3]),
                    month: new Set([9,10]),
                    day_of_week: new Set([0]),
                }],
            ]) expect(fn(el[0] as string)).toEqual(el[1]);
        });

        describe('minute', () => {
            it('Should return the correct map if passed as wildcard', () => {
                expect(fn('* 0 1 1 0')).toEqual({
                    minute: '*',
                    hour: new Set([0]),
                    day_of_month: new Set([1]),
                    month: new Set([1]),
                    day_of_week: new Set([0]),
                });
            });

            it('Should return the correct map for valid single values', () => {
                for (let i = 0; i <= 59; i++) {
                    expect(fn(`${i} 0 1 1 0`)).toEqual({
                        minute: new Set([i]),
                        hour: new Set([0]),
                        day_of_month: new Set([1]),
                        month: new Set([1]),
                        day_of_week: new Set([0]),
                    });
                }
            });

            it('Should return the correct map for a valid comma-separated list', () => {
                expect(fn('0,15,30,45 0 1 1 0')).toEqual({
                    minute: new Set([0,15,30,45]),
                    hour: new Set([0]),
                    day_of_month: new Set([1]),
                    month: new Set([1]),
                    day_of_week: new Set([0]),
                });
            });

            it('Should return the correct map for a valid range', () => {
                expect(fn('10-20 0 1 1 0')).toEqual({
                    minute: new Set([10,11,12,13,14,15,16,17,18,19,20]),
                    hour: new Set([0]),
                    day_of_month: new Set([1]),
                    month: new Set([1]),
                    day_of_week: new Set([0]),
                });
            });

            it('Should return the correct map for a valid step expression with wildcard', () => {
                expect(fn('*/5 0 1 1 0')).toEqual({
                    minute: new Set([0,5,10,15,20,25,30,35,40,45,50,55]),
                    hour: new Set([0]),
                    day_of_month: new Set([1]),
                    month: new Set([1]),
                    day_of_week: new Set([0]),
                });
            });

            it('Should return the correct map for a valid step expression with range', () => {
                expect(fn('10-50/10 0 1 1 0')).toEqual({
                    minute: new Set([10,20,30,40,50]),
                    hour: new Set([0]),
                    day_of_month: new Set([1]),
                    month: new Set([1]),
                    day_of_week: new Set([0]),
                });
            });

            it('Should return the correct map for a valid stepper with both base and step as number', () => {
                expect(fn('4/2 0 1 1 0')).toEqual({
                    minute: new Set([4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36,38,40,42,44,46,48,50,52,54,56,58]),
                    hour: new Set([0]),
                    day_of_month: new Set([1]),
                    month: new Set([1]),
                    day_of_week: new Set([0]),
                });
            });
        });

        describe('hour', () => {
            it('Should return the correct map if passed as wildcard', () => {
                expect(fn('0 * 1 1 0')).toEqual({
                    minute: new Set([0]),
                    hour: '*',
                    day_of_month: new Set([1]),
                    month: new Set([1]),
                    day_of_week: new Set([0]),
                });
            });

            it('Should return the correct map for valid single values', () => {
                for (let i = 0; i <= 23; i++) {
                    expect(fn(`0 ${i} 1 1 0`)).toEqual({
                        minute: new Set([0]),
                        hour: new Set([i]),
                        day_of_month: new Set([1]),
                        month: new Set([1]),
                        day_of_week: new Set([0]),
                    });
                }
            });

            it('Should return the correct map for a valid comma-separated list', () => {
                expect(fn('0 0,1,2,3,12,13,14,20,21,22 1 1 0')).toEqual({
                    minute: new Set([0]),
                    hour: new Set([0,1,2,3,12,13,14,20,21,22]),
                    day_of_month: new Set([1]),
                    month: new Set([1]),
                    day_of_week: new Set([0]),
                });
            });

            it('Should return the correct map for a valid range', () => {
                expect(fn('0 6-9 1 1 0')).toEqual({
                    minute: new Set([0]),
                    hour: new Set([6,7,8,9]),
                    day_of_month: new Set([1]),
                    month: new Set([1]),
                    day_of_week: new Set([0]),
                });
            });

            it('Should return the correct map for a valid step expression with wildcard', () => {
                expect(fn('0 */5 1 1 0')).toEqual({
                    minute: new Set([0]),
                    hour: new Set([0,5,10,15,20]),
                    day_of_month: new Set([1]),
                    month: new Set([1]),
                    day_of_week: new Set([0]),
                });
            });

            it('Should return the correct map for a valid step expression with range', () => {
                expect(fn('0 12-20/2 1 1 0')).toEqual({
                    minute: new Set([0]),
                    hour: new Set([12,14,16,18,20]),
                    day_of_month: new Set([1]),
                    month: new Set([1]),
                    day_of_week: new Set([0]),
                });
            });

            it('Should return the correct map for a valid range with step', () => {
                expect(fn('0 6-18/3 1 1 0')).toEqual({
                    minute: new Set([0]),
                    hour: new Set([6,9,12,15,18]),
                    day_of_month: new Set([1]),
                    month: new Set([1]),
                    day_of_week: new Set([0]),
                });
            });

            it('Should return the correct map for a valid stepper with both base and step as number', () => {
                expect(fn('0 4/2 1 1 0')).toEqual({
                    minute: new Set([0]),
                    hour: new Set([4,6,8,10,12,14,16,18,20,22]),
                    day_of_month: new Set([1]),
                    month: new Set([1]),
                    day_of_week: new Set([0]),
                });
            });
        });

        describe('day_of_month', () => {
            it('Should return the correct map if passed as wildcard', () => {
                expect(fn('0 1 * 1 0')).toEqual({
                    minute: new Set([0]),
                    hour: new Set([1]),
                    day_of_month: '*',
                    month: new Set([1]),
                    day_of_week: new Set([0]),
                });
            });

            it('Should return the correct map for valid single values', () => {
                for (let i = 1; i <= 31; i++) {
                    expect(fn(`0 1 ${i} 1 0`)).toEqual({
                        minute: new Set([0]),
                        hour: new Set([1]),
                        day_of_month: new Set([i]),
                        month: new Set([1]),
                        day_of_week: new Set([0]),
                    });
                }
            });

            it('Should return the correct map for a valid comma-separated list', () => {
                expect(fn('0 1 1,2,3,12,13,14,20,21,22,28,29,30 1 0')).toEqual({
                    minute: new Set([0]),
                    hour: new Set([1]),
                    day_of_month: new Set([1,2,3,12,13,14,20,21,22,28,29,30]),
                    month: new Set([1]),
                    day_of_week: new Set([0]),
                });
            });

            it('Should return the correct map for a valid range', () => {
                expect(fn('0 0 6-9 1 0')).toEqual({
                    minute: new Set([0]),
                    hour: new Set([0]),
                    day_of_month: new Set([6,7,8,9]),
                    month: new Set([1]),
                    day_of_week: new Set([0]),
                });
            });

            it('Should return the correct map for a valid step expression with wildcard', () => {
                expect(fn('0 1 */5 1 0')).toEqual({
                    minute: new Set([0]),
                    hour: new Set([1]),
                    day_of_month: new Set([1,6,11,16,21,26,31]),
                    month: new Set([1]),
                    day_of_week: new Set([0]),
                });
            });

            it('Should return the correct map for a valid step expression with range', () => {
                expect(fn('0 2 12-20/2 1 0')).toEqual({
                    minute: new Set([0]),
                    hour: new Set([2]),
                    day_of_month: new Set([12,14,16,18,20]),
                    month: new Set([1]),
                    day_of_week: new Set([0]),
                });
            });

            it('Should return the correct map for a valid range with step', () => {
                expect(fn('0 1 1-31/7 1 0')).toEqual({
                    minute: new Set([0]),
                    hour: new Set([1]),
                    day_of_month: new Set([1,8,15,22,29]),
                    month: new Set([1]),
                    day_of_week: new Set([0]),
                });
            });

            it('Should return the correct map for a valid stepper with both base and step as number', () => {
                expect(fn('0 0 4/2 1 0')).toEqual({
                    minute: new Set([0]),
                    hour: new Set([0]),
                    day_of_month: new Set([4,6,8,10,12,14,16,18,20,22,24,26,28,30]),
                    month: new Set([1]),
                    day_of_week: new Set([0]),
                });
            });
        });

        describe('month', () => {
            it('Should return the correct map if passed as wildcard', () => {
                expect(fn('0 1 1 * 0')).toEqual({
                    minute: new Set([0]),
                    hour: new Set([1]),
                    day_of_month: new Set([1]),
                    month: '*',
                    day_of_week: new Set([0]),
                });
            });

            it('Should return the correct map for valid single values', () => {
                for (let i = 1; i <= 12; i++) {
                    expect(fn(`0 1 1 ${i} 0`)).toEqual({
                        minute: new Set([0]),
                        hour: new Set([1]),
                        day_of_month: new Set([1]),
                        month: new Set([i]),
                        day_of_week: new Set([0]),
                    });
                }
            });

            it('Should return the correct map for a valid comma-separated list', () => {
                expect(fn('0 1 1 1,2,3,9,10,11,12,8 0')).toEqual({
                    minute: new Set([0]),
                    hour: new Set([1]),
                    day_of_month: new Set([1]),
                    month: new Set([1,2,3,8,9,10,11,12]),
                    day_of_week: new Set([0]),
                });
            });

            it('Should return the correct map for a valid range', () => {
                expect(fn('0 0 1 6-9 0')).toEqual({
                    minute: new Set([0]),
                    hour: new Set([0]),
                    day_of_month: new Set([1]),
                    month: new Set([6,7,8,9]),
                    day_of_week: new Set([0]),
                });
            });

            it('Should return the correct map for a valid step expression with wildcard', () => {
                expect(fn('0 1 1 */5 0')).toEqual({
                    minute: new Set([0]),
                    hour: new Set([1]),
                    day_of_month: new Set([1]),
                    month: new Set([1,6,11]),
                    day_of_week: new Set([0]),
                });
            });

            it('Should return the correct map for a valid step expression with range', () => {
                expect(fn('0 2 1 6-9/1 0')).toEqual({
                    minute: new Set([0]),
                    hour: new Set([2]),
                    day_of_month: new Set([1]),
                    month: new Set([6,7,8,9]),
                    day_of_week: new Set([0]),
                });
            });

            it('Should return the correct map for a valid range with step', () => {
                expect(fn('0 1 1 3-11/2 0')).toEqual({
                    minute: new Set([0]),
                    hour: new Set([1]),
                    day_of_month: new Set([1]),
                    month: new Set([3,5,7,9,11]),
                    day_of_week: new Set([0]),
                });
            });

            it('Should return the correct map for a valid stepper with both base and step as number', () => {
                expect(fn('0 0 1 4/1 0')).toEqual({
                    minute: new Set([0]),
                    hour: new Set([0]),
                    day_of_month: new Set([1]),
                    month: new Set([4,5,6,7,8,9,10,11,12]),
                    day_of_week: new Set([0]),
                });
            });
        });

        describe('day_of_week', () => {
            it('Should return the correct map if passed as wildcard', () => {
                expect(fn('0 1 1 1 *')).toEqual({
                    minute: new Set([0]),
                    hour: new Set([1]),
                    day_of_month: new Set([1]),
                    month: new Set([1]),
                    day_of_week: '*',
                });
            });

            it('Should return the correct map for valid single values', () => {
                for (let i = 0; i <= 6; i++) {
                    expect(fn(`0 1 1 1 ${i}`)).toEqual({
                        minute: new Set([0]),
                        hour: new Set([1]),
                        day_of_month: new Set([1]),
                        month: new Set([1]),
                        day_of_week: new Set([i]),
                    });
                }
            });

            it('Should return the correct map for a valid comma-separated list', () => {
                expect(fn('0 1 1 1 1,2,3,4,5,6')).toEqual({
                    minute: new Set([0]),
                    hour: new Set([1]),
                    day_of_month: new Set([1]),
                    month: new Set([1]),
                    day_of_week: new Set([1,2,3,4,5,6]),
                });
            });

            it('Should return the correct map for a valid range', () => {
                expect(fn('0 0 1 1 0-3')).toEqual({
                    minute: new Set([0]),
                    hour: new Set([0]),
                    day_of_month: new Set([1]),
                    month: new Set([1]),
                    day_of_week: new Set([0,1,2,3]),
                });
            });

            it('Should return the correct map for a valid step expression with wildcard', () => {
                expect(fn('0 1 1 1 */2')).toEqual({
                    minute: new Set([0]),
                    hour: new Set([1]),
                    day_of_month: new Set([1]),
                    month: new Set([1]),
                    day_of_week: new Set([0,2,4,6]),
                });
            });

            it('Should return the correct map for a valid step expression with range', () => {
                expect(fn('0 2 1 1 3-6/1')).toEqual({
                    minute: new Set([0]),
                    hour: new Set([2]),
                    day_of_month: new Set([1]),
                    month: new Set([1]),
                    day_of_week: new Set([3,4,5,6]),
                });
            });

            it('Should return the correct map for a valid range with step', () => {
                expect(fn('0 1 1 1 1-6/2')).toEqual({
                    minute: new Set([0]),
                    hour: new Set([1]),
                    day_of_month: new Set([1]),
                    month: new Set([1]),
                    day_of_week: new Set([1,3,5]),
                });
            });

            it('Should return the correct map for a valid stepper with both base and step as number', () => {
                expect(fn('0 0 1 1 4/1')).toEqual({
                    minute: new Set([0]),
                    hour: new Set([0]),
                    day_of_month: new Set([1]),
                    month: new Set([1]),
                    day_of_week: new Set([4,5,6]),
                });
            });
        });
    });

    describe('getTimeParts', () => {
        it('Should return the time as its parts when passing null', () => {
            const now = new Date();
            expect(
                /* @ts-ignore */
                Scheduler.getTimeParts(now, null)
            ).toEqual(
                {
                    minute: now.getUTCMinutes(),
                    hour: now.getUTCHours(),
                    day_of_month: now.getUTCDate(),
                    month: now.getUTCMonth() + 1,
                    day_of_week: now.getUTCDay(),
                }
            );
        });

        it('Should return the provided time as its parts when passing null', () => {
            expect(
                /* @ts-ignore */
                Scheduler.getTimeParts(new Date('2022-06-12T23:59:59.999Z'), null)
            ).toEqual(
                {
                    minute: 59,
                    hour: 23,
                    day_of_month: 12,
                    month: 6,
                    day_of_week: 0,
                }
            );
        });

        it('Should return the provided time as its parts when passing a timezone that would not change it', () => {
            const date = new Date('2022-06-12T18:30:00.000Z');
            const expectedTimeParts = {
                minute: 30,
                hour: 18,
                day_of_month: 12,
                month: 6,
                day_of_week: 0,
            };

            expect(
                /* @ts-ignore */
                Scheduler.getTimeParts(date, 'UTC')
            ).toEqual(
                expectedTimeParts
            );
        });

        it('Should return the provided time as its parts when passing a timezone that would take it to the next hour', () => {
            const date = new Date('2022-06-12T18:30:00.000Z');
            const expectedTimeParts = {
                minute: 30,
                hour: 19,
                day_of_month: 12,
                month: 6,
                day_of_week: 0,
            };

            expect(
                /* @ts-ignore */
                Scheduler.getTimeParts(date, 'Europe/London')
            ).toEqual(
                expectedTimeParts
            );
        });

        it('Should return the provided time as its parts when passing a timezone that would take it to the next day', () => {
            const date = new Date('2022-06-12T18:30:00.000Z');
            const expectedTimeParts = {
                minute: 30,
                hour: 2,
                day_of_month: 13,
                month: 6,
                day_of_week: 1,
            };

            expect(
                /* @ts-ignore */
                Scheduler.getTimeParts(date, 'Asia/Shanghai')
            ).toEqual(
                expectedTimeParts
            );
        });

        it('should return correct time parts for the same date across multiple timeZones', () => {
            const date = new Date('2022-06-12T18:00:00.000Z');
            for (const el of [
                {tz: 'UTC', out: {minute: 0, hour: 18, day_of_month: 12, month: 6, day_of_week: 0}},
                {tz: 'Asia/Shanghai', out: {minute: 0, hour: 2, day_of_month: 13, month: 6, day_of_week: 1}},
                {tz: 'America/New_York', out: {minute: 0, hour: 14, day_of_month: 12, month: 6, day_of_week: 0}},
                {tz: 'Europe/London', out: {minute: 0, hour: 19, day_of_month: 12, month: 6, day_of_week: 0}},
                {tz: 'Europe/Berlin', out: {minute: 0, hour: 20, day_of_month: 12, month: 6, day_of_week: 0}},
                {tz: 'Asia/Tokyo', out: {minute: 0, hour: 3, day_of_month: 13, month: 6, day_of_week: 1}},
                {tz: 'Australia/Sydney', out: {minute: 0, hour: 4, day_of_month: 13, month: 6, day_of_week: 1}},
                {tz: 'America/Los_Angeles', out: {minute: 0, hour: 11, day_of_month: 12, month: 6, day_of_week: 0}},
                {tz: 'America/Sao_Paulo', out: {minute: 0, hour: 15, day_of_month: 12, month: 6, day_of_week: 0}},
                {tz: 'Africa/Johannesburg', out: {minute: 0, hour: 20, day_of_month: 12, month: 6, day_of_week: 0}},
                {tz: 'Asia/Dubai', out: {minute: 0, hour: 22, day_of_month: 12, month: 6, day_of_week: 0}},
                {tz: 'Asia/Kolkata', out: {minute: 30, hour: 23, day_of_month: 12, month: 6, day_of_week: 0}},
                {tz: 'Pacific/Auckland', out: {minute: 0, hour: 6, day_of_month: 13, month: 6, day_of_week: 1}},
                {tz: 'Europe/Moscow', out: {minute: 0, hour: 21, day_of_month: 12, month: 6, day_of_week: 0}},
                {tz: 'America/Toronto', out: {minute: 0, hour: 14, day_of_month: 12, month: 6, day_of_week: 0}},
                {tz: 'America/Chicago', out: {minute: 0, hour: 13, day_of_month: 12, month: 6, day_of_week: 0}},
                {tz: 'Asia/Singapore', out: {minute: 0, hour: 2, day_of_month: 13, month: 6, day_of_week: 1}},
                {tz: 'Europe/Paris', out: {minute: 0, hour: 20, day_of_month: 12, month: 6, day_of_week: 0}},
                {tz: 'America/Denver', out: {minute: 0, hour: 12, day_of_month: 12, month: 6, day_of_week: 0}},
                {tz: 'Africa/Cairo', out: {minute: 0, hour: 20, day_of_month: 12, month: 6, day_of_week: 0}},
            ]) {
                expect(
                    /* @ts-ignore */
                    Scheduler.getTimeParts(date, el.tz)
                ).toEqual(el.out);
            }

            const date2 = new Date('2021-12-31T23:30:00.000Z');
            for (const el of [
                {tz: 'UTC', out: {minute: 30, hour: 23, day_of_month: 31, month: 12, day_of_week: 5}},
                {tz: 'Asia/Shanghai', out: {minute: 30, hour: 7, day_of_month: 1, month: 1, day_of_week: 6}},
                {tz: 'America/New_York', out: {minute: 30, hour: 18, day_of_month: 31, month: 12, day_of_week: 5}},
                {tz: 'Europe/London', out: {minute: 30, hour: 23, day_of_month: 31, month: 12, day_of_week: 5}},
                {tz: 'Europe/Berlin', out: {minute: 30, hour: 0, day_of_month: 1, month: 1, day_of_week: 6}},
                {tz: 'Asia/Tokyo', out: {minute: 30, hour: 8, day_of_month: 1, month: 1, day_of_week: 6}},
                {tz: 'Australia/Sydney', out: {minute: 30, hour: 10, day_of_month: 1, month: 1, day_of_week: 6}},
                {tz: 'America/Los_Angeles', out: {minute: 30, hour: 15, day_of_month: 31, month: 12, day_of_week: 5}},
                {tz: 'America/Sao_Paulo', out: {minute: 30, hour: 20, day_of_month: 31, month: 12, day_of_week: 5}},
                {tz: 'Africa/Johannesburg', out: {minute: 30, hour: 1, day_of_month: 1, month: 1, day_of_week: 6}},
                {tz: 'Asia/Dubai', out: {minute: 30, hour: 3, day_of_month: 1, month: 1, day_of_week: 6}},
                {tz: 'Asia/Kolkata', out: {minute: 0, hour: 5, day_of_month: 1, month: 1, day_of_week: 6}},
                {tz: 'Pacific/Auckland', out: {minute: 30, hour: 12, day_of_month: 1, month: 1, day_of_week: 6}},
                {tz: 'Europe/Moscow', out: {minute: 30, hour: 2, day_of_month: 1, month: 1, day_of_week: 6}},
                {tz: 'America/Toronto', out: {minute: 30, hour: 18, day_of_month: 31, month: 12, day_of_week: 5}},
                {tz: 'America/Chicago', out: {minute: 30, hour: 17, day_of_month: 31, month: 12, day_of_week: 5}},
                {tz: 'Asia/Singapore', out: {minute: 30, hour: 7, day_of_month: 1, month: 1, day_of_week: 6}},
                {tz: 'Europe/Paris', out: {minute: 30, hour: 0, day_of_month: 1, month: 1, day_of_week: 6}},
                {tz: 'America/Denver', out: {minute: 30, hour: 16, day_of_month: 31, month: 12, day_of_week: 5}},
                {tz: 'Africa/Cairo', out: {minute: 30, hour: 1, day_of_month: 1, month: 1, day_of_week: 6}},
            ]) {
                expect(
                    /* @ts-ignore */
                    Scheduler.getTimeParts(date2, el.tz)
                ).toEqual(el.out);
            }
        });
    });

    describe('checkTimeAgainstMap', () => {
        /* @ts-ignore */
        const fn = Scheduler.checkTimeAgainstMap;

        it('should return true when all cron map fields are wildcards', () => {
            expect(fn(
                {
                    minute: '*',
                    hour: '*',
                    day_of_month: '*',
                    month: '*',
                    day_of_week: '*',
                },
                {minute: 23, hour: 12, day_of_month: 7, month: 9, day_of_week: 3}
            )).toBe(true);
        });

        it('should return true when all fields are sets and match the time map', () => {
            expect(fn(
                {
                    minute: new Set([23]),
                    hour: new Set([12]),
                    day_of_month: new Set([7]),
                    month: new Set([9]),
                    day_of_week: new Set([3]),
                },
                {minute: 23, hour: 12, day_of_month: 7, month: 9, day_of_week: 3}
            )).toBe(true);
        });

        it('should return false when one set field does not match the time map', () => {
            expect(fn(
                {
                    minute: new Set([23]),
                    hour: new Set([12]),
                    day_of_month: new Set([7]),
                    month: new Set([9]),
                    day_of_week: new Set([3]),
                },
                {minute: 23, hour: 12, day_of_month: 7, month: 9, day_of_week: 4}
            )).toBe(false);
        });

        it('should return true when mixing wildcards and sets with matching values', () => {
            expect(fn(
                {
                    minute: new Set([10, 20, 30]),
                    hour: '*',
                    day_of_month: new Set([15, 16]),
                    month: '*',
                    day_of_week: new Set([1, 2]),
                },
                {minute: 20, hour: 8, day_of_month: 16, month: 11, day_of_week: 2}
            )).toBe(true);
        });

        it('should return false when mixing wildcards and sets with one non-matching field', () => {
            expect(fn(
                {
                    minute: new Set([10, 20, 30]),
                    hour: '*',
                    day_of_month: new Set([15, 16]),
                    month: '*',
                    day_of_week: new Set([1, 2]),
                },
                {minute: 20, hour: 8, day_of_month: 16, month: 11, day_of_week: 3}
            )).toBe(false);
        });

        describe('individual field validation', () => {
            it('should validate the minute field correctly', () => {
                expect(fn(
                    {
                        minute: new Set([0, 30, 59]),
                        hour: '*',
                        day_of_month: '*',
                        month: '*',
                        day_of_week: '*',
                    },
                    {minute: 30, hour: 10, day_of_month: 10, month: 10, day_of_week: 2}
                )).toBe(true);
                expect(fn(
                    {
                        minute: new Set([0, 30, 59]),
                        hour: '*',
                        day_of_month: '*',
                        month: '*',
                        day_of_week: '*',
                    },
                    {minute: 15, hour: 10, day_of_month: 10, month: 10, day_of_week: 2}
                )).toBe(false);
            });

            it('should validate the hour field correctly', () => {
                expect(fn(
                    {
                        minute: '*',
                        hour: new Set([0, 12, 23]),
                        day_of_month: '*',
                        month: '*',
                        day_of_week: '*',
                    },
                    {minute: 10, hour: 12, day_of_month: 10, month: 10, day_of_week: 2}
                )).toBe(true);
                expect(fn(
                    {
                        minute: '*',
                        hour: new Set([0, 12, 23]),
                        day_of_month: '*',
                        month: '*',
                        day_of_week: '*',
                    },
                    {minute: 10, hour: 5, day_of_month: 10, month: 10, day_of_week: 2}
                )).toBe(false);
            });

            it('should validate the day_of_month field correctly', () => {
                expect(fn(
                    {
                        minute: '*',
                        hour: '*',
                        day_of_month: new Set([1, 15, 31]),
                        month: '*',
                        day_of_week: '*',
                    },
                    {minute: 10, hour: 10, day_of_month: 15, month: 10, day_of_week: 2}
                )).toBe(true);
                expect(fn(
                    {
                        minute: '*',
                        hour: '*',
                        day_of_month: new Set([1, 15, 31]),
                        month: '*',
                        day_of_week: '*',
                    },
                    {minute: 10, hour: 10, day_of_month: 10, month: 10, day_of_week: 2}
                )).toBe(false);
            });

            it('should validate the month field correctly', () => {
                expect(fn(
                    {
                        minute: '*',
                        hour: '*',
                        day_of_month: '*',
                        month: new Set([1, 6, 12]),
                        day_of_week: '*',
                    },
                    {minute: 10, hour: 10, day_of_month: 15, month: 6, day_of_week: 2}
                )).toBe(true);
                expect(fn(
                    {
                        minute: '*',
                        hour: '*',
                        day_of_month: '*',
                        month: new Set([1, 6, 12]),
                        day_of_week: '*',
                    },
                    {minute: 10, hour: 10, day_of_month: 15, month: 7, day_of_week: 2}
                )).toBe(false);
            });

            it('should validate the day_of_week field correctly', () => {
                expect(fn(
                    {
                        minute: '*',
                        hour: '*',
                        day_of_month: '*',
                        month: '*',
                        day_of_week: new Set([0, 3, 6]),
                    },
                    {minute: 10, hour: 10, day_of_month: 15, month: 6, day_of_week: 3}
                )).toBe(true);
                expect(fn(
                    {
                        minute: '*',
                        hour: '*',
                        day_of_month: '*',
                        month: '*',
                        day_of_week: new Set([0, 3, 6]),
                    },
                    {minute: 10, hour: 10, day_of_month: 15, month: 6, day_of_week: 2}
                )).toBe(false);
            });
        });

        it('should return true for lower boundary value', () => {
            expect(fn(
                {
                    minute: new Set([0, 59]),
                    hour: new Set([0, 23]),
                    day_of_month: new Set([1, 31]),
                    month: new Set([1, 12]),
                    day_of_week: new Set([0, 6]),
                },
                {minute: 0, hour: 0, day_of_month: 1, month: 1, day_of_week: 0}
            )).toBe(true);
        });

        it('should return true for upper boundary value', () => {
            expect(fn(
                {
                    minute: new Set([0, 59]),
                    hour: new Set([0, 23]),
                    day_of_month: new Set([1, 31]),
                    month: new Set([1, 12]),
                    day_of_week: new Set([0, 6]),
                },
                {minute: 59, hour: 23, day_of_month: 31, month: 12, day_of_week: 6}
            )).toBe(true);
        });

        it('should return false for non-boundary values not in the set', () => {
            expect(fn(
                {
                    minute: new Set([0, 59]),
                    hour: new Set([0, 23]),
                    day_of_month: new Set([1, 31]),
                    month: new Set([1, 12]),
                    day_of_week: new Set([0, 6]),
                },
                {minute: 30, hour: 12, day_of_month: 15, month: 6, day_of_week: 3}
            )).toBe(false);
        });
    });

    describe('isCronSchedule', () => {
        it('Should return false if passed a non/empty string', () => {
            for (const el of CONSTANTS.NOT_STRING_WITH_EMPTY) {
                expect(Scheduler.isCronSchedule(el as string)).toBe(false);
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
            ]) expect(Scheduler.isCronSchedule(el)).toBe(true);
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
            ]) expect(Scheduler.isCronSchedule(el)).toBe(false);
        });

        describe('minute', () => {
            it('Should return true if passed as wildcard', () => {
                expect(Scheduler.isCronSchedule('* 0 1 1 0')).toBe(true);
            });

            it('Should return true for valid single values', () => {
                for (let i = 0; i <= 59; i++) {
                    expect(Scheduler.isCronSchedule(`${i} 0 1 1 0`)).toBe(true);
                }
            });

            it('Should return true when at lower bound', () => {
                expect(Scheduler.isCronSchedule('0 * * * *')).toBe(true);
            });

            it('Should return true for a valid comma-separated list', () => {
                expect(Scheduler.isCronSchedule('0,15,30,45 0 1 1 0')).toBe(true);
            });

            it('Should return true for a valid range', () => {
                expect(Scheduler.isCronSchedule('10-20 0 1 1 0')).toBe(true);
            });

            it('Should return true for a valid step expression with wildcard', () => {
                expect(Scheduler.isCronSchedule('*/5 0 1 1 0')).toBe(true);
            });

            it('Should return true for a valid step expression with range', () => {
                expect(Scheduler.isCronSchedule('10-50/10 0 1 1 0')).toBe(true);
            });

            it('Should return true for a valid stepper with both base and step as number', () => {
                expect(Scheduler.isCronSchedule('4/2 0 1 1 0')).toBe(true);
            });

            it('Should return false for values that exceed the valid range', () => {
                expect(Scheduler.isCronSchedule('60 0 1 1 0')).toBe(false);
                expect(Scheduler.isCronSchedule('61 0 1 1 0')).toBe(false);
            });

            it('Should return false for negative values', () => {
                expect(Scheduler.isCronSchedule('-1 0 1 1 0')).toBe(false);
            });

            it('Should return false for invalid comma separated values', () => {
                expect(Scheduler.isCronSchedule('0,x,2 1 1 1 1')).toBe(false);
            });

            it('Should return false for an invalid step expression (step of zero)', () => {
                expect(Scheduler.isCronSchedule('*/0 0 1 1 0')).toBe(false);
                expect(Scheduler.isCronSchedule('10-20/0 0 1 1 0')).toBe(false);
            });

            it('Should return false for an invalid step expression (step outside of bounds)', () => {
                expect(Scheduler.isCronSchedule('*/0 0 1 1 0')).toBe(false);
                expect(Scheduler.isCronSchedule('10-20/68 0 1 1 0')).toBe(false);
            });

            it('Should return false for an invalid range (missing or invalid start)', () => {
                expect(Scheduler.isCronSchedule('-10 0 1 1 0')).toBe(false);
                expect(Scheduler.isCronSchedule('x-10 0 1 1 0')).toBe(false);
            });

            it('Should return false for an invalid range (missing or invalid end)', () => {
                expect(Scheduler.isCronSchedule('10- 0 1 1 0')).toBe(false);
                expect(Scheduler.isCronSchedule('10-x 0 1 1 0')).toBe(false);
            });

            it('Should return false for an invalid range (more than 2 in range)', () => {
                expect(Scheduler.isCronSchedule('10-20-30 0 1 1 0')).toBe(false);
            });

            it('Should return false for an invalid range (start greater than end)', () => {
                expect(Scheduler.isCronSchedule('50-10 0 1 1 0')).toBe(false);
            });

            it('Should return false for an invalid range (out-of-bounds end)', () => {
                expect(Scheduler.isCronSchedule('10-100 0 1 1 0')).toBe(false);
            });

            it('Should return false for an invalid range (out-of-bounds start)', () => {
                expect(Scheduler.isCronSchedule('90-100 0 1 1 0')).toBe(false);
            });

            it('Should return false for an invalid range part with step', () => {
                expect(Scheduler.isCronSchedule('x-10/5 0 1 1 0')).toBe(false);
                expect(Scheduler.isCronSchedule('10-x/5 0 1 1 0')).toBe(false);
            });

            it('Should return false for an invalid range with step (start greater than end)', () => {
                expect(Scheduler.isCronSchedule('50-10/5 0 1 1 0')).toBe(false);
            });

            it('Should return false for an invalid range with step (step greater than end-start)', () => {
                expect(Scheduler.isCronSchedule('0-3/4 1 1 1 1')).toBe(false);
            });

            it('Should return false for an invalid range with step (more than 2)', () => {
                expect(Scheduler.isCronSchedule('1-3-5/2 1 1 1 1')).toBe(false);
            });
        });

        describe('hour', () => {
            it('Should return true if passed as wildcard', () => {
                expect(Scheduler.isCronSchedule('0 * 1 1 0')).toBe(true);
            });

            it('Should return true for valid single values', () => {
                for (let i = 0; i <= 23; i++) {
                    expect(Scheduler.isCronSchedule(`0 ${i} 1 1 0`)).toBe(true);
                }
            });

            it('Should return true for a valid comma-separated list', () => {
                expect(Scheduler.isCronSchedule('0 0,1,2,3,12,13,14,20,21,22 1 1 0')).toBe(true);
            });

            it('Should return true for a valid range', () => {
                expect(Scheduler.isCronSchedule('0 6-9 1 1 0')).toBe(true);
            });

            it('Should return true for a valid step expression with wildcard', () => {
                expect(Scheduler.isCronSchedule('0 */5 1 1 0')).toBe(true);
            });

            it('Should return true for a valid step expression with range', () => {
                expect(Scheduler.isCronSchedule('0 12-20/2 1 1 0')).toBe(true);
            });

            it('Should return true for a valid range with step', () => {
                expect(Scheduler.isCronSchedule('0 6-18/3 1 1 0')).toBe(true);
            });

            it('Should return true for a valid stepper with both base and step as number', () => {
                expect(Scheduler.isCronSchedule('0 4/2 1 1 0')).toBe(true);
            });

            it('Should return false for values that exceed the valid range', () => {
                expect(Scheduler.isCronSchedule('0 24 1 1 0')).toBe(false);
                expect(Scheduler.isCronSchedule('0 32 0 1 0')).toBe(false);
            });

            it('Should return false for negative values', () => {
                expect(Scheduler.isCronSchedule('0 -1 1 1 0')).toBe(false);
            });

            it('Should return false for invalid comma separated values', () => {
                expect(Scheduler.isCronSchedule('0 1,x,2 1 1 1')).toBe(false);
            });

            it('Should return false for an invalid step expression (step of zero)', () => {
                expect(Scheduler.isCronSchedule('0 */0 1 1 0')).toBe(false);
                expect(Scheduler.isCronSchedule('0 10-20/0 1 1 0')).toBe(false);
            });

            it('Should return false for an invalid step expression (step outside of bounds)', () => {
                expect(Scheduler.isCronSchedule('0 */0 1 1 0')).toBe(false);
                expect(Scheduler.isCronSchedule('0 10-20/68 1 1 0')).toBe(false);
            });

            it('Should return false for an invalid range (missing or invalid start)', () => {
                expect(Scheduler.isCronSchedule('0 -10 1 1 0')).toBe(false);
                expect(Scheduler.isCronSchedule('0 x-10 1 1 0')).toBe(false);
            });

            it('Should return false for an invalid range (missing or invalid end)', () => {
                expect(Scheduler.isCronSchedule('0 10- 1 1 0')).toBe(false);
                expect(Scheduler.isCronSchedule('0 10-x 1 1 0')).toBe(false);
            });

            it('Should return false for an invalid range (more than 2 in range)', () => {
                expect(Scheduler.isCronSchedule('0 5-8-12 1 1 0')).toBe(false);
            });

            it('Should return false for an invalid range (start greater than end)', () => {
                expect(Scheduler.isCronSchedule('0 23-10 1 1 0')).toBe(false);
            });

            it('Should return false for an invalid range (out-of-bounds end)', () => {
                expect(Scheduler.isCronSchedule('0 10-30 1 1 0')).toBe(false);
            });

            it('Should return false for an invalid range (out-of-bounds start)', () => {
                expect(Scheduler.isCronSchedule('0 90-100 1 1 0')).toBe(false);
            });

            it('Should return false for an invalid range part with step', () => {
                expect(Scheduler.isCronSchedule('0 20-x/3 1 1 0')).toBe(false);
                expect(Scheduler.isCronSchedule('0 x-10/3 1 1 0')).toBe(false);
            });

            it('Should return false for an invalid range with step (start greater than end)', () => {
                expect(Scheduler.isCronSchedule('0 20-10/3 1 1 0')).toBe(false);
            });

            it('Should return false for an invalid range with step (step greater than end-start)', () => {
                expect(Scheduler.isCronSchedule('0 1-3/4 1 1 1')).toBe(false);
            });

            it('Should return false for an invalid range with step (more than 2)', () => {
                expect(Scheduler.isCronSchedule('1 1-3-5/2 1 1 1')).toBe(false);
            });
        });

        describe('day_of_month', () => {
            it('Should return true if passed as wildcard', () => {
                expect(Scheduler.isCronSchedule('0 1 * 1 0')).toBe(true);
            });

            it('Should return true for valid single values', () => {
                for (let i = 1; i <= 31; i++) {
                    expect(Scheduler.isCronSchedule(`0 1 ${i} 1 0`)).toBe(true);
                }
            });

            it('Should return true for a valid comma-separated list', () => {
                expect(Scheduler.isCronSchedule('0 1 1,2,3,12,13,14,20,21,22 1 0')).toBe(true);
            });

            it('Should return true for a valid range', () => {
                expect(Scheduler.isCronSchedule('0 0 6-9 1 0')).toBe(true);
            });

            it('Should return true for a valid step expression with wildcard', () => {
                expect(Scheduler.isCronSchedule('0 1 */5 1 0')).toBe(true);
            });

            it('Should return true for a valid step expression with range', () => {
                expect(Scheduler.isCronSchedule('0 2 12-20/2 1 0')).toBe(true);
            });

            it('Should return true for a valid range with step', () => {
                expect(Scheduler.isCronSchedule('0 1 1-31/7 1 0')).toBe(true);
            });

            it('Should return true for a valid stepper with both base and step as number', () => {
                expect(Scheduler.isCronSchedule('0 0 4/2 1 0')).toBe(true);
            });

            it('Should return false for values that exceed the valid range', () => {
                expect(Scheduler.isCronSchedule('0 1 32 1 0')).toBe(false);
                expect(Scheduler.isCronSchedule('0 1 64 1 0')).toBe(false);
            });

            it('Should return false for negative values', () => {
                expect(Scheduler.isCronSchedule('0 1 -1 1 0')).toBe(false);
            });

            it('Should return false for invalid comma separated values', () => {
                expect(Scheduler.isCronSchedule('0 1 1,x,2 1 1')).toBe(false);
            });

            it('Should return false for zero', () => {
                expect(Scheduler.isCronSchedule('0 1 0 1 0')).toBe(false);
            });

            it('Should return false for an invalid step expression (step of zero)', () => {
                expect(Scheduler.isCronSchedule('0 1 */0 1 0')).toBe(false);
                expect(Scheduler.isCronSchedule('0 1 10-20/0 1 0')).toBe(false);
            });

            it('Should return false for an invalid step expression (step outside of bounds)', () => {
                expect(Scheduler.isCronSchedule('0 2 */0 1 0')).toBe(false);
                expect(Scheduler.isCronSchedule('0 2 10-20/68 1 0')).toBe(false);
            });

            it('Should return false for an invalid range (missing or invalid start)', () => {
                expect(Scheduler.isCronSchedule('0 1 -10 1 0')).toBe(false);
                expect(Scheduler.isCronSchedule('0 1 x-10 1 0')).toBe(false);
            });

            it('Should return false for an invalid range (missing or invalid end)', () => {
                expect(Scheduler.isCronSchedule('0 1 10- 1 0')).toBe(false);
                expect(Scheduler.isCronSchedule('0 1 10-x 1 0')).toBe(false);
            });

            it('Should return false for an invalid range (more than 2 in range)', () => {
                expect(Scheduler.isCronSchedule('0 1 5-8-12 1 0')).toBe(false);
            });

            it('Should return false for an invalid range (start greater than end)', () => {
                expect(Scheduler.isCronSchedule('0 2 23-10 1 0')).toBe(false);
            });

            it('Should return false for an invalid range (out-of-bounds end)', () => {
                expect(Scheduler.isCronSchedule('0 2 10-33 1 0')).toBe(false);
            });

            it('Should return false for an invalid range (out-of-bounds start)', () => {
                expect(Scheduler.isCronSchedule('0 2 90-100 1 0')).toBe(false);
            });

            it('Should return false for an invalid range part with step', () => {
                expect(Scheduler.isCronSchedule('0 1 x-1/7 1 0')).toBe(false);
                expect(Scheduler.isCronSchedule('0 1 20-x/7 1 0')).toBe(false);
            });

            it('Should return false for an invalid range with step (start greater than end)', () => {
                expect(Scheduler.isCronSchedule('0 1 31-1/7 1 0')).toBe(false);
            });

            it('Should return false for an invalid range with step (step greater than end-start)', () => {
                expect(Scheduler.isCronSchedule('0 1 1-3/4 1 1')).toBe(false);
            });

            it('Should return false for an invalid range with step (more than 2)', () => {
                expect(Scheduler.isCronSchedule('1 1 1-3-5/2 1 1')).toBe(false);
            });
        });

        describe('month', () => {
            it('Should return true if passed as wildcard', () => {
                expect(Scheduler.isCronSchedule('0 1 1 * 0')).toBe(true);
            });

            it('Should return true for valid single values', () => {
                for (let i = 1; i <= 12; i++) {
                    expect(Scheduler.isCronSchedule(`0 1 1 ${i} 0`)).toBe(true);
                }
            });

            it('Should return true for a valid comma-separated list', () => {
                expect(Scheduler.isCronSchedule('0 1 1 1,2,3,9,10,11,12,8 0')).toBe(true);
            });

            it('Should return true for a valid range', () => {
                expect(Scheduler.isCronSchedule('0 0 1 6-9 0')).toBe(true);
            });

            it('Should return true for a valid step expression with wildcard', () => {
                expect(Scheduler.isCronSchedule('0 1 1 */5 0')).toBe(true);
            });

            it('Should return true for a valid step expression with range', () => {
                expect(Scheduler.isCronSchedule('0 2 1 6-9/1 0')).toBe(true);
            });

            it('Should return true for a valid range with step', () => {
                expect(Scheduler.isCronSchedule('0 1 1 3-11/2 0')).toBe(true);
            });

            it('Should return true for a valid stepper with both base and step as number', () => {
                expect(Scheduler.isCronSchedule('0 0 1 4/1 0')).toBe(true);
            });

            it('Should return false for values that exceed the valid range', () => {
                expect(Scheduler.isCronSchedule('0 1 1 13 0')).toBe(false);
                expect(Scheduler.isCronSchedule('0 1 1 20 0')).toBe(false);
            });

            it('Should return false for negative values', () => {
                expect(Scheduler.isCronSchedule('0 1 1 -1 0')).toBe(false);
            });

            it('Should return false for invalid comma separated values', () => {
                expect(Scheduler.isCronSchedule('0 1 1 1,x,2 1')).toBe(false);
            });

            it('Should return false for zero', () => {
                expect(Scheduler.isCronSchedule('0 1 1 0 0')).toBe(false);
            });

            it('Should return false for an invalid step expression (step of zero)', () => {
                expect(Scheduler.isCronSchedule('0 1 1 */0 0')).toBe(false);
                expect(Scheduler.isCronSchedule('0 1 1 6-12/0 0')).toBe(false);
            });

            it('Should return false for an invalid step expression (step outside of bounds)', () => {
                expect(Scheduler.isCronSchedule('0 2 1 */0 0')).toBe(false);
                expect(Scheduler.isCronSchedule('0 2 1 6-12/68 0')).toBe(false);
            });

            it('Should return false for an invalid range (missing or invalid start)', () => {
                expect(Scheduler.isCronSchedule('0 1 1 -10 0')).toBe(false);
                expect(Scheduler.isCronSchedule('0 1 1 x-10 0')).toBe(false);
            });

            it('Should return false for an invalid range (missing or invalid end)', () => {
                expect(Scheduler.isCronSchedule('0 1 1 10- 0')).toBe(false);
                expect(Scheduler.isCronSchedule('0 1 1 10-x 0')).toBe(false);
            });

            it('Should return false for an invalid range (more than 2 in range)', () => {
                expect(Scheduler.isCronSchedule('0 1 1 5-8-12 0')).toBe(false);
            });

            it('Should return false for an invalid range (start greater than end)', () => {
                expect(Scheduler.isCronSchedule('0 2 1 9-6 0')).toBe(false);
            });

            it('Should return false for an invalid range (out-of-bounds end)', () => {
                expect(Scheduler.isCronSchedule('0 2 1 6-33 0')).toBe(false);
            });

            it('Should return false for an invalid range (out-of-bounds start)', () => {
                expect(Scheduler.isCronSchedule('0 2 1 90-100 0')).toBe(false);
            });

            it('Should return false for an invalid range part with step', () => {
                expect(Scheduler.isCronSchedule('0 1 1 x-3/2 0')).toBe(false);
                expect(Scheduler.isCronSchedule('0 1 1 11-x/2 0')).toBe(false);
            });

            it('Should return false for an invalid range with step (start greater than end)', () => {
                expect(Scheduler.isCronSchedule('0 1 1 11-3/2 0')).toBe(false);
            });

            it('Should return false for an invalid range with step (step greater than end-start)', () => {
                expect(Scheduler.isCronSchedule('0 1 1 1-3/4 1')).toBe(false);
            });

            it('Should return false for an invalid range with step (more than 2)', () => {
                expect(Scheduler.isCronSchedule('1 1 1 1-3-5/2 1')).toBe(false);
            });
        });

        describe('day_of_week', () => {
            it('Should return true if passed as wildcard', () => {
                expect(Scheduler.isCronSchedule('0 1 1 1 *')).toBe(true);
            });

            it('Should return true for valid single values', () => {
                for (let i = 0; i <= 6; i++) {
                    expect(Scheduler.isCronSchedule(`0 1 1 1 ${i}`)).toBe(true);
                }
            });

            it('Should return true for a valid comma-separated list', () => {
                expect(Scheduler.isCronSchedule('0 1 1 1 1,2,3,4,5')).toBe(true);
            });

            it('Should return true for a valid range', () => {
                expect(Scheduler.isCronSchedule('0 0 1 1 0-3')).toBe(true);
            });

            it('Should return true for a valid step expression with wildcard', () => {
                expect(Scheduler.isCronSchedule('0 1 1 1 */2')).toBe(true);
            });

            it('Should return true for a valid step expression with range', () => {
                expect(Scheduler.isCronSchedule('0 2 1 1 3-6/1')).toBe(true);
            });

            it('Should return true for a valid range with step', () => {
                expect(Scheduler.isCronSchedule('0 1 1 1 1-6/2')).toBe(true);
            });

            it('Should return true for a valid stepper with both base and step as number', () => {
                expect(Scheduler.isCronSchedule('0 0 1 1 4/1')).toBe(true);
            });

            it('Should return false for values that exceed the valid range', () => {
                expect(Scheduler.isCronSchedule('0 1 1 1 7')).toBe(false);
                expect(Scheduler.isCronSchedule('0 1 1 1 8')).toBe(false);
                expect(Scheduler.isCronSchedule('0 1 1 1 9')).toBe(false);
            });

            it('Should return false for negative values', () => {
                expect(Scheduler.isCronSchedule('0 1 1 1 -1')).toBe(false);
            });

            it('Should return false for invalid comma separated values', () => {
                expect(Scheduler.isCronSchedule('0 1 1 1 1,x,2')).toBe(false);
            });

            it('Should return false for an invalid step expression (step of zero)', () => {
                expect(Scheduler.isCronSchedule('0 1 1 1 */0')).toBe(false);
                expect(Scheduler.isCronSchedule('0 1 1 1 3-5/0')).toBe(false);
            });

            it('Should return false for an invalid step expression (step outside of bounds)', () => {
                expect(Scheduler.isCronSchedule('0 2 1 1 4-6/8')).toBe(false);
            });

            it('Should return false for an invalid range (missing or invalid start)', () => {
                expect(Scheduler.isCronSchedule('0 1 1 1 -10')).toBe(false);
                expect(Scheduler.isCronSchedule('0 1 1 1 x-10')).toBe(false);
            });

            it('Should return false for an invalid range (missing or invalid end)', () => {
                expect(Scheduler.isCronSchedule('0 1 1 1 10-')).toBe(false);
                expect(Scheduler.isCronSchedule('0 1 1 1 10-x')).toBe(false);
            });

            it('Should return false for an invalid range (more than 2 in range)', () => {
                expect(Scheduler.isCronSchedule('0 1 1 1 2-4-6')).toBe(false);
            });


            it('Should return false for an invalid range (start greater than end)', () => {
                expect(Scheduler.isCronSchedule('0 2 1 1 8-6')).toBe(false);
            });

            it('Should return false for an invalid range (out-of-bounds end)', () => {
                expect(Scheduler.isCronSchedule('0 2 1 1 6-33')).toBe(false);
            });

            it('Should return false for an invalid range (out-of-bounds start)', () => {
                expect(Scheduler.isCronSchedule('0 2 1 1 90-100')).toBe(false);
            });

            it('Should return false for an invalid range part with step', () => {
                expect(Scheduler.isCronSchedule('0 1 1 1 x-2/2')).toBe(false);
                expect(Scheduler.isCronSchedule('0 1 1 1 1-x/2')).toBe(false);
            });

            it('Should return false for an invalid range with step (start greater than end)', () => {
                expect(Scheduler.isCronSchedule('0 1 1 1 7-1/2')).toBe(false);
            });

            it('Should return false for an invalid range with step (step greater than end-start)', () => {
                expect(Scheduler.isCronSchedule('0 1 1 1 1-3/4')).toBe(false);
            });

            it('Should return false for an invalid range with step (more than 2)', () => {
                expect(Scheduler.isCronSchedule('1 1 1 1 1-3-5/2')).toBe(false);
            });
        });
    });

    describe('cronShouldRun', () => {
        const mockIsCronSchedule = new MockFn();
        const mockConvertToMap = new MockFn();
        const mockGetTimeParts = new MockFn();
        const mockCheckTimeAgainstMap = new MockFn();

        /* @ts-ignore */
        const fn = Scheduler.cronShouldRun;

        beforeEach(() => {
            mockIsCronSchedule.mock(Scheduler, 'isCronSchedule');
            mockConvertToMap.mock(Scheduler, 'convertToMap');
            mockGetTimeParts.mock(Scheduler, 'getTimeParts');
            mockCheckTimeAgainstMap.mock(Scheduler, 'checkTimeAgainstMap');
        });

        afterEach(() => {
            mockIsCronSchedule.restore();
            mockConvertToMap.restore();
            mockGetTimeParts.restore();
            mockCheckTimeAgainstMap.restore();
        });

        it('Should return false if isCronSchedule returns false', () => {
            mockIsCronSchedule.return = false;
            expect(fn('0 1 1 1 1', 'Europe/Brussels')).toBe(false);
            expect(mockIsCronSchedule.calls).toEqual([['0 1 1 1 1']]);
            expect(mockConvertToMap.isEmpty).toBe(true);
            expect(mockGetTimeParts.isEmpty).toBe(true);
            expect(mockCheckTimeAgainstMap.isEmpty).toBe(true);
        });

        it('Should return false if checkTimeAgainstMap returns false', () => {
            mockIsCronSchedule.return = true;
            mockCheckTimeAgainstMap.return = false;
            mockGetTimeParts.return = {hello: 'World'};
            mockConvertToMap.return = {world: 'Hello'};
            const now = new Date();
            expect(fn('0 1 1 1 1', 'Europe/Brussels')).toBe(false);
            expect(mockIsCronSchedule.calls).toEqual([['0 1 1 1 1']]);
            expect(mockConvertToMap.calls).toEqual([['0 1 1 1 1']]);

            expect(mockGetTimeParts.calls.length).toBe(1);

            const val = mockGetTimeParts.calls.shift() as unknown[];
            expect(val.length).toBe(2);
            expect(val[0] instanceof Date).toBe(true);
            expect(val[0]! >= now).toBe(true);
            expect(val[1]).toBe('Europe/Brussels');

            expect(mockCheckTimeAgainstMap.calls).toEqual([[
                {world: 'Hello'},
                {hello: 'World'},
            ]]);
        });

        it('Should return true if checkTimeAgainstMap returns true', () => {
            mockIsCronSchedule.return = true;
            mockCheckTimeAgainstMap.return = true;
            mockGetTimeParts.return = {hello: 'World'};
            mockConvertToMap.return = {world: 'Hello'};
            const now = new Date();
            expect(fn('0 1 1 1 1', 'Europe/Brussels')).toBe(true);
            expect(mockIsCronSchedule.calls).toEqual([['0 1 1 1 1']]);
            expect(mockConvertToMap.calls).toEqual([['0 1 1 1 1']]);

            expect(mockGetTimeParts.calls.length).toBe(1);

            const val = mockGetTimeParts.calls.shift() as unknown[];
            expect(val.length).toBe(2);
            expect(val[0] instanceof Date).toBe(true);
            expect(val[0]! >= now).toBe(true);
            expect(val[1]).toBe('Europe/Brussels');

            expect(mockCheckTimeAgainstMap.calls).toEqual([[
                {world: 'Hello'},
                {hello: 'World'},
            ]]);
        });

        it('Should pass null if passed a non/empty string TimeZone', () => {
            for (const el of CONSTANTS.NOT_STRING_WITH_EMPTY) {
                mockIsCronSchedule.return = true;
                mockCheckTimeAgainstMap.return = true;
                mockGetTimeParts.return = {hello: 'World'};
                mockConvertToMap.return = {world: 'Hello'};
                const now = new Date();
                expect(fn('0 1 1 1 1', el)).toBe(true);
                expect(mockIsCronSchedule.calls).toEqual([['0 1 1 1 1']]);
                expect(mockConvertToMap.calls).toEqual([['0 1 1 1 1']]);

                expect(mockGetTimeParts.calls.length).toBe(1);

                const val = mockGetTimeParts.calls.shift() as unknown[];
                expect(val.length).toBe(2);
                expect(val[0] instanceof Date).toBe(true);
                expect(val[0]! >= now).toBe(true);
                expect(val[1]).toBe(null);

                expect(mockCheckTimeAgainstMap.calls).toEqual([[
                    {world: 'Hello'},
                    {hello: 'World'},
                ]]);
                mockIsCronSchedule.reset();
                mockCheckTimeAgainstMap.reset();
                mockGetTimeParts.reset();
                mockConvertToMap.reset();
            }
        });
    });
});
