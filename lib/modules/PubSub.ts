import {isArray} from '../array/is';
import {isFunction} from '../function/is';
import {noop} from '../function/noop';
import {guid} from '../hash/guid';
import {isObject} from '../object/is';
import {isNotEmptyObject} from '../object/isNotEmpty';
import {isNotEmptyString} from '../string/isNotEmpty';

type SyncFn = (data: unknown) => void;
type AsyncFn = (data: unknown) => Promise<void>;
type Fn = SyncFn | AsyncFn;

export type RawEvents = {
    [key: string]: Fn | { run: Fn; once?: boolean }
};

/**
 * Types of Log Object shapes
 */
export type LogObject = {
    name: string;
    event: string;
    client_id: string;
    msg: string;
    on: Date;
    data: unknown;
    err: Error;
};

/**
 * Logger Function type
 */
export type LogFn = (log: LogObject) => void;

type Subscriber = {
    run: Fn;
    once: boolean;
};

type Subscription = {
    value?: unknown;
    subscribers: Map<string, Subscriber>;
};

export type PubSubOptions = {
    /**
     * Custom logger function, will receive an instance of LogObject when an error is thrown
     */
    logger?: LogFn;
    /**
     * Name of the pubsub (used in logs as well)
     */
    name?: string;
    /**
     * Whether or not the default is for the last provided value to be stored. (if not passed = false)
     */
    store?: boolean;
};

class PubSub {

    /* Combined map: each event key maps to an object with a stored value (if any) and its subscribers */
    #subscriptions: Map<string, Subscription> = new Map();

    #name: string = 'PubSub';

    #log: LogFn = noop;

    /* Determines whether published data should be stored by default */
    #store_by_default: boolean = false;

    constructor (options:PubSubOptions = {}) {
        if (!isObject(options)) throw new Error('PubSub@ctor: options should be an object');

        if ('logger' in options) {
            if (!isFunction(options.logger)) throw new Error('PubSub@ctor: logger should be a function');
            this.#log = options.logger;
        }

        if ('name' in options) {
            if (!isNotEmptyString(options.name)) throw new Error('PubSub@ctor: name should be a non-empty string');
            this.#name = options.name.trim();
        }

        if ('store' in options) {
            if (options.store !== true && options.store !== false) throw new Error('PubSub@ctor: store should be a boolean');
            this.#store_by_default = !!options.store;
        }
    }

    /**
     * Getter returning the name of the pubsub.
     */
    get name () {
        return this.#name;
    }

    #publishToSubscriber (event:string, map:Subscription, client_id:string, sub:Subscriber, data?:unknown) {
        try {
            const out = sub.run(data);
            if (sub.once) map.subscribers.delete(client_id);
            if (out && isFunction(out?.catch) && isFunction(out?.then)) {
                Promise.resolve(out).catch(err => {
                    this.#log({
                        name: this.#name,
                        event,
                        client_id,
                        msg: '[async] ' + this.#name + '@publish: ' + ((err as Error)?.message || 'Unknown Error'),
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
                msg: '[sync] ' + this.#name + '@publish: ' + ((err as Error)?.message || 'Unknown Error'),
                on: new Date(),
                data,
                err: err as Error,
            });
        }
    }

    /**
     * Publish data for a specific event.
     *
     * An optional third parameter allows the producer to override the default storage behavior.
     * If storage is enabled, the published data is saved so that new subscribers receive it immediately.
     *
     * @param {string} event - Name of the event.
     * @param {unknown} data - (Optional) Data to publish.
     * @param {boolean?} store - (Optional) Override for storing this event’s data.
     */
    publish (event: string, data?: unknown, store?: boolean) {
        if (!isNotEmptyString(event)) return;

        let entry = this.#subscriptions.get(event);
        const shouldStore = store !== undefined ? store : this.#store_by_default;
        if (!entry) {
            if (!shouldStore) return;

            /* Create a new entry only if storage is enabled; otherwise, there's nothing to do. */
            entry = {value: data, subscribers: new Map()};
            this.#subscriptions.set(event, entry);
        } else if (shouldStore) {
            entry.value = data;
        }

        const entriesArray = [...entry.subscribers.entries()];
        for (const [client_id, client_handler] of entriesArray) {
            this.#publishToSubscriber(
                event,
                entry,
                client_id,
                client_handler,
                data
            );
        }

