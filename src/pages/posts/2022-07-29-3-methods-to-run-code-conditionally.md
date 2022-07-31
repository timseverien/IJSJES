---
layout: '@layouts/Post.astro'
title: '3 methods to run code conditionally without if-statements'
---

In every codebase, you’ll have conditions in which you want to run or skip code. Conventionally, if…else-statements are one of the first things we learn in JavaScript, specifically to conditionally run code.

```js
const product = { id: 1, isInStock: true };

if (product.isInStock) {
	showMessage('Order now!');
} else {
	showMessage('Sorry, you’re too late!');
}
```

So elegant, don’t you think? There are cases, however, where we can use alternatives. There’s opportunity for endless debate which methods are suitable for which situations. Let’s not go there and just learn about the options we’re given.

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

First, there’s readability. If we have an if…else with many `else if` blocks, we’d have to repeat the condition `stockInformation.state === 'SOME_VALUE'` many times. Repetition isn’t neccisarily bad, but because an if…else can contain complex conditions, they’re relatively hard to scan. Instead, they have to be read. As a switch has the equality check built-in, they’re much more suitable for scanning. Compare the last code example with this functionally equivalent code:

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

Note that the `default` case is similar to the last `else` block of an if…else statement.

Take note of the `break` statement in the switch from earlier. You may recall this is also used to terminate loops. In this case, it breaks out the switch as it’ll continue to check the next clauses otherwise. It’s a good habit to add `break`s by default and remove them when needed.

Omitting the `break` statement causes a so-called fall-through, and they can be quite useful. Consider the following example:

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

In the above example, both `NOT_IN_STOCK` and `NOT_IN_STOCK_AND_NEVER_WILL_BE` will both yield the same message. Because the `case: 'NOT_IN_STOCK'` clause has no body, it’ll fall through the next clause. It’s functionally identical to the following if…else:

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

I’m using fall-through (i.e. ommitted `break`) so both cases are potentially executed. Note that the value passed to the switch is `true`, and the `case` conditions contain comparison expressions (e.g. `a > b`). Given the `product` and `order`, the switch essentialy gets two `case true:` clauses, and `true === true`, so both cases get executed. The switch above is equivalent to _two_ if…else statements:

```js
if (product.stockCount > 0) {
	reserveFromStock(product, Math.min(order.count, product.stockCount));
}

if (order.size > product.stockCount) {
	orderFromThirdParty(product, order.count - product.stockCount);
}
```

Given the improved scanability of switches, I like to use them for long lists of equality checks. Fall-through can be also very useful, although I don’t use it that often. The last example, where we use comparison expressions and fallthrough, does requires some practise to both interpret and to conjure up, but can be useful from time to time.

## 2. Dictionary/map/object or list/array lookup

Let’s say we’re creating issue tracking software and want to add shortcuts for power users. We can do that with both `if`s and `switch`s, but let’s create a mapping between keys and code instead.

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

Look at those 17 lines of awesomeness! This method reduces a list of conditions into a lookup. Additionally, it separates the mapping, allowing us to work on it in isolation.

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

## 3. binary logic operators

Once upon a time, binary logic operators (e.g. `&&` and `||`) were all the hype until it wasn’t. Nowadays, it’s commonly used in [React](https://reactjs.org)’s JavaScript syntax extension, [JSX](https://reactjs.org/docs/introducing-jsx.html), which is available in various contexts outside React. I’m sure it’s confusing to non-JavaScript developers, but it’s actually pretty powerful. It requires a little bit of JavaScript theory to understand — allow me to explain.

JavaScript uses [type coersion](https://developer.mozilla.org/en-US/docs/Glossary/Type_coercion) to allow developers to compare two values of different types (e.g. `42 == '42'`). This can behave somewhat unexpected and causes both [laughter](https://www.destroyallsoftware.com/talks/wat) and cries. Binary logic operators (e.g. `&&` and `||`) are used to check whether multiple boolean values meet a criteria, but when given non-booleans, JavaScript ceorces them into booleans. Typically, we refer to non-boolean values as _truthy_ and _falsy_ values, instead of `true` and `false`. For example, `0` is falsy, `1` is truthy, `null` is falsy and `{}` is truthy. So how does this help us rewrite if-statements?

There’s another piece to the puzzle here, which is that parts of an expression with a logic operator may not be evaluated entirely. Looking at `a && b` and `a || b`, there are two values: one on the left-hand side, and one on the right-hand side of the operator. JavaScript starts with evaluating the left-hand side and skips the right-hand side when the left-hand side already settles the condition.

Considering `a && b`, the value `a` determines whether `b` gets evaluated. If `a` is truthy, `b` needs to be checked to determine both `a` and `b` is `true`. However, when `a` is falsy, the condition will be false regardless of the value of `b` and can be ignored.

For `a || b`, it’s the other way around. If `a` is true, we already know this expression will yield `true` and thus `b` isn’t evaluated.

This behaviour creates interesting opportunities to chain functions calls with the logic operators acting like gates, as they’re able to continue and terminate evaluation based on the left-hand value. Consider this code:

```js
isProductInStock(product) && orderProduct(product);
```

This code will only call `orderProduct()` when `isProductInStock()` returns true. The if-statement equivalent is this:

```js
if (isProductInStock(product)) {
	orderProduct(product);
}
```

We can chain binary logic operators which we can use to chain values and functions that are evaluated until it hits a falsy value.

```js
isProduct(product) &&
	isProductInStock(product) &&
	orderProduct(product) &&
	showMessage();
```

Similarly, with the `||` operator, we can chain values and function calls that are evaluated from left to right until the runtime hits a truthy value.

A practical example of this is conditionally rendering HTML in a JSX file:

```jsx
<div>{showButton && <button>click me!</button>}</div>
```

## Bonus: Assertions and try…catch

Assertions are typically used in test scripts. When an assertion fails, an error is thrown. If conditions are met, nothing happens. Here’s an example of a generic assert function:

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

// This line won’t do anything as `a` is indeed a number
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

With try…catch, we can handle the errors `console.assert()` throw at us. A try…catch consists of two blocks. The `try` block runs code until an error is thrown. When an expression throws an error, it skips the rest of the `try` block, and continues to the `catch` block instead. Consider this example:

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

Imagine your codebase is big and complex, and the check whether a product is in stock is several functions deep. If we’d do our error handling in the top function, we’d have the pass the success state all the way down. For example:

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

Admittedly, this example is a bit tailored to make a point: there are moments where assertions can be a quite elegant alternative to if…else.

## Conclusion

You’ve just seen there are many ways to conditionally run code, each with pros as cons. There’s no silver bullet here, as there rarely are. Instead, think of it as having more tools in your toolchain.

So, how do you pick? Always go for the option that’s easy to scan or read, which quite often is the least flexible option. When in doubt, it’s okay to write two or three versions of the same code and pick whichever appears easier to understand. Over time, you’ll grow an intuition for it.
