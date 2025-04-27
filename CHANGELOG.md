# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) and this project adheres to [Semantic
Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Improved
- **perf**: Improved on barrel export approach for some most-used parts allowing for better tree-shaking
- **deps**: Upgrade @types/node to 22.15.2
- **deps**: Upgrade eslint to 9.25.1
- **deps**: Upgrade typescript to 5.8.3
- **deps**: Upgrade typescript-eslint to 8.31.0

## [12.35.0] - 2025-03-22
### Added
- **feat** modules/Scheduler - A lightweight Scheduler module
Supports baseline operation:
```typescript
import { Scheduler } from '@valkyriestudios/utils/modules/Scheduler';
import * as Handlers from "..."; /* Example methods */

const mySchedule = new Scheduler({name: 'MyScheduler'});

mySchedule.add({schedule: '0 * * * *', name: 'send_emails', fn: Handlers.SendEmails});
mySchedule.add({schedule: '0 */3 * * *', name: 'cleanup', fn: Handlers.Cleanup});
mySchedule.add({schedule: '0,15,30,45 * * * *', name: 'synchronize', fn: Handlers.Synchronize});
await mySchedule.run();
```

Let's say you need to send something out in different timezones:
```typescript
import { Scheduler } from '@valkyriestudios/utils/modules/Scheduler';
import * as Handlers from "..."; /* Example methods */

...

const mySchedule = new Scheduler({name: 'MyScheduler'});

/* This is an example */
for (const user of users) {
    mySchedule.add({
        schedule: '0 * * * *',
        name: 'send_emails',
        fn: Handlers.SendEmail,
        timeZone: user.timeZone, /* Given a user has a timezone */
    });
}

await mySchedule.run();
```

Too much flooding! let's turn off parallelization and have it run them in linear fashion:
```typescript
import { Scheduler } from '@valkyriestudios/utils/modules/Scheduler';
import * as Handlers from "..."; /* Example methods */

...

const mySchedule = new Scheduler({
    name: 'MyScheduler',
    parallel: false, /* By setting parallel to false we will ensure one at a time */
});

/* This is an example */
for (const user of users) {
    mySchedule.add({
        schedule: '0 * * * *',
        name: 'send_emails',
        fn: Handlers.SendEmail,
        timeZone: user.timeZone, /* Given a user has a timezone */
    });
}

await mySchedule.run();
```

Okay we can actually send 3 at a time, let's set that up:
```typescript
import { Scheduler } from '@valkyriestudios/utils/modules/Scheduler';
import * as Handlers from "..."; /* Example methods */

...

const mySchedule = new Scheduler({
    name: 'MyScheduler',
    parallel: 3, /* By setting parallel to a specific integer above 0 we will run X jobs in parallel at a time */
});

/* This is an example */
for (const user of users) {
    mySchedule.add({
        schedule: '0 * * * *',
        name: 'send_emails',
        fn: Handlers.SendEmail,
        timeZone: user.timeZone, /* Given a user has a timezone */
    });
}

await mySchedule.run();
```

Oh no the emails aren't going out to the right user because we didn't pass our data:
```typescript
import { Scheduler } from '@valkyriestudios/utils/modules/Scheduler';
import * as Handlers from "..."; /* Example methods */

...

const mySchedule = new Scheduler({
    name: 'MyScheduler',
    parallel: 3,
});

/* This is an example */
for (const user of users) {
    mySchedule.add({
        schedule: '0 * * * *',
        name: 'send_emails',
        fn: Handlers.SendEmail,
        timeZone: user.timeZone, /* Given a user has a timezone */
        data: user, /* You will have automatic type hinting on this with the first val of SendEmail handler */
    });
}

await mySchedule.run();
```

I want this to run continuously so that I can just leave it running on a server:
```typescript
import { Scheduler } from '@valkyriestudios/utils/modules/Scheduler';
import * as Handlers from "..."; /* Example methods */

...

const mySchedule = new Scheduler({
    name: 'MyScheduler',
    parallel: 3,
    auto: true, /* By enabling this the schedule will automatically check once per minute which ones it needs to run */
});

/* This is an example */
for (const user of users) {
    mySchedule.add({
        schedule: '0 * * * *',
        name: 'send_emails',
        fn: Handlers.SendEmail,
        timeZone: user.timeZone,
        data: user,
    });
}

await mySchedule.run();
```

### Improved
- **date/format**: Add support for 'ISO' as spec alias this is a shorthand for `YYYY-MM-DD[T]HH:mm:ss.SSS[Z]` as spec
- **array/mapFn**: Now supports passing a `transform_fn` as part of the options to also transform the objects that eventually end up in the map (Take Note that the output still needs to be an object)
- **array/mapFnAsMap**: Now supports passing a `transform_fn` as part of the options to also transform the objects that eventually end up in the map (Take Note that the output still needs to be an object)
- **array/mapKey**: Now supports passing a `transform_fn` as part of the options to also transform the objects that eventually end up in the map (Take Note that the output still needs to be an object)
- **array/mapKeyAsMap**: Now supports passing a `transform_fn` as part of the options to also transform the objects that eventually end up in the map (Take Note that the output still needs to be an object)
- **deps**: Upgrade @types/node to 22.13.11
- **deps**: Upgrade eslint to 9.23.0
- **deps**: Upgrade typescript-eslint to 8.27.0

## [12.34.0] - 2025-03-08
### Added
- **feat**: `array/mapFnAsMap` (this has the same behavior as `array/mapFn` but returns a Map instead of an object, Maps were not prevalent back when these functions were originally written)
```typescript
import {mapFnAsMap} from "@valkyriestudios/utils/array";

mapFnAsMap([{uid: 12, name: 'Peter'}, {uid: 15, name: 'Jonas'}], el => el.uid);

/* Output */
new Map([
    [12, {uid: 12, name: 'Peter'}],
    [15, {uid: 15, name: 'Jonas'}],
]);
```
- **feat**: `array/mapKeyAsMap` (this has the same behavior as `array/mapKey` but returns a Map instead of an object, Maps were not prevalent back when these functions were originally written)
```typescript
import {mapKeyAsMap} from "@valkyriestudios/utils/array";

mapKeyAsMap([{uid: 12, name: 'Peter'}, {uid: 15, name: 'Jonas'}], 'uid');

/* Output */
new Map([
    [12, {uid: 12, name: 'Peter'}],
    [15, {uid: 15, name: 'Jonas'}],
]);
```

### Improved
- **dx**: array/mapKey will now infer the type of the provided key as needing to be a key of the objects in the array being mapped
```typescript
const arr = [
    {uid: '123', name: 'Peter', isActive: true, lastName: 'V'},
    {uid: '456', name: 'Jake', isActive: false},
];

/* Good */
const map = mapKey(arr, 'uid', {filter_fn: el => el.isActive});

/* Good as lastName exists on our objects  */
const map = mapKey(arr, 'lastName', {filter_fn: el => el.isActive});

/* Bad as 'oid' does not exist on our arr, typescript will hint for this */
const map = mapKey(arr, 'oid', {filter_fn: el => el.isActive});
```
- **dx**: Reduce internal overloads in object/merge to allow easier typing
- **deps**: Upgrade @types/node to 22.13.10
- **deps**: Upgrade eslint to 9.22.0
- **deps**: Upgrade typescript to 5.8.2
- **deps**: Upgrade typescript-eslint to 8.26.0

## [12.33.1] - 2025-03-02
### Fixed
- Fix issue where new PubSub module is not part of package exports section

## [12.33.0] - 2025-03-02
### Added
- **feat** modules/PubSub - A lightweight publish-subscribe module
Simple fire-and-foreget without storage:
```typescript
import { PubSub } from '@valkyriestudios/utils/modules/PubSub';

const relay = new PubSub({ name: 'MyPubSub', store: true });

/* Subscribe to events. */
relay.subscribe({
  onDataUpdate: (data) => ...,
  onModalOpen: (...) => ...,
}, 'client1');

/* Subscribe to events. */
const client2 = relay.subscribe({
  onUserUpdate: (...) => ...,
}); /* If not passing a client id a client id will be generated and returned */

/* Publish events. Since storage is enabled, the data is saved */
relay.publish('onDataUpdate', {foo: 'bar'});
relay.publish('onUserUpdate', {language: 'nl'});

/* When not necessary anymore */
relay.unsubscribe(client2);
```

In-Memory storage included:
```typescript
import { PubSub } from '@valkyriestudios/utils/modules/PubSub';

/* Create a PubSub instance that stores published data by default */
const relay = new PubSub({ name: 'MyPubSub', store: true });

/* Subscribe to events. */
relay.subscribe({
  dataUpdate: (data) => console.log('Subscriber 1 received dataUpdate:', data),
  /* This event will automatically unsubscribe after the first time its called */
  onceEvent: {
    run: (data) => console.log('This runs only once:', data),
    once: true,
  },
}, 'client1');

/* Publish events. Since storage is enabled, the data is saved */
relay.publish('dataUpdate', { foo: 'bar' });
relay.publish('onceEvent', 'only once');

/* Later, a new subscriber immediately gets the last published value */
relay.subscribe({
  dataUpdate: (data) => console.log('Late subscriber received dataUpdate:', data)
}, 'client2');
```

