# @valkyriestudios/utils

A collection of single-function utilities for common tasks

`npm install @valkyriestudios/utils`

## Available Functions

### array
- **isArray(val:any)**<br>
Check if a variable is of type Array
```
console.log(isArray({a:1})); // FALSE
console.log(isArray([])); // TRUE
```

### boolean
- **isBoolean(val:any)**<br>
Check if a variable is of type Boolean
```
console.log(isBoolean(null)); // FALSE
console.log(isBoolean(false)); // TRUE
console.log(isBoolean(true)); // TRUE
```

### caching
- **memoize(fn:Function)**<br>
memoize the output of a specific function to allow for the creation of an internal cache
```
const memoized_function = memoize((a, b) => {
	return a + b;
});
```

### date
- **isDate(val:any)**<br>
Check if a variable is of type Date
```
console.log(isDate(new Date('December 17, 1995 03:24:00')); // TRUE
console.log(isDate('December 17, 1995 03:24:00'); // FALSE
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
console.log(Object.isFrozen(myObj)); // TRUE
console.log(Object.isFrozen(myObj.b)); // TRUE
console.log(Object.isFrozen(myObj.b.d)); // TRUE
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
console.log(Object.isSealed(myObj)); // TRUE
console.log(Object.isSealed(myObj.b)); // TRUE
console.log(Object.isSealed(myObj.b.d)); // TRUE
console.log(Object.isFrozen(myObj.b.d)); // FALSE
```

- **deepSet(obj:Object, path:string, value:any=null, define:boolean=false)**<br>
Sets a property and its value deep in the structure of an object
```
const myObj = {
	a: 2,
});
deepSet(myObj, 'b.c.d.e', 4);
console.log(myObj.b.c.d.e); // 4
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
console.log(myObj.b[0].price); // 100
console.log(myObj.b[1].price); // 500
```
```
const myObj = {
	a: 2,
});
deepSet(myObj, 'b.c', { value: function () => {...} }, true);
console.log(myObj.b.c); // Function
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
console.log(deepGet(myObj, 'b[0].price', true)); // [{price: 2}, {price: 4}]
```
```
const myObj = {
	a: 2,
	b: [
		{ price : 2 },
		{ price : 4 },
	],
});
console.log(deepGet(myObj, 'b[0].price')); // 2
```

### equal
- **equal(a:any, b:any)**<br>
Check if a variable is equal to another one
```
console.log(equal(5, 6)); // FALSE
console.log(equal(1, 1)); // TRUE
console.log(equal([0, 1, 2], [1, 2])); // FALSE
console.log(equal({a: 1, b: 2}, {a: 1, b: 3})); // FALSE
console.log(equal({a: 1, b: 2}, {a: 1, b: 2})); // TRUE
```

### function
- **noop()**<br>
An empty function that can be used in (for example) piping

- **noopreturn(val:any)**<br>
An empty function that will pass back the variable that it was passed
<br>

### hash
- **guid()**<br>
Generate a unique identifier (guid) according to RFC4122
```
console.log(guid()); // 245caf1a-86af-11e7-bb31-be2e44b06b34
```

- **md5(val:string)**<br>
Generate an md5 hash from a string according to RFC1321
```
console.log(md5('hello world')); // 5EB63BBBE01EEED093CB22BB8F5ACDC3
```

### number
- **isNumber(val:any)**<br>
Check if a variable is a number
```
console.log(isNumber('foo'); // FALSE
console.log(isNumber(4); // TRUE
console.log(isNumber(0.5); // TRUE
```

### object
- **isObject(val:any)**<br>
Check if a variable is of type Object
```
console.log(isObject({a: 1})); // TRUE
console.log(isObject(1)); // FALSE
```

- **pick(obj:Object={}, keys:Array[string]=[])**<br>
Copies the keys passed in the 'keys' array from the passed object to a new object and returns that object.<br>
<small>If a key wasn't found it will be set as undefined</small>
```
console.log(pick({a: 1, b: 2, c: 3}, ['a','b'])); // {a: 1, b: 2}
```

- **merge(target:Object={},obj:Object={})**<br>
Merges two objects together, with the preference over the second object.
```
console.log(merge({a: 1, b: false}, {a: 900, c: 50})); // {a: 900, b: false, c: 50}
```

- **zip(keys:Array[string]=[], values:Array[string]=[])**<br>
Creates an object from a keys and a values array. Mapping them together.
```
console.log(zip(['a', 'b'], [100, 200])); // {a: 100, b: 200}
```

- **define(props:Object, obj:Object={})**<br>
Creates an object with the passed accessors set on it
```
console.log(define(
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
console.log(define({
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
console.log(myObject); // { a : () => ... }
console.log(Object.isFrozen(myObject)); // TRUE
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
console.log(myObject); // { a : () => ... }
console.log(Object.isSealed(myObject)); // TRUE
```

### string
- **isString(val:any)**<br>
Check if a variable is a string
```
console.log(isString('foo'); // TRUE
console.log(isString(4); // FALSE
```

## Contributors
- Peter Vermeulen : [Valkyrie Studios](www.valkyriestudios.be)
