# @valkyriestudios/utils

[![Build Status](https://travis-ci.org/ValkyrieStudios/utils.svg?branch=master)](https://travis-ci.org/ValkyrieStudios/utils)
[![codecov](https://codecov.io/gh/ValkyrieStudios/utils/branch/master/graph/badge.svg)](https://codecov.io/gh/ValkyrieStudios/utils)
[![npm](https://img.shields.io/npm/v/@valkyriestudios/utils.svg)](https://www.npmjs.com/package/@valkyriestudios/utils)
[![npm](https://img.shields.io/npm/dm/@valkyriestudios/utils.svg)](https://www.npmjs.com/package/@valkyriestudios/utils)

A collection of single-function utilities for common tasks

`npm install @valkyriestudios/utils`

## Available Functions

### array
- **isArray(val:any)**<br>
Check if a variable is of type Array
```
isArray({a:1}); // FALSE
isArray([]); // TRUE
```

- **isNotEmptyArray(val:any)**<br>
Check if a variable a non-empty array
```
isNotEmptyArray({a:1}); // FALSE
isNotEmptyArray([]); // FALSE
isNotEmptyArray([0, 1, 2]); // TRUE
```

- **dedupe(val:Array)**<br>
Remove all duplicates from an array, behind the scenes it uses the fnv 1A hash algorithm to performantly do comparisons.
```
dedupe(['a','a','b','c','c']); // ['a', 'b', 'c']
dedupe(['1',1,'2',2]); // ['1','2']
dedupe([new RegExp(/ab+c/, 'i'), new RegExp(/ab+c/, 'i')]); // [new RegExp(/ab+c/, 'i')]
dedupe([new Date('2012-02-02'), new Date('2012-02-02')]); // [new Date('2012-02-02')]
dedupe(['hello', 'hello', 'world']); // ['hello', 'world']
```

### boolean
- **isBoolean(val:any)**<br>
Check if a variable is of type Boolean
```
isBoolean(null); // FALSE
isBoolean(false); // TRUE
isBoolean(true); // TRUE
```

### caching
- **memoize(fn:Function)**<br>
memoize the output of a specific function to allow for the creation of an internal cache using the fnv 1A hash algorithm
```
const memoized_function = memoize((a, b) => {
	return a + b;
});
```

### date
- **isDate(val:any)**<br>
Check if a variable is of type Date
```
isDate(new Date('December 17, 1995 03:24:00'); // TRUE
isDate('December 17, 1995 03:24:00'); // FALSE
```

### deep
- **deepFreeze(val:Object)**<br>
Recursively freezes all properties of an object
```
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

- **deepSeal(val:Object)**<br>
Recursively freezes all properties of an object
```
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

- **deepSet(obj:Object, path:string, value:any=null, define:boolean=false)**<br>
Sets a property and its value deep in the structure of an object
```
const myObj = {
	a: 2,
});
deepSet(myObj, 'b.c.d.e', 4);
myObj.b.c.d.e; // 4
```
```
const myObj = {
	a: 2,
	b: [
		{ price : 2 },
		{ price : 4 },
	],
});
deepSet(myObj, 'b[0].price', 100);
deepSet(myObj, 'b[1].price', 500);
myObj.b[0].price; // 100
myObj.b[1].price; // 500
```
```
const myObj = {
	a: 2,
});
deepSet(myObj, 'b.c', { value: function () => {...} }, true);
myObj.b.c; // Function
```

- **deepGet(obj:Object, path:string, get_parent:boolean=false)**<br>
Retrieves a value based on a path in a deeply nested object
```
const myObj = {
	a: 2,
	b: [
		{ price : 2 },
		{ price : 4 },
	],
});
deepGet(myObj, 'b[0].price', true); // [{price: 2}, {price: 4}]
```
```
const myObj = {
	a: 2,
	b: [
		{ price : 2 },
		{ price : 4 },
	],
});
deepGet(myObj, 'b[0].price'); // 2
```

### equal
- **equal(a:any, b:any)**<br>
Check if a variable is equal to another one
```
equal(5, 6); // FALSE
equal(1, 1); // TRUE
equal([0, 1, 2], [1, 2]); // FALSE
equal({a: 1, b: 2}, {a: 1, b: 3}); // FALSE
equal({a: 1, b: 2}, {a: 1, b: 2}); // TRUE
equal(new Date('2012-20-09'), '2012-20-09'); // TRUE ( check is being done on unix timestamp )
equal(new RegExp(/ab+c/, 'i'), /ab+c/i); // TRUE
```

### formdata
- **isFormData(val:any)**<br>
Check if a variable is an instance of FormData
```
isFormData(FormData(...)); // TRUE
isFormData('Hello'); // FALSE
isFormData({a: 1, b:2}); // FALSE
```

### function
- **isFunction(val:any)**<br>
Check if a variable is a Function

- **noop()**<br>
An empty function that can be used in (for example) piping

- **noopreturn(val:any)**<br>
An empty function that will pass back the variable that it was passed

- **noopresolve(val:any)**<br>
An empty function that returns a promise that will immediately resolve itself and pass back any variable that was passed to it

- **sleep(val:int)**<br>
An empty function that returns a promise that will resolve after X milliseconds, default is set to 1000ms.
<br>

### hash
- **guid()**<br>
Generate a unique identifier (guid) according to RFC4122
```
guid(); // 245caf1a-86af-11e7-bb31-be2e44b06b34
```

- **fnv1A(val:any)**<br>
Generate a fnv1A hash from an object, using a 32-bit prime/offset
```
fnv1A('hello world'); // -2023343616
fnv1A({a:1,b:2}); // 361168128
fnv1A(4); // 1630425728
fnv1A(new RegExp(/ab+c/, 'i')); // 2131692544
fnv1A(new Date('2012-02-02')); // 1655579136
```

### number
- **isNumber(val:any)**<br>
Check if a variable is a number
```
isNumber('foo'); // FALSE
isNumber(4); // TRUE
isNumber(0.5); // TRUE
```

- **isNumberAbove(val:number, comp:number)**<br>
Check if a variable is above a certain bound
```
isNumberAbove(5, 0); // TRUE
isNumberAbove(.1, 0); // TRUE
isNumberAbove(-1, -1); // FALSE
isNumberAbove(-10, -9); // FALSE
```

- **isNumberBelow(val:number, comp:number)**<br>
Check if a variable is below a certain bound
```
isNumberBelow(0, 5); // TRUE
isNumberBelow(0, .1); // TRUE
isNumberBelow(-1, -1); // FALSE
isNumberBelow(-9, -10); // FALSE
```

- **isNumberBetween(val:number, min:number, max:number)**<br>
Check if a variable is between a range of numbers
```
isNumberBetween(5, 0, 10); // TRUE
isNumberBetween(.1, 0, 1); // TRUE
isNumberBetween(-.1, -1, 0); // TRUE
isNumberBetween(0, 0, 1); // TRUE
isNumberBetween(-1, 0, 1); // FALSE
```

- **isNumericalNaN(val:any)**<br>
Check if a variable is a numerical nan ( a number that is a NaN, this distinguishment is made since both a string or a number can be NaN)
```
isNumericalNaN('foo'); // FALSE
isNumericalNaN(NaN); // TRUE
```

- **toPercentage(val:Number,precision:Number=0,min:Number=0,max:Number=1)**<br>
Calculate the percentage of a specific value in a range
```
toPercentage(0.50106579, 5); // 50.11658
toPercentage(-356, 0, -1000, 1000); // 32
toPercentage(0.5); // 50
```

- **round(val:Number,precision:Number=0)**<br>
Round a numeric value to a specific amount of decimals
```
round(5.123456789, 0); // 5
round(5.123456789, 2); // 5.12
round(5.123456789, 5); // 5.12346
```

- **randomBetween(min:Number=0,max:Number=10)**<br>
Generate a random numeric value between a min and max range
```
randomBetween(); // Will generate a random between 0 and 10
randomBetween(25, 100); // Will generate a random between 25 and 100
```

### object
- **forValues(obj:Object={}, cb:Function=noopreturn)**<br>
Iterate over the keys of the object and apply the callback function to their values
```
const obj = {a: 1, b: 2, c: 3};
forValues(obj, (key, value, index) => value + 1); // {a: 2, b:3, c:4}
```

- **isObject(val:any)**<br>
Check if a variable is of type Object
```
isObject({a: 1}); // TRUE
isObject(1); // FALSE
```

- **isNotEmptyObject(val:any)**<br>
Check if a variable a non-empty object
```
isNotEmptyObject({a:1}); // TRUE
isNotEmptyObject({}); // FALSE
isNotEmptyObject('Hi'); // FALSE
```

- **pick(obj:Object={}, keys:Array[string]=[])**<br>
Copies the keys passed in the 'keys' array from the passed object to a new object and returns that object.<br>
<small>If a key wasn't found it will be set as undefined</small>
```
pick({a: 1, b: 2, c: 3}, ['a','b']); // {a: 1, b: 2}
```

- **merge(target:Object={},obj:Object={})**<br>
Merges two objects together, with the preference over the second object.
```
merge({a: 1, b: false}, {a: 900, c: 50}); // {a: 900, b: false, c: 50}
```

- **zip(keys:Array[string]=[], values:Array[string]=[], default_to:any=null)**<br>
Creates an object from a keys and a values array. Mapping them together.
```
zip(['a', 'b'], [100, 200]); // {a: 100, b: 200}
```
```
zip(['a','b']); // {a: null, b: null}
```
```
zip(['a','b', false, 9999]); // {a: 9999, b: 9999}
```

- **define(props:Object, obj:Object={})**<br>
Creates an object with the passed accessors set on it
```
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
```
define({
	a : {
		enumerable: false,
		value : function () { ... }
	}
}); // { a : () => ... }
```

- **defineFrozen(props:Object, obj:Object={})**<br>
Creates an object with the passed accessors set on it, and returns it as a frozen object
```
const myObject = defineFrozen({
	a : {
		enumerable: false,
		value : function () { ... }
	}
);
myObject; // { a : () => ... }
Object.isFrozen(myObject); // TRUE
```

- **defineSealed(props:Object, obj:Object={})**<br>
Creates an object with the passed accessors set on it, and returns it as a sealed object
```
const myObject = defineSealed({
	a : {
		enumerable: false,
		value : function () { ... }
	}
);
myObject; // { a : () => ... }
Object.isSealed(myObject); // TRUE
```

### regexp
- **isRegExp(val:any)**<br>
Check if a variable is an instance of RegExp
```
isRegExp('foo'); // FALSE
isRegExp(new RegExp('ab+c', 'i')); // TRUE
isRegExp(new RegExp(/ab+c/, 'i')); // TRUE
isRegExp(/ab+c/i); // FALSE
```

### string
- **isString(val:any)**<br>
Check if a variable is a string
```
isString('foo'); // TRUE
isString(4); // FALSE
```

- **isStringBetween(val:string, min:number, max:number, trimmed:boolean=true)**<br>
Check if a variable is between a range of numbers
```
isStringBetween('Peter', 4, 10); // TRUE
isStringBetween('Jeff', 4, 10); // TRUE
isStringBetween('Moe', 4, 10); // FALSE
isStringBetween('Hello', 6, 1); // FALSE
isStringBetween('    Joe', 1, 3); // TRUE
isStringBetween('    Joe', 1, 3, false); // FALSE
```

- **isNotEmptyString(val:any, trimmed:boolean=true)**<br>
Check if a variable a non-empty string
```
isNotEmptyString({a:1}); // FALSE
isNotEmptyString(''); // FALSE
isNotEmptyString(' '); // FALSE
isNotEmptyString(' ', false); // TRUE
isNotEmptyString('Hi'); // TRUE
```

## Contributors
- Peter Vermeulen : [Valkyrie Studios](www.valkyriestudios.be) 