### Improved
- **feat**: deep/get is now even more powerful and can fetch lists of information from multiple levels of deeply nested object arrays, eg:
```typescript
deepGet({
    deepNestedArray: [
        {list: [
            {users: [{id: 123}, {id: 234}]},
            {users: [{id: 345}, {id: 456}]},
        ]},
        {list: [
            {users: [{id: 567}, {id: 678}]},
        ]},
        {list: [
            {users: [{id: 789}, {id: 890}]},
        ]},
    ],
}, 'deepNestedArray.list.users.id');

// Output: [123, 234, 345, 456, 567, 678, 789, 890]

deepGet({
    deepNestedArray: [
        {list: [
            {users: [{id: 123}, {id: 234}]},
            {users: [{id: 345}, {id: 456}]},
        ]},
        {list: [
            {users: [{job: 'Engineer'}, {id: 678}]},
        ]},
        {list: [
            {users: [{id: 789}, {id: 890}]},
        ]},
    ],
}, 'deepNestedArray.list.users.id');

// Output: [123, 234, 345, 456, 678, 789, 890]

deepGet({
    deepNestedArray: [
        {list: [
            {users: [{id: 123}, {id: 234}]},
            {users: [{id: 345}, {id: 456}]},
        ]},
        {list: [
            {users: [{job: 'Engineer'}, {id: 678}]},
        ]},
        {list: [
            {users: [{id: 789}, {id: 890}]},
        ]},
    ],
}, 'deepNestedArray.list.users.job');

// Output: ['Engineer']

deepGet({
    deepNestedArray: [
        {list: [
            {users: [{id: 123}, {id: 234}]},
            {users: [{id: 345}, {id: 456}]},
        ]},
        {list: [
            {users: [{job: 'Engineer'}, {id: 678}]},
        ]},
        {list: [
            {users: [{id: 789}, {id: 890}]},
        ]},
    ],
}, 'deepNestedArray.list.users');

//  Output: [{id: 123}, {id: 234}, {id: 345}, {id: 456}, {job: 'Engineer'}, {id: 678}, {id: 789}, {id: 890}]

deepGet({
    deepNestedArray: [
        {list: [
            {users: [{id: 123}, {id: 234}]},
            {users: [{id: 345}, {id: 456}]},
        ]},
        {list: [
            {users: [{job: 'Engineer'}, {id: 678}]},
        ]},
        {list: [
            {users: [{id: 789}, {id: 890}]},
        ]},
    ],
}, 'deepNestedArray.list.users.isActive');

//  Output: undefined
```

## [12.32.0] - 2025-02-27
### Improved
- **dx**: The return type for `object/merge` is now correctly computed as the merge of the provided objects and will no longer be `Record<string, any>`
```typescript
/* Non-union merge */
const out = merge(
    {first_name: "Valkyrie", last_name: null},
    {first_name: "Valkyrie", last_name: "Studios", secret: true}
);
// Resulting type is: {first_name:string; last_name: string}

/* Union merge */
const out = merge(
    {first_name: "Valkyrie", last_name: null},
    {last_name: "Studios", secret: true},
    {union: true}
);
// Resulting type is: {first_name: string; last_name: string; secret: boolean}

/* Array Non-union merge */
const out = merge(
    {a: null},
    [{a: 2, b: null}, {a: false}]
);
// Resulting type is {a: boolean}

/* Array Union merge */
const out = merge(
    {
        first_name: 'Valkyrie',
        last_name: 'Studios',
        details: {isEnabled: true}
    },
    [
        {details: {isEnabled: true, isActive: true}},
        {email: 'contact@valkyriestudios.be'},
    ],
    {union: true}
);
// Resulting type is  {
//    first_name: string;
//    last_name: string;
//    email: string;
//    details: {
//      isEnabled: boolean;
//      isActive: boolean;
//    }
// }
```
- **perf**: ~35-40% performance improvement in `formdata/toObject` thanks to simplification of internal operations
- **deps**: Upgrade @types/node to 22.13.5
- **deps**: Upgrade eslint to 9.21.0
- **deps**: Upgrade typescript-eslint to 8.25.0

## [12.31.1] - 2025-02-05
### Fixed
- **misc**: Add missing require/import split for ./array

## [12.31.0] - 2025-02-05
### Improved
- **misc**: Split up exports block in require/import behavior to also support cjs/esm diff

## [12.30.0] - 2025-02-04
### Improved
- **misc**: package file now contains an exports block
- **feat**: deep/get now supports extracting a prop from a nested array as an array of values. Eg:
```typescript
const val = {
    hello: true,
    list: [
        {id: '123', name: 'User 1'},
        {id: '456', name: 'User 2'},
        {id: '789', name: 'User 3'},
    ],
};

deepGet(val, 'list.name'); // ['User 1', 'User 2', 'User 3']
deepGet(val, 'list.id'); // ['123', '456', '789']

// Other behavior is of course still supported
deepGet(val, 'list[0].id'); // '123'
deepGet(val, 'list[2].id'); // '789'
deepGet(val, 'list[0].foo'); // undefined
deepGet(val, 'list[2].name'); // 'User 3'
```
- **deps**: Upgrade @types/node to 22.13.1
- **deps**: Upgrade eslint to 9.19.0
- **deps**: Upgrade typescript to 5.7.3
- **deps**: Upgrade typescript-eslint to 8.23.0

## [12.29.0] - 2024-11-30
### Improved
- **perf**: Minor ~5-15% performance improvement in `deepGet` thanks to reduced internal operations
- **deps**: Upgrade @types/node to 22.10.1
- **deps**: Upgrade eslint to 9.16.0
- **deps**: Upgrade typescript to 5.7.2
- **deps**: Upgrade typescript-eslint to 8.16.0

## [12.28.0] - 2024-11-17
### Added
- **feat**: caching/LRU as an implementation of a Least-Recently-Used cache which is both internally used inside of utils as well as can be individually instantiated.
```typescript
import LRU from '@valkyriestudios/utils/caching/LRU';

const cache = new LRU({max_size: 10});

/* .set sets a value */
cache.set('hello', 'World');

/* .has checks if a value exists */
cache.has('hello'); // true
cache.has('holle'); // false

/* .get retrieves the value */
console.log(cache.get('hello')); // world

/* .del deletes a key */
cache.del('hello');
console.log(cache.get('hello')); // undefined

/* .clear clears the entire cache */
cache.clear();
```
- **feat**: array/join now has a `dedupe` option which when passed as true will automatically dedupe the array while joining
```typescript
import {join} from "@valkyriestudios/utils/array";
join(['prop_1', 'prop_2', ' prop_1', 'prop_3 ', ' prop_3'], {
    delim: '|',
    dedupe: true,
}); /* 'prop_1|prop_2|prop_3' */
```
- **feat**: caching/memoize now has a `cache_max_size` option which allows (in addition to the cache_duration_ms option) you to define the max amount of cached entries at any one time in the memoized cache `(default=100)`
```typescript
import {memoize} from "@valkyriestudios/utils/caching";

/**
 * Example usage where we're defining a memoized async function which memoizes values
 * up to 60 seconds with at max 50 entries in the cache
 */
const retrieveUser = memoize(async (userId:string) => {
    ... (your logic)
}, undefined, 60000, 50);

await retrieveUser('123abc');
```

### Improved
- **perf**: date/isFormat now makes use of the new LRU cache to ensure no unwanted memory buildup happens over time
- **perf**: date/format now makes use of the new LRU cache to ensure no unwanted memory buildup happens over time
- **perf**: caching/memoize now makes use of the new LRU cache to ensure no unwanted memory buildup happens over time
- **perf**: caching/memoize now runs more efficient internal cache checks (aside from lru) to determine whether or not to refresh value
- **deps**: Upgrade @types/node to 22.9.0
- **deps**: Upgrade eslint to 9.14.0
- **deps**: Upgrade typescript-eslint to 8.13.0
- **misc**: Benchmarks are now run against node 22.x

## [12.27.1] - 2024-11-03
### Fixed
- **fix**: object/omit now correctly omits below 3 levels

## [12.27.0] - 2024-11-03
### Improved
- **feat**: Add barrel export for omit on @valkyriestudios/utils/object

## [12.26.0] - 2024-11-03
### Added
- **feat**: `object/omit` as a function which is the reverse of `object/pick` in that it returns an object with the provided keys removed while also returning a proper type for the new object
```typescript
import { omit } from "@valkyriestudios/utils/object"; /* Or @valkyriestudios/utils/object/omit; */
const redacted = omit({
    firstName: "Peter",
    lastName: "Vermeulen",
    age: 34,
    details: {
        phone: "...",
        email: "...",
        isActive: true,
        password: "...",
    },
}, ["age", "details.phone", "details.email", "details.password"]);
/**
Redacted here will be:
{firstName: "Peter", lastName: "Vermeulen", "details": {"isActive": true}}

Its type will be
{firstName: string; lastName: string; details: {isActive: boolean}}
*/
```

### Improved
- **deps**: Upgrade @types/node to 22.8.7
- **deps**: Upgrade eslint to 9.14.0
- **deps**: Upgrade typescript to 5.6.3
- **deps**: Upgrade typescript-eslint to 8.12.2

## [12.25.1] - 2024-10-06
### Fixed
- **date/format**: Fixed an edge case issue where the result would be wrong if the output of a token formatter contains another token that was also part of the passed spec

## [12.25.0] - 2024-10-05
### Added
- **feat**: `date/isFormat` now supports optional markers
```typescript
import isFormat from '../../../lib/date/isFormat';
isFormat('2024-02-07', 'YYYY-MM-DD{THH:mm:ss}'); // true
isFormat('2024-02-07T14:50', 'YYYY-MM-DD{THH:mm:ss}'); // false as optional part is passed but invalid
isFormat('2024-02-07T14:50:30', 'YYYY-MM-DD{THH:mm:ss}'); // true
isFormat('2024-02-07T14:20:25', 'YYYY-MM-DDTHH:mm:ss{.SSS}{Z}'); // true
isFormat('2024-02-07T14:20:25.123Z', 'YYYY-MM-DDTHH:mm:ss{.SSS}{Z}'); // true (zone and milliseconds passed)
isFormat('2024-02-07T14:20:25-05:00', 'YYYY-MM-DDTHH:mm:ss{.SSS}{Z}'); // true (zone passed but no millseconds)
```
- **feat**: `formdata/toObject` now supports a `normalize_bool` flag, set to false to NOT normalize boolean values
- **feat**: `formdata/toObject` now supports a `normalize_date` flag, set to false to NOT normalize date values
- **feat**: `formdata/toObject` now supports a `normalize_number` flag, set to false to NOT normalize number values
- **feat**: `array/mapKey` now supports a `filter_fn` prop which can be used to further filter the array at O(n) time
```typescript
import mapKey from '@valkyriestudios/utils/array/mapKey';
mapKey([
    {uid: 12, name: 'Peter', isActive: true},
    'foobar',
    {uid: 15, name: 'Jonas', dob: '2022-02-07'},
    [{hi: 'there'}],
    {uid: 15, name: 'Bob', isActive: true},
    {name: 'Alana'},
    {uid: 87, name: 'Josh'},
    {uid: 12, name: 'Farah', isActive: false},
], 'uid', {filter_fn: el => el?.isActive});
/* {
    12: {uid: 12, name: 'Peter', isActive: true},
    15: {uid: 15, name: 'Bob', isActive: true},
} */
```
- **feat**: `array/mapPrimitive` now supports a `filter_fn` prop which can be used to further filter the array at O(n) time
```typescript
import mapPrimitive from '@valkyriestudios/utils/array/mapPrimitive';
mapPrimitive(
    ['  hello   ', 'hello  ', {a: 1}, new Date(), 10, ' foo', 'bar'],
    {valtrim: true, filter_fn: isString}
),
/* {
    hello: 'hello',
    foo: 'foo',
    bar: 'bar',
} */
```

