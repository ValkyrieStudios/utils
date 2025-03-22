import {describe, it} from 'node:test';
import * as assert from 'node:assert/strict';
import {sleep} from '../../../lib/function/sleep';
import {PubSub, type LogFn, type LogObject} from '../../../lib/modules/PubSub';
import CONSTANTS from '../../constants';

describe('Modules - PubSub', () => {
    describe('ctor', () => {
        it('Should throw when passed a non object', () => {
            for (const el of CONSTANTS.NOT_OBJECT) {
                if (el === undefined) continue;
                assert.throws(
                    () => new PubSub(el),
                    new Error('PubSub@ctor: options should be an object')
                );
            }
        });

        it('Should throw when passed a non function logger', () => {
            for (const el of CONSTANTS.NOT_FUNCTION) {
                if (el === undefined) continue;
                assert.throws(
                    () => new PubSub({logger: el}),
                    new Error('PubSub@ctor: logger should be a function')
                );
            }
        });

        it('Should throw when passed a non/empty string name', () => {
            for (const el of CONSTANTS.NOT_STRING_WITH_EMPTY) {
                if (el === undefined) continue;
                assert.throws(
                    () => new PubSub({name: el}),
                    new Error('PubSub@ctor: name should be a non-empty string')
                );
            }
        });

        it('Should throw when passed a non-boolean store', () => {
            for (const el of CONSTANTS.NOT_BOOLEAN) {
                if (el === undefined) continue;
                assert.throws(
                    () => new PubSub({store: el}),
                    new Error('PubSub@ctor: store should be a boolean')
                );
            }
        });

        it('Should have the correct name when passed in the config', () => {
            const relay = new PubSub({name: 'Relay'});
            assert.equal(relay.name, 'Relay');
        });

        it('Should by default be called PubSub', () => {
            const relay = new PubSub();
            assert.equal(relay.name, 'PubSub');
        });
    });

    describe('subscribe & publish', () => {
        it('Should not throw if passed a non/empty string', () => {
            const relay = new PubSub();
            let called:unknown;
            relay.subscribe({
                testEvent: data => called = data,
            });
            for (const el of CONSTANTS.NOT_STRING_WITH_EMPTY) {
                assert.doesNotThrow(
                    () => relay.publish(el)
                );
            }
            assert.ok(called === undefined);
        });

        it('Should be allowed to be called with no data', () => {
            const relay = new PubSub();
            let called:unknown;
            let data:unknown;
            relay.subscribe({
                testEvent: raw_payload => {
                    data = raw_payload;
                    called = true;
                },
            });
            relay.publish('testEvent');
            assert.ok(called);
            assert.ok(data === undefined);
        });

        it('Should call synchronous subscribers on publish', () => {
            let called = false;
            const relay = new PubSub();
            relay.subscribe({
                testEvent: data => {
                    assert.equal(data, 'hello');
                    called = true;
                },
            });
            relay.publish('testEvent', 'hello');
            assert.ok(called, 'Synchronous subscriber should have been called');
        });

        it('Should call asynchronous subscribers on publish', async () => {
            let called = false;
            const relay = new PubSub();
            relay.subscribe({
                asyncEvent: async data => {
                    assert.equal(data, 'asyncHello');
                    called = true;
                },
            });
            relay.publish('asyncEvent', 'asyncHello');
            await sleep(10);
            assert.ok(called, 'Asynchronous subscriber should have been called');
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
            assert.equal(call_count, 1);
        });

        it('Should store for future subscribers when passed store', () => {
            const relay = new PubSub();
            relay.publish('userSettings', {isActive: true}, true);

            let data:unknown = null;
            relay.subscribe({userSettings: val => data = val}, 'client1');
            assert.deepEqual(data, {isActive: true});
            relay.publish('userSettings', {isActive: false}, true);
            assert.deepEqual(data, {isActive: false});

            let data2:unknown = null;
            relay.subscribe({userSettings: val => data2 = val}, 'client2');
            assert.deepEqual(data2, {isActive: false});
        });

        it('Should store for future subscribers AND if an event comes along without store NOT override the value in storage', () => {
            const relay = new PubSub();
            relay.publish('userSettings', {isActive: true}, true);

            let data:unknown = null;
            relay.subscribe({userSettings: val => data = val}, 'client1');
            assert.deepEqual(data, {isActive: true});
            relay.publish('userSettings', {isActive: false}); /* Store not passed so fallback to default */
            assert.deepEqual(data, {isActive: false});

            let data2:unknown = null;
            relay.subscribe({userSettings: val => data2 = val}, 'client2');
            assert.deepEqual(data2, {isActive: true});
        });

        it('store=default: Should store for future subscribers when default on store', () => {
            const relay = new PubSub({store: true});
            relay.publish('userSettings', {isActive: true});

            let data:unknown = null;
            relay.subscribe({userSettings: val => data = val}, 'client1');
            assert.deepEqual(data, {isActive: true});
            relay.publish('userSettings', {isActive: false});
            assert.deepEqual(data, {isActive: false});

            let data2:unknown = null;
            relay.subscribe({userSettings: val => data2 = val}, 'client2');
            assert.deepEqual(data2, {isActive: false});
        });

        it('store=default: Should store for future subscribers AND if event comes without store override the value in storage', () => {
            const relay = new PubSub({store: true});
            relay.publish('userSettings', {isActive: true});

            let data:unknown = null;
            relay.subscribe({userSettings: val => data = val}, 'client1');
            assert.deepEqual(data, {isActive: true});
            relay.publish('userSettings', {isActive: false}); /* Store not passed so fallback to default */
            assert.deepEqual(data, {isActive: false});

            let data2:unknown = null;
            relay.subscribe({userSettings: val => data2 = val}, 'client2');
            assert.deepEqual(data2, {isActive: false});
        });

        it('store=default: Should store for future subscribers AND if event comes along with store:false NOT override storage', () => {
            const relay = new PubSub({store: true});
            relay.publish('userSettings', {isActive: true});

            let data:unknown = null;
            relay.subscribe({userSettings: val => data = val}, 'client1');
            assert.deepEqual(data, {isActive: true});
            relay.publish('userSettings', {isActive: false}, false); /* Store passed as false */
            assert.deepEqual(data, {isActive: false});

            let data2:unknown = null;
            relay.subscribe({userSettings: val => data2 = val}, 'client2');
            assert.deepEqual(data2, {isActive: true});
        });

        it('Should not override existing subscribers if override is passed as false', () => {
            const relay = new PubSub();
            const vals:unknown[] = [];
            const vals2:unknown[] = [];
            const vals3:unknown[] = [];
            const vals4:unknown[] = [];
            relay.subscribe({event: data => vals.push(data)}, 'client1');
            relay.subscribe({event: data => vals3.push(data)}, 'client2');

            relay.publish('event', '1');

            relay.subscribe({event: data => vals2.push(data)}, 'client1', false);
            relay.subscribe({event: data => vals4.push(data)}, 'client2');
            relay.publish('event', '1');

            /* Client 1 should have data only in the first array */
            assert.deepEqual(vals, ['1', '1']);
            assert.deepEqual(vals2, []);

            /* Client 2 should have data in both arrays */
            assert.deepEqual(vals3, ['1']);
            assert.deepEqual(vals4, ['1']);
            assert.deepEqual(relay.clientIds(), new Set(['client1', 'client2']));
        });

        it('Should not throw when passed a non/empty object events', () => {
            const relay = new PubSub();
            assert.deepEqual(relay.clientIds(), new Set());
            for (const el of CONSTANTS.NOT_OBJECT_WITH_EMPTY) {
                assert.doesNotThrow(() => relay.subscribe(el, 'client1'));
            }
            assert.deepEqual(relay.clientIds(), new Set());
        });

        it('Should not subscribe with invalid payloads', () => {
            const relay = new PubSub();
            assert.deepEqual(relay.clientIds(), new Set());
            for (const el of CONSTANTS.NOT_FUNCTION) {
                relay.subscribe({
                    event: el,
                }, 'client1');
            }
            assert.deepEqual(relay.clientIds(), new Set());
            relay.subscribe({
                event: () => {},
            }, 'client1');
            assert.deepEqual(relay.clientIds(), new Set(['client1']));
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
            assert.ok(!called, 'Unsubscribed client should not be called');
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
            assert.equal(call_count1, 0, 'Client should not receive event1 after unsubscribe');
            assert.equal(call_count2, 1, 'Client should still receive event2');
        });

        it('Should not do anything if passed a non/emtpy string client id', () => {
            const relay = new PubSub();
            relay.subscribe({event: () => {}}, 'client1');
            relay.subscribe({event: () => {}}, 'client2');
            relay.subscribe({event2: () => {}}, 'client1');
            relay.subscribe({event2: () => {}}, 'client3');
            relay.subscribe({event3: () => {}}, 'client3');
            assert.deepEqual(relay.clientIds(), new Set(['client1', 'client2', 'client3']));
            for (const el of CONSTANTS.NOT_STRING_WITH_EMPTY) {
                relay.unsubscribe(el, 'event');
            }
            assert.deepEqual(relay.clientIds(), new Set(['client1', 'client2', 'client3']));
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
            assert.deepEqual(relay.clientIds(), new Set(['client1', 'client2', 'client3']));
            assert.deepEqual(relay.clientIds('event3'), new Set(['client1', 'client2', 'client3']));
            assert.deepEqual(relay.clientIds('event2'), new Set(['client2', 'client3']));
            assert.deepEqual(relay.clientIds('event'), new Set(['client2', 'client3']));
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
            assert.deepEqual(relay.clientIds(), new Set(['client1', 'client2', 'client3']));
            assert.deepEqual(relay.clientIds('event3'), new Set(['client1', 'client2', 'client3']));
            assert.deepEqual(relay.clientIds('event2'), new Set(['client2', 'client3']));
            assert.deepEqual(relay.clientIds('event'), new Set(['client2', 'client3']));
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
            assert.deepEqual(relay.clientIds(), new Set(['client1', 'client2', 'client3']));
            assert.deepEqual(relay.clientIds('event3'), new Set(['client1', 'client2', 'client3']));
            assert.deepEqual(relay.clientIds('event2'), new Set(['client1', 'client2', 'client3']));
            assert.deepEqual(relay.clientIds('event'), new Set(['client1', 'client2', 'client3']));
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
            assert.deepEqual(relay.clientIds(), new Set(['client1', 'client2', 'client3']));
        });

        it('Should give correct client IDs for a specific event', () => {
            const relay = new PubSub();
            relay.subscribe({event: () => {}}, 'client1');
            relay.subscribe({event: () => {}}, 'client2');
            relay.subscribe({event2: () => {}}, 'client1');
            relay.subscribe({event2: () => {}}, 'client3');
            relay.subscribe({event3: () => {}}, 'client3');
            assert.deepEqual(relay.clientIds('event2'), new Set(['client1', 'client3']));
            assert.deepEqual(relay.clientIds('event'), new Set(['client1', 'client2']));
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
            assert.deepEqual(relay.clientIds(['event', 'event2']), new Set(['client1', 'client2', 'client3']));
            assert.deepEqual(relay.clientIds(['event', 'event4']), new Set(['client1', 'client2', 'client3', 'client4']));
            assert.deepEqual(relay.clientIds(['event2', 'event4']), new Set(['client1', 'client3', 'client4']));
            assert.deepEqual(relay.clientIds([]), new Set());
        });

        it('Should return an empty set if passed nothing on an empty relay', () => {
            const relay = new PubSub();
            assert.deepEqual(relay.clientIds(), new Set());
            relay.subscribe({event: () => {}}, 'client1');
            assert.deepEqual(relay.clientIds('event2'), new Set());
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
            assert.ok(!called);
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
            assert.ok(!called);
            relay.publish('event2');
            assert.ok(!called);
            relay.publish('event3');
            assert.ok(called);
            assert.deepEqual(relay.clientIds(), new Set(['client2']));
        });

        it('Should clear all subscriptions when no event is provided', () => {
            const relay = new PubSub();
            relay.subscribe({event1: () => {}}, 'client1');
            relay.subscribe({event2: () => {}}, 'client2');
            relay.clear();
            const all_ids = relay.clientIds();
            assert.equal(all_ids.size, 0);
        });

        it('Should not keep storage around if an event is cleared', () => {
            const relay = new PubSub({store: true});
            relay.publish('event', {hello: 'world'});

            let data:unknown = null;
            relay.subscribe({event: val => data = val}, 'client1');
            assert.deepEqual(data, {hello: 'world'});

            relay.clear('event');

            let data2:unknown = null;
            relay.subscribe({event: val => data2 = val}, 'client1');
            assert.equal(data2, null);
        });
    });

    describe('logging', () => {
        it('Should log synchronous subscriber errors', () => {
            const now = new Date();
            const logs: LogObject[] = [];
            const logger: LogFn = (log: LogObject) => {
                assert.ok(log.on instanceof Date);
                assert.ok(log.on >= now);
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
            assert.deepEqual(logs, [
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
            const logger: LogFn = (log: LogObject) => {
                assert.ok(log.on instanceof Date);
                assert.ok(log.on >= now);
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
            assert.deepEqual(logs, [
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
            const logger: LogFn = (log: LogObject) => {
                assert.ok(log.on instanceof Date);
                assert.ok(log.on >= now);
                log.on = now;
                assert.ok(log.err instanceof Error);
                assert.equal(log.err.message, 'async error');
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
            assert.deepEqual(logs, [
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
            const logger: LogFn = (log: LogObject) => {
                assert.ok(log.on instanceof Date);
                assert.ok(log.on >= now);
                log.on = now;
                assert.ok(log.err instanceof Error);
                assert.equal(log.err.message, '');
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
            assert.deepEqual(logs, [
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
