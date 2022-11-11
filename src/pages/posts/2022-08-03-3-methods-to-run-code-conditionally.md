---
layout: '@layouts/Post.astro'
title: '3 methods to run code conditionally without if-statements'
description: 'Did you know you don’t need if-statements to conditionally run code? Let’s look at three alternatives!'
pubDate: 2022-08-03
categories:
	- Tips
---

In every codebase, we have conditions in which we want to run or skip code. Conventionally, if…else-statements are one of the first things we learn in JavaScript, specifically to conditionally run code.

```js
const product = { id: 1, isInStock: true };

if (product.isInStock) {
	showMessage('Order now!');
} else {
	showMessage('Sorry, you’re too late!');
}
```

So elegant, don’t you think? There are cases, however, where we can use alternatives. There’s an opportunity for endless debate about which methods are suitable for which situations. Although that sounds like a fun discussion to have, let’s focus on learning about these options.

## 1. Switch statement

A switch is quite similar to if…else, but different enough to be useful.

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

At first glance, this looks like an if…else but with more lines of code. There are minor differences that make it interesting.

First, there’s readability. If we have an if…else with many `else if` clauses, we’d have to repeat the condition `stockInformation.state === 'SOME_VALUE'` many times. Repetition isn’t necessarily bad, but because an if…else can contain complex conditions, they’re relatively hard to scan. Instead, they have to be read to understand conditions and those that come after. As a switch has the equality check built-in, they’re much more suitable for scanning. Compare the last code example with this functionally equivalent code:

```js
if (stockInformation.state === 'COMING_SOON') {
	showMessage('Have some patience!');
} else if (stockInformation.state === 'NOT_IN_STOCK') {
	showMessage('You’ve been too patient! Please wait until next batch.');
} else if (stockInformation.state === 'NOT_IN_STOCK_AND_NEVER_WILL_BE') {
	showMessage('Are you living in the past? Order a newer product, please.');
} else {
	showMessage('Order now!');
}
```

Omitting the `break` statement of the `switch` statement causes a so-called fall-through, and they can be quite useful. Consider the following example:

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

Both `NOT_IN_STOCK` and `NOT_IN_STOCK_AND_NEVER_WILL_BE` will yield the same message. Because the `case: 'NOT_IN_STOCK'` clause has no body, it’ll fall through the next clause. It’s functionally identical to the following if…else:

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

Lastly, there’s more magic to `switch` statements. Take a moment to consider this code:

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

In the above example, we use fall-through (i.e. omitted `break`) so both cases are potentially executed. Note that the value passed to the switch is `true`, and the `case` conditions contain comparison expressions (e.g. `a > b`). Given the values in `product` and `order`, the switch essentially gets two `case true:` clauses, so both cases get executed. The switch above is equivalent to _two_ if…else statements:

```js
if (product.stockCount > 0) {
	reserveFromStock(product, Math.min(order.count, product.stockCount));
}

if (order.size > product.stockCount) {
	orderFromThirdParty(product, order.count - product.stockCount);
}
```

Given the improved scannability of switches, I like to use them for long lists of equality checks. Fall-through can also be very useful, but are used incidentally. The last example, where we use comparison expressions and fall-through, does require some practice to both interpret and think of, so I suppose most people will favour `if` statements over the last example.

## 2. Dictionary/map/object or list/array lookup

Let’s say we’re creating issue tracking software and want to add shortcuts for power users. We can do that with both `if`s and `switch`s, but we can also create a mapping between keys and the code we want to execute.

```js
const shortcuts = {
	b: (selectedIssue) => bookmark(selectedIssue),
	c: () => openCreateDialog(),
	d: (selectedIssue) => openDeleteDialog(selectedIssue),
	e: (selectedIssue) => openEditDialog(selectedIssue),
	m: (selectedIssue) => openMoveDialog(selectedIssue),
	t: (selectedIssue) => openTimeTrackerDialog(selectedIssue),
	ArrowLeft: (selectedIssue) => moveToPreviousLane(selectedIssue),
	ArrowRight: (selectedIssue) => moveToNextLane(selectedIssue),
	ArrowDown: (selectedIssue) => decreasePriority(selectedIssue),
	ArrowUp: (selectedIssue) => increasePriority(selectedIssue),
};

window.addEventListener('keydown', (event) => {
	if (event.key in shortcuts) {
		shortcuts[event.key](selectedIssue);
	}
});
```

Look at those 17 lines of awesomeness! This method reduces a list of conditions into a lookup. Additionally, it separates the mapping from the logic, allowing us to add shortcuts without affecting other code.

When the keys are numbers, we can create a mapping with an array:

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

If you want to avoid sparse arrays (arrays with gaps between items), you can choose to use a map `Map`:

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

## 3. Logic operators

