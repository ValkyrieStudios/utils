import {describe, it, expect} from 'vitest';
import {sleep} from '../../../lib/function/sleep';
import {PubSub, type LogFn, type LogObject} from '../../../lib/modules/PubSub';
import CONSTANTS from '../../constants';

describe('Modules - PubSub', () => {
    describe('ctor', () => {
        it('Should throw when passed a non object', () => {
            for (const el of CONSTANTS.NOT_OBJECT) {
                if (el === undefined) continue;
                expect(() => new PubSub(el)).toThrowError(/PubSub@ctor: options should be an object/);
            }
        });

        it('Should throw when passed a non function logger', () => {
            for (const el of CONSTANTS.NOT_FUNCTION) {
                if (el === undefined) continue;
                expect(() => new PubSub({logger: el})).toThrowError(/PubSub@ctor: logger should be a function/);
            }
        });

        it('Should throw when passed a non/empty string name', () => {
            for (const el of CONSTANTS.NOT_STRING_WITH_EMPTY) {
                if (el === undefined) continue;
                expect(() => new PubSub({name: el})).toThrowError(/PubSub@ctor: name should be a non-empty string/);
            }
        });

        it('Should throw when passed a non-boolean store', () => {
            for (const el of CONSTANTS.NOT_BOOLEAN) {
                if (el === undefined) continue;
                expect(() => new PubSub({store: el})).toThrowError(/PubSub@ctor: store should be a boolean/);
            }
        });

        it('Should have the correct name when passed in the config', () => {
            const relay = new PubSub({name: 'Relay'});
            expect(relay.name).toBe('Relay');
        });

        it('Should by default be called PubSub', () => {
            const relay = new PubSub();
            expect(relay.name).toBe('PubSub');
        });
    });

    describe('subscribe & publish', () => {
        it('Should not throw if passed a non/empty string', () => {
            const relay = new PubSub();
            let called: unknown;
            relay.subscribe({
                testEvent: data => called = data,
            });
            for (const el of CONSTANTS.NOT_STRING_WITH_EMPTY) {
                expect(() => relay.publish(el)).not.toThrow();
            }
            expect(called).toBeUndefined();
        });

        it('Should be allowed to be called with no data', () => {
            const relay = new PubSub();
            let called: unknown;
            let data: unknown;
            relay.subscribe({
                testEvent: raw_payload => {
                    data = raw_payload;
                    called = true;
                },
            });
            relay.publish('testEvent');
            expect(called).toBeTruthy();
            expect(data).toBeUndefined();
        });

        it('Should call synchronous subscribers on publish', () => {
            let called = false;
            const relay = new PubSub();
            relay.subscribe({
                testEvent: data => {
                    expect(data).toBe('hello');
                    called = true;
                },
            });
            relay.publish('testEvent', 'hello');
            expect(called).toBeTruthy();
        });

        it('Should call asynchronous subscribers on publish', async () => {
            let called = false;
            const relay = new PubSub();
            relay.subscribe({
                asyncEvent: async data => {
                    expect(data).toBe('asyncHello');
                    called = true;
                },
            });
            relay.publish('asyncEvent', 'asyncHello');
            await sleep(10);
            expect(called).toBeTruthy();
        });

        it('Should remove "once" subscribers after the first call', () => {
            let call_count = 0;
            const relay = new PubSub();
            relay.subscribe({
                onceEvent: {run: () => {
                    call_count++;
                }, once: true},
            });
            relay.publish('onceEvent');
            relay.publish('onceEvent');
            expect(call_count).toBe(1);
        });

        it('Should store for future subscribers when passed store', () => {
            const relay = new PubSub();
            relay.publish('userSettings', {isActive: true}, true);

            let data: unknown = null;
            relay.subscribe({userSettings: val => data = val}, 'client1');
            expect(data).toEqual({isActive: true});
            relay.publish('userSettings', {isActive: false}, true);
            expect(data).toEqual({isActive: false});

            let data2: unknown = null;
            relay.subscribe({userSettings: val => data2 = val}, 'client2');
            expect(data2).toEqual({isActive: false});
        });

        it('Should store for future subscribers AND if an event comes along without store NOT override the value in storage', () => {
            const relay = new PubSub();
            relay.publish('userSettings', {isActive: true}, true);

            let data: unknown = null;
            relay.subscribe({userSettings: val => data = val}, 'client1');
            expect(data).toEqual({isActive: true});
            relay.publish('userSettings', {isActive: false}); // store not passed
            expect(data).toEqual({isActive: false});

            let data2: unknown = null;
            relay.subscribe({userSettings: val => data2 = val}, 'client2');
            expect(data2).toEqual({isActive: true});
        });

        it('store=default: Should store for future subscribers when default on store', () => {
            const relay = new PubSub({store: true});
            relay.publish('userSettings', {isActive: true});

            let data: unknown = null;
            relay.subscribe({userSettings: val => data = val}, 'client1');
            expect(data).toEqual({isActive: true});
            relay.publish('userSettings', {isActive: false});
            expect(data).toEqual({isActive: false});

            let data2: unknown = null;
            relay.subscribe({userSettings: val => data2 = val}, 'client2');
            expect(data2).toEqual({isActive: false});
        });

        it('store=default: Should store for future subscribers AND if event comes without store override the value in storage', () => {
            const relay = new PubSub({store: true});
            relay.publish('userSettings', {isActive: true});

            let data: unknown = null;
            relay.subscribe({userSettings: val => data = val}, 'client1');
            expect(data).toEqual({isActive: true});
            relay.publish('userSettings', {isActive: false}); // store not passed
            expect(data).toEqual({isActive: false});

            let data2: unknown = null;
            relay.subscribe({userSettings: val => data2 = val}, 'client2');
            expect(data2).toEqual({isActive: false});
        });

        it('store=default: Should store for future subscribers AND if event comes along with store:false NOT override storage', () => {
            const relay = new PubSub({store: true});
            relay.publish('userSettings', {isActive: true});

            let data: unknown = null;
            relay.subscribe({userSettings: val => data = val}, 'client1');
            expect(data).toEqual({isActive: true});
            relay.publish('userSettings', {isActive: false}, false); // store: false
            expect(data).toEqual({isActive: false});

            let data2: unknown = null;
            relay.subscribe({userSettings: val => data2 = val}, 'client2');
            expect(data2).toEqual({isActive: true});
        });

        it('Should not override existing subscribers if override is passed as false', () => {
            const relay = new PubSub();
            const vals: unknown[] = [];
            const vals2: unknown[] = [];
            const vals3: unknown[] = [];
            const vals4: unknown[] = [];
            relay.subscribe({event: data => vals.push(data)}, 'client1');
            relay.subscribe({event: data => vals3.push(data)}, 'client2');

            relay.publish('event', '1');

            relay.subscribe({event: data => vals2.push(data)}, 'client1', false);
            relay.subscribe({event: data => vals4.push(data)}, 'client2');
            relay.publish('event', '1');

            expect(vals).toEqual(['1', '1']);
            expect(vals2).toEqual([]);

            expect(vals3).toEqual(['1']);
            expect(vals4).toEqual(['1']);
            expect(relay.clientIds()).toEqual(new Set(['client1', 'client2']));
        });

        it('Should not throw when passed a non/empty object events', () => {
            const relay = new PubSub();
            expect(relay.clientIds()).toEqual(new Set());
            for (const el of CONSTANTS.NOT_OBJECT_WITH_EMPTY) {
                expect(() => relay.subscribe(el, 'client1')).not.toThrow();
            }
            expect(relay.clientIds()).toEqual(new Set());
        });

        it('Should not subscribe with invalid payloads', () => {
            const relay = new PubSub();
            expect(relay.clientIds()).toEqual(new Set());
            for (const el of CONSTANTS.NOT_FUNCTION) {
                relay.subscribe({event: el}, 'client1');
            }
            expect(relay.clientIds()).toEqual(new Set());
            relay.subscribe({event: () => {}}, 'client1');
            expect(relay.clientIds()).toEqual(new Set(['client1']));
        });
    });

    describe('unsubscribe', () => {
        it('Should not call an unsubscribed subscriber', () => {
            let called = false;
            const relay = new PubSub();
            const client_id = relay.subscribe({
                event: () => {
                    called = true;
                },
            });
            relay.unsubscribe(client_id!);
            relay.publish('event');
            expect(called).toBe(false);
        });

        it('Should unsubscribe from only the specified event(s)', () => {
            let call_count1 = 0;
            let call_count2 = 0;
            const relay = new PubSub();
            const client_id = relay.subscribe({
                event1: () => {
                    call_count1++;
                },
                event2: () => {
                    call_count2++;
                },
            });
            relay.unsubscribe(client_id!, 'event1');
            relay.publish('event1');
            relay.publish('event2');
            expect(call_count1).toBe(0);
            expect(call_count2).toBe(1);
        });

        it('Should not do anything if passed a non/emtpy string client id', () => {
            const relay = new PubSub();
            relay.subscribe({event: () => {}}, 'client1');
            relay.subscribe({event: () => {}}, 'client2');
            relay.subscribe({event2: () => {}}, 'client1');
            relay.subscribe({event2: () => {}}, 'client3');
            relay.subscribe({event3: () => {}}, 'client3');
            expect(relay.clientIds()).toEqual(new Set(['client1', 'client2', 'client3']));
            for (const el of CONSTANTS.NOT_STRING_WITH_EMPTY) {
                relay.unsubscribe(el, 'event');
            }
            expect(relay.clientIds()).toEqual(new Set(['client1', 'client2', 'client3']));
        });

        it('Should correctly unsubscribe from the provided set of events', () => {
            const relay = new PubSub();
            relay.subscribe({
                event: () => {},
                event2: () => {},
                event3: () => {},
            }, 'client1');
            relay.subscribe({
                event: () => {},
                event2: () => {},
                event3: () => {},
            }, 'client2');
            relay.subscribe({
                event: () => {},
                event2: () => {},
                event3: () => {},
            }, 'client3');
            relay.unsubscribe('client1', ['event', 'event2']);
            expect(relay.clientIds()).toEqual(new Set(['client1', 'client2', 'client3']));
            expect(relay.clientIds('event3')).toEqual(new Set(['client1', 'client2', 'client3']));
            expect(relay.clientIds('event2')).toEqual(new Set(['client2', 'client3']));
            expect(relay.clientIds('event')).toEqual(new Set(['client2', 'client3']));
        });

        it('Should correctly unsubscribe from the provided set of events and filter out unknown events', () => {
            const relay = new PubSub();
            relay.subscribe({
                event: () => {},
                event2: () => {},
                event3: () => {},
            }, 'client1');
            relay.subscribe({
                event: () => {},
                event2: () => {},
                event3: () => {},
            }, 'client2');
            relay.subscribe({
                event: () => {},
                event2: () => {},
                event3: () => {},
            }, 'client3');
            relay.unsubscribe('client1', ['event', 'event2', ...CONSTANTS.NOT_STRING_WITH_EMPTY, 'event4']);
            expect(relay.clientIds()).toEqual(new Set(['client1', 'client2', 'client3']));
            expect(relay.clientIds('event3')).toEqual(new Set(['client1', 'client2', 'client3']));
            expect(relay.clientIds('event2')).toEqual(new Set(['client2', 'client3']));
            expect(relay.clientIds('event')).toEqual(new Set(['client2', 'client3']));
        });

        it('Should correctly do nothing if provided an invalid client id', () => {
            const relay = new PubSub();
            relay.subscribe({
                event: () => {},
                event2: () => {},
                event3: () => {},
            }, 'client1');
            relay.subscribe({
                event: () => {},
                event2: () => {},
                event3: () => {},
            }, 'client2');
            relay.subscribe({
                event: () => {},
                event2: () => {},
                event3: () => {},
            }, 'client3');
            relay.unsubscribe('client4', ['event', 'event2', 'event4']);
            expect(relay.clientIds()).toEqual(new Set(['client1', 'client2', 'client3']));
            expect(relay.clientIds('event3')).toEqual(new Set(['client1', 'client2', 'client3']));
            expect(relay.clientIds('event2')).toEqual(new Set(['client1', 'client2', 'client3']));
            expect(relay.clientIds('event')).toEqual(new Set(['client1', 'client2', 'client3']));
        });
    });

    describe('clientIds', () => {
        it('Should return correct client IDs', () => {
            const relay = new PubSub();
            relay.subscribe({event: () => {}}, 'client1');
            relay.subscribe({event: () => {}}, 'client2');
            relay.subscribe({event2: () => {}}, 'client1');
            relay.subscribe({event2: () => {}}, 'client3');
            relay.subscribe({event3: () => {}}, 'client3');
            expect(relay.clientIds()).toEqual(new Set(['client1', 'client2', 'client3']));
        });

        it('Should give correct client IDs for a specific event', () => {
            const relay = new PubSub();
            relay.subscribe({event: () => {}}, 'client1');
            relay.subscribe({event: () => {}}, 'client2');
            relay.subscribe({event2: () => {}}, 'client1');
            relay.subscribe({event2: () => {}}, 'client3');
            relay.subscribe({event3: () => {}}, 'client3');
            expect(relay.clientIds('event2')).toEqual(new Set(['client1', 'client3']));
            expect(relay.clientIds('event')).toEqual(new Set(['client1', 'client2']));
        });

        it('Should give correct client IDs for a group of events', () => {
            const relay = new PubSub();
            relay.subscribe({event: () => {}}, 'client1');
            relay.subscribe({event: () => {}}, 'client2');
            relay.subscribe({event2: () => {}}, 'client1');
            relay.subscribe({event2: () => {}}, 'client3');
            relay.subscribe({event3: () => {}}, 'client3');
            relay.subscribe({event4: () => {}}, 'client3');
            relay.subscribe({event4: () => {}}, 'client4');
            expect(relay.clientIds(['event', 'event2'])).toEqual(new Set(['client1', 'client2', 'client3']));
            expect(relay.clientIds(['event', 'event4'])).toEqual(new Set(['client1', 'client2', 'client3', 'client4']));
            expect(relay.clientIds(['event2', 'event4'])).toEqual(new Set(['client1', 'client3', 'client4']));
            expect(relay.clientIds([])).toEqual(new Set());
        });

        it('Should return an empty set if passed nothing on an empty relay', () => {
            const relay = new PubSub();
            expect(relay.clientIds()).toEqual(new Set());
            relay.subscribe({event: () => {}}, 'client1');
            expect(relay.clientIds('event2')).toEqual(new Set());
        });
    });

    describe('clear', () => {
        it('Should clear subscriptions for a specific event', () => {
            const relay = new PubSub();
            relay.subscribe({event: () => {}}, 'client1');
            relay.subscribe({event: () => {}}, 'client2');
            relay.clear('event');
            let called = false;
            relay.subscribe({event: () => {
                called = true;
            }}, 'client3');
            relay.clear('event');
            relay.publish('event');
            expect(called).toBe(false);
        });

        it('Should clear subscriptions for a group of events', () => {
            const relay = new PubSub();
            let called = false;
            relay.subscribe({event: () => called = true}, 'client1');
            relay.subscribe({event: () => called = true}, 'client2');
            relay.subscribe({event2: () => called = true}, 'client2');
            relay.subscribe({event3: () => called = true}, 'client2');
            relay.clear(['event', 'event2']);
            relay.publish('event');
            expect(called).toBe(false);
            relay.publish('event2');
            expect(called).toBe(false);
            relay.publish('event3');
            expect(called).toBe(true);
            expect(relay.clientIds()).toEqual(new Set(['client2']));
        });

        it('Should clear all subscriptions when no event is provided', () => {
            const relay = new PubSub();
            relay.subscribe({event1: () => {}}, 'client1');
            relay.subscribe({event2: () => {}}, 'client2');
            relay.clear();
            expect(relay.clientIds().size).toBe(0);
        });

        it('Should not keep storage around if an event is cleared', () => {
            const relay = new PubSub({store: true});
            relay.publish('event', {hello: 'world'});

            let data: unknown = null;
            relay.subscribe({event: val => data = val}, 'client1');
            expect(data).toEqual({hello: 'world'});

            relay.clear('event');

            let data2: unknown = null;
            relay.subscribe({event: val => data2 = val}, 'client1');
            expect(data2).toBeNull();
        });
    });

    describe('logging', () => {
        it('Should log synchronous subscriber errors', () => {
            const now = new Date();
            const logs: LogObject[] = [];
            const logger: LogFn = log => {
                expect(log.on instanceof Date).toBe(true);
                expect(log.on >= now).toBe(true);
                log.on = now;
                logs.push(log);
            };
            const relay = new PubSub({logger});
            relay.subscribe({
                errorEvent: () => {
                    throw new Error('sync error');
                },
            }, 'clientSync');
            relay.publish('errorEvent', 'errorData');
            expect(logs).toEqual([
                {
                    client_id: 'clientSync',
                    data: 'errorData',
                    err: new Error('sync error'),
                    event: 'errorEvent',
                    msg: '[sync] PubSub@publish: sync error',
                    name: 'PubSub',
                    on: now,
                },
            ]);
        });

        it('Should log synchronous subscriber errors and fallback to unknown error', () => {
            const now = new Date();
            const logs: LogObject[] = [];
            const logger: LogFn = log => {
                expect(log.on instanceof Date).toBe(true);
                expect(log.on >= now).toBe(true);
                log.on = now;
                logs.push(log);
            };
            const relay = new PubSub({logger});
            relay.subscribe({
                errorEvent: () => {
                    throw new Error();
                },
            }, 'clientSync');
            relay.publish('errorEvent', 'errorData');
            expect(logs).toEqual([
                {
                    client_id: 'clientSync',
                    data: 'errorData',
                    err: new Error(),
                    event: 'errorEvent',
                    msg: '[sync] PubSub@publish: Unknown Error',
                    name: 'PubSub',
                    on: now,
                },
            ]);
        });

        it('Should log asynchronous subscriber errors', async () => {
            const now = new Date();
            const logs: LogObject[] = [];
            const logger: LogFn = log => {
                expect(log.on instanceof Date).toBe(true);
                expect(log.on >= now).toBe(true);
                log.on = now;
                expect(log.err instanceof Error).toBe(true);
                expect(log.err.message).toBe('async error');
                // @ts-ignore
                delete log.err;
                logs.push(log);
            };
            const relay = new PubSub({logger});
            relay.subscribe({
                asyncError: async () => {
                    throw new Error('async error');
                },
            }, 'clientAsync');
            relay.publish('asyncError', 'errorData');
            await sleep(10);
            expect(logs).toEqual([
                {
                    client_id: 'clientAsync',
                    data: 'errorData',
                    event: 'asyncError',
                    msg: '[async] PubSub@publish: async error',
                    name: 'PubSub',
                    on: now,
                },
            ]);
        });

        it('Should log asynchronous subscriber errors and fallback to unknown error', async () => {
            const now = new Date();
            const logs: LogObject[] = [];
            const logger: LogFn = log => {
                expect(log.on instanceof Date).toBe(true);
                expect(log.on >= now).toBe(true);
                log.on = now;
                expect(log.err instanceof Error).toBe(true);
                expect(log.err.message).toBe('');
                // @ts-ignore
                delete log.err;
                logs.push(log);
            };
            const relay = new PubSub({logger});
            relay.subscribe({
                asyncError: async () => {
                    throw new Error();
                },
            }, 'clientAsync');
            relay.publish('asyncError', 'errorData');
            await sleep(10);
            expect(logs).toEqual([
                {
                    client_id: 'clientAsync',
                    data: 'errorData',
                    event: 'asyncError',
                    msg: '[async] PubSub@publish: Unknown Error',
                    name: 'PubSub',
                    on: now,
                },
            ]);
        });
    });
});