### Improved
- **feat**: `date/isFormat` the built-in alias `ISO` now treats milliseconds as optional
```typescript
isFormat('2024-02-07T14:20:25.123Z', 'ISO'); // true
isFormat('2024-02-07T14:20:25Z', 'ISO'); // true
isFormat('2024-02-07T14:20:25', 'ISO'); // false, missing zone
```
- **feat**: `formdata/toObject` now normalizes valid date strings in ISO format (YYYY-MM-DDTHH:mm:ss{.SSS}Z) to Date instances
```typescript
const frm = new FormData();
frm.append('startDate', '2023-12-25T09:00:00Z');
frm.append('endDate', '2023-12-31T12:00:00.987Z');
toObject(frm); /* {
    startDate: new Date('2023-12-25T09:00:00Z'),
    endDate: new Date('2023-12-31T12:00:00.987Z'),
} */
```
- **feat**: `equal` now supports map equality checks
```typescript
import {equal} from "@valkyriestudios/utils/equal";
const map1 = new Map([["a", 1], ["b", 2]]);
const map2 = new Map([["b", 2], ["a", 1]]);
const map3 = new Map([["a", 1], ["b", [0, 1]]]);
equal(map1, map2); // true
equal(map1, map3); // false
```
- **feat**: `array/mapFn` will now perform union merges instead of just spreading when passing merge as true
- **feat**: `array/mapKey` will now perform union merges instead of just spreading when passing merge as true
- **perf**: Up to 60%% performance improvement in equal thanks to adjusted approach regarding type checks and as such keeping internal operations to a minimum
- **deps**: Upgrade eslint to 9.12.0
- **deps**: Upgrade typescript-eslint to 8.8.0

### Fixed
- **date/format**: Fixed issue where millisecond information got lost in zone-conversion thanks @florDonnaSanders

## [12.24.0] - 2024-09-29
### Added
- **deps**: typescript-eslint (dev dep)

### Improved
- **dx**: object/pick now has a typed return which is the result of the keys picked off of the object
```typescript
const obj = {
    a: 1,
    b: false,
    c: "Hello",
    d: {
        e: "world,
        f: [1, 2, 3],
    },
};

/* The type of obj2 is now {a: number; d: {f: number[]}} */
const obj2 = pick(obj, ["a", "d.f"]);
```
- **feat**: date/addUTC now accepts both a date and a date string
- **feat**: date/diff now accepts both a date and a date string
- **feat**: date/endOfUTC now accepts both a date and a date string
- **feat**: date/isLeap now accepts both a date and a date string
- **feat**: date/format now accepts both a date and a date string
- **feat**: date/setTimeUTC now accepts both a date and a date string
- **feat**: date/startOfUTC now accepts both a date and a date string
- **perf**: Minor ~3-5% performance improvement in setTimeUTC thanks to reduced internal key lookups
- **perf**: Minor ~3-5% performance improvement in startOfUTC thanks to reduced internal operations
- **deps**: Upgrade eslint to 9.11.1
- **deps**: Upgrade nyc to 17.1.0
- **deps**: Upgrade typescript to 5.6.2
- **deps**: Upgrade @types/node to 20.16.10

### Removed
- **deps**: @typescript-eslint/eslint-plugin
- **deps**: @typescript-eslint/parser

## [12.23.0] - 2024-09-16
### Added
- **feat**: formdata/toObject now allows the 'single' option, which is a config that allows you to ensure a value does NOT get converted into an array but only the last entry remains. For Example:
```typescript
const formData = new FormData();
formData.append('status', 'active');
formData.append('status', 'inactive');
formData.append('action', 'save');
formData.append('action', 'reset');

toObject(formData, { single: ['status', 'action'] }) /* {status: 'inactive', action: 'reset'} */

/* Without single */
toObject(formData) /* {status: ['active', 'inactive'], action: ['save', 'reset']} */
```
- **feat**: formdata/toObject now allows the 'raw' option to be passed as true, if passing as true no normalization will take place of values. For Example:
```typescript
const formData = new FormData();
formData.append('count', '20');
formData.append('isValid', 'true');
formData.append('rawString', '10');
formData.append('rawBoolean', 'false');

toObject(formData, {raw: true}) /* {
    count: '20',
    isValid: 'true',
    rawString: '10',
    rawBoolean: 'false',
} */
```

### Improved
- **feat**: hash/fnv1A now exports two constants `FNV_32` and `FNV_64` which are respectively the primes used for 32-bit and 64-bit fnv computation (fnv1A defaults to using the 32-bit version)

## [12.22.0] - 2024-09-07
### Improved
- **feat**: formdata/toObject will now convert strings to booleans where possible (eg: 'true' => true, 'false' => false)
- **feat**: formdata/toObject will now convert strings to numbers where possible (eg: '12345' => 12345, '  045 ' => 45)
- **feat**: formdata/toObject will now convert strings to deeply nested structures (eg: 'user[0].name', 'user[0].age' will become an array with a user
    object with name and age)
- **feat**: formdata/toObject now supports an additional parameters to determine keys in the formdata that should **not** be normalized
```typescript
const form = new FormData();
form.append('user[0].name', 'Alice');
form.append('user[1].age', '25');
form.append('enabled', 'false');
form.append('config.isGood', 'true');
form.append('config.amount', ' 50 ');

toObject(form); /* {
    user: [
        {name: 'Alice'},
        {age: 25},
    ],
    enabled: false,
    config: {
        isGood: true,
        amount: 50,
    },
} */
```

```typescript
const form = new FormData();
form.append('mixedArray', '123');
form.append('mixedArray', 'true');
form.append('mixedArray', 'hello');

toObject(form); /* {
    mixedArray: [123, true, 'hello'],
} */
```

```typescript
const form = new FormData();
form.append('config.isEnabled', 'true');
form.append('config.port', '8080');
form.append('config.rawKey', '123');  // should remain a string

toObject(form, {raw: ['config.rawKey']}); /* {
    config: {
        isEnabled: true,   // 'true' should be converted to boolean
        port: 8080,        // '8080' should be converted to number
        rawKey: '123',     // '123' should remain a string
    },
} */
```

## [12.21.0] - 2024-09-07
### Added
- **feat**: formdata/toObject as utility function which converts a FormData instance to an object
```typescript
import {toObject} from "@valkyriestudios/utils/formdata";
const form = new FormData();
form.append('name', 'Alice');
form.append('hobbies', 'reading');
form.append('hobbies', 'writing');
form.append('emptyField', '');

toObject(form); // {name: 'Alice', hobbies: ['reading', 'writing'], emptyField: ''}
```
- **feat**: date/isLeap as utility function which returns true/false if the passed date is in a leap year or not
```typescript
import {isLeap} from "@valkyriestudios/utils/date/isLeap";
isLeap(new Date("2022-02-07T14:30:59.000Z")); // false
isLeap(new Date("2024-02-07T14:30:59.000Z")); // true
```
- **feat**: date/format now supports `WW` and `W` tokens to allow rendering week numbers in formatted strings (WW is 0-prefixed to ensure 2 digits)
```
import {format} from "@valkyriestudios/utils/date/format";
format(new Date('2023-10-31T00:00:00Z'), "WW"); // '44'
format(new Date('2026-12-31T00:00:00Z'), "W"); // '53'

// With start of week
format(new Date('2023-01-01T00:00:00Z'), 'WW', 'en', 'UTC', 'sun'); // '01'
format(new Date('2023-12-31T00:00:00Z'), 'WW', 'en', 'UTC', 'sun'); // '53'
```
- **feat**: date/format@getLocale as a new function which returns the current default locale in use by date/format
- **feat**: date/format@getZone as a new function which returns the current default time zone in use by date/format
- **feat**: date/format@getStartOfWeek as a new function which returns the current default start of week in use by date/format
```typescript
import {format} from "@valkyriestudios/utils/date/format";
format.getLocale(); // 'en-us'
format.getZone(); // 'UTC'
format.getStartOfWeek(); // 'mon'
```
- **feat**: date/format@setLocale as a new function which allows you to globally adjust the default locale in use by date/format
- **feat**: date/format@setZone as a new function which allows you to globally adjust the default time zone in use by date/format (**Take Note:** The zone of the client is used by default, as such in many cases this will not need to be set manually)
- **feat**: date/format@setStartOfWeek as a new function which allows you to globally adjust the default start of week in use by date/format
```typescript
import {format} from "@valkyriestudios/utils/date/format";
format.setLocale("nl-be");
format.setStartOfWeek("sun");
format.setZone("America/New_York");

... (somewhere in your code, not necessarily the same file)

format(new Date("2022-08-17T08:55:15Z", "dddd DD MMMM YYYY H:mm:ss")); // "woensdag 17 augustus 2022 4:55:15"

/* Take Note: You can still pass these options separately to get the same result */
format(new Date("2022-08-17T08:55:15Z", "[week:]WW dddd DD MMMM YYYY H:mm:ss", "nl-be", "America/New_York")); // "week:33 woensdag 17 augustus 2022 4:55:15"
```

### Improved
- **perf**: Approximate ~10% performance improvement in array/join thanks to dropping template strings in favor of direct concat and working with precompiled regex
- **perf**: Between ~10% and ~40% performance improvement (depends on spec) in date/format thanks to reduced computations at runtime and improving on zone computations
- **deps**: Upgrade @types/node to 20.16.3

### Removed
- **deps**: Dev dep full-icu as no longer necessary

## [12.20.0] - 2024-08-18
### Added
- **feat**: date/isFormat - A utility function which checks if a string is in a given format
```typescript
isFormat('2024-02-07', 'YYYY-MM-DD'); // TRUE
isFormat('2024-2-07', 'YYYY-MM-DD'); // FALSE
isFormat('12:30 AM', 'HH:mm A'); // TRUE
isFormat('2024-Q4', 'YYYY-[Q]Q'); // TRUE
isFormat('2024-Q5', 'YYYY-[Q]Q'); // FALSE (there is no such thing as a fifth quarter)
isFormat('2024-02-29T12:30:00.000Z', 'ISO'); // TRUE
isFormat('2023-02-29T12:30:00.000Z', 'ISO'); // FALSE (leap year)
```