Once upon a time, logic operators (e.g. `&&` and `||`) were all the hype. Nowadays, it’s making its reappearance in [React’s](https://reactjs.org) JavaScript syntax extension, [JSX](https://reactjs.org/docs/introducing-jsx.html). Although some uses of these logic operators were perceived as a quirky JavaScript thing, they are quite powerful.

JavaScript uses [type coercion](https://developer.mozilla.org/en-US/docs/Glossary/Type_coercion) to allow developers to compare two values of different types (e.g. `42 == '42'`). This can behave somewhat unexpected and [brings much joy](https://www.destroyallsoftware.com/talks/wat) to some circles. Logic operators (e.g. `&&` and `||`) are used to join comparisons, but can be used with any value. When given non-booleans, JavaScript coerces them into booleans. That’s why we sometimes refer to non-boolean values as _truthy_ and _falsy_ values, as non-boolean values are coerced to either `true` or `false`. For example, `0` is falsy, `1` is truthy, `null` is falsy and `{}` is truthy. So, how does this help us rewrite if-statements?

There’s another piece to the puzzle here, which is that parts of an expression with a logic operator may not be evaluated entirely. Looking at `a && b` and `a || b`, there are two values: one on the left-hand side, and one on the right-hand side of the operator. JavaScript starts evaluating the left-hand side and skips the right-hand side when the left-hand side alone settles the condition.

Considering `a && b`, the value `a` determines whether `b` gets evaluated. If `a` is truthy, `b` needs to be checked to determine whether both `a` and `b` are `true`. However, when `a` is falsy, the condition will be false regardless of the value of `b` and can be ignored.

For `a || b`, it’s the other way around. If `a` is true, we already know this expression will yield `true` and thus `b` isn’t evaluated.

This behaviour creates interesting opportunities to conditionally run an expression. Consider this code:

```js
false && orderProduct();
true && orderProduct();
```

Looking at the first line of the example above, the left-hand side is `false`. Since we used the AND operator (`&&`), this expression will yield `false` regardless of the value after the operator, so the right-hand side isn’t evaluated. This means that `orderProduct()` won’t be called.

The second line, however, starts with `true`. To determine the result of this expression, the right-hand side must be evaluated as well, so `orderProduct()` is called.

The left-hand side can be any expression, like another function call. Consider this code:

```js
isProductInStock(product) && orderProduct(product);
```

When `isProductInStock()` returns true, `orderProduct()` will be called. It’s equivalent to this `if` statement:

```js
if (isProductInStock(product)) {
	orderProduct(product);
}
```

We can chain logic operators, which we can use to chain values and functions that are evaluated until it hits a falsy value. If any of the function calls below returns `false`, all following function calls are ignored.

```js
isProduct(product) &&
	isProductInStock(product) &&
	orderProduct(product) &&
	showMessage('Thank you for your order');
```

Another practical example of this is conditionally rendering HTML in a JSX file:

```jsx
<div>{showButton && <button>click me!</button>}</div>
```

As the AND operator (`&&`) evaluates until it hits a falsy value, the operands of the OR operator (`||`) are evaluated from left to right until it hits a truthy value.

## Bonus: Assertions and try…catch

Assertions are commonly used in test scripts. When an assertion fails, an error is thrown. If conditions are met, nothing happens. Here’s an example of a generic assert function:

```js
function assert(condition, errorMessage) {
	if (!condition) {
		throw new Error(errorMessage);
	}
}
```

If `condition` is false, throw an error. That’s it! Instead of using our own function, we can use the built-in `console.assert()` function, which is functionally identical.

```js
const a = 123;
const b = '123';

// Nothing happens as `a` is indeed a number
console.assert(
	typeof a === 'number',
	`Value ${JSON.stringify(a)} is not a number`,
);

// This line will throw an error as `b` is not a number
console.assert(
	typeof b === 'number',
	`Value ${JSON.stringify(b)} is not a number`,
);
```

With try…catch, we can handle the errors `console.assert()` throws at us. The `try` clause runs code until an error is thrown, so it can halt halfway and skips to the `catch` clause instead. Consider this example:

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
	// This line throws an error, so addToCard() won’t be called
	assertProductStockState(product, 'IN_STOCK');
	addToCart(product);
} catch (error) {
	showMessage('Sorry, product is no longer in stock!');
}
```
<!-- prettier-ignore-end -->

If you think this is an awful amount of code that we could’ve written as an if…else, you’re right, but there are benefits to this.

Imagine our codebase is big and complex, and the check whether a product is in stock is several functions deep. If we’d do our error handling in the top function, we’d have to pass the success state all the way down. For example:

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

Admittedly, this example is a bit tailored to make a point: sometimes assertions can be a quite elegant alternative to if…else.

## Conclusion

You’ve just seen there are many ways to conditionally run code, each with pros and cons. There’s no silver bullet here, as there rarely are. Instead, think of it as having more tools in your toolchain.

So, how do you pick? Always go for the option that’s easy to scan or read, which quite often is the least flexible option. When in doubt, it’s okay to write two or three versions of the same code and pick whichever appears easier to understand. Over time, you’ll grow an intuition for it.
