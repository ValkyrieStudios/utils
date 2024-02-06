declare namespace Is {
	import isArray from './array/is.d.mts';
	import isNotEmptyArray from './array/isNotEmpty.d.mts';

	export function Array = isArray;
	export function NeArray = isNotEmptyArray;
	export function NotEmptyArray = isNotEmptyArray;
}

export = Is;