### Improved
- **perf**: Aproximate ~10% performance improvement in date/format performance thanks to reduction of internal operations and regex removals in favor of raw string behavior
- **perf**: Approximate ~5% performance improvement in string/humanizeNumber performance thanks to further simplification of internal operations
- **perf**: Approximate ~3-5% performance improvement in string/humanizeBytes performance thanks to further simplification of internal operations
- **sys**: Automated test runs are now run against node 18.x, 20.x and 22.x instead of only 20.x
- **deps**: Upgrade @types/node to 20.16.0

## [12.19.0] - 2024-08-10
### Added
- **feat**: object/merge now includes a `union` option which when passed as true will merge the passed objects as a union rather than only including the keys of the origin
```typescript
merge(
    {a: 1, b: {foo: 'bar'}},
    {b: {bar: 'foo'}, c: 2},
    {union: true}
);
// {
//    a: 1,
//    b: {bar: 'foo', foo: 'bar'},
//    c: 2,
// };
```
- **feat**: object/merge now allows passing an array of objects as source as well
```typescript
merge({}, [
    {a: 1},
    {b: 2},
    {c: 3, d: {foo: 'bar'}},
    {a: 2, d: {bar: 'foo'}, hello: 'world'},
], {union: true});
// {
//    a: 2,
//    b: 2,
//    c: 3,
//    d: {foo: 'bar', bar: 'foo'},
//    hello: 'world'
// };
```

### Improved
- **dx**: The return of deepGet (deep/get.ts) is now typed
- **dx**: The keys parameters for pick (object/pick.ts) is now strongly typed
```typescript
/* Typescript will complain here about 'bar.foo' in the keys array as that key does not exist */
const val = pick({
    hello: 'world',
    foo: {
        bar: true,
        oof: false,
    },
}, ['hello', 'bar.foo', 'foo.bar']);
```
- **perf**: Major ~250% performance improvement for deepGet (deep/get.ts) thanks to reduction of internal operations and removal of regex checks
- **perf**: Minor performance improvement in equality (equal.ts) checks for array and object values

## [12.18.0] - 2024-08-05
### Added
- **feat**: function/debounce - Utility function that wraps an existing function and allows you to delay its execution over time, great for for example input debouncing
```typescript
const log = (message: string) => console.log(message);

const debouncedLog = debounce(log, 2000);

debouncedLog("Hello, World!");
debouncedLog.cancel();
debouncedLog.flush();
```

### Improved
- **feat**: string/shorten now has an additional parameter called `truncate_words` which is a boolean flag (default=true) that if set to false will ensure words don't get cut in the middle
```typescript
shorten('To the moon and beyond', 11, '...', false); // 'To the moon...'
```
- **perf**: Major ~25% performance improvement in array/dedupe performance thanks to internal switch related to computation of equality
- **perf**: Minor ~5 performance improvement in array/sort performance thanks to further reduction of operations and working with array index lookups over object key lookups.
- **perf**: Minor ~4-5% performance improvement in array/mapKey performance thanks to further reduction of operations
- **deps**: Upgrade @types/node to 20.14.14
- **deps**: Upgrade @typescript-eslint/eslint-plugin to 7.18.0
- **deps**: Upgrade @typescript-eslint/parser to 7.18.0
- **deps**: Upgrade esbuild-register to 3.6.0
- **deps**: Upgrade typescript to 5.5.4

## [12.17.2] - 2024-07-22
### Fixed
- dx: array/sort Fix generic type not being correct for filter function

## [12.17.1] - 2024-07-21
### Fixed
- array/join - Potential glitch where a delimiter would be present if multiple invalid values would occur at start of passed array

## [12.17.0] - 2024-07-21
### Improved
- **feat**: Barrel export for array now also includes new split function
```
import {split} from '@valkyriestudios/utils/array';
```

## [12.16.0] - 2024-07-21
### Added
- **feat**: array/split utility function which can be used to split an array into batches of a particular size
```typescript
split([1,2,3,4,5], 2); // [[1,2],[3,4],[5]]
split([1, 2, false, 4, 5], 2, {filter_fn: isInteger}); // [[1,2],[4,5]]
```

### Improved
- **feat**: array/dedupe now allows passing a filter_fn option to filter the array while deduping
```typescript
dedupe(['hello', 'hello', 'world', false, 'world'], {filter_fn: el => isNotEmptyString(el)}); // ['hello', 'world']
```
- **perf**: Minor performance bump in array/sort thanks to swapping Math.floor in favor of bitwise `| 0`
- **perf**: Minor performance bump in array/shuffle thanks to swapping Math.floor in favor of bitwise `| 0`
- **perf**: Minor performance bump in date/nowUnix thanks to swapping Math.floor in favor of bitwise `| 0`
- **perf**: Minor performance bump in date/nowUnixMs thanks to removing unnecessary Math.floor
- **perf**: Minor performance bump in date/toUnix thanks to swapping Math.floor in favor of bitwise `| 0`
- **perf**: Minor performance bump in date/format thanks to swapping Math.floor in favor of bitwise `| 0`
- **perf**: Minor performance bump in number/randomIntBetween thanks to swapping Math.floor in favor of bitwise `| 0`
- **perf**: Minor performance bump in hash/fnv1A thanks to swapping if/else chain for grouped switch/case
- **deps**: Upgrade @types/node to 20.14.11
- **deps**: Upgrade @typescript-eslint/eslint-plugin to 7.16.1
- **deps**: Upgrade @typescript-eslint/parser to 7.16.1

## [12.15.0] - 2024-07-16
### Improved
- **dx**: array/sort - filter_fn option now makes use of a generic, ensuring that the provided filter function is correctly typed
```
const arr = [{name: "Peter", isOwner: true}, {name: "Bob", isOwner: true}, {name: "Joe", isOwner: false}];
sort(arr, "name", "asc", {filter_fn: el => el.isOwner}); // el here is typed as {name:string;isOwner:boolean}
```

## [12.14.0] - 2024-07-16
### Improved
- **perf**: array/join - further minor performance bump thanks to simplifying options parsing
- **perf**: array/sort - additional ~5% performance improvement specifically with focus on key-based sorting thanks to internal iterator improvement
- **perf**: string/humanizeBytes - major ~60% performance improvement thanks to significant reduction of tail operations related to formatting of processed output
- **perf**: string/humanizeNumber - major ~60% performance improvement thanks to significant reduction of tail operations related to formatting of processed output

## [12.13.0] - 2024-07-15
### Improved
- **perf**: array/sort - ~5-10% performance improvement by changing internal behavior and applying a hybrid sorting strategy which switches between insertion and quicksort
- **feat**: date/format now supports a `l` token to render locale-specific short date formats such as `15/07/2024`
```
format(new Date('2024-07-15T00:00:00Z'), 'l', 'nl-BE'); // '15/07/2024'
format(new Date('2024-07-15T00:00:00Z'), 'l', 'en-US'); // '7/15/24'
```
- **feat**: date/format now supports a `L` token to render locale-specific date such as `15 jul 2024`
```
format(new Date('2024-07-15T00:00:00Z'), 'L', 'nl-BE'); // '15 jul 2024'
format(new Date('2024-07-15T00:00:00Z'), 'L', 'en-US'); // 'Jul 15, 2024'
```
- **feat**: date/format now supports a `t` token to render locale-specific short time such as `10:28 AM`
```
format(new Date('2024-07-15T22:28:30Z'), 't', 'nl-BE'); // '22:28'
format(new Date('2024-07-15T22:28:30Z'), 't', 'en-US'); // '10:28 PM'
```
- **feat**: date/format now supports a `t` token to render locale-specific time such as `10:28:30 AM`
```
format(new Date('2024-07-15T22:28:30Z'), 'T', 'nl-BE'); // '22:28:30'
format(new Date('2024-07-15T22:28:30Z'), 'T', 'en-US'); // '10:28:30 PM'
```

## [12.12.0] - 2024-07-07
### Added
- **feat**: date/setTimeUTC: Function which allows setting the time for a date object
```typescript
setTimeUTC(new Date("2023-05-04T12:04:27.432Z"), {hour: 5, minute: 30}); // new Date("2023-05-04T05:30:27.432Z")
```

### Improved
- **deps**: Upgrade @types/node to 20.14.10

### Fixed
- **date/format**: Fix an edge case issue where spec chain tokens such as MMMM which have smaller sibling tokens such as MM and MMM would incorrectly replace values if the resulting month would match a spec chain token (eg: **M**ay)
```typescript
format(new Date('2023-05-07T12:30:00.000Z'), 'MMMM'); (previously: '5ay')
format(new Date('2023-05-07T12:30:00.000Z'), 'MMMM'); (now: 'May')
```

## [12.11.0] - 2024-07-04
### Added
- **feat**: array/join: innertrim option, example usage:
```typescript
join(['    hello  world', '    this   is    peter   '], {innertrim: true, delim: ' '}); // 'hello world this is peter'
```

### Improved
- **dx**: array/sort now contains a generic ensuring the return is correctly typed
- **perf**: array/dedupe - ~5% performance improvement by swapping for...of for for()
- **perf**: array/join - ~20% performance improvement by swapping for...of for for() and dropping native join in favor of working with concatenation
- **perf**: array/mapKey - ~15% performance improvement by swapping for...of for for() and dropping prototypal checks for optional chaining
- **perf**: array/mapPrimitive - ~3-5% performance improvement by swapping for...of for for()
- **perf**: deep/freeze - ~25% performance improvement by swapping Object.keys usage for for...in
- **perf**: deep/get - ~4% performance improvement by swapping prototypal check
- **perf**: deep/seal - ~20% performance improvement by swapping Object.keys usage for for...in
- **perf**: object/merge - ~15% performance improvement by swapping prototypal check
- **deps**: Upgrade @types/node to 20.14.9
- **deps**: Upgrade @typescript-eslint/eslint-plugin to 7.15.0
- **deps**: Upgrade @typescript-eslint/parser to 7.15.0
- **deps**: Upgrade nyc to 17.0.0
- **deps**: Upgrade typescript to 5.5.3

