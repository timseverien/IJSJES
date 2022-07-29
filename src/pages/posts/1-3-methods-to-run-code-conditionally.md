---
layout: '@layouts/Post.astro'
title: '4 methods to run code conditionally without if-statements'
number: 1
---

In every codebase, you’ll have conditions in which you want to run or skip code. As we learn JavaScript, we quickly learn we can do that with if-statements. There are cases, however, where we can use alternatives. There’s opportunity for endless debate which methods are suitable for which situations, but let’s not go there.

I present you: the magnificant if…else-statement!

```js
const product = { id: 1, isInStock: true };

if (product.isInStock) {
	showMessage('Order now!');
} else {
	showMessage('Sorry, you’re too late!');
}
```

So elegant, don’t you think? Now let’s look at alternatives.

## 1. Switch statement

A switch statement is quite similar to an if-statement, but different enough to be useful.

```js
const stockInformation = getStockInformationFor(product);

switch (stockInformation.state) {
	case 'COMING_SOON':
		showMessage('Have some patience!');
		break;

	case 'NOT_IN_STOCK':
		showMessage('You’ve been too patient! Please wait until next batch.');
		break;

	case 'NOT_IN_STOCK_AND_NEVER_WILL_BE':
		showMessage('Are you living in the past? Order a newer product, please.');
		break;

	default:
		showMessage('Order now!');
}
```

At first glance, this looks like an if…else but with more lines of code. There are minor differences that make it interesting. If we have a sequence of if…elses with many `else if` blocks, we’d have to repeat the condition `stockInformation.state === 'STATE'` many times, making the `switch` easier to read as it has the equality check built-in. Note that the `default` case is similar to the last `else` block of an if…else statement; if `stockInformation.state` doesn’t match any of the cases, it’ll run the contents of that block.

Take note of the `break` statement. You may recall this is typically used to end loops. In this case, it’s use to break out the `switch`, as it kind of behaves like a loop! As we’ve used a `break` statement in every case, nothing happens after the `showMessage()` calls. If we omit the `break` statement, however, we speak of a fall-through. This means the switch statement is not terminated and will check for more matching cases. Consider the following example:

```js
switch (stockInformation.state) {
	case 'NOT_IN_STOCK':
	case 'NOT_IN_STOCK_AND_NEVER_WILL_BE':
		showMessage('Sorry, we don’t have this item in stock.');
		break;

	default:
		showMessage('Order now!');
}
```

In the above example, both `NOT_IN_STOCK` and `NOT_IN_STOCK_AND_NEVER_WILL_BE` will both yield the same message. Compare that to this functionally identical if-statement:

```js
if (
	stockInformation.state === 'NOT_IN_STOCK' ||
	stockInformation.state === 'NOT_IN_STOCK_AND_NEVER_WILL_BE'
) {
	showMessage('Sorry, we don’t have this item in stock.');
} else {
	showMessage('Order now!');
}
```

As if…else allows more refined conditions to be set, and every else-if statement can have it’s own set of intricate conditions, it makes those harder to scan compared to a `switch`. For that reason, I like to use `switch` for long lists of equality checks, as it slightly lowers the cognitive load. I do feel `switch`s shine when I get to use the fall-through feature, which isn’t often.

Lastly, there’s more magic to `switch` statements:

```js
const product = { id: 1, stockCount: 3 };
const order = { productId: 1, count: 4 };

switch (true) {
	case product.stockCount > 0:
		reserveFromStock(product, Math.min(order.count, product.stockCount));

	case order.size > product.stockCount:
		orderFromThirdParty(product, order.count - product.stockCount);
}
```

I’m using fall-through (i.e. the `break` statement is missing) so both cases are potentially executed. Note that the value passed to the switch is `true`, and the `case` statements contain comparison expressions. A switch doesn’t prevent you from repeating cases. Given the `product` and `order`, the switch essentialy gets two `case true:` clauses. The switch above is equivalent to _two_ if-statements:

```js
if (product.stockCount > 0) {
	reserveFromStock(product, Math.min(order.count, product.stockCount));
}

if (order.size > product.stockCount) {
	orderFromThirdParty(product, order.count - product.stockCount);
}
```

