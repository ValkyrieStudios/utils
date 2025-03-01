import {isArray} from '../array/is';
import {isFunction} from '../function/is';
import {noop} from '../function/noop';
import {guid} from '../hash/guid';
import {isObject} from '../object/is';
import {isNotEmptyObject} from '../object/isNotEmpty';
import {isNotEmptyString} from '../string/isNotEmpty';

type SyncFn = (data:unknown) => void;
type AsyncFn = (data:unknown) => Promise<void>;
type Fn = SyncFn | AsyncFn;

export type RawEvents = {
    [key:string]: Fn|{run:Fn; once?:boolean}
};

/**
 * Types of Log Object shapes
 */
export type LogObject = {
    name:string;
    event:string;
    client_id:string;
    msg:string;
    on:Date;
    data:unknown;
    err:Error;
};

/**
 * Logger Function type
 */
export type LogFn = (log:LogObject) => void;

class PubSub {

    #subscriptions:Map<string, Map<string, {run: Fn; once: boolean}>> = new Map();

    #name:string = 'PubSub';

    #log:LogFn = noop;

    constructor (options:{
        logger?: LogFn;
        name?: string;
    } = {}) {
        if (!isObject(options)) throw new Error('PubSub@ctor: options should be an object');

        if ('logger' in options) {
            if (!isFunction(options.logger)) throw new Error('PubSub@ctor: logger should be a function');
            this.#log = options.logger;
        }

        if ('name' in options) {
            if (!isNotEmptyString(options.name)) throw new Error('PubSub@ctor: name should be a non-empty string');
            this.#name = options.name.trim();
        }
    }

    /**
     * Getter returning the name of the pubsub
     */
    get name () {
        return this.#name;
    }

    /**
     * Publish data for a specific event
     *
     * @param {string} event - Name of the event we're publishing data for
     * @param {unknown} data - (Optional) data we're publishing for the event
     */
    publish (event:string, data?:unknown) {
        if (!isNotEmptyString(event)) return;

        const subscribers = this.#subscriptions.get(event);
        if (!subscribers) return;

        const entries = [...subscribers.entries()];
        for (const [client_id,client_handler] of entries) {
            try {
                const out = client_handler.run(data);
                if (client_handler.once) subscribers.delete(client_id);
                if (out && isFunction(out?.catch) && isFunction(out?.then)) {
                    Promise.resolve(out).catch(err => {
                        this.#log({
                            name: this.#name,
                            event,
                            client_id,
                            msg: '[async] ' + this.#name + '@publish: ' + (err instanceof Error ? err.message : 'Unknown Error'),
                            on: new Date(),
                            data,
                            err: err as Error,
                        });
                    });
                }
            } catch (err) {
                this.#log({
                    name: this.#name,
                    event,
                    client_id,
                    msg: '[sync] ' + this.#name + '@publish: ' + (err instanceof Error ? err.message : 'Unknown Error'),
                    on: new Date(),
                    data,
                    err: err as Error,
                });
            }
        }
        if (!subscribers.size) this.#subscriptions.delete(event);
    }

    /**
     * Subscribes to one or more events as a client.
     *
     * @param {RawEvents} events - Raw Events object to subscribe to
     * @param {string?} client_id - Optional client id. If not provided one will be created and returned for later usage
     * @param {boolean?} override - Optional, defaults to true. If true will override existing subscriptions for the same event
     * @returns null if invalid or client ID (either the provided one OR a generated one)
     */
    subscribe (
        events:RawEvents,
        client_id?:string,
        override:boolean = true
    ):string|null {
        if (!isNotEmptyObject(events)) return null;

        const uid = isNotEmptyString(client_id) ? client_id : guid();
        for (const event of Object.keys(events)) {
            const raw_payload = events[event];
            let normalized_payload:{run:Fn; once: boolean}|null = null;
            if (isFunction(raw_payload)) {
                normalized_payload = {run: raw_payload, once: false};
            } else if (isFunction(raw_payload?.run)) {
                normalized_payload = {
                    run: raw_payload.run,
                    once: raw_payload.once === true,
                };
            }
            if (!normalized_payload) continue;

            const subscribers = this.#subscriptions.get(event);
            if (!subscribers) {
                this.#subscriptions.set(event, new Map([[uid, normalized_payload]]));
            } else {
                if (override === false && subscribers && subscribers.has(uid)) continue;
                subscribers.set(uid, normalized_payload);
            }
        }
        return uid;
    }

    /**
     * Unsubscribes a client
     *
     * @param {string} client_id - Client ID to unsubscribe
     * @param {string|string[]?} event - (Optional) If provided will only unsubscribe the client from the provided event(s)
     */
    unsubscribe (client_id:string, event?:string|string[]) {
        if (!isNotEmptyString(client_id)) return;

        const events = isNotEmptyString(event)
            ? [event]
            : isArray(event)
                ? event
                : [...this.#subscriptions.keys()];
        for (let i = 0; i < events.length; i++) {
            const el = events[i];
            if (!isNotEmptyString(el)) continue;

            const subscribers = this.#subscriptions.get(el);
            if (subscribers) {
                subscribers.delete(client_id);
                if (!subscribers.size) this.#subscriptions.delete(el);
            }
        }
    }

    /**
     * Retrieve the client IDs subscribed to a single, multiple or all events in the pubsub
     *
     * @param {string|string[]?} event - Optional event or events array to get the client ID for
     */
    clientIds (event?:string|string[]):Set<string> {
        const events = isNotEmptyString(event)
            ? [event]
            : isArray(event)
                ? event
                : [...this.#subscriptions.keys()];
        const rslt:Set<string> = new Set();
        for (let i = 0; i < events.length; i++) {
            const subscribers = this.#subscriptions.get(events[i]);
            if (subscribers) {
                const keys = [...subscribers.keys()];
                for (let y = 0; y < keys.length; y++) rslt.add(keys[y]);
            }
        }
        return rslt;
    }

    /**
     * Clear a single, multiple or all subscriptions
     *
     * @param {string|string[]?} event - Events to purge the subscribers for
     */
    clear (event?:string|string[]) {
        if (isNotEmptyString(event)) {
            this.#subscriptions.delete(event);
        } else if (isArray(event)) {
            for (let i = 0; i < event.length; i++) {
                const el = event[i];
                if (isNotEmptyString(el)) this.#subscriptions.delete(el);
            }
        } else {
            this.#subscriptions = new Map();
        }
    }

}

export {PubSub, PubSub as default};
