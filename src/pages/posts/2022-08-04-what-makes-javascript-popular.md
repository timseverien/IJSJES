---
layout: '@layouts/Post.astro'
title: 'What makes JavaScript so popular'
pubDate: 2022-08-04
draft: true
---

JavaScript is an immensely popular language. In fact, according to Stack Overflow’s [2022 Developer Survey](https://survey.stackoverflow.co/2022/#technology-most-popular-technologies), it ranks first! TypeScript, a superset of JavaScript isn’t far behind. What makes the language — that’s often subject to ridicule — so popular?

## Low barrier of entry

Getting started with JavaScript is relatively easy, compared to many other languages. After creating a JavaScript file, you can embed it in a webpage to run it in a browser, or install a runtime (Node.js/Deno/Bun) to run it on your computer like any other program. Wait a minute… it’s actually easier than that! You can go to CodeSandbox, CodePen, StackBlitz or any other online code app and write and test your JavaScript there!

It makes sense to be able write and run JavaScript in the browser, as it’s _the_ web’s scripting language, and it makes the barrier of entry incredibly low. You don’t have to learn about architectures, compilers, or runtimes. You don’t have to figure out whether you need just the framework or an <abbr title="Software Development Kit">SDK</abbr>. One line of valid JavaScript will run; you don’t need a class and `public static void main(String args[])` or any other code to bootstrap your application. You can navigate to a web application, write one line of JavaScript, and get the satisfaction of seeing that your program did something.

As a language, JavaScript is forgiving. Reassigning a variable with a different type than the original value? No problem! Although this “feature” fools everyone at least once in their career, the dynamically typed nature of JavaScript holds off much theory. Users don’t need to trouble themselves with data types, casting, memory, or whatever. They just get to code. Because JavaScript doesn’t imply a paradigm (e.g. OOP or FP)

At some point we want to deploy some of our work. A web application with client-side JavaScript can be hosted anywhere that supports static hosting, that various services provide freely: GitHub Pages, Netlify, Vercel, just to name a few. Server-side web applications, however, are more fiddly. We can choose between cloud functions or hosting through a <abbr title="Virtual Private Server">VPS</abbr>. There are several cloud function services you can use for free (albeit limited). Although it can be a bit tedious work to set up and we have to deal with some constraints, we can publish our first few projects for free.

There are few obstacles between getting started and deploying your own product.

## It’s objectively good

There’s [a meme](https://i.redd.it/h7nt4keyd7oy.jpg) about how much thinner the book _JavaScript: The Good Parts_ is compared to _JavaScript: The Definitive Guide_, implying JavaScript has mostly bad parts. Although JavaScript isn’t perfect, the good parts are really good.

Because JavaScript is built for browsers, it’s designed to
