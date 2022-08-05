---
layout: '@layouts/Post.astro'
title: 'What makes JavaScript so popular'
pubDate: 2022-08-04
draft: true
---

JavaScript is an immensely popular language. In fact, according to Stack Overflow’s [2022 Developer Survey](https://survey.stackoverflow.co/2022/#technology-most-popular-technologies), it ranks first! TypeScript, a superset of JavaScript, isn’t far behind. What makes JS — a language that’s often subject to ridicule — so popular?

## Low barrier of entry

Getting started with JavaScript is relatively easy, compared to many other languages. After creating a text file with the `.js` extension, you can embed it in a webpage to run it in a browser, or install a runtime (Node.js/Deno/Bun) to run it on your computer like any other program. Wait a minute… it’s actually easier than that! You can go to CodeSandbox, CodePen, StackBlitz or any other online code app and write and test your JS there!

It makes sense to be able write and run JS in the browser, as it’s _the_ web’s scripting language after all, and that’s what makes the barrier of entry incredibly low. You don’t have to learn about architectures, compilers, or runtimes. You don’t have to figure out whether you need just the framework or an <abbr title="Software Development Kit">SDK</abbr>. One line of valid JavaScript will run; other than potentially some HTML, you don’t need code to bootstrap your application, like `public static void main(String args[])`. You can navigate to a web application, write one line of JavaScript, and get the satisfaction of seeing that your program did something.

As a language, JS is forgiving. Reassigning a variable with a different type than the original value? No problem! Although this “feature” fools everyone at least once in their career, the dynamically typed nature of JS allows users to get started with little theory. Users don’t need to trouble themselves with data types, access modifiers, immutability, whatever. They just get to code. Because JS doesn’t imply a paradigm (e.g. <abbr title="Object-Oriented Programming">OOP</abbr> or <abbr title="Functional Programming">FP</abbr>), beginners can start by writing little scripts and get into programming paradigms later.

Once you get comfortable with the syntax, experienced [some quirks](https://www.destroyallsoftware.com/talks/wat), and begin to settle with a paradigm, you’ll get into libraries, frameworks, and package managers. Arguably, this is the worst part of JavaScript. Some years ago, [JavaScript fatigue](https://auth0.com/blog/how-to-manage-javascript-fatigue/) was a commonly shared experience as people got overwhelmed with the countless libraries and frameworks, and overhead required to write some JS. It settled down a little, although I’m not sure it’s a temporary phase or will stay that way.

After writing some code, we want to deploy it. A web application with client-side JS can be hosted anywhere that supports static hosting, that various services provide freely: GitHub Pages, Netlify, and Vercel, just to name a few. Hosting your own Node.js server on a <abbr title="Virtual Private Server">VPS</abbr> is a bit fiddly, but that’s why cloud functions are a blessing. Cloud function providers often take away a lot of complexity like security, stability, and deployment, and many offer a free tier. Regardless of what you’re building, hosting providers try to make it as easy as possible.

There are few obstacles between getting started and deploying your own product. JavaScript doesn’t trouble beginners with every problem at once but allows them to progressively learn more to write better code.

## It objectively has good parts

There’s [a meme](https://i.redd.it/h7nt4keyd7oy.jpg) about how much thinner the book _JavaScript: The Good Parts_ is compared to _JavaScript: The Definitive Guide_, implying JavaScript has mostly bad parts. It definitely has quirks, but that doesn’t make JS bad.

Being built for browsers, JS is designed so it doesn’t block the <abbr title="User Interface">UI</abbr> and heavily relies on events to run small snippets of code. As a consequence, functions are a [first-class citizens](https://en.wikipedia.org/wiki/First-class_citizen), which turns out to be very handy for reusability and extensibility, amongst other things.

The async nature allows JS runtimes to be single-threaded using an [event loop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop). Unfortunately, it makes code execution order unpredictable and requires some understanding of scopes (i.e. when variables are and aren’t available).

All of this makes JS a solid language for UIs, which explains why people choose web technology to build mobile and desktop applications using tools like Flutter and React Native. In fact, the [Microsoft Flight Simulator UI](https://docs.flightsimulator.com/html/Introduction/Using_The_SDK.htm#ui) was written in HTML, CSS, and JS! Web technology in a game 🤯

When much of your code consists of callbacks and run in arbitrary order, it creates some pitfalls, like callback hells and assuming events are triggered (and callbacks are called) in a specific order. All of these can be mitigated by learning about `Promise`s, async functions, and by not assuming execution order.

## Conclusion

Yes, yes, JavaScript isn’t perfect. No language is. Nonetheless, it’s genuinely good at what it’s used for. We can avoid some minor flaws with static code analysis (like linters) and gain more confidence with tools like TypeScript.

Despite it’s bad reputation, JS never lost it’s dominance on the web, gained much popularity as an server-side alternative shortly after the rise of Node.js, and continues to be a popular choice for mobile and desktop applications.

You can build just about anything after learning JavaScript!