## 2. Dictionary/map/object or list/array

Let’s say we’re building a web-based game and need to map a big list of keys to actions. Technically, we can do that with both `if`s and `switch`s, but those would be incredibly long. Instead, we can create a mapping between keys and code we want to run when the key is pressed or released.

```js
const keyBinds = {
	ArrowUp: {
		press: (p) => (p.y -= 1),
		release: (p) => (p.y += 1),
	},
	ArrowDown: {
		press: (p) => (p.y += 1),
		release: (p) => (p.y -= 1),
	},
	ArrowLeft: {
		press: (p) => (p.x -= 1),
		release: (p) => (p.x += 1),
	},
	ArrowRight: {
		press: (p) => (p.x += 1),
		release: (p) => (p.x -= 1),
	},
};

window.addEventListener('keydown', (event) => {
	if (event.key in keyBinds) {
		keyBinds[event.key].press(player);
	}
});

window.addEventListener('keyup', (event) => {
	if (event.key in keyBinds) {
		keyBinds[event.key].release(player);
	}
});
```

This is fairly compact, right? There’s a major benefit to this method: we’ve separated the key handlers and listeners a little bit. When we need to adjust our key binds, we can do that relatively safely. If a developer makes a mistake, it’s either a syntax error or implementation mistake. In a big chain of if-statements, it can be any of those or a logic error, which are easily overlooked and can be nasty to debug.

We can do something similar with a list when we need to map a number instead of a string:

<!-- prettier-ignore-start -->

```js
const showMonthlyMessage = [
	() => showMessage('Happy new year!'),
	() => showMessage('It’s LGBT History month!'),
	() => showMessage('Is it March already?'),
	() => showMessage('🐶 🐱'),
	() => showMessage('Summer is around the corner if you live in the northern hemisphere!'),
	() => showMessage('Don’t forget to smile!'),
	() => showMessage('🍦'),
	() => showMessage('Meteorological autumn is around the corner!'),
	() => showMessage('Is it September already?'),
	() => showMessage('It’s Black History month!'),
	() => showMessage('It’s a good month to write a novel.'),
	() => showMessage('The year is ending already?'),
];

const month = new Date().getMonth();

showMonthlyMessage[month]();
```
<!-- prettier-ignore-end -->

Empty items in a list, however, are a bit unelegant. In such cases, it’s probably better to use an object or `Map`. Here’s an example of the latter:

```js
const showMonthlyMessage = new Map([
	[0, () => showMessage('Happy new year!')],
	[11, () => showMessage('The year is ending already?')],
]);

const month = new Date().getMonth();

if (showMonthlyMessage.has(month)) {
	showMonthlyMessage.get(month)();
}
```

## 3. Assertions and try…catch

Assertions are usually used in test scripts. They do nothing when conditions are met and throws an error otherwise. Here’s an example of a generic assert function:

```js
function assert(condition, errorMessage) {
	if (!condition) {
		throw new Error(errorMessage);
	}
}
```

Instead of using our own function, we can use the built-in `console.assert()` function.

```js
const a = 123;
const b = '123';

// This function call won’t do anything as `a` is indeed a number
console.assert(
	typeof a === 'number',
	`Value ${JSON.stringify(a)} is not a number`,
);

// This function call with throw an error as `b` is in fact not a number; the assertion fails
console.assert(
	typeof b === 'number',
	`Value ${JSON.stringify(b)} is not a number`,
);
```

With try…catch, we can handle the errors `console.assert()` throws at us. A try…catch consists of two blocks. The `try` block runs code until an error is throw. When an expression throws an error, it halts execution, meaning consecutive expressions in that block will not run. Instead, the `catch` block will run and is passed the error object that was thrown.

<!-- prettier-ignore-start -->
```js
function assertProductStockState(product, state) {
	console.assert(
		product.stockState === state,
		`The stock state of product ${JSON.stringify(product)} does not match ${JSON.stringify(state)}`,
	);
}

const product = { id: 1, stockState: 'NOT_IN_STOCK' };

try {
	assertProductStockState(product, 'IN_STOCK');

	// This code won’t run assertProductStockState() threw an error
	addToCart(product);
} catch (error) {
	showMessage('Sorry, product is no longer in stock!');
}
```
<!-- prettier-ignore-end -->

