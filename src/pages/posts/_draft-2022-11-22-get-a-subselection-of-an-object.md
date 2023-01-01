---
layout: '@layouts/Post.astro'
title: 'Get a subselection of an object'
description: 'How to create an subselection of an object?'
pubDate: 2022-11-22
categories:
	- Basics
draft: true
---

In programming, we often use objects to group related values. Models, for example, are basically objects representing a semantic thing, like a product. It’s fairly common to create subselections of objects for memory efficiency, serialization, or other purposes. Unfortunately, JavaScript doesn’t have a built-in functions to do that.

In this post we’ll look at various implementations of `pick()` and `omit()`, two functions that allows us to create subselections by either picking object properties we want to keep, or omitting those we want to discard, respectively. Functions to filter objects by allowlist or disallowlist, if you will.

Throughout this article, all `pick()` and `omit()` functions have the same signature and return values:

```js
const page = {
	title: 'About',
	path: '/about',
	description: 'Everything you want to know about MyAwesomeStartup',
	content: '...',
};

pick(page, ['title', 'path']); // returns `{ title: 'About', path: '/about' }`
omit(page, ['description', 'content']); // returns `{ title: 'About', path: '/about' }`
```

Let’s look at some implementations!

## Object entries

Perhaps you’re familiar with the built-in `Object.entries()` function. This converts an object to a slightly different data structure which is easier to manipulate. We can inverse this change (from entries to object) with the `Object.fromEntries()` function.

```js
Object.entries({
	id: 1,
	title: 'Hello World!',
});
```

The above snippet gives us:

```js
[
	['id', 1],
	['title', 'Hello World!'],
];
```

Because the object is now an array, we can use the array functions we know and love, like `filter()`. The implementation of our `pick()` function becomes this:

```js
function pick(object, properties) {
	return Object.fromEntries(
		Object.entries(object).filter(([prop]) => properties.includes(prop)),
	);
}
```

Our `omit()` function is almost identical to `pick()` — the only difference is the Logical NOT operator (`!`) before `properties.includes(prop)`:

```js
function omit(object, properties) {
	return Object.fromEntries(
		Object.entries(object).filter(([prop]) => !properties.includes(prop)),
	);
}
```

## Object mutation

In either case, we’re deleting properties from an object. Although not commonly used, you may have seen or used the `delete` operator:

```js
const page = { title: 'About', slug: '/about' };

delete page.slug;
```

A naive implementation of `omit()` could look something like this:

```js
function omit(object, properties) {
	for (const prop of properties) {
		delete object[prop];
	}
}
```

The `delete` operator mutates the old object, so there’s no use for a return statement. By calling `omit()`, we’re already removing the unwanted props from the object that was passed. This pattern is generally discouraged, so we can apply the operation on a copy and return that, like so:

```js
function omit(object, properties) {
	const copy = { ...object };

	for (const prop of properties) {
		delete copy[prop];
	}

	return copy;
}
```

Our `pick()`, however, will be slightly different. We’ll need to `delete copy[prop]` anything that _isn’t_ in the list:

```js
function pick(object, properties) {
	const copy = { ...object };

	for (const prop in copy) {
		if (!properties.includes(prop)) {
			delete copy[prop];
		}
	}

	return copy;
}
```

## Manual selection

Perhaps you have been wondering, why use a generic function at all? What’s wrong with the code below?

```js
function getPageSummary(page) {
	return {
		title: page.title,
		description: page.description,
	};
}
```

We can make the above code terser with [object destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) and [object literal shorthands](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#property_definitions).

Object destructuring lets us unpack an object:

```js
const page = {
	title: 'About',
	path: '/about',
	description: 'Everything you want to know about MyAwesomeStartup',
	content: '...',
};

const { title, description } = page;
```

And the object literal property name shorthand syntax makes an object literal slightly more terse:

```js
const title = 'About';
const description = 'Everything you want to know about MyAwesomeStartup';
const page = { title, description };
```

By combining these two features, we can create a subselection of an object in a terse-ish way:

```js
const getPageSummary = ({ title, description }) => ({
	title,
	description,
});

const pageSummary = getPageSummary({
	title: 'About',
	path: '/about',
	description: 'Everything you want to know about MyAwesomeStartup',
	content: '...',
});
```

A `pick()` and `omit()` function only captures a single operation — subselecting an object, while this manual (yet still elegant) approach gives us more flexibility. We can use it to rename properties, compute new values, or provide fallback values for `undefined` properties:

```js
const getPageMetaTagInfo = ({
	title,
	description,
	path,
	image = 'default.jpg',
}) => ({
	title,
	description,
	image,
	canonicalUrl: new URL(path, site.url).toString(),
});
```

For comparison, let’s rewrite above function so it uses `pick()`:

```js
const getPageMetaTagInfo = (page) => ({
	...pick(page, ['title', 'description']),
	image: page.image ?? 'default.jpg',
	canonicalUrl: new URL(page.path, site.url).toString(),
});
```

The only real difference is that when we have to add a property, we need to do so twice in the manual approach. The latter, on the other hand, can result in silent bugs when we accidentally mistype a property.

## ... and beyond

Until now, our `pick()` and `omit()` functions assumed shallow objects. Things get more complicated when we want to pick/omit objects within objects, like so:

```js
const page = {
	title: 'About',
	author: {
		name: 'Alice',
		site: 'https://example.com',
	},
};

pick(page, ['title', 'author.name']);
```

This would require parsing the paths and picking props recursively. Although doable, it’s a bit tricky to get right and resilient. At this point, I’d probably use Lodash’s [`pick()`](https://lodash.com/docs/#pick) and [`omit()`](https://lodash.com/docs/#omit) functions.

## Conclusion
