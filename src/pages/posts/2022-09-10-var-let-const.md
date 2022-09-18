---
layout: '@layouts/Post.astro'
title: 'var vs. let vs. const'
description: 'If we liberally interpret the Singleton pattern, we can make it much simpler than the object-oriented equivalent.'
pubDate: 2022-08-26
draft: true
categories:
	- Design patterns
---

import { CodeFileGroup, CodeFile } from '@components/Code';

Design patterns are programming patterns we can use to solve common challenges in our code. In 1994, the book “Design Patterns: Elements of Reusable Object-Oriented Software” was published and laid the foundation of many patterns we use today.

As the title reveals, however, the book describes patterns specifically for object-oriented software. A paradigm that, for better or worse, isn’t the dominant one in JavaScript. That doesn’t mean the design patterns can’t be used, but we’ll need to loosely interpret them.

This post marks the first item of the series: **Design patterns**, in which we’ll liberally interpret a design pattern and translate that to non-object-oriented JavaScript. In this first entry, we’re going to look at the **Singleton** pattern.

## What is the Singleton pattern?

> Singleton is a creational design pattern that lets you ensure that a class has only one instance, while providing a global access point to this instance.
>
> <cite>– [refactoring.guru](https://refactoring.guru/design-patterns/singleton)</cite>

Take note of “ensure that a class has only one instance” and “providing a global access point to this instance.”

Using a JavaScript class, the implementation looks like this:

<CodeFile filename="ImageLoader.js">
	```js
	let imageLoaderInstance = null;

    export class ImageLoader {
    	#cache = new Map();

    	async loadImage(source) {
    		if (this.#cache.has(source)) {
    			return this.#cache.get(source);
    		}

    		// Load image, write to cache, and return the image
    	}

    	static getInstance() {
    		if (imageLoaderInstance) {
    			return imageLoaderInstance;
    		}

    		return new ImageLoader();
    	}
    }
    ```

</CodeFile>

```js
import { ImageLoader } from './ImageLoader.js';

const image1 = await ImageLoader.getInstance().loadImage('/dog.jpg');
const image2 = await ImageLoader.getInstance().loadImage('/cat.jpg');
```

The `ImageLoader.getInstance()` static method is the global access point that returns an existing instance if it was already initialized. Now, what would this look like without using a class?

## The Singleton without a class

The formal implementation can be greatly reduced by leveraging a built-in JavaScript feature: modules. When we import the same module twice, it won’t run the module’s code twice, but creates new references to its existing exports. Consider the following example:

<CodeFile filename="import-this.js">
	```js
	console.log('Hello world!');

    export const value = Math.random();
    ```

</CodeFile>

```js
import { value as v1 } from './import-this.js';
import { value as v2 } from './import-this.js';

const { value: v3 } = await import('./import-this.js');
const { value: v4 } = await import('./import-this.js');
```

The above code will print "Hello world!" in the console _once_ and the variables `v1`, `v2`, `v3` and `v4` will all have the same value even though the module’s export contains a random value. This proves that a JavaScript module is a Singleton by design!

Let’s rewrite the example from before as a JavaScript module.

<CodeFile filename="image.js">
	```js
	const cache = new Map();

    export async function loadImage(source) {
    	if (cache.has(source)) {
    		return cache.get(source);
    	}

    	// Load image, write to cache, and return the image
    }
    ```

</CodeFile>

```js
import { loadImage } from './image.js';

const image1 = await loadImage('/dog.jpg');
const image2 = await loadImage('/cat.jpg');
```

Let’s revisit the criteria of a Singleton to see if the code above still fulfils them. “[Ensuring] that a class has only one instance” is what JavaScript does for us — there’s only one ‘instance’ of a module. The `import` syntax is our “global access point” that, by default, refers to the existing instance of a module. Check!

## Conclusion

By leveraging built-in behaviour, we’re able to mimic the behaviour of a Singleton. This approach allows us to apply the design pattern while being consistent with other paradigms, like (impure) functional programming.

Being able to use a common pattern like this without additional code is fantastic. I’m sure there are JavaScript developers that have been actively leveraging this property of modules without being familiar with design patterns, which is awesome!