This may seem like an awful amount of code that we could’ve written as an if-else. It is, but there are benefits to this.

Imagine your codebase is big, complex, maybe a little messy, and the check whether a product is in stock is several functions deep. If we’d do our error handling in the top function, we’d have the pass the success state all the way down. For example:

<!-- prettier-ignore-start -->
```js
function addToCart(product) {
	if (!isProductInStock(product)) {
		return false;
	}

	return addProductToCartDatabase(product);
}

function addProductToCartDatabase(product) {
	if (!isValidProduct(product)) {
		return false;
	}

	return getDatabaseConnection().add(product);
}

if (addToCart(product)) {
	showMessage('Yeaaaahhh!');
} else {
	showMessage('Something went wrong, but we don’t know what because used a boolean as return value.');
}
```
<!-- prettier-ignore-end -->

Compare that with the following code:

```js
function addToCart(product) {
	assertProductInStock(product);
	addProductToCartDatabase(product);
}

function addProductToCartDatabase(product) {
	assertProduct(product);
	getDatabaseConnection().add(product);
}

try {
	addToCart(product);
	showMessage('Yeaaaahhh!');
} catch (error) {
	showMessage(`This went wrong: ${error.message}`);
}
```

Admittedly, this example is a bit tailored to make a point, which is: there are moments where assertions may be more elegant than if-statements. I don’t recommend you swap out every if-statement for this, but it’s nice to have in your toolchain.

## 4: binary logic operators

Once upon a time, binary logic operators (e.g. `&&` and `||`) were all the hype until it wasn’t. Nowadays, it’s commonly used in [React](https://reactjs.org)’s JavaScript syntax extension, [JSX](https://reactjs.org/docs/introducing-jsx.html), which is available in various contexts outside React. I’m sure it’s confusing to non-JavaScript developers, but it’s actually pretty powerful. I’ll try to explain.

JavaScript is dynamically typed. This means that, when comparing two values of different types, JavaScript will try to cast one value. This is called [type coersion](https://developer.mozilla.org/en-US/docs/Glossary/Type_coercion) and has caused [much laughter](https://www.destroyallsoftware.com/talks/wat) but many more cries. Binary logic operators expect booleans, but when given non-booleans, JavaScript ceorces them to booleans. Typically, we refer to non-booleans as _truthy_ and _falsy_ values. For example, `0` is falsy, `1` is truthy, `null` is falsy and `{}` is truthy. So how does this help us rewrite if-statements?

There’s one last piece to the puzzle here, which is what parts of a logic operator is evaluated. Looking at `a && b` and `a || b`, there are two values: one on the left-hand side, and one on the right-hand side of the operator. JavaScript starts with evaluating the left-hand side and may skip evaluation of the right-hand side when the left-hand side already settles the condition. Consider the following expressions:

```js
true && true; // left-hand side is insufficient to determine both values are `true`, so right-hand side is evaluated as well
false && true; // we can tell this can’t resolve to `true` by only evaluating the left-hand side

true || true; // we can tell this resolves to `true` by only evaluating the left-hand side
false || true; // left-hand side is insufficient to determine either value is `true`, so right-hand side is evaluated as well
```

Now, nothing prevents us from replacing `true` and `false` with arbitrary values. So we can do this:

```js
isProductInStock(product) && orderProduct(product);
```

First, it’ll evaluate the left-hand function. If it’s in stock (and returns `true`), the right-hand side is evaluated. If it’s `false`, however, the boolean logic already settles and the right-hand side is skipped. In other words: `orderProducts()` is only called if `isProductInStock()` returns `true`. With `&&` we can chain values and functions that are evaluated until it hits a falsy value.

```js
isProduct(product) &&
	isProductInStock(product) &&
	orderProduct(product) &&
	showMessage();
```

Similarly, with the `||` operator, we can chain values and functions that are evaluatle until it hits a truthy value.

## Conclusion

What is JavaScript a wondrous language!