## [12.10.0] - 2024-06-02
### Added
- **feat**: caching/memoize now supports memoizing async functions
- **feat**: caching/memoize now supports passing a `memoize_for` prop to automatically clear cache after X milliseconds

### Improved
- **dx**: caching/memoize will now be correctly typed as returning a function that is typed as the provided function
- **feat**: date/diff - Removed internal typeof check on key, favoring falling back to millisecond diff if not provided correctly, this aligns with other date functions such as startOfUTC and also improves performance slightly
- **perf**: array/mapFn - Improved performance by working with ? chaining instead of object prototypal checks
- **perf**: array/mapKey - Improved performance by working with ? chaining instead of object prototypal checks
- **perf**: array/mapPrimitive - Improved performance by working with ? chaining instead of object prototypal checks
- **perf**: date/format - Minor performance improvement by reducing map operations
- **perf**: string/humanizeBytes - Minor performance improvement (~3-5%) by working with ? chaining instead of object prototypal checks
- **perf**: string/humanizeNumber - Minor performance improvement (~3-5%) by working with ? chaining instead of object prototypal checks
- **deps**: Upgrade @types/node to 20.13.0
- **deps**: Upgrade @typescript-eslint/eslint-plugin to 7.11.0
- **deps**: Upgrade @typescript-eslint/parser to 7.11.0

## [12.9.0] - 2024-05-27
### Improved
- **perf**: Adjust object/isNotEmpty to have close to O(1) performance when working with larger objects as Object.keys gets slower with larger objects
- **deps**: Upgrade @typescript-eslint/eslint-plugin to 7.10.0
- **deps**: Upgrade @typescript-eslint/parser to 7.10.0