        /* Remove the event entry entirely if no subscribers remain and we don't want to keep in storage */
        if (!shouldStore && !entry.subscribers.size) this.#subscriptions.delete(event);
    }

    /**
     * Subscribes to one or more events as a client.
     *
     * After adding the subscription, if there is stored data for an event,
     * the new subscriber's callback is immediately invoked with that data.
     *
     * @param {RawEvents} events - Raw Events object to subscribe to.
     * @param {string?} client_id - Optional client id. If not provided one will be generated.
     * @param {boolean?} override - Defaults to true. If false, existing subscriptions for the same event are preserved.
     * @returns Client id if successful, or null for invalid input.
     */
    subscribe (events: RawEvents, client_id?: string, override: boolean = true): string | null {
        if (!isNotEmptyObject(events)) return null;

        const uid = isNotEmptyString(client_id) ? client_id : guid();
        for (const event of Object.keys(events)) {
            const raw_payload = events[event];
            let normalized_payload: { run: Fn; once: boolean } | null = null;
            if (isFunction(raw_payload)) {
                normalized_payload = {run: raw_payload, once: false};
            } else if (isFunction(raw_payload?.run)) {
                normalized_payload = {
                    run: raw_payload.run,
                    once: raw_payload.once === true,
                };
            }
            if (!normalized_payload) continue;

            let entry = this.#subscriptions.get(event);
            if (!entry) {
                entry = {subscribers: new Map(), value: undefined};
                this.#subscriptions.set(event, entry);
            }
            if (override === false && entry.subscribers.has(uid)) continue;
            entry.subscribers.set(uid, normalized_payload);

            /* Immediately deliver stored data if available. */
            if (entry.value !== undefined) {
                this.#publishToSubscriber(event, entry, uid, normalized_payload, entry.value);
            }
        }
        return uid;
    }

    /**
     * Unsubscribes a client from specified event(s) or from all events if none are specified.
     *
     * @param {string} client_id - Client ID to unsubscribe.
     * @param {string|string[]?} event - (Optional) Unsubscribe only from these event(s).
     */
    unsubscribe (client_id: string, event?: string | string[]) {
        if (!isNotEmptyString(client_id)) return;
        const events = isNotEmptyString(event)
            ? [event]
            : isArray(event)
                ? event
                : [...this.#subscriptions.keys()];
        for (let i = 0; i < events.length; i++) {
            const ev = events[i];
            if (!isNotEmptyString(ev)) continue;
            const entry = this.#subscriptions.get(ev);
            if (entry) {
                entry.subscribers.delete(client_id);
                if (!entry.subscribers.size) {
                    this.#subscriptions.delete(ev);
                }
            }
        }
    }

    /**
     * Retrieve the client IDs subscribed to a single, multiple, or all events.
     *
     * @param {string|string[]?} event - Optional event or events array.
     */
    clientIds (event?: string | string[]): Set<string> {
        const events = isNotEmptyString(event)
            ? [event]
            : isArray(event)
                ? event
                : [...this.#subscriptions.keys()];
        const result: Set<string> = new Set();
        for (let i = 0; i < events.length; i++) {
            const entry = this.#subscriptions.get(events[i]);
            if (entry) {
                for (const key of entry.subscribers.keys()) {
                    result.add(key);
                }
            }
        }
        return result;
    }

    /**
     * Clear subscriptions for specific event(s) or all events.
     *
     * @param {string|string[]?} event - Events to clear.
     */
    clear (event?: string | string[]) {
        if (isNotEmptyString(event)) {
            this.#subscriptions.delete(event);
        } else if (isArray(event)) {
            for (let i = 0; i < event.length; i++) {
                const ev = event[i];
                if (isNotEmptyString(ev)) {
                    this.#subscriptions.delete(ev);
                }
            }
        } else {
            this.#subscriptions = new Map();
        }
    }

}

export {PubSub, PubSub as default};
