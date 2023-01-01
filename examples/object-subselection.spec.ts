import { assert } from 'console';
import {
	deleteOmit,
	deletePick,
	entriesOmit,
	entriesPick,
} from './object-subselection';

type MyObject = {
	id: number;
	title: string;
	slug: string;
};

type MyObjectProperty = keyof MyObject;
type MyObjectPropertyList = MyObjectProperty[];

const myObject: MyObject = {
	id: 1,
	title: 'Hello world!',
	slug: '/hello-world',
};

test.each([[deleteOmit], [entriesOmit]])('omit', (fn) => {
	const properties: MyObjectPropertyList = ['id', 'slug'];

	const result = fn(myObject, properties);
	expect(result).toEqual({ title: 'Hello world!' });
});

test.each([[deletePick], [entriesPick]])('pick', (fn) => {
	const properties: MyObjectPropertyList = ['id', 'title'];

	const result = fn(myObject, properties);
	expect(result).toEqual({ id: 1, title: 'Hello world!' });
});
