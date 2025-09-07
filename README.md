# @valkyriestudios/utils

[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![CodeCov](https://codecov.io/gh/ValkyrieStudios/utils/branch/main/graph/badge.svg)](https://codecov.io/gh/ValkyrieStudios/utils)
[![CI](https://github.com/ValkyrieStudios/utils/actions/workflows/ci.yml/badge.svg)](https://github.com/ValkyrieStudios/utils/actions/workflows/ci.yml)
[![CodeQL](https://github.com/ValkyrieStudios/utils/actions/workflows/github-code-scanning/codeql/badge.svg?branch=main)](https://github.com/ValkyrieStudios/utils/actions/workflows/github-code-scanning/codeql)
[![npm](https://img.shields.io/npm/v/@valkyriestudios/utils.svg)](https://www.npmjs.com/package/@valkyriestudios/utils)
[![npm](https://img.shields.io/npm/dm/@valkyriestudios/utils.svg)](https://www.npmjs.com/package/@valkyriestudios/utils)

Zero-dependency collection of single-function utilities for common tasks

## Installation
`npm install @valkyriestudios/utils`

## 🧊 TriFrost is powered by utils
Many of the utilities in this package are optimized and tested as foundational building blocks of [TriFrost](https://www.trifrost.dev) — a high-performance, type-safe framework for building fullstack TypeScript applications.

If you're looking to go beyond utilities and build fully modular backends with deep type integration, check out TriFrost.

## Available Functions
### array/is(val:unknown)
Check if a variable is of type Array
```typescript
import is from '@valkyriestudios/utils/array/is';
isArray({a:1}); // FALSE
isArray([]); // TRUE
```

### array/isNotEmpty(val:unknown)
Check if a variable a non-empty array
```typescript
import isNotEmptyArray from '@valkyriestudios/utils/array/isNotEmpty';
isNotEmptyArray({a:1}); // FALSE
isNotEmptyArray([]); // FALSE
isNotEmptyArray([0, 1, 2]); // TRUE
```

### array/mapKey(val:Record[], key:string, opts?:{merge?:boolean;filter_fn?:(el:T) => boolean;transform_fn?:(el:T) => U})
Map a non-primitive object array into an object map by key.

**Take Note**: The function `array/mapKeyAsMap` has the same behavior as the mapKey function with the sole difference being that it returns a
**Map** instead of an object.

```typescript
import mapKey from '@valkyriestudios/utils/array/mapKey';
mapKey([
    {uid: 12, name: 'Peter'},
    {uid: 15, name: 'Jonas'},
    {uid: 87, name: 'Josh'},
], 'uid');
/* Expected output: */
{
    12: {uid: 12, name: 'Peter'},
    15: {uid: 15, name: 'Jonas'},
    87: {uid: 87, name: 'Josh'},
}
```

Autofilters anything not meeting the spec:
```typescript
import mapKey from '@valkyriestudios/utils/array/mapKey';
mapKey([
    0,
    {uid: 12, name: 'Peter'},
    false,
    'foobar',
    {uid: 15, name: 'Jonas'},
    [{hi: 'there'}],
    null,
    undefined,
    new Date(),
    {uid: 87, name: 'Josh'},
], 'uid');
/* Expected output: */
{
    12: {uid: 12, name: 'Peter'},
    15: {uid: 15, name: 'Jonas'},
    87: {uid: 87, name: 'Josh'},
}
```

allows merging objects onto existing keys:
```typescript
import mapKey from '@valkyriestudios/utils/array/mapKey';
mapKey([
    0,
    {uid: 12, name: 'Peter'},
    false,
    'foobar',
    {uid: 15, name: 'Jonas', dob: '2022-02-07'},
    [{hi: 'there'}],
    {uid: 15, name: 'Bob'},
    null,
    undefined,
    {name: 'Alana'},
    new Date(),
    {uid: 87, name: 'Josh'},
    {uid: 12, name: 'Farah'},
], 'uid', {merge: true})
/* Expected output: */
{
    12: {uid: 12, name: 'Farah'},
    15: {uid: 15, name: 'Bob', dob: '2022-02-07'},
    87: {uid: 87, name: 'Josh'},
}
```

allows filtering out objects with a custom filter_fn:
```typescript
import mapKey from '@valkyriestudios/utils/array/mapKey';
mapKey([
    {uid: 12, name: 'Peter', isActive: true},
    {uid: 15, name: 'Jonas', dob: '2022-02-07', isActive: true},
    {uid: 15, name: 'Bob', isActive: false},
    {name: 'Alana', isActive: true},
    {uid: 87, name: 'Josh', isActive: false},
    {uid: 12, name: 'Farah', isActive: false},
], 'uid', {merge: true, filter_fn: el => el.isActive})
/* Expected output: */
{
    12: {uid: 12, name: 'Peter', isActive: true},
    15: {uid: 15, name: 'Jonas', dob: '2022-02-07'},
}
```

also allows transforming objects at the same time with a custom transform_fn. Take Note that all of these operations are run in O(n):
```typescript
import mapKey from '@valkyriestudios/utils/array/mapKey';
mapKey([
    {uid: 12, name: 'Peter', isActive: true},
    {uid: 15, name: 'Jonas', dob: '2022-02-07', isActive: true},
    {uid: 15, name: 'Bob', isActive: false},
    {name: 'Alana', isActive: true},
    {uid: 87, name: 'Josh', isActive: false},
    {uid: 12, name: 'Farah', isActive: false},
], 'uid', {merge: true, filter_fn: el => el.isActive, transform_fn: el => pick(el, ["name"])})
/* Expected output: */
{
    12: {name: 'Peter'},
    15: {name: 'Jonas'},
}
```

### array/mapKeyAsMap(val:Record[], key:string, opts?:{merge?:boolean;filter_fn?:(el:T) => boolean})
Same behavior as mapKey but returns a Map instead of an object

### array/mapFn(val:Record[], key:Function, opts:object={})
Same behavior as mapKey but instead of a key, a function is passed to generate your own key. Eg:

```typescript
import mapFn from '@valkyriestudios/utils/array/mapFn';
mapFn([
    {uid: 12, name: 'Peter'},
    {uid: 15, name: 'Jonas'},
    {uid: 87, name: 'Josh'},
], el => el.uid)
/* Expected output: */
{
    12: {uid: 12, name: 'Peter'},
    15: {uid: 15, name: 'Jonas'},
    87: {uid: 87, name: 'Josh'},
}
```

options are the same as the mapKey function

### array/mapFnAsMap(val:Record[], key:Function, opts:object={})
Same behavior as mapFn but returns a Map instead of an object

### array/mapPrimitive(val:any[], opts?:{valtrim:false;keyround:false;valround:false;filter_fn:(el)=>boolean})
Map an array of primitives (number/string)
```typescript
import mapPrimitive from '@valkyriestudios/utils/array/mapPrimitive';
mapPrimitive([1,2,3]); // {1: 1, 2: 2, 3: 3}
mapPrimitive(['hello', 'hello', 'foo', 'bar']); // {hello: 'hello', foo: 'foo', bar: 'bar'}
mapPrimitive(['hello', ' hello', 'foo', '  foo'], {valtrim: true}); // {hello: 'hello', foo: 'foo'}
```

Allows filtering out unwanted values:
```typescript
import mapPrimitive from '@valkyriestudios/utils/array/mapPrimitive';
mapPrimitive([1,2,'bla', 3, false], {filter_fn: isNumber}); // {1: 1, 2: 2, 3: 3}
```

### array/groupBy(val:Record[], handler:Function|string)
Return a grouped object from an array. This function **will automatically filter out any non/empty objects**.

Example usage when using a **function** as the handler
```typescript
import groupBy from '@valkyriestudios/utils/array/groupBy';
/* The output of the function will be what the key is on the map  */
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

/* Can also work with a property return  */
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
```
**Take note**: If the function returns an undefined or empty string the object will be added to a fallback group called '_'

Example usage when using a **string** as the handler to denote a grouping by a certain property name
```typescript
import groupBy from '@valkyriestudios/utils/array/groupBy';
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

**Take note**: any object without the key will be added to a fallback group called '_'


### array/dedupe(val:Array, opts?:{key:string; filter_fn})
Remove all duplicates from an array, behind the scenes it uses the fnv 1A hash algorithm to performantly do comparisons.
```typescript
import dedupe from '@valkyriestudios/utils/array/dedupe';
dedupe(['a','a','b','c','c']); // ['a', 'b', 'c']
dedupe(['1',1,'2',2]); // ['1','2']
dedupe([new RegExp(/ab+c/, 'i'), new RegExp(/ab+c/, 'i')]); // [new RegExp(/ab+c/, 'i')]
dedupe([new Date('2012-02-02'), new Date('2012-02-02')]); // [new Date('2012-02-02')]
dedupe(['hello', 'hello', 'world']); // ['hello', 'world']
dedupe(['hello', 'hello', 'world', false, 'world'], {filter_fn: el => isNotEmptyString(el)}); // ['hello', 'world']
```

Also supports deduping according to a specific `key`:
```typescript
import dedupe from '@valkyriestudios/utils/array/dedupe';

const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 1, name: 'Alicia' }, // duplicate id
];

// Deduplicate by `id`
const uniqueUsers = dedupe(users, { key: 'id' });
console.log(uniqueUsers);
// => [ { id: 1, name: "Alice" }, { id: 2, name: "Bob" } ]
```

Take Note: The filtering is applied while deduping, ensuring O(n) performance, as such this is faster than dedupe(arr.filter(...))

### array/join(val:Array, opts:object={delim:' ',trim:true,valtrim:true,innertrim:true,valround:false,dedupe:false})
Concatenate the values within an array into a string, behind the scenes this will automatically filter out any value that is not a string or numerical value. For strings it will automatically trim (and remove if empty after trimming) before joining.

```typescript
import join from '@valkyriestudios/utils/array/join';
join(['Valkyrie', 'Studios']); // 'Valkyrie Studios'
join([5.1, '  years ', 'ago'], {valround: 0}); // '5 years ago'
join(['peter   ', '  valkyrie  '], {delim: '@'}); // 'peter@valkyrie'
join([user.first_name, user.last_name]); // 'John' (where user is {first_name: 'John', last_name: false})
join(['  a', 1], {delim: '', valtrim: false, trim: false}); // '  a1'
join(['  hello  world  ', 'this   is    peter   '], {valtrim:true, innertrim: true, delim: ' '}); // 'hello world this is peter'
join(['  prop_1 ', 'prop_2', ' prop_1', '  prop_2'], {delim: ',', dedupe: true}); // 'prop_1,prop_2'
```

### array/shuffle(val:Array)
Shuffle an array (Fisher-Yates) in O(n), take note this changes the passed value

```typescript
import shuffle from '@valkyriestudios/utils/array/shuffle';
const arr = [1, 2, 3, 4, 5, 6];
shuffle(arr);
// [4, 6, 3, 2, 5, 1]
```

### array/sort(val:Array[object], by:string|Function, dir:Enum(asc,desc), options:Object)
Sort an array of objects, uses an implementation of [Tony Hoare's quicksort](https://cs.stanford.edu/people/eroberts/courses/soco/projects/2008-09/tony-hoare/quicksort.html)

```typescript
import sort from '@valkyriestudios/utils/array/sort';
const out = sort([
    {test: 'Peter'},
    {test: 'Jack'},
    {test: 'Pony'},
    {test: 'John'},
    {test: 'Joe'},
    {test: 'Bob'},
    {test: 'Alice'},
], 'test', 'desc');
// [{test: 'Pony'}, {test: 'Peter'}, {test: 'John'}, {test: 'Joe'}, {test: 'Jack'}, {test: 'Bob'}, {test: 'Alice'}]
```

```typescript
import sort from '@valkyriestudios/utils/array/sort';
const out = sort([
    {test: 'Peter'},
    {test: 'Jack'},
    {test: 'Pony'},
    {test: 'John'},
    {test: 'Joe'},
    {test: 'Bob'},
    {test: 'Alice'},
], 'test', 'asc');
// [{test: 'Alice'}, {test: 'Bob'}, {test: 'Jack'}, {test: 'Joe'}, {test: 'John'}, {test: 'Peter'}, {test: 'Pony'}]
```

allows passing a function to determine the key to sort by

```typescript
import sort from '@valkyriestudios/utils/array/sort';
const out = sort([
    {test: 'Peter'},
    {test: 'Jack'},
    {test: 'Pony'},
    {test: 'JOHn'},
    {test: 'Joe'},
    {test: 'Bob'},
    {test: 'Alice'},
], el => el.test.toLowerCase(), 'desc');
// [{test: 'Pony'}, {test: 'Peter'}, {test: 'JOHn'}, {test: 'Joe'}, {test: 'Jack'}, {test: 'Bob'}, {test: 'Alice'}]
```

auto-cleans input to only contains non-empty objects

```typescript
import sort from '@valkyriestudios/utils/array/sort';
const out = sort([
    {test: 'Peter'},
    {},
    {test: 'Jack'},
    {test: 'Pony'},
    {test: 'JOHn'},
    false,
    {test: 'Joe'},
    {test: 'Bob'},
    undefined,
    {test: 'Alice'},
], el => el.test.toLowerCase(), 'desc');
// [{test: 'Pony'}, {test: 'Peter'}, {test: 'JOHn'}, {test: 'Joe'}, {test: 'Jack'}, {test: 'Bob'}, {test: 'Alice'}]
```

allows passing custom filter function to clean input
Take note: Sort will still verify that the object is not an empty object, even when passing a custom filter function.

```typescript
import sort from '@valkyriestudios/utils/array/sort';
const out = sort([
    {test: 'Peter'},
    {},
    {test: 'Jack'},
    {test: 'Pony'},
    {test: false},
    {test: 'JOHn'},
    false,
    {test: 'Joe'},
    {test: undefined},
    {test: 'Bob'},
    undefined,
    {test: 'Alice'},
], el => el.test.toLowerCase(), 'desc', {filter_fn: el => isNotEmptyString(el.test)});
// [{test: 'Pony'}, {test: 'Peter'}, {test: 'JOHn'}, {test: 'Joe'}, {test: 'Jack'}, {test: 'Bob'}, {test: 'Alice'}]
```

allows passing custom options to position elements without a proper key (nokey_atend, defaults to true), or hide them (nokey_hide, defaults to false)

```typescript
import sort from '@valkyriestudios/utils/array/sort';
const arr = [{test: 'Peter'}, {test: undefined}, {test: 'Jack'}, {test: 'Pony'}, {uid: 100}, {test: 'JOHn'}];
const out = sort(arr, el => el.test.toLowerCase(), 'desc', {nokey_atend: false});
// [{test: undefined}, {uid: 100}, {test: 'Pony'}, {test: 'Peter'}, {test: 'JOHn'}, {test: 'Jack'}]

const out = sort(arr, el => el.test.toLowerCase(), 'desc', {nokey_atend: true});
// [{test: 'Pony'}, {test: 'Peter'}, {test: 'JOHn'}, {test: 'Jack'}, {test: undefined}, {uid: 100}]

const out = sort(arr, el => el.test.toLowerCase(), 'desc', {nokey_hide: true});
// [{test: 'Pony'}, {test: 'Peter'}, {test: 'JOHn'}, {test: 'Jack'}]
```

### array/split(val:any[], size:number, opts?:{filter_fn})
Splits an array into subarray of provided size with optional filter
```typescript
import split from '@valkyriestudios/utils/array/split';
split([1,2,3,4,5], 2); // [[1,2],[3,4],[5]]
split([1, 2, false, 4, 5], 2, {filter_fn: isInteger}); // [[1,2],[4,5]]
```

Take Note: The filtering is applied while splitting, ensuring O(n) performance, as such this is faster than split(arr.filter(...), ...)

### boolean/is(val:any)
Check if a variable is of type Boolean
```typescript
import isBoolean from '@valkyriestudios/utils/boolean/is';
isBoolean(null); // FALSE
isBoolean(false); // TRUE
isBoolean(true); // TRUE
```

### caching/LRU({max_size?:number})
Class-based LRU (Least Recently Used) cache utility with configurable max_size (defaults to 100). The LRU cache is internally used in `caching/memoize`, `date/format`, `date/isFormat` to reduce setup times and runtime memory usage but can also be used independently.

Entries are automatically removed from cache based on the max size of the cache and how recently they were used

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

Take Note: The cache max_size can be reconfigured at runtime, eg:
```typescript
import LRU from '@valkyriestudios/utils/caching/LRU';

const cache = new LRU({max_size: 10});
cache.max_size = 20;
```

### caching/memoize(fn:Function, resolver:Function=false, cache_duration_ms?:number|false = false, cache_max_size?:number = 100)
memoize the output of a function. An optional resolver function can be passed which allows custom cache key generation.

```typescript
import memoize from '@valkyriestudios/utils/caching/memoize';

const memoized_function = memoize((a) => {
    return fnv1A(a);
});
```

Take Note: Also supports async functions and cache busting, eg:
```typescript
import memoize from '@valkyriestudios/utils/caching/memoize';

async function retrieveUser (userId:string) {
    ...
}

/* Async but with no cache busting */
const memoized = memoize(retrieveUser);
await memoized('123456'); /* Original function will be called */
await memoized('123456'); /* Original function will not be called and memoized cache will be returned */

/* Async with cache busting after 5 seconds */
const memoized = memoize(retrieveUser, undefined, 5000);
await memoized('123456'); /* Original function will be called */
await memoized('123456'); /* Original function will not be called and memoized cache will be returned */

... (some time longer than 5 seconds passes)

await memoized('123456'); /* Original function will be called and re-cached */

/* Async with cache busting after 60 seconds and a max cache size of 50 entries*/
const memoized = memoize(retrieveUser, undefined, 60000, 50);
```

### date/is(val:unknown)
Check if a variable is of type Date and valid
```typescript
import isDate from '@valkyriestudios/utils/date/is';
isDate(new Date('December 17, 1995 03:24:00')); // TRUE
isDate('December 17, 1995 03:24:00'); // FALSE
```

### date/isLeap(val:Date)
Check if a date is in a leap year or not
```typescript
import isLeap from '@valkyriestudios/utils/date/isLeap';
isLeap(new Date("2022-02-07T14:30:59.000Z")); // false
isLeap(new Date("2024-02-07T14:30:59.000Z")); // true
```

### date/isFormat(val:unknown, spec:string)
Check if a variable is a string in a particular date format
```typescript
import isFormat from '@valkyriestudios/utils/date/isFormat';
isFormat('2024-02-07', 'YYYY-MM-DD'); // TRUE
isFormat('2024-2-07', 'YYYY-MM-DD'); // FALSE
isFormat('12:30 AM', 'HH:mm A'); // TRUE
isFormat('2024-Q4', 'YYYY-[Q]Q'); // TRUE
isFormat('2024-Q5', 'YYYY-[Q]Q'); // FALSE (there is no such thing as a fifth quarter)
isFormat('2024-02-29T12:30:00.000Z', 'ISO'); // TRUE
isFormat('2023-02-29T12:30:00.000Z', 'ISO'); // FALSE (leap year)
```

Available tokens for usage in spec:
| Token     | Description               | Example       |
|:---------|:--------------------------|:---------------|
| `YYYY` | Full Year | 2021 |
| `Q` | Quarters of the year | 1 2 3 4 |
| `MM` | Month as 2 char | 01 02 .. 11 12 |
| `DD` | Day of month as 2 char | 01 02 .. 30 31 |
| `HH` | Hours as 2-char | 00 01 .. 22 23 |
| `mm` | Minutes as 2-char | 00 01 .. 58 59 |
| `ss` | Seconds as 2-char | 00 01 .. 58 59 |
| `SSS` | Milliseconds as 3-digit | 000 001 ... 998 999 |
| `A` | Uppercase AM/PM | AM ... PM |
| `a` | Lowercase AM/PM | am ... pm |
| `Z` | Zone, does not allow full zone names, only Z or offsets | `Z` `+02:00` |
| `ISO` | Check for full iso date format, take note this enforces milliseconds as a requirement | 2024-02-03T10:28:30.000Z |

Allows for marking certain portions as optional by wrapping in `{...}`:
```typescript
import isFormat from '@valkyriestudios/utils/date/isFormat';
isFormat('2024-02-07', 'YYYY-MM-DD{THH:mm:ss}'); // true
isFormat('2024-02-07T14:50', 'YYYY-MM-DD{THH:mm:ss}'); // false, optional part passed but invalid
isFormat('2024-02-07T14:50:30', 'YYYY-MM-DD{THH:mm:ss}'); // true
```

Note: The `ISO` token is a shorthand for `YYYY-MM-DDTHH:mm:ss{.SSS}Z`
Note: You can escape characters by surrounding them with `[...]` in your spec, eg: `YYYY-[Q]Q` would check for example `2024-Q1`

### date/diff(val_a:Date, val_b:Date, key:string)
Take two incoming dates and return the difference between them in a certain unit. Possible key options(week,day,hour,minute,second,millisecond).

Note: Does not touch the passed date objects, if no key is passed will default to millisecond
```typescript
import diff from '@valkyriestudios/utils/date/diff';
diff(new Date("2022-10-05T13:12:11+02:00"), new Date("2022-11-05T13:12:11+06:00"), 'week'); // -4.404761904761905
diff(new Date("2022-11-05T13:12:11+06:00"), new Date("2022-10-05T13:12:11+02:00"), 'day'); // 30.83333333333333332
diff(new Date("2022-11-05T13:12:11+06:00"), new Date("2022-10-05T13:12:11+02:00"), 'hour'); // 740
diff(new Date("2022-10-05T13:12:11+02:00"), new Date("2022-10-05T17:43:09.344+06:00"), 'minute'); // -30.9724
diff(new Date("2022-10-05T13:12:11+02:00"), new Date("2022-10-05T17:43:09.344+06:00"), 'second'); // -1858.344
diff(new Date("2022-10-05T13:12:11+02:00"), new Date("2022-10-05T17:43:09.344+06:00"), 'millisecond'); // -1858344
diff(new Date("2022-11-05T13:12:11+06:00"), new Date("2022-10-05T13:25:43.898+02:00")); // 2663187102
```

### date/format(val:Date, spec:string, locale?:string, zone?:string, startOfWeek?:'mon'|'sun'|'sat'):string
Format a date according to a spec/locale and zone

**Take Note**:
- The locale is by default set to `en-US`
- The zone is by default detected as the time zone of the client
- If we fail to detect the time zone we default to `UTC`
- The start of week is by default set to `mon`, the supported values are `mon`, `sun`, `sat`
- You can escape characters by surrounding them with `[...]` in your spec, eg: `YYYY-[Q]Q` would for example become `2024-Q1`

**Available Tokens**:
| Token     | Description               | Example       |
|:---------|:--------------------------|:---------------|
| `YYYY` | Full Year | 2021 |
| `Q` | Quarters of the year | 1 2 3 4 |
| `MMMM` | Month in full | January February ... November December |
| `MMM` | Month as 3 char | Jan Feb ... Nov Dec |
| `MM` | Month as 2 char | 01 02 .. 11 12 |
| `M` | Month as pure digit | 1 2 .. 11 12 |
| `WW` | Week Number as 2 char | 01 02 .. 52 53 |
| `W` | Week Number as pure digit | 1 2 .. 52 53 |
| `DD` | Day of month as 2 char | 01 02 .. 30 31 |
| `D` | Day of month as 1 char | 1 2 .. 30 31 |
| `dddd` | Day of week in full | Sunday Monday ... Saturday |
| `ddd` | Day of week as 3 char | Sun Mon ... Fri Sat |
| `HH` | Hours as 2-char | 00 01 .. 22 23 |
| `H` | Hours as pure digit | 0 1 .. 22 23 |
| `hh` | Hours in 12 hour time as 2 char | 01 02 ... 11 12 |
| `h` | Hours in 12 hour time as pure digit | 1 2 ... 11 12 |
| `mm` | Minutes as 2-char | 00 01 .. 58 59 |
| `m` | Minutes as pure digit | 0 1 .. 58 59 |
| `ss` | Seconds as 2-char | 00 01 .. 58 59 |
| `s` | Seconds as pure digit | 0 1 .. 58 59 |
| `SSS` | Milliseconds as 3-digit | 000 001 ... 998 999 |
| `A` | Uppercase AM/PM | AM ... PM |
| `a` | Lowercase AM/PM | am ... pm |
| `l` | Locale-specific short Date | 15/07/2024 |
| `L` | Locale-Specific date | 15 jul 2024 |
| `t` | Locale-specific short time | 10:28 AM |
| `T` | Locale-specific time with seconds | 10:28:30 AM |
| `ISO` | Alias for `YYYY-MM-DD[T]HH:mm:ss.SSS[Z]` | 2025-03-16T14:24:59.010Z |

**Additional**:
Format has several additional functions defined which help usage inside of an ecosystem (eg: webapp) by **overriding the global defaults** used by format.
| Function     | Description               | Example       |
|:---------|:--------------------------|:---------------|
| setZone | Sets the global timezone used by format | `format.setZone("Europe/Brussels")` |
| getZone | Returns the global timezone used by format ||
| setLocale | Sets the global locale used by format | `format.setLocale("nl-BE")` |
| getLocale | Returns the global locale used by format ||
| setStartOfWeek | Sets the global start of week used by format | `format.setStartOfWeek("sun")` |
| getStartOfWeek | Returns the global start of week used by format ||

**Usage**:

```typescript
import format from '@valkyriestudios/utils/date/format';

format(new Date('2023-01-10T14:30:00Z'), '[Today is] dddd, MMMM D, YYYY [at] h:mm A', 'en', 'Europe/Brussels');
//  'Today is Tuesday, January 10, 2023 at 2:30 PM'

format(new Date('2022-07-14T16:40:30Z'), 'dddd, [Year] Q Q M D [à] hh:mm A [string]', 'fr', 'Asia/Singapore');
// 'vendredi, Year 3 3 7 15 à 12:40 AM string'

format(new Date('2022-07-14T16:40:30Z'), 'YYYY-MM-DD', 'fr', 'Asia/Singapore');
// 2022-07-15

format(new Date('2022-07-14T16:40:30Z'), 'YYYY-MM-DD', 'fr', 'Europe/Brussels');
// 2022-07-14

// ... (somewhere else in your code)

format.setLocale('fr');
format.setZone('Asia/Singapore');

// ... (somewhere else in your code)

format(new Date('2022-07-14T16:40:30Z'), 'dddd, [Year] Q Q M D [à] hh:mm A [string]');
// 'vendredi, Year 3 3 7 15 à 12:40 AM string'
format(new Date('2022-07-14T19:40:30Z'), 'dddd, YYYY-MM-DD');
// 'vendredi, 2022-07-15'
```

### date/toUTC(val:Date)
Takes the passed date object and returns a new date object set for utc

### date/toUnix(val:Date)
Takes the passed date object and returns its unix timestamp in seconds

### date/nowUnix()
Returns the current unix timestamp in seconds

### date/nowUnixMs()
Returns the current unix timestamp in milliseconds

### date/setTimeUTC(val:Date, props:{hour?:number;minute?:number;second?:number;millisecond?:number})
Take the incoming date and return a date where the time portion is set to the values in the provided props

Note: Does not touch the date object passed
```typescript
import setTimeUTC from '@valkyriestudios/utils/date/setTimeUTC';
setTimeUTC(new Date("2023-05-04T12:04:27.432Z"), {hour: 5}); // new Date("2023-05-04T05:04:27.432Z")
setTimeUTC(new Date("2023-05-04T12:04:27.432Z"), {hour: 5, minute: 30}); // new Date("2023-05-04T05:30:27.432Z")
setTimeUTC(new Date("2023-05-04T12:04:27.432Z"), {hour: 5, minute: 30, second: 0}); // new Date("2023-05-04T05:30:00.432Z")
setTimeUTC(new Date("2023-05-04T12:04:27.432Z"), {hour: 5, minute: 30, second: 0, millisecond: 0}); // new Date("2023-05-04T05:30:00.000Z")
setTimeUTC(new Date("2023-05-04T12:04:27.432Z"), {minute: 30, second: 0, millisecond: 0}); // new Date("2023-05-04T12:30:00.000Z")
setTimeUTC(new Date("2023-05-04T12:04:27.432Z"), {second: 9, millisecond: 0}); // new Date("2023-05-04T12:04:09.000Z")
```

### date/startOfUTC(val:Date, key:string)
Take the incoming date and return a date set to the start of passed key. Possible key options(year,quarter,month,week,week_sun,week_mon,week_tue,week_wed,week_thu,week_fri,week_sat,day,hour,minute,second).

Note: Does not touch the date object passed
```typescript
import startOfUTC from '@valkyriestudios/utils/date/startOfUTC';
startOfUTC(new Date("2023-05-04T12:04:27+02:00"), 'year'); // new Date("2023-01-01T00:00:00.000Z")
startOfUTC(new Date("2023-05-04T12:04:27+02:00"), 'quarter'); // new Date("2023-04-01T00:00:00.000Z")
startOfUTC(new Date("2023-05-04T12:04:27+02:00"), 'month'); // new Date("2023-05-01T00:00:00.000Z")
startOfUTC(new Date("2023-05-14T12:04:27+02:00"), 'week'); // new Date("2023-05-08T00:00:00.000Z")
startOfUTC(new Date("2023-02-03T12:04:27+02:00"), 'week'); // new Date("2023-01-30T00:00:00.000Z")
startOfUTC(new Date("2023-01-01T12:04:27+02:00"), 'week'); // new Date("2022-12-26T00:00:00.000Z")
startOfUTC(new Date("2023-05-04T12:04:27+02:00"), 'week_sun'); // new Date("2023-04-30T00:00:00.000Z")
startOfUTC(new Date("2023-02-03T12:04:27+02:00"), 'week_sun'); // new Date("2023-01-29T00:00:00.000Z")
startOfUTC(new Date("2022-01-01T12:04:27+02:00"), 'week_sun'); // new Date("2021-12-26T00:00:00.000Z")
startOfUTC(new Date("2023-05-04T12:04:27+02:00"), 'day'); // new Date("2023-05-04T00:00:00.000Z")
startOfUTC(new Date("2023-05-04T12:04:27+02:00"), 'hour'); // new Date("2023-05-04T10:00:00.000Z")
startOfUTC(new Date("2023-05-04T12:04:27+02:00"), 'minute'); // new Date("2023-05-04T10:04:00.000Z")
startOfUTC(new Date("2023-05-04T12:04:27.043+02:00"), 'second'); // new Date("2023-05-04T10:04:27.000Z")
```

### date/endOfUTC(val:Date, key:string)
Take the incoming date and return a date set to the end of passed key. Possible key options(year,quarter,month,week,week_sun,week_mon,week_tue,week_wed,week_thu,week_fri,week_sat,day,hour,minute,second).

Note: Does not touch the date object passed
```typescript
import endOfUTC from '@valkyriestudios/utils/date/endOfUTC';
endOfUTC(new Date("2023-05-04T12:04:27+02:00"), 'year'); // new Date("2023-12-31T23:59:59.999Z")
endOfUTC(new Date("2023-05-04T12:04:27+02:00"), 'quarter'); // new Date("2023-06-30T23:59:59.999Z")
endOfUTC(new Date("2023-05-04T12:04:27+02:00"), 'month'); // new Date("2023-05-31T23:59:59.999Z")
endOfUTC(new Date("2023-05-04T12:04:27+02:00"), 'week'); // new Date("2023-05-07T23:59:59.999Z")
endOfUTC(new Date("2023-05-13T12:04:27+02:00"), 'week'); // new Date("2023-05-14T23:59:59.999Z")
endOfUTC(new Date("2023-05-14T12:04:27+02:00"), 'week'); // new Date("2023-05-14T23:59:59.999Z")
endOfUTC(new Date("2023-02-27T12:04:27+02:00"), 'week'); // new Date("2023-03-05T23:59:59.999Z")
endOfUTC(new Date("2022-12-29T12:04:27+02:00"), 'week'); // new Date("2023-01-01T23:59:59.999Z")
endOfUTC(new Date("2023-05-04T12:04:27+02:00"), 'week_sun'); // new Date("2023-05-06T23:59:59.999Z")
endOfUTC(new Date("2023-05-12T12:04:27+02:00"), 'week_sun'); // new Date("2023-05-13T23:59:59.999Z")
endOfUTC(new Date("2023-05-06T12:04:27+02:00"), 'week_sun'); // new Date("2023-05-06T23:59:59.999Z")
endOfUTC(new Date("2023-03-29T12:04:27+02:00"), 'week_sun'); // new Date("2023-04-01T23:59:59.999Z")
endOfUTC(new Date("2021-12-28T12:04:27+02:00"), 'week_sun'); // new Date("2022-01-01T23:59:59.999Z")
endOfUTC(new Date("2023-05-04T12:04:27+02:00"), 'day'); // new Date("2023-05-04T23:59:59.999Z")
endOfUTC(new Date("2023-05-04T12:04:27+02:00"), 'hour'); // new Date("2023-05-04T10:59:59.999Z")
endOfUTC(new Date("2023-05-04T12:04:27+02:00"), 'minute'); // new Date("2023-05-04T10:04:59.999Z")
endOfUTC(new Date("2023-05-04T12:04:27.043+02:00"), 'second'); // new Date("2023-05-04T10:04:27.999Z")
```

### date/addUTC(val:Date, amount:integer, key:string)
Take the incoming date and add a certain amount of the passed key. Possible key options(year,years,month,months,day,days,hour,hours,minute,minutes,second,seconds,millisecond,milliseconds).

Note: Does not touch the date object passed
```typescript
import addUTC from '@valkyriestudios/utils/date/addUTC';
addUTC(new Date("2022-10-05T13:12:11+02:00"), 10, 'year'); // new Date("2032-10-05T11:12:11.000Z")
addUTC(new Date("2022-10-05T13:12:11+02:00"), -10, 'year'); // new Date("2012-10-05T11:12:11.000Z")
addUTC(new Date("2022-10-05T13:12:11+02:00"), 10, 'month'); // new Date("2023-08-05T11:12:11.000Z")
addUTC(new Date("2022-10-05T13:12:11+02:00"), -8970, 'month'); // new Date("1275-04-05T11:12:11.000Z")
addUTC(new Date("2022-10-05T13:12:11+02:00"), 200, 'day'); // new Date("2023-04-23T11:12:11.000Z")
addUTC(new Date("2022-10-05T13:12:11+02:00"), -400, 'day'); // new Date("2021-08-31T11:12:11.000Z")
addUTC(new Date("2022-10-05T13:12:11+02:00"), 2200, 'hour'); // new Date("2023-01-05T03:12:11.000Z")
addUTC(new Date("2022-10-05T13:12:11+02:00"), -10, 'hour'); // new Date("2022-10-05T01:12:11.000Z")
addUTC(new Date("2022-10-05T13:12:11+02:00"), 59, 'minute'); // new Date("2022-10-05T12:11:11.000Z")
addUTC(new Date("2022-10-05T13:12:11+02:00"), 336000, 'minute'); // new Date("2023-05-26T19:12:11.000Z")
addUTC(new Date("2022-10-05T13:12:11+02:00"), -34, 'minute'); // new Date("2022-10-05T10:38:11.000Z")
addUTC(new Date("2022-10-05T13:12:11+02:00"), -769, 'minute'); // new Date("2022-10-04T22:23:11.000Z")
addUTC(new Date("2022-10-05T13:12:11+02:00"), 59, 'second'); // new Date("2022-10-05T11:13:10.000Z")
addUTC(new Date("2022-10-05T13:12:11+02:00"), 2873 * 60, 'second'); // new Date("2022-10-07T11:05:11.000Z")
addUTC(new Date("2022-10-05T13:12:11+02:00"), 336000 * 60, 'second'); // new Date("2023-05-26T19:12:11.000Z")
addUTC(new Date("2022-10-05T13:12:11+02:00"), -10, 'second'); // new Date("2022-10-05T11:12:01.000Z")
```

### deep/freeze(val:Object)
Recursively freezes all properties of an object
```typescript
import deepFreeze from '@valkyriestudios/utils/deep/freeze';
const myObj = deepFreeze({
    a: 2,
    b: {
        c: 3,
        d: {
            e: 'hello',
        }
    }
});
Object.isFrozen(myObj); // TRUE
Object.isFrozen(myObj.b); // TRUE
Object.isFrozen(myObj.b.d); // TRUE
```

### deep/seal(val:Object)
Recursively freezes all properties of an object
```typescript
import deepSeal from '@valkyriestudios/utils/deep/seal';
const myObj = deepSeal({
    a: 2,
    b: {
        c: 3,
        d: {
            e: 'hello',
        }
    }
});
Object.isSealed(myObj); // TRUE
Object.isSealed(myObj.b); // TRUE
Object.isSealed(myObj.b.d); // TRUE
Object.isFrozen(myObj.b.d); // FALSE
```

### deep/set(obj:Object, path:string, value:any=null, define:boolean=false)
Sets a property and its value deep in the structure of an object
```typescript
import deepSet from '@valkyriestudios/utils/deep/set';
const myObj = {
    a: 2,
};
deepSet(myObj, 'b.c.d.e', 4);
myObj.b.c.d.e; // 4

const myObj2 = {
    a: 2,
    b: [
        { price : 2 },
        { price : 4 },
    ],
};
deepSet(myObj2, 'b[0].price', 100);
deepSet(myObj2, 'b[1].price', 500);
myObj2.b[0].price; // 100
myObj2.b[1].price; // 500

const myObj3 = {
    a: 2,
};
deepSet(myObj3, 'b.c', { value: function () => {...} }, true);
myObj3.b.c; // Function
```

### deep/get(obj:Object, path:string, get_parent:boolean=false)
Retrieves a value based on a path in a deeply nested object
```typescript
import deepGet from '@valkyriestudios/utils/deep/get';
const myObj = {
    a: 2,
    b: [
        { price : 2 },
        { price : 4 },
    ],
};
deepGet(myObj, 'b[0].price', true); // [{price: 2}, {price: 4}]

const myObj2 = {
    a: 2,
    b: [
        { price : 2 },
        { price : 4 },
    ],
};
deepGet(myObj2, 'b[0].price'); // 2

deepGet(myObj2, 'b.price'); // [2, 4]
```

### equal(a:any, b:any)
Check if a variable is equal to another one
```typescript
import equal from '@valkyriestudios/utils/equal';
equal(5, 6); // FALSE
equal(1, 1); // TRUE
equal([0, 1, 2], [1, 2]); // FALSE
equal({a: 1, b: 2}, {a: 1, b: 3}); // FALSE
equal({a: 1, b: 2}, {a: 1, b: 2}); // TRUE
equal(new Date('2012-20-09'), '2012-20-09'); // TRUE ( check is being done on unix timestamp )
equal(new RegExp(/ab+c/, 'i'), /ab+c/i); // TRUE
```

### function/debounce(val:Fn, wait:number)
Wrap a function in a debounce proxy that waits for X uninterrupted milliseconds before running callback function
```typescript
const log = (message: string) => console.log(message);
const debouncedLog = debounce(log, 2000);
debouncedLog("Hello, World!"); // 2 seconds later we see log

debouncedLog("Hello, World!");
debouncedLog.cancel(); // No log as we cancelled

debouncedLog("Hello, World!");
debouncedLog.flush(); // Immediate log no 2 second debounce

debouncedLog("Hello, World!");
debouncedLog.cancel();
debouncedLog.flush(); // Nothing happens as timeout was killed through cancel
````

### function/is(val:unknown)
Check if a variable is a Function
```typescript
import isFunction from '@valkyriestudios/utils/function/is';
isFunction(() => console.log('Hello')); // TRUE
isFunction('December 17, 1995 03:24:00'); // FALSE
```

### function/isAsync(val:unknown):boolean
Check if a variable is an async function
```typescript
import isAsync from '@valkyriestudios/utils/function/isAsync';
isAsync(() => console.log('Hello')); // FALSE
isAsync(async () => {
    await sleep(1000);
    console.log('Hello');
}); // TRUE
```

### function/noop()
An empty function that can be used in (for example) piping

### function/noopreturn(val:any)
An empty function that will pass back the variable that it was passed

### function/noopresolve(val:any)
An empty function that returns a promise that will immediately resolve itself and pass back any variable that was passed to it

### function/sleep(val:int)
An empty function that returns a promise that will resolve after X milliseconds, default is set to 1000ms.
```typescript
import sleep from '@valkyriestudios/utils/function/sleep';
await sleep(1000); // sleeps for 1 second
````

### formdata/is(val:any)
Check if a variable is of type FormData
```typescript
import isFormData from '@valkyriestudios/utils/formdata/is';
isFormData(new FormData()); // TRUE
isFormData({hi: 'there'}); // FALSE
```

### formdata/toObject(val:FormData, {raw?:string[]|true;single?:string[];normalize_bool?:boolean;normalize_date?:bool;normalize_number?:bool} = {})
Converts an instance of FormData to an object
```typescript
import toObject from '@valkyriestudios/utils/formdata/toObject';
const form = new FormData();
form.append('name', 'Alice');
form.append('hobbies', 'reading');
form.append('hobbies', 'writing');
form.append('emptyField', '');

toObject(form); // {name: 'Alice', hobbies: ['reading', 'writing'], emptyField: ''}
```

Automatically converts strings to numbers, dates, booleans and nests objects/arrays based on key structures:
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

Allows blacklisting keys that should not be normalized into numbers/booleans but should remain as they are:
```typescript
const form = new FormData();
form.append('pincode', '0123');
form.append('enabled', 'false');
form.append('config.isGood', 'true');
form.append('config.amount', ' 50 ');

toObject(form, {raw: ['pincode']}); /* {
    pincode: '0123',
    enabled: false,
    config: {
        isGood: true,
        amount: 50,
    },
} */
```

Take Note: Set raw to `true` to do no normalization

Allows passing a 'single' list that tells the system to NEVER turn a particular value into an array of values:
```typescript
const formData = new FormData();
formData.append('status', 'active');
formData.append('status', 'inactive');
formData.append('action', 'save');
formData.append('action', 'reset');

toObject(formData, { single: ['status', 'action'] }) /* {status: 'inactive', action: 'reset'} */
```

Allows configuring what types of data to normalize:
```typescript
const form = new FormData();
form.append('pincode', '0123');
form.append('enabled', 'false');
form.append('config.isGood', 'true');
form.append('config.amount', ' 50 ');

toObject(form, {raw: ['pincode'], normalize_bool: false}); /* {
    pincode: '0123',
    enabled: 'false',
    config: {
        isGood: 'true',
        amount: 50,
    },
} */
```

### hash/guid()
Generate a unique identifier (guid) according to RFC4122
```typescript
import guid from '@valkyriestudios/utils/hash/guid';
guid(); // 245caf1a-86af-11e7-bb31-be2e44b06b34
```

### hash/hexId(size:number)
Generate a cryptographically secure random hex string.

⚠️ The size parameter is in bytes, the resulting string will be size * 2 characters long
```typescript
import hexId from '@valkyriestudios/utils/hash/hexId';

hexId(8); // "7a3c1b9f8e2d4c71"
hexId(16); // "3f6e1b2c4a7d9f0e2b6c8d1a3e4f7b9c"
```

### hash/uuidv7()
Generate a unique uuidv7 identifier according to [RFC 9562](https://www.rfc-editor.org/rfc/rfc9562)

These IDs are **time-ordered** while still being 128-bit random identifiers.
```typescript
import uuidv7 from '@valkyriestudios/utils/hash/uuidv7';

uuidv7(); // "018f4d5b-9c61-7d2f-8e3b-3a90b5f78c2d"
```

### hash/djb2(val:unknown)
Generate a djb2 hash from an object/array/primitive/...
```typescript
import djb2 from '@valkyriestudios/utils/hash/djb2';
djb2('hello world');
```

### hash/fnv1A(val:unknown)
Generate a fnv1A hash from an object/array/primitive/...
```typescript
import fnv1A from '@valkyriestudios/utils/hash/fnv1A';
fnv1A('hello world');
```

### Is
The utility found at `@valkyriestudios/utils/is` combines and exposes a barrel export of several other functions found within the library. This does not extend those utils but simply acts as an easy single import for many utils all at once.

These functions are the following:
- **Is.Array**
- **Is.NeArray**
- **Is.NotEmptyArray**
- **Is.Boolean**
- **Is.Date**
- **Is.Formdata**
- **Is.Function**
- **Is.AsyncFunction**
- **Is.Num**
- **Is.NumBetween**
- **Is.NumAbove**
- **Is.NumAboveOrEqual**
- **Is.NumBelow**
- **Is.NumBelowOrEqual**
- **Is.NumGt**
- **Is.NumGte**
- **Is.NumLt**
- **Is.NumLte**
- **Is.Number**
- **Is.NumberBetween**
- **Is.NumberAbove**
- **Is.NumberAboveOrEqual**
- **Is.NumberBelow**
- **Is.NumberBelowOrEqual**
- **Is.Int**
- **Is.IntBetween**
- **Is.IntAbove**
- **Is.IntAboveOrEqual**
- **Is.IntBelow**
- **Is.IntBelowOrEqual**
- **Is.IntGt**
- **Is.IntGte**
- **Is.IntLt**
- **Is.IntLte**
- **Is.Integer**
- **Is.IntegerBetween**
- **Is.IntegerBelow**
- **Is.IntegerBelowOrEqual**
- **Is.IntegerAbove**
- **Is.IntegerAboveOrEqual**
- **Is.RegExp**
- **Is.Object**
- **Is.NeObject**
- **Is.NotEmptyObject**
- **Is.String**
- **Is.StringBetween**
- **Is.NeString**
- **Is.NotEmptyString**
- **Is.Equal**
- **Is.Eq**

### modules/PubSub
A lightweight fire-and-forget publish–subscribe utility that supports both synchronous and asynchronous subscribers, with built‑in support for storing the last published data for each event.

This feature lets new subscribers immediately receive the most recent value for specific events.

The default storage behavior is configurable via the constructor or can be overridden on a per‑publish basis.

##### Usage
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

##### API Overview
- **new PubSub(options?: { logger?: LogFn; name?: string; store?: boolean })**
Creates a new PubSub instance.
-- **logger (optional)**: Custom logging function to capture errors.
-- **name (optional)**: A non‑empty string to name the instance.
-- **store (optional)**: A boolean to set the default behavior for storing published data (default is false).
- **publish(event: string, data?: unknown, store?: boolean): void**
Publishes data for a specific event.
-- If storage is enabled (via the default or the store override), the published data is stored for that event.
-- All subscribers for the event are invoked.
-- Supports both synchronous and asynchronous subscriber functions. Asynchronous errors are caught and logged.
- **subscribe(events: RawEvents, client_id?: string, override?: boolean): string | null**
Subscribes a client to one or more events.
-- Returns a client ID (either provided or generated) which can later be used to unsubscribe.
-- If stored data exists for an event, the new subscriber is immediately invoked with that data.
-- The override flag (defaults to true) determines whether existing subscriptions for the same client are replaced.
- **unsubscribe(client_id: string, event?: string | string[]): void**
Unsubscribes a client from the specified event(s) or all events if none are provided.
- **clientIds(event?: string | string[]): Set<string>**
Retrieves a set of client IDs subscribed to one or more events.
- **clear(event?: string | string[]): void**
Clears subscriptions for specific event(s) or all events if no event is specified.

##### Notes:
- **Data Storage:**
When storage is enabled, the last published value is tied to an event’s subscription entry. If there are no subscribers left, the stored value is automatically cleaned up.
- **Error Handling:**
Both synchronous and asynchronous errors are logged via the custom logger (if provided). The utility checks for thenables by verifying that the returned object has both then and catch methods.
- **Flexibility:**
The storage behavior can be controlled globally through the constructor or overridden for individual publish calls.

### modules/Scheduler
A Lightweight scheduler module that works with a cron-like syntax and can be easily configured/run at runtime.

**Take Note**: This does **not replace** cron, it is a module that runs at runtime and could be used to simulate cron-like behavior, but it is **not a replacement**.

##### Usage
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

##### API Overview
- **new Scheduler(options?: { logger?: LogFn; name?: string; timeZone?: string|null; parallel?:boolean|number; auto?: boolean })**
Creates a new Scheduler instance.
-- **logger (optional)**: Custom logging function to capture errors.
-- **name (optional)**: A non‑empty string to name the instance.
-- **timeZone (optional)**: (default=local timezone) The default timeZone the scheduler is run in
-- **parallel (optional)**: (default=true) Scheduler will run jobs that need to run in parallel, set to false to run linear, set to a number to run X jobs in parallel
-- **auto (optional)**: (default=false) Set to true to automatically run the schedule every 60 seconds
- **add(job: {name:string; schedule:string; fn: Function; timeZone?: string | null; data?: unknown}): boolean**
Add a job to the schedule
-- If a timeZone is passed we will automatically check against local time in that timeZone on whether or not the job needs to run.
-- If a data object is passed we will pass this data object to the provided function when run.
-- Schedule uses cron-like schedule and is compatible with most of the standard cron formats.
- **remove(name:string|string[]):void**
Removes one or multiple jobs by name from the schedule.
- **run(): Promise<void>**
Runs the schedule.
- **stopAutomaticRun():void**
Stops automatic running (if enabled)
- **startAutomaticRun():void**
Start automatic running (if not enabled)
- **static isCronSchedule(val:string):boolean**
Returns true if the provided value is a valid cron schedule, false if it isnt
- **static cronShouldRun(val:string, timeZone: string|null):boolean**
Given a cron schedule and an optional timeZone returns whether or not the cron schedule should be run now

##### Notes:
- **cron:**
This is not a cron replacement but rather a module that can be used at runtime to handle cron-like schedules in a seamless way.
- **auto:**
If running this on a system that is replicated it **is highly advised** to not turn on automatic runs but rather build a way to trigger the schedule on a single instance into your networking.

### number/is(val:unknown)
Check if a variable is a number
```typescript
import isNumber from '@valkyriestudios/utils/number/is';
isNumber('foo'); // FALSE
isNumber(4); // TRUE
isNumber(0.5); // TRUE
```

### number/isAbove(val:number, comp:number)
Check if a variable is a number above a certain bound
```typescript
import isNumberAbove from '@valkyriestudios/utils/number/isAbove';
isNumberAbove(5, 0); // TRUE
isNumberAbove(.1, 0); // TRUE
isNumberAbove(-1, -1); // FALSE
isNumberAbove(-10, -9); // FALSE
```

### number/isAboveOrEqual(val:number, comp:number)
Check if a variable is a number above or equal to a certain bound
```typescript
import isNumberAboveOrEqual from '@valkyriestudios/utils/number/isAboveOrEqual';
isNumberAboveOrEqual(5, 0); // TRUE
isNumberAboveOrEqual(.1, 0); // TRUE
isNumberAboveOrEqual(-1, -1); // TRUE
isNumberAboveOrEqual(-10, -9); // FALSE
```

### number/isBelow(val:number, comp:number)
Check if a variable is a number below a certain bound
```typescript
import isNumberBelow from '@valkyriestudios/utils/number/isBelow';
isNumberBelow(0, 5); // TRUE
isNumberBelow(0, .1); // TRUE
isNumberBelow(-1, -1); // FALSE
isNumberBelow(-9, -10); // FALSE
```

### number/isBelowOrEqual(val:number, comp:number)
Check if a variable is a number below or equal a certain bound
```typescript
import isNumberBelowOrEqual from '@valkyriestudios/utils/number/isBelowOrEqual';
isNumberBelowOrEqual(0, 5); // TRUE
isNumberBelowOrEqual(0, .1); // TRUE
isNumberBelowOrEqual(-1, -1); // TRUE
isNumberBelowOrEqual(-9, -10); // FALSE
```

### number/isBetween(val:number, min:number, max:number)
Check if a variable is a number between a range of numbers
```typescript
import isNumberBetween from '@valkyriestudios/utils/number/isBetween';
isNumberBetween(5, 0, 10); // TRUE
isNumberBetween(.1, 0, 1); // TRUE
isNumberBetween(-.1, -1, 0); // TRUE
isNumberBetween(0, 0, 1); // TRUE
isNumberBetween(-1, 0, 1); // FALSE
```

### number/isInteger(val:unknown)
Check if a variable is an integer
```typescript
import isInteger from '@valkyriestudios/utils/number/isInteger';
isInteger('foo'); // FALSE
isInteger(4); // TRUE
isInteger(0.5); // FALSE
```

### number/isIntegerAbove(val:number, comp:number)
Check if a variable is an integer above a certain bound
```typescript
import isIntegerAbove from '@valkyriestudios/utils/number/isIntegerAbove';
isIntegerAbove(5, 0); // TRUE
isIntegerAbove(.1, 0); // FALSE
isIntegerAbove(-1, -1); // FALSE
isIntegerAbove(-10, -9); // FALSE
```

### number/isIntegerAboveOrEqual(val:number, comp:number)
Check if a variable is an integer above or equal to a certain bound
```typescript
import isIntegerAboveOrEqual from '@valkyriestudios/utils/number/isIntegerAboveOrEqual';
isIntegerAboveOrEqual(5, 0); // TRUE
isIntegerAboveOrEqual(.1, 0); // FALSE
isIntegerAboveOrEqual(-1, -1); // TRUE
isIntegerAboveOrEqual(-10, -9); // FALSE
```

### number/isIntegerBelow(val:number, comp:number)
Check if a variable is an integer below a certain bound
```typescript
import isIntegerBelow from '@valkyriestudios/utils/number/isIntegerBelow';
isIntegerBelow(0, 5); // TRUE
isIntegerBelow(0, .1); // TRUE
isIntegerBelow(.4, 5); // FALSE
isIntegerBelow(-1, -1); // FALSE
isIntegerBelow(-9, -10); // FALSE
```

### number/isIntegerBelowOrEqual(val:number, comp:number)
Check if a variable is an integer below or equal to a certain bound
```typescript
import isIntegerBelowOrEqual from '@valkyriestudios/utils/number/isIntegerBelowOrEqual';
isIntegerBelowOrEqual(0, 5); // TRUE
isIntegerBelowOrEqual(0, .1); // TRUE
isIntegerBelowOrEqual(.4, 5); // FALSE
isIntegerBelowOrEqual(-1, -1); // TRUE
isIntegerBelowOrEqual(-9, -10); // FALSE
```

### number/isIntegerBetween(val:number, min:number, max:number)
Check if a variable is an integer between a range of numbers
```typescript
import isIntegerBetween from '@valkyriestudios/utils/number/isIntegerBetween';
isIntegerBetween(5, 0, 10); // TRUE
isIntegerBetween(.1, 0, 1); // FALSE
isIntegerBetween(-.1, -1, 0); // FALSE
isIntegerBetween(0, 0, 1); // TRUE
isIntegerBetween(-1, 0, 1); // FALSE
```

### number/isNumericalNaN(val:unknown)
Check if a variable is a numerical nan ( a number that is a NaN, this distinguishment is made since both a string or a number can be NaN)
```typescript
import isNumericalNaN from '@valkyriestudios/utils/number/isNumericalNaN';
isNumericalNaN('foo'); // FALSE
isNumericalNaN(NaN); // TRUE
```

### number/toPercentage(val:Number,precision:Number=0,min:Number=0,max:Number=1)
Calculate the percentage of a specific value in a range
```typescript
import toPercentage from '@valkyriestudios/utils/number/toPercentage';
toPercentage(0.50106579, 5); // 50.11658
toPercentage(-356, 0, -1000, 1000); // 32
toPercentage(0.5); // 50
```

### number/round(val:Number,precision:Number=0)
Round a numeric value to a specific amount of decimals
```typescript
import round from '@valkyriestudios/utils/number/round';
round(5.123456789, 0); // 5
round(5.123456789, 2); // 5.12
round(5.123456789, 5); // 5.12346
```

### number/randomBetween(min:Number=0,max:Number=10)
Generate a random numeric value between a min and max range
```typescript
import randomBetween from '@valkyriestudios/utils/number/randomBetween';
randomBetween(); // Will generate a random between 0 and 10
randomBetween(25, 100); // Will generate a random between 25 and 100
```

### number/randomIntBetween(min:Number=0,max:Number=10)
Generate a random numeric value between a min and max range (max not inclusive)
```typescript
import randomIntBetween from '@valkyriestudios/utils/number/randomIntBetween';
randomIntBetween(); // Will generate a random between 0 and 10 (10 not inclusive)
randomIntBetween(25, 100); // Will generate a random between 25 and 100 (100 not inclusive)
```

### object/is(val:unknown)
Check if a variable is of type Object
```typescript
import isObject from '@valkyriestudios/utils/object/is';
isObject({a: 1}); // TRUE
isObject(1); // FALSE
```

### object/isNotEmpty(val:unknown)
Check if a variable a non-empty object
```typescript
import isNotEmptyObject from '@valkyriestudios/utils/object/isNotEmpty';
isNotEmptyObject({a:1}); // TRUE
isNotEmptyObject({}); // FALSE
isNotEmptyObject('Hi'); // FALSE
```

### object/pick(obj:Object={}, keys:Array[string]=[])
Copies the keys passed in the 'keys' array from the passed object to a new object and returns that object.
<small>If a key wasn't found it will be set as undefined</small>
```typescript
import pick from '@valkyriestudios/utils/object/pick';
pick({a: 1, b: 2, c: 3}, ['a','b']); // {a: 1, b: 2}
```

### object/omit(obj:Object={}, keys:Array[string]=[])
Returns an object with the keys provided in the keys array stripped from the provided object.
```typescript
import { omit } from "@valkyriestudios/utils/object";
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

Also works with wildcards (take note, only as **prefix**):
```typescript
import { omit } from "@valkyriestudios/utils/object";
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
    meta: {
        phone: "...",
    },
}, ["age", "*.phone", "*.email", "*.password"]);
/**
Redacted here will be:
{
    firstName: "Peter",
    lastName: "Vermeulen",
    details: {isActive: true},
    meta: {}
}
*/
```

### object/scramble(obj:Object={}, keys:Array[string]=[], options?:{replacement?:string})
Returns an object with the keys provided in the keys array scrambled.
```typescript
import { scramble } from "@valkyriestudios/utils/object";
const redacted = scramble({
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
{
    firstName: "Peter",
    lastName: "Vermeulen",
    age: "***",
    details: {phone: "***", email: "***", isActive: true, password: "***"}
}
*/
```

Also works with wildcards (take note, only as **prefix**):
```typescript
import { scramble } from "@valkyriestudios/utils/object";
const redacted = scramble({
    firstName: "Peter",
    lastName: "Vermeulen",
    age: 34,
    details: {
        phone: "...",
        email: "...",
        isActive: true,
        password: "...",
    },
    meta: {
        phone: "...",
    },
}, ["age", "*.phone", "*.email", "*.password"]);
/**
Redacted here will be:
{
    firstName: "Peter",
    lastName: "Vermeulen",
    age: "***",
    details: {phone: "***", email: "***", isActive: true, password: "***"},
    meta: {phone: "***"}
}
*/
```

### object/merge(target:Object={},obj:Object|Object[]={}, opts?:{union?:boolean})
Merges two objects together, with the preference over the second object.
```typescript
import merge from '@valkyriestudios/utils/object/merge';
merge({a: 1, b: false}, {a: 900, c: 50}, {union: true}); // {a: 900, b: false, c: 50}
merge({a: 1, b: false}, {a: 900, c: 50}, {union: false}); // {a: 900, b: false}
merge({a: 1, c: {bar: 'foo'}}, [{b: 2}, {c: {foo: 'bar'}}], {union: true}); // {a: 1, b: 2, c: {bar: 'foo', foo: 'bar'}}
```

Take Note: The default behavior is to not have union, this means that ONLY the keys in the target object
are going to be available in the response of this function.

### object/define(props:Object, obj:Object={})
Creates an object with the passed accessors set on it
```typescript
import define from '@valkyriestudios/utils/object/define';
define(
    {
        a: {
            enumerable: false,
            value : function () { ... }
        }
    },
    { b: 2 }
);
// { a : () => ..., b: 2 }
```

```typescript
import define from '@valkyriestudios/utils/object/define';
define({
    a : {
        enumerable: false,
        value : function () { ... }
    }
}); // { a : () => ... }
```

### regexp/is(val:unknown)
Check if a variable is an instance of RegExp
```typescript
import isRegExp from '@valkyriestudios/utils/regexp/is';
isRegExp('foo'); // FALSE
isRegExp(new RegExp('ab+c', 'i')); // TRUE
isRegExp(new RegExp(/ab+c/, 'i')); // TRUE
isRegExp(/ab+c/i); // FALSE
```

### regexp/sanitize(val:string)
Escapes special characters in a string and returns a sanitized version safe for usage in RegExp instances
```typescript
import sanitize from '@valkyriestudios/utils/regexp/sanitize';
sanitize('contact@valkyriestudios.be'); // contact@valkyriestudios\\.be
```

### string/is(val:unknown)
Check if a variable is a string
```typescript
import isString from '@valkyriestudios/utils/string/is';
isString('foo'); // TRUE
isString(4); // FALSE
```

### string/isBetween(val:string, min:number, max:number, trimmed:boolean=true)
Check if a variable is between a range of numbers
```typescript
import isBetween from '@valkyriestudios/utils/string/isBetween';
isBetween('Peter', 4, 10); // TRUE
isBetween('Jeff', 4, 10); // TRUE
isBetween('Moe', 4, 10); // FALSE
isBetween('Hello', 6, 1); // FALSE
isBetween('    Joe', 1, 3); // TRUE
isBetween('    Joe', 1, 3, false); // FALSE
```

### string/isNotEmpty(val:unknown, trimmed:boolean=true)
Check if a variable a non-empty string
```typescript
import isNotEmptyString from '@valkyriestudios/utils/string/isNotEmpty';
isNotEmptyString({a:1}); // FALSE
isNotEmptyString(''); // FALSE
isNotEmptyString(' '); // FALSE
isNotEmptyString(' ', false); // TRUE
isNotEmptyString('Hi'); // TRUE
```

### string/shorten(val:string, length:integer, postfix:string=..., truncate_words=true)
Shorten a string and add a postfix if string went over length
```typescript
import shorten from '@valkyriestudios/utils/string/shorten';
shorten('To the moon and beyond', 11, '..'); // 'To the moon..'
shorten('Hi', 250); // 'Hi'
shorten('To the moon and beyond'); // 'To the moon...'
shorten('To the moon and beyond', 11, ' '); // 'To the moon '

/* For when you don't want words to be truncated mid-word */
shorten('To the moon and beyond', 11, '...', false);
```

### string/humanizeBytes(val:number|string)
Humanize an amount of bytes

allows passing options to control the output, following options are possible:
-- option:delim (default:','): Override the delimiter used, eg: `20000 -> 20,000`
-- option:separator (default:'.'): Override the separator used for floats, eg: '20.034' -> '20,034'
-- option:precision (default:2):  Override decimal precision for floats: eg: '20.0344233' with precision 2 -> '20.03'
-- option:units (default:[' byes', ' KB', ' MB', ' GB', ' TB', ' PB', ' EB', ' ZB', ' YB']): Override units used, eg: `4893290423489 with units [' Jedi', ' Darth', ' Vader', ' Force'] and precision of 0` -> `'4,893 Force'`
```typescript
import humanizeBytes from '@valkyriestudios/utils/string/humanizeBytes';
humanizeBytes(1504230); // '1.4 MB'
humanizeBytes(23); // '23 bytes'
humanizeBytes(-374237489237); // '-348.5 GB'
humanizeBytes('-1504230'); // '-1.4 MB'
```

### string/humanizeNumber(val:number|string, options:Object)
Humanize a number

allows passing options to control the output, following options are possible:
-- option:delim (default:','): Override the delimiter used, eg: `20000 -> 20,000`
-- option:separator (default:'.'): Override the separator used for floats, eg: '20.034' -> '20,034'
-- option:precision (default:2):  Override decimal precision for floats: eg: '20.0344233' with precision 2 -> '20.03'
-- option:units (default:['', 'k', 'm', 'b', 't', 'q']): Override units used, eg: `1073741823 with units ['', 'K']` -> `1.073.741,82K`
-- option:real (default:false): Set to true to automatically round input numbers
-- option:divider (default:1000): Override default divider used for units (used internally for humanizeBytes with 1024 as divider)

```typescript
import humanizeBytes from '@valkyriestudios/utils/string/humanizeBytes';
humanizeNumber(4327963279469432); // '4.33q'
humanizeNumber(1504230); // '1.5m'
humanizeNumber(-432443); // '-432.44k'
humanizeNumber('-1500'); // '-1.5k'
humanizeNumber(47328748923747923479); // '47,328.75q'
```

## Contributors
- [Peter Vermeulen](https://www.linkedin.com/in/petervermeulen1/)
- [Xander Berkein](https://github.com/xanderberkein)
