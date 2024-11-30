---
layout: '@layouts/Post.astro'
title: 'The wrong type of performance'
description: ''
pubDate: 2024-08-20
categories:
	- Thoughts
---

Sometimes, when dealing with Arrays, someone will raise a performance issue. “`Array.prototype.forEach()` is slower than a for-of loop,” they’ll say. Perhaps that statement comes with a 2015 benchmark for credibility.

Sometimes, they’re right, but it rarely matters. Performance gains through syntactic alteration are usually the least consistent and least effective.

Different JavaScript engines compile, optimise, and run code differently, run in different contexts, and on a very wide variety of hardware. An optimisation could work for one specific combination, but not for the others. Moreover, they frequently receive updates, so a syntax that performs better today could perform worse tomorrow.

Instead, good design can have a much greater impact. No performance optimisation matters if we don’t have to loop recursively over thousands of array items.
