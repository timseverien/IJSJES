---
layout: '@layouts/Post.astro'
title: 'What makes JavaScript so popular'
pubDate: 2022-08-06
---

JavaScript is an immensely popular language. In fact, according to Stack Overflow’s [2022 Developer Survey](https://survey.stackoverflow.co/2022/#technology-most-popular-technologies), it ranks first! TypeScript, a superset of JavaScript, isn’t far behind. What makes JS — a language that’s often subject to ridicule — so popular?

## Low barrier of entry

Getting started with JavaScript is easier in comparison to many other languages. After creating a text file with the `.js` extension, you can embed it in a webpage to run it in a web browser, or install a runtime (Node.js/Deno/Bun) to run it on your computer like any other program. Wait a minute… it’s actually easier than that! You can go to CodeSandbox, CodePen, StackBlitz or any other online code app and write and test your JS there!

It makes sense to be able to write and run JS in the browser, as it’s _the_ web’s scripting language after all, and that’s what makes the barrier of entry incredibly low. You don’t have to learn about architectures, compilers, or runtimes. You don’t have to figure out what to download: “will the framework suffice, or do I need the <abbr title="Software Development Kit">SDK</abbr>?” One line of valid JavaScript will run; other than potentially some HTML, you don’t need code to bootstrap your application, like `public static void main(String args[])`. You can navigate to a web application, write one line of JavaScript, and get the satisfaction of seeing that your program did something.

As a language, JS is forgiving. Reassigning a variable with a different type than the original value? No problem! Although this “feature” fools everyone at least once in their career, the dynamically typed nature of JS allows users to get started with little theory. Users don’t need to trouble themselves with data types, access modifiers, immutability, whatever. They just get to code. Because JS doesn’t imply a paradigm (e.g. <abbr title="Object-Oriented Programming">OOP</abbr> or <abbr title="Functional Programming">FP</abbr>), beginners can start by writing little scripts and get into programming paradigms later.

Once you get comfortable with the syntax, have experienced [some quirks](https://www.destroyallsoftware.com/talks/wat), and start to settle with a paradigm, you’ll get into libraries, frameworks, and package managers. Arguably, this is the worst part of JavaScript. Some years ago, [JavaScript fatigue](https://auth0.com/blog/how-to-manage-javascript-fatigue/) was a commonly shared experience as people got overwhelmed with the countless libraries and frameworks, and the overhead required to write some JS. Nowadays, people don’t appear to be as fatigued back then, but I’m not sure if that’s temporary or not.

After writing some code, we want to deploy it. A web application with client-side JS can be hosted anywhere that supports static hosting, that various services provide freely: GitHub Pages, Netlify, and Vercel, just to name a few. Hosting your own Node.js server on a <abbr title="Virtual Private Server">VPS</abbr> is a bit fiddly, which is probably why cloud functions are immensely popular. Cloud function providers often take away a lot of complexity like security, stability, and making your code run on a server. Next to being easier to work with, many providers also offer a free tier!

There are a few obstacles between getting started and deploying your own product. Instead of being bombarded with all complexity at once, much of it can be deferred when learning JavaScript. On top of that, the ecosystem is very competitive, forcing providers to lower their barrier of entry, too. It’s amazing for developers!

## It’s objectively good

There’s [a meme](https://i.redd.it/h7nt4keyd7oy.jpg) about how much thinner the book _JavaScript: The Good Parts_ is compared to _JavaScript: The Definitive Guide_, implying JavaScript has mostly bad parts. Although there are some quirks, one of the good parts makes it the most dominant language for <abbr title="User Interface">UI</abbr>s.

Being built for browsers, JS is designed to avoid blocking the UI and heavily relies on events to run small snippets of code. As a consequence, functions are [first-class citizens](https://en.wikipedia.org/wiki/First-class_citizen), which turns out to be very handy for reusability and extensibility, amongst other things.

The asynchronous nature allows JS runtimes to be single-threaded using an [event loop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop). Unfortunately, it makes code execution order unpredictable and requires some understanding of scopes (i.e. when variables are and aren’t available).

All of this makes JS a solid language for UIs, which explains why people choose web technology to build mobile and desktop applications using tools like Flutter and React Native. In fact, the [Microsoft Flight Simulator UI](https://docs.flightsimulator.com/html/Introduction/Using_The_SDK.htm#ui) was written in HTML, CSS, and JS! Web technology in a game 🤯

When much of your code consists of callbacks and runs in arbitrary order, it creates some pitfalls, like callback hell and assuming events are triggered (and callbacks are called) in a specific order. All of these can be mitigated by learning about `Promise`s, async functions, and by avoiding dependencies between event handlers. If you’re a beginner or considering learning JS, you might not get any of this lingo yet, and that’s fine — you will cross that bridge when you get there.

## Conclusion

Yes, yes, JavaScript isn’t perfect. No language is. Nonetheless, it’s genuinely good at what it’s used for. We can avoid minor flaws with static code analysis (like linters) and gain more confidence with tools like TypeScript.

Despite its bad reputation, JS never lost its dominance on the web, gained much popularity as a server-side alternative shortly after Node.js was released, and continues to be a popular choice for mobile and desktop applications.

If you’re not hyped about JS, that’s alright. [About ⅓ dread the language.](https://survey.stackoverflow.co/2022/#section-most-loved-dreaded-and-wanted-programming-scripting-and-markup-languages) But remember the power JS gives you: with it, you can build just about anything!