## [12.8.0] - 2024-05-14
### Improved
- **feat**: array/groupBy - Add type hint for groupBy as being keyof T when using string param variant (thanks [Xander Berkein](https://github.com/xanderberkein))
- **deps**: Upgrade @types/node to 20.12.12
- **deps**: Upgrade @typescript-eslint/eslint-plugin to 7.9.0
- **deps**: Upgrade @typescript-eslint/parser to 7.9.0

## [12.7.0] - 2024-05-01
### Improved
- **dx**: Add jsdoc annotations for array/groupBy
- **perf**: Minor performance improvements (~5-10%) in array/groupBy (thanks [Xander Berkein](https://github.com/xanderberkein))

## [12.6.1] - 2024-04-30
### Fixed
- Maintenance release due to issue occurred during publish of 12.6.0

## [12.6.0] - 2024-04-30
### Added
- **feat**: array/groupBy, (suggested by [Xander Berkein](https://github.com/xanderberkein)) eg:
```typescript
/* Can use a function, the output of the function will be what the key is on the map  */
const group = groupBy([
    {tally: 20, name: 'Peter'},
    {tally: 40, name: 'Jake'},
    {tally: 5, name: 'Bob'},
], el => el.tally > 15);

/* Expected output: */
{
    false: [{tally: 5, name: 'Bob'}],
    true: [{tally: 20, name: 'Peter'}, {tally: 40, name: 'Jake'}],
}

/* Can also use a function and work with a property return  */
const group = groupBy([
    {role: 'user', name: 'Peter'},
    {role: 'user', name: 'Jake'},
    {role: 'guest', name: 'Bob'},
    {name: 'Alice'},
], el => el.role || 'other');

/* Expected output: */
{
    user: [{role: 'user', name: 'Peter'}, {role: 'user', name: 'Jake'}],
    guest: [{role: 'guest', name: 'Bob'}],
    other: [{name: 'Alice'}],
}

/* Can also provide a key as string instead of a function, in case the key doesnt exist a fallback property '_' is used*/
const group = groupBy([
    {role: 'user', name: 'Peter'},
    {role: 'user', name: 'Jake'},
    {role: 'guest', name: 'Bob'},
    {name: 'Alice'},
], 'role');

/* Expected output: */
{
    user: [{role: 'user', name: 'Peter'}, {role: 'user', name: 'Jake'}],
    guest: [{role: 'guest', name: 'Bob'}],
    _: [{name: 'Alice'}],
}
```

### Improved
- **feat**: array/* namespace export now also includes the new groupBy utility
- **deps**: Upgrade @typescript-eslint/eslint-plugin to 7.8.0
- **deps**: Upgrade @typescript-eslint/parser to 7.8.0

## [12.5.0] - 2024-04-26
### Added
- **feat**: array/* namespace export
- **feat**: array namespace export has the following shorthand alias: `is`, `isNe`, `isNotEmpty`, `isNeArray`
- **feat**: boolean/* namespace export
- **feat**: boolean namespace export has the following shorthand alias: `is`
- **feat**: caching/* namespace export
- **feat**: date/* namespace export
- **feat**: date namespace export has the following shorthand alias: `is`
- **feat**: deep/* namespace export
- **feat**: deep namespace export has the following shorthand alias: `seal`, `freeze`, `get`, `set`
- **feat**: function/* namespace export
- **feat**: function namespace export has the following shorthand aliases: `is`, `isFn`, `isAsync`, `isAsyncFn`
- **feat**: hash/* namespace export
- **feat**: number/* namespace export
- **feat**: number namespace export has the following shorthand aliases: `is`, `isGt`, `isGte`, `isLt`, `isLte`, `isNum`, `isNumGt`, `isNumGte`, `isNumLt`, `isNumLte`, `isInt`, `isIntGt`, `isIntGte`, `isIntLt`, `isIntLte`, `isIntBetween`, `randBetween`, `randIntBetween`, `toPct`
- **feat**: object/* namespace export
- **feat**: object namespace export has the following shorthand aliases: `is`, `isNeObject`, `isNotEmpty`, `isNe`
- **feat**: regexp/* namespace export
- **feat**: regexp namespace export has the following shorthand aliases: `is`, `sanitize`
- **feat**: string/* namespace export
- **feat**: string namespace export has the following shorthand aliases: `is`, `isNeString`, `isNotEmpty`, `isNe`, `isBetween`
- **feat**: formdata/is - Utility to verify whether or not a passed value is an instance of FormData, also acts as a typeguard
- **feat**: formdata/* namespace export
- **feat**: formdata namespace export has the following shorthand aliases: `is`
- **feat**: Is.Formdata (links to new formdata/is util), eg:
```typescript
import Is from '@valkyriestudios/utils/is';

if (Is.Formdata(...)) { ... }
```

Example usage of new namespace exports:
```typescript
/* old */
import isString from '@valkyriestudios/utils/string/is';
import isNotEmptyString from '@valkyriestudios/utils/string/isNotEmpty';

/* New pt1 */
import {isString, isNeString} from '@valkyriestudios/utils/string';

/* New pt2 */
import * as LibString from '@valkyriestudios/utils/string';
LibString.is(...);
```

### Improved
- **deps**: Upgrade @typescript-eslint/eslint-plugin to 7.7.1
- **deps**: Upgrade @typescript-eslint/parser to 7.7.1

## [12.4.0] - 2024-04-18
### Improved
- **dx**: array/mapFn will now infer the return type of the map and allows passing a generic
```typescript
type User = {first_name:string};
const users:User[] = [{first_name: 'Peter'}, {first_name: 'Jack'}];

/**
 * At this point the type of map will be Record<string, User>
 * Take note: the key function function also knows that it is receiving an instance of User
 */
const map = mapFn(users, el => el.first_name);
```

- **dx**: array/mapKey will now infer the return type of the map and allows passing a generic
```typescript
type User = {first_name:string};
const users:User[] = [{first_name: 'Peter'}, {first_name: 'Jack'}];

/* At this point the type of map will be Record<string, User> */
const map = mapKey(users, 'first_name');
```
- **sys**: All methods now offer both named and default exports to allow for working with non-modularized setups, for example:
```typescript
/* Only available way previously */
import guid from '@valkyriestudios/utils/hash/guid'

/* Now also possible */
import {guid} from '@valkyriestudios/utils/hash/guid';
```
- **deps**: Upgrade @types/node to 20.12.7
- **deps**: Upgrade @typescript-eslint/eslint-plugin to 7.7.0
- **deps**: Upgrade @typescript-eslint/parser to 7.7.0
- **deps**: Upgrade typescript to 5.4.5

## [12.3.0] - 2024-04-09
### Improved
- **dx**: function/is and Is.Function now work with a cleaner type guard than 'Function' and instead work with (...args:unknown[]) => unknown
- **dx**: function/isAsync and Is.AsyncFunction now work with a cleaner type guard than 'Function' and instead work with (...args:unknown[]) => Promise<unknown>

## [12.2.1] - 2024-04-09
### Improved
- **deps**: Upgrade @types/node to 20.12.6
- **deps**: Upgrade @typescript-eslint/eslint-plugin to 7.6.0
- **deps**: Upgrade @typescript-eslint/parser to 7.6.0

### Fixed
- **bug**: Revert changes to dedupe introduced in 12.1.0 as doesn't work correctly for non-primitive values

## [12.2.0] - 2024-04-09
### Improved
- **dx**: array/is and Is.Array now use a type guard
- **dx**: array/isNotEmpty, Is.NeArray, Is.NotEmptyArray now use a type guard
- **dx**: boolean/is and Is.Boolean now use a type guard
- **dx**: date/is and Is.Date now use a type guard
- **dx**: function/is and Is.Function now use a type guard
- **dx**: function/isAsync and Is.AsyncFunction now use a type guard
- **dx**: number/is, Is.Num, Is.Number now use a type guard
- **dx**: number/isAbove, Is.NumGt, Is.NumAbove, Is.NumberAbove now use a type guard
- **dx**: number/isAboveOrEqual, Is.NumGte, Is.NumAboveOrEqual, Is.NumberAboveOrEqual now use a type guard
- **dx**: number/isBelow, Is.NumLt, Is.NumBelow, Is.NumberBelow now use a type guard
- **dx**: number/isBelowOrEqual, Is.NumLte, Is.NumBelowOrEqual, Is.NumberBelowOrEqual now use a type guard
- **dx**: number/isBetween, Is.NumBetween, Is.NumberBetween now use a type guard
- **dx**: number/isInteger, Is.Int, Is.Integer now use a type guard
- **dx**: number/isIntegerAbove, Is.IntGt, Is.IntAbove, Is.IntegerAbove now use a type guard
- **dx**: number/isIntegerAboveOrEqual, Is.IntGte, Is.IntAboveOrEqual, Is.IntegerAboveOrEqual now use a type guard
- **dx**: number/isIntegerBelow, Is.IntLt, Is.IntBelow, Is.IntegerBelow now use a type guard
- **dx**: number/isIntegerBelowOrEqual, Is.IntLte, Is.IntBelowOrEqual, Is.IntegerBelowOrEqual now use a type guard
- **dx**: number/isIntegerBetween, Is.IntBetween, Is.IntegerBetween now use a type guard
- **dx**: object/is, Is.Object now use a type guard
- **dx**: object/isNotEmpty, Is.NeObject, Is.NotEmptyObject now use a type guard
- **dx**: regexp/is, Is.RegExp now use a type guard
- **dx**: string/is, Is.String now use a type guard
- **dx**: string/isBetween, Is.StringBetween now use a type guard
- **dx**: string/isNotEmpty, Is.NeString, Is.NotEmptyString now use a type guard

## [12.1.0] - 2024-04-05
### Improved
- **feat**: string/shorten - Will now only accept integers for length
- **perf**: array/dedupe - Significant performance improvement by moving away from fnv hashing to using native Sets
- **perf**: array/join - ~20% performance improvement thanks to reducing internal operations
- **perf**: array/shuffle - Remove unnecessary length check
- **perf**: array/mapFn - Minor performance improvement thanks to reducing internal operations regarding key lookups
- **perf**: array/mapPrimitive - Minor performance improvement thanks to reducing internal operations regarding key lookups
- **perf**: array/mapPrimitive - ~15% performance improvement when mapping strings thanks to reducing internal operations regarding trimming
- **perf**: array/mapKey - Minor performance improvement thanks to reducing internal operations regarding key lookups
- **perf**: array/sort - Minor performance improvement thanks to reducing internal operations regarding key lookups
- **perf**: deep/set - Minor performance improvement thanks to using precompiled regex and caching internal length checks
- **perf**: object/pick - Minor ~4% performance improvement thanks to using a precompiled regex and dropping the global flag
- **perf**: string/humanizeBytes - ~15-25% performance improvement thanks to reducing internal operations and simplifying logic in humanizeNumber
- **perf**: string/humanizeNumber - ~5-10% performance improvement thanks to reducing internal operations and simplifying logic in humanizeNumber
- **perf**: string/shorten - Minor performance improvement due to swapping Number.isFinite for Number.isInteger
- **deps**: Upgrade @types/node to 20.12.4
- **deps**: Upgrade @typescript-eslint/eslint-plugin to 7.5.0
- **deps**: Upgrade @typescript-eslint/parser to 7.5.0
- **deps**: Upgrade typescript to 5.4.4

## [12.0.0] - 2024-03-07
### Added
- **feat**: date/format - Formatting utility using spec-based formatting strings. Eg `format(new Date('2022-01-01T04:32:19.000Z'), 'YYYY-MM-DD') -> 2022-01-01`.
- **deps**: full-icu (used for format testing)

### Improved
- **feat**: equal - Significant performance improvements (~10% to 35%) due to adjusting in favor of early escape mechanics
- **feat**: date/addUTC - Medium performance improvement ~10% due to reduction of internal function calls
- **feat**: regexp/is - Medium performance improvement ~20% due to adjusting in favor of instanceof checks over prototypal checks
- **deps**: Upgrade @types/node to 20.11.25
- **deps**: Upgrade @typescript-eslint/eslint-plugin to 7.1.1
- **deps**: Upgrade @typescript-eslint/parser to 7.1.1
- **deps**: Upgrade typescript to 5.4.2

## [11.7.0] - 2024-02-27
### Improved
- **dx**: deep/freeze - Now works with generics to ensure proper typing and flagging as Readonly
- **dx**: deep/seal - Now works with generics to ensure proper typing
- **feat**: object/merge - Further simplication of merge logic leading to minor performance improvements
- **deps**: Upgrade @typescript-eslint/eslint-plugin to 7.1.0
- **deps**: Upgrade @typescript-eslint/parser to 7.1.0
- **deps**: Upgrade eslint to 8.57.0

## [11.6.0] - 2024-02-23
### Improved
- **perf**: object/merge - Further performance improvement (~8%) due to further simplification of code by using proto object checks
- **perf**: object/pick - Slight performance improvement (~3%) due to simplication of code being able to remove an internal check

## [11.5.0] - 2024-02-22
### Improved
- **perf**: array/dedupe - Reduce memory footprint of dedupe when working on larger arrays by using a set over a map
- **perf**: array/mapFn - Slight performance improvement (~1%) due to spread vs Object.assign (in favor of spread)
- **perf**: array/mapKey - Slight performance improvement (~5%) due to spread vs Object.assign (in favor of spread)
- **perf**: array/sort - Slight performance improvement (~5%) due to push vs spread (in favor of push) as well as removing one internal operation
- **perf**: object/merge - Decent performance improvement (~20%) due to simplication of code in favor of 'for ... in' over Object.keys reducer
- **deps**: Upgrade @types/node to 20.11.20
- **deps**: Upgrade @typescript-eslint/eslint-plugin to 7.0.2
- **deps**: Upgrade @typescript-eslint/parser to 7.0.2

## [11.4.0] - 2024-02-15
### Added
- **feat**: function/isAsync - Returns true when the passed value is an async function

### Improved
- **dx**: swap out usage of any for unknown where possible
- **deps**: Upgrade @types/node to 20.11.18
- **deps**: Upgrade @typescript-eslint/eslint-plugin to 7.0.1
- **deps**: Upgrade @typescript-eslint/parser to 7.0.1

## [11.3.0] - 2024-02-08
### Improved
- **dx**: array/dedupe now makes use of generics
- **dx**: function/noopresolve now makes use of generics
- **dx**: function/noopreturn now makes use of generics

## [11.2.0] - 2024-02-08
### Added
- **sys**: Publish script

### Improved
- **sys**: Remove exports from package.json and use publish script to generate dist folder

## [11.1.0] - 2024-02-08
### Improved
- **dx**: Add global declaration file 🚀

## [11.0.0] - 2024-02-08
### Added
- **sys**: Migrate to Typescript and as such comes with declarations 🚀
- **sys**: Module exports setup in package.json which goes hand in hand with the typescript declaration support, allowing for improved DX across the board 😎
- **deps**: esbuild-register@3.5.0
- **deps**: typescript@5.3.3
- **deps**: @types/node
- **deps**: @typescript-eslint/eslint-plugin@6.21.0
- **deps**: @typescript-eslint/parser@6.21.0
- **deps**: nyc@15.1.0

### Improved
- **deps**: Upgrade eslint to 8.56.0
- **feat**: function/sleep - Will now internally check whether or not the value passed to it is a number above 0 and fallback to 0 if that is not the case
- **feat**: deep/set - Will now reject paths containing \_\_proto\_\_, constructor, prototype as keys to prevent possibility of prototype pollution
- **feat**: deep/seal - Will now allow arrays as input
- **feat**: deep/freeze - Will now allow arrays as input
- **feat**: array/mapPrimitive - Now allows passing a number for valround, which in turn will be used to round to a certain decimal precision

### Removed
- **deps**: @babel/cli
- **deps**: @babel/core
- **deps**: @babel/preset-env
- **deps**: @babel/register
- **deps**: babel-plugin-module-extension
- **deps**: babel-plugin-transform-minify-booleans
- **deps**: babel-plugin-transform-remove-console
- **deps**: c8 (in favor of moving back to nyc due to proper ts support)

### Breaking
- **string/shorten**: Will now return original string or empty string instead of false when invalid props are passed

## [10.0.0] - 2023-12-14
### Improved
- **sys**: Remove old travis build badge from readme
- **sys**: Add codeql badge to readme
- **perf**: ~25% performance improvement in string/shorten
- **perf**: ~18% performance improvement in object/pick
- **perf**: 5 to 10% performance degration in date/is, date/startOfUTC, date/addUTC, date/diff, date/endOfUTC, date/toUnix, date/toUTC due to more rigid checks on whether or not a Date is a truly valid date (see Breaking section)

### Breaking
- **feat**: The usage of non-literal string formats (eg: `new String(...)`) will no longer be supported to allow for further performance improvements during validity checks. This should not impact many people as the usage of strings in that format has been discouraged for many years. For example: `isString('hello')` and `isString(String('hello'))` will return true, but `isString(new String('hello'))` will no longer return true as a string literal and a string object are two different things. Usage of String objects can lead to side-effects, for example: `new String('hello') == new String('hello')` returns false
- **feat**: The usage of non-literal boolean formats (eg: `new Boolean(...)`) will no longer be supported to allow for further performance improvements during validity checks. This should not impact many people as the usage of booleans in that format has been discouraged for many years. For example: `isBoolean(false)` and `isBoolean(Boolean(false))` will return true, but `isBoolean(new Boolean(false))` will no longer return true as a boolean literal and a boolean object are two different things. Usage of boolean objects can lead to side-effects, for example: `new Boolean(false) == new Boolean(false)` returns false
- **feat**: date/is - Will now return false if a date object was instantiated with an invalid date (eg: `New Date('invalid_date')`)

## [9.0.0] - 2023-12-07
### Breaking
- **sys**: Removed data/countries.json, this has now been moved to https://www.npmjs.com/package/@valkyriestudios/data-countries
- **sys**: Removed data/continents.json, this has now been moved to https://www.npmjs.com/package/@valkyriestudios/data-continents

## [8.4.0] - 2023-12-06
### Improved
- **feat**: deep/get - Removed internal usage of `X.hasOwnProperty(key)` in favor of `Object.prototype.hasOwnProperty.call(X, key)`, allowing passing objects without prototype (eg: Object.create(null))
- **feat**: object/merge - Removed internal usage of `X.hasOwnProperty(key)` in favor of `Object.prototype.hasOwnProperty.call(X, key)`, allowing passing objects without prototype (eg: Object.create(null))
- **feat**: array/mapKey - Removed internal usage of `X.hasOwnProperty(key)` in favor of `Object.prototype.hasOwnProperty.call(X, key)`, allowing passing objects without prototype (eg: Object.create(null))
- **feat**: array/sort - Removed internal usage of `X.hasOwnProperty(key)` in favor of `Object.prototype.hasOwnProperty.call(X, key)`, allowing passing objects without prototype (eg: Object.create(null))
- **feat**: array/sort - Now wraps a custom filter function to ensure non-empty object checks are always applied, this also means custom filter functions no longer need to pass this themselves

## [8.3.0] - 2023-12-06
### Added
- **deps**: babel-plugin-module-extension@0.1.3

### Improved
- **deps**: Upgrade eslint to 8.55.0
- **sys**: Rerun benchmark for v8 on intel i9

### Fixed
- **bug**: deep/get - Fix edge case issue where cursor is not an object or array when parts still exist afterwards

## [8.2.0] - 2023-11-29
### Improved
- **deps**: Upgrade @babel/core to 7.23.5
- **deps**: Upgrade @babel/preset-env to 7.23.5
- **feat**: deep/get - Allow handling of deep keys containing multiple array denominators
- **feat**: deep/set - Allow handling of deep keys containing multiple array denominators

## [8.1.0] - 2023-11-29
### Improved
- **sys** Reverted module type change that caused breakage due to esm vs cjs compatibility
- **sys** Adjusted src files and test files to work with .mjs extension

## [8.0.0] - 2023-11-29
### Added
- **deps**: c8\@8.0.1
- **sys**: Internal benchmark script to produce ops/sec for close to all util functions
- **feat**: date/startOfUTC - Add support for week_mon as mode (alias for week with monday as first day of the week)
- **feat**: date/startOfUTC - Add support for week_tue as mode (tuesday as first day of the week)
- **feat**: date/startOfUTC - Add support for week_wed as mode (wednesday as first day of the week)
- **feat**: date/startOfUTC - Add support for week_thu as mode (thursday as first day of the week)
- **feat**: date/startOfUTC - Add support for week_fri as mode (friday as first day of the week)
- **feat**: date/startOfUTC - Add support for week_sat as mode (saturday as first day of the week)
- **feat**: date/endOfUTC - Add support for week_mon as mode (alias for week with monday as first day of the week)
- **feat**: date/endOfUTC - Add support for week_tue as mode (tuesday as first day of the week)
- **feat**: date/endOfUTC - Add support for week_wed as mode (wednesday as first day of the week)
- **feat**: date/endOfUTC - Add support for week_thu as mode (thursday as first day of the week)
- **feat**: date/endOfUTC - Add support for week_fri as mode (friday as first day of the week)
- **feat**: date/endOfUTC - Add support for week_sat as mode (saturday as first day of the week)

### Improved
- **deps**: Upgrade @babel/cli to 7.23.4
- **sys**: Switch from using chai/mocha to node native test runner
- **perf**: hash/fnv1A - Improved performance thanks to predefined constants and reducing internal overhead regarding conversion
- **perf**: array/dedupe - Improved performance due to replacement of filter and object map by for with native map
- **perf**: deep/freeze - Improved performance due to replacement of forEach with native for
- **perf**: deep/seal - Improved performance due to replacement of forEach with native for
- **perf**: deep/get - Improved performance due to order change during path interpolation
- **perf**: deep/set - Improved performance due to order change during path interpolation
- **perf**: date/startOfUTC - Improved performance for start of week and quarter calculation due to improved internal handling
- **perf**: date/endOfUTC - Improved performance for start of week and quarter calculation due to improved internal handling
- **perf**: string/humanizeBytes - Will now be magnitudes faster (50x) due to ditching usage of Intl for separator handling
- **perf**: object/pick: Will now be magnitudes faster (7x) if working with non-deep keys (eg: pick(obj, ['g.d', 'g.e']))
- **feat**: string/shorten - Will no longer return false but an empty string when passed a string that is empty after trimming
- **feat**: string/isBetween - Will now validate that min and max are passed as above or equal to 0
- **feat**: string/humanizeNumber - Will now be magnitudes faster (50x) due to ditching usage of Intl for separator handling
- **feat**: object/pick: Will now throw when passed an empty array of keys
- **feat**: object/merge: Will now throw when passed a non-object target and source (previously only non-object target)
- **perf**: Improvements across a plethora of functions due to internal usage swaps in favor of Number.isFinite, Number.isInteger and Array.isArray leading to reduction of function calls andless Heap chatter
- **sys**: Published package will now also include original src files which can be imported in @valkyriestudios/utils/src, this allows anyone wishing to use in esm format to do so

### Breaking
- **feat**: The usage of non-primitive number formats (eg: `new Number(...)`) will no longer be supported to allow for performance improvements during validity checks. This should not impact many people as the usage of numbers in that format has been discouraged for many years.

### Fixed
- **bug**: deep/set - Fix an issue where multiple runs of deepSet could throw errors when trying to assign a deeper value to a value that was previously set to a primitive
- **bug**: deep/set - Fix an issue preventing building up of deep arrays using eg: deepSet({a: []}, 'a.0.name', 'Peter')
- **bug**: deep/get - Fix an issue where deepGet would throw an error instead of returning undefined when diving into certain keys that don't exist on deep objects and arrays

### Removed
- **deps**: babel-plugin-check-es2015-constants (as not needed)
- **deps**: babel-plugin-transform-member-expression-literals (as not needed)
- **deps**: babel-plugin-transform-property-literals (as not needed)
- **deps**: chai (in favor of native node test runner)
- **deps**: chai-as-promised (in favor of native node test runner)
- **deps**: chai-spies (in favor of native node test runner)
- **deps**: mocha (in favor of native node test runner)
- **deps**: nyc (in favor of native node test runner in combination with c8)
- **feat**: object/defineFrozen: As these worked on a pass-by-reference and if misunderstood could have certain unwanted side-effects
- **feat**: object/defineSealed: As these worked on a pass-by-reference and if misunderstood could have certain unwanted side-effects
- **feat**: object/zip
- **feat**: object/forValues

## [7.5.0] - 2023-10-22
### Improved
- **deps**: Upgrade @babel/cli to 7.23.0
- **deps**: Upgrade @babel/core to 7.23.2
- **deps**: Upgrade @babel/preset-env to 7.23.2
- **deps**: Upgrade @babel/register to 7.22.15
- **deps**: Upgrade chai to 4.3.10
- **deps**: Upgrade eslint to 8.52.0
- **feat**: date/addUTC now supports millisecond/milliseconds as keys

## [7.4.0] - 2023-08-10
### Added
- **feat**: regexp/sanitize

### Improved
- **deps**: Upgrade @babel/cli to 7.22.10
- **deps**: Upgrade @babel/core to 7.22.10
- **deps**: Upgrade @babel/preset-env to 7.22.10
- **deps**: Upgrade eslint to 8.46.0

## [7.3.0] - 2023-06-25
### Added
- **feat**: data/continents.json
- **feat**: data/countries.json

### Improved
- **deps**: Upgrade eslint to 8.43.0

## [7.2.0] - 2023-06-11
### Added
- **feat**: date/toUnix - Convert a date to its corresponding unix timestamp in seconds (1.000.000 ops in ~300ms)
- **feat**: date/diff - (supports week,day,hour,minute,millisecond) (1.000.000 ops in ~650ms)

### Improved
- **deps**: Upgrade @babel/cli to 7.22.5
- **deps**: Upgrade @babel/core to 7.22.5
- **deps**: Upgrade @babel/preset-env to 7.22.5
- **deps**: Upgrade @babel/register to 7.22.5
- **deps**: Upgrade eslint to 8.42.0

## [7.1.0] - 2023-05-13
### Added
- **feat**: date/addUTC
- **feat**: date/endOfUTC with support for year,quarter,month,week,week_sun,day,hour,minute,second

### Improved
- **feat**: date/startOfUTC - now supports 'quarter'
- **feat**: date/startOfUTC - now supports 'week' (monday as first day of the week)
- **feat**: date/startOfUTC - now supports 'week_sun' (sunday as first day of the week)

## [7.0.0] - 2023-05-07
### Added
- **deps**: @babel/cli
- **sys**: .babelrc
- **sys**: Switch to using babel-cli for transpiling build
- **feat**: date/startOfUTC

### Improved
- **deps**: Upgrade @babel/core to 7.21.8
- **deps**: Upgrade eslint to 8.40.0

### Removed
- **deps**: gulp
- **deps**: gulp-babel
- **sys**: gulpfile
- **feat**: array/mapPrimitive - keytrim option

## [6.3.0] - 2023-05-01
### Added
- **feat**: date/toUTC

## [6.2.0] - 2023-04-29
### Added
- **feat**: date/nowUnix
- **feat**: date/nowUnixMs

### Improved
- **feat**: number/round - Improve precision on edge case numbers by using epsilon differentiator
- **perf**: number/round - Improve performance and add benchmark (1.000.000 round ops in ~250ms)
- **deps**: Upgrade @babel/core to 7.21.5
- **deps**: Upgrade @babel/preset-env to 7.21.5

## [6.1.0] - 2023-04-23
### Improved
- **sys**: Reduce eventual bundle size for package

## [6.0.0] - 2023-04-22
### Added
- **feat**: array/sort
- **feat**: string/humanizeNumber (with delim, separator, precision, units, divider) options
- **feat**: number/randomIntBetween
- **feat**: number/isAboveOrEqual
- **feat**: number/isBelowOrEqual
- **feat**: number/isIntegerAboveOrEqual
- **feat**: number/isIntegerBelowOrEqual
- **feat**: Is@NumberBelowOrEqual
- **feat**: Is@NumberAboveOrEqual
- **feat**: Is@IntegerBelowOrEqual
- **feat**: Is@IntegerAboveOrEqual
- **feat**: Is@Equal
- **feat**: Is@Eq (as alias of Is@Equal)
- **feat**: Is@NeArray (alias of Is@NotEmptyArray)
- **feat**: Is@NeObject (alias of Is@NotEmptyObject)
- **feat**: Is@NeString (alias of Is@NotEmptyString)
- **feat**: Is@Num (alias of Is@Number)
- **feat**: Is@NumBelow (alias of Is@NumberBelow)
- **feat**: Is@NumBelowOrEqual (alias of Is@NumberBelowOrEqual)
- **feat**: Is@NumAbove (alias of Is@NumberAbove)
- **feat**: Is@NumAboveOrEqual (alias of Is@NumberAboveOrEqual)
- **feat**: Is@NumBetween (alias of Is@NumberBetween)
- **feat**: Is@NumLt (alias of Is@NumberBelow)
- **feat**: Is@NumLte (alias of Is@NumberBelowOrEqual)
- **feat**: Is@NumGt (alias of Is@NumberAbove)
- **feat**: Is@NumGte (alias of Is@NumberAboveOrEqual)
- **feat**: Is@Int (alias of Is@Integer)
- **feat**: Is@IntBelow (alias of Is@IntegerBelow)
- **feat**: Is@IntBelowOrEqual (alias of Is@IntegerBelowOrEqual)
- **feat**: Is@IntAbove (alias of Is@IntegerAbove)
- **feat**: Is@IntAboveOrEqual (alias of Is@IntegerAboveOrEqual)
- **feat**: Is@IntBetween (alias of Is@IntegerBetween)
- **feat**: Is@IntLt (alias of Is@IntegerBelow)
- **feat**: Is@IntLte (alias of Is@IntegerBelowOrEqual)
- **feat**: Is@IntGt (alias of Is@IntegerAbove)
- **feat**: Is@IntGte (alias of Is@IntegerAboveOrEqual)

### Improved
- **deps**: Upgrade eslint to 8.39.0
- **feat**: object/pick - Now internally validates keys as strings and autotrims keys when picking
- **feat**: number/round - Will only accept integers for precision variable from now on
- **feat**: string/humanizeBytes - Now humanizes the real number part and allows passing a custom delimiter for natural numbers (eg: 1024 -> 1,024, 1024 {delim:'.'} -> 1.024)
- **feat**: string/humanizeBytes - Now allows passing a custom separator (eg: 10.024 {separator: ','} -> 10,024)
- **feat**: string/humanizeBytes - Now allows passing a precision variable (default:2)
- **feat**: string/humanizeBytes -Now allows passing a custom units array (eg: humanizeBytes(1024, {units: [' Jedi', ' Darth']}) -> 1 Darth, humanizeBytes(20, {units: [' Jedi', 'Darth']}) -> 20 Jedi)
- **perf**: number/round - Performance improvement due to usage of scientific notation not requiring math.pow
- **perf**: hash/guid - Is now 4x faster than previous implementation thanks to usage of bitwise operators and a precalculated hexmap (0-255), able to generate 50.000 guids in ~65ms and also no longer relying on high-performance timers

## [5.4.0] - 2023-04-08
### Added
- **feat**: String/humanizeBytes

### Improved
- **deps**: Upgrade eslint to 8.38.0

## [5.3.1] - 2023-03-31
### Improved
- **deps**: Upgrade @babel/core to 7.21.4
- **deps**: Upgrade @babel/preset-env to 7.21.4
- **deps**: Upgrade @babel/register to 7.21.0
- **deps**: Upgrade eslint to 8.37.0
- **deps**: Upgrade mocha to 10.2.0

### Fixed
- **bug**: number/randomBetween - Fix issue where min is not properly taken into account

## [5.3.0] - 2022-11-20
### Added
- **feat**: array/shuffle - Fisher-Yates implementation O(n) shuffling algorithm, can be used to shuffle arrays of both primitives and non-primitives

### Improved
- **deps**: Upgrade @babel/core to 7.20.2
- **deps**: Upgrade @babel/preset-env to 7.20.2
- **deps**: Upgrade chai to 4.3.7
- **deps**: Upgrade eslint to 8.28.0
- **deps**: Upgrade mocha to 10.1.0
- **feat**: caching/memoize - Now allows a resolver function to be passed to allow custom cache key generation

## [5.2.0] - 2022-10-09
### Added
- **feat**: array/join
- **feat**: number/isInteger
- **feat**: number/isIntegerBelow
- **feat**: number/isIntegerAbove
- **feat**: number/isIntegerBetween
- **feat**: Is@Integer
- **feat**: Is@IntegerBelow
- **feat**: Is@IntegerAbove
- **feat**: Is@IntegerBetween

### Improved
- **deps**: Upgrade @babel/core to 7.19.3
- **deps**: Upgrade @babel/preset-env to 7.19.3
- **deps**: Upgrade @babel/register to 7.18.9
- **deps**: Upgrade eslint to 8.24.0
- **sys**: Add .nycrc, .babelrc, .eslintrc.json, .travis.yml, test/ to npm ignore

### Removed
- **sys**: .eslintrc (legacy file)

## [5.1.0] - 2022-07-17
### Added
- **feat**: string/shorten
- **feat**: array/mapKey
- **feat**: array/mapFn
- **feat**: array/mapPrimitive

### Improved
- **feat**: array/dedupe - will now check whether or not passed variable is a non-empty array
- **feat**: number/isNumericalNaN - will now also work with raw NaN checks
- **perf**: number/randomBetween, number/round, number/toPercentage no longer double check against isNumericalNaN as this behavior is already built-in to isNumber

## [5.0.0] - 2022-07-16
### Added
- **feat**: number/isBelow
- **feat**: number/isAbove
- **feat**: Is.NumberBelow
- **feat**: Is.NumberAbove
- **deps**: mocha@10.0.0
- **deps**: nyc@15.1.0
- **deps**: chai@4.3.6
- **deps**: chai-as-promised@7.1.1
- **deps**: chai-spies@1.0.0
- **deps**: eslint@8.19.0
- **deps**: @babel/core@7.18.6
- **deps**: @babel/preset-env@7.18.6
- **deps**: @babel/register@7.18.6
- **sys**: .eslintrc.json
- **sys**: .nycrc
- **sys**: .babelrc
- **sys**: npm command: lint

### Improved
- **deps**: Upgrade babel-loader to 8.2.5
- **deps**: Upgrade gulp-babel to 8.0.0
- **sys**: Switched to using mocha/nyc instead of karma for unit testing and coverage
- **sys**: Npm build will now also lint code according to eslint spec
- **feat**: Improve on validation for path handling on deepGet and deepSet

### Removed
- **feat**: formdata/is
- **feat**: Is.FormData
- **deps**: webpack
- **deps**: puppeteer
- **deps**: karma-webpack
- **deps**: karma-spec-reporter
- **deps**: karma-jasmine
- **deps**: karma-coverage
- **deps**: karma-chrome-launcher
- **deps**: karma
- **deps**: jasmine-core
- **deps**: babel-core
- **deps**: babel-loader
- **deps**: babel-preset-env

## [4.2.0] - 2021-11-05
### Added
- **feat**: number/isBetween
- **feat**: string/isNotEmpty
- **feat**: string/isBetween
- **feat**: object/isNotEmpty
- **feat**: array/isNotEmpty
- **feat**: New unified 'Is' object, containing easy access to almost all is* functions through single import
-- Is.Array
-- Is.NotEmptyArray
-- Is.Boolean
-- Is.Date
-- Is.FormData
-- Is.Function
-- Is.Number
-- Is.RegExp
-- Is.Object
-- Is.NotEmptyObject
-- Is.String
-- Is.NotEmptyString

### Improved
- **feat**: isNumericalNaN now returns true for Infinity

### Fixed
- **bug**: isNumber - no longer returns true for a numerical NaN, eg: isNumber(1/0) now returns false
- **bug**: fnv1A - now converts NaN as a fixed 'NaN' for hash calculation

## [4.1.0] - 2021-02-01
### Added
- **feat**: functions/sleep

## [4.0.0] - 2020-11-01
### Improved
- **sys**: Switch folder structure to be single file per function, allowing for tree shaking to be applied more easily when being bundled

## [3.1.1] - 2018-11-23
### Added
- **sys**: Codecoverage integration
- **test**: Date and fnv1A hash
- **test**: RegExp and fnv1A hash
- **test**: unsupported properties and fnv1A hash
- **test**: unsupported properties in deepSeal
- **test**: unsupported properties in deepFreeze

### Fixed
- **bug**: Fixed an issue where '' would come back as undefined in deepGet

## [3.1.0] - 2018-11-18
### Breaking
- **feat**: Adjusted pick behavior to not set undefined as default and instead not return the key in the object

### Added
- **feat**: number/toPercentage
- **test**: number/toPercentage

## [3.0.2] - 2018-08-23
### Improved
- **sys**: Removed license badge as not working

## [3.0.1] - 2018-08-23
### Added
- **sys**: Badges on readme regarding build status, monthly downloads, version, license

### Improved
- **sys**: Updated package.json file with better metadata

## [3.0.0] - 2018-08-23
### Added
- **feat**: number/round
- **feat**: number/randomBetween
- **test**: Object utils
- **test**: Caching utils
- **test**: Hash utils
- **test**: Function utils
- **test**: FormData utils
- **test**: Deep utils
- **test**: Equal utils
- **test**: Date utils
- **test**: String utils
- **test**: RegExp utils
- **test**: Boolean utils
- **test**: Array utils
- **test**: Numeric utils

### Improved
- **feat**: object/zip - added default_to variable to adjust the behavior of defaulting
- **feat**: object/forValues - you no longer need to apply the change to the object but simply return the changed value (see readme for example)
- **deps**: Update outdated dependencies

### Fixed
- **bug**: Various bugfixes based on test results

### Breaking
- **feat**: Remove md5 hashing function as hashing was not correctly applied

## [2.4.0] - 2017-10-16
### Added
- **feat**: function/is

## [2.3.0] - 2017-10-15
### Added
- **feat**: object/forValues - utility function to loop over the values of an object and apply an identity callback to each
- **feat**: hash/fnv1A - hashing function based on fowler-noll-vo (fnv) that generates a hash based on a provided payload
- **feat**: array/dedupe - function that removes duplicates from an array

### Changed
- **feat**: caching/memoize - adjust memoization to use fnv1A hashing function for internal cache storage and lookup

## [2.2.0] - 2017-10-14
### Added
- **feat**: number/isNumericalNaN - check if something is a strict numerical nan
- **feat**: regexp/is - validate whether or not a variable is a regex
- **feat**: function/noopresolve - resolve a promise without taking any action
- **feat**: formdata/is - validate whether or not a variable is a FormData object

### Changed
- **feat**: equal - Add NaN, RegExp and Date diffing
- **deps**: Update outdated dependencies and add babel-core

### Breaking
- **feat**: Adjust the default value for pick from undefined to null if the key doesn't exist

## [2.1.0] - 2017-08-21
### Added
- **sys**: MIT License

## [2.0.0] - 2017-08-21

Initial Release
