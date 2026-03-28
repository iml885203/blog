---
title: 'The Night I Became a Nuxt Contributor'
date: 2026-03-10 12:30:00
category: '🤖 人工智慧'
tags:
  - 'AI'
  - 'OpenClaw'
  - 'Nuxt'
  - '開源貢獻'
cover: '/images/the-night-i-became-nuxt-contributor.webp'
description: 'I made my first Nuxt open-source contribution entirely from my phone during my commute — merged by Daniel Roe the next morning.'
---

During my one-hour commute home from work, I made my first open-source contribution to Nuxt — entirely from my phone. The next morning, the PR had already been merged by the framework's lead maintainer, Daniel Roe.

## From Clocking Out to Opening a PR

It was almost 7 PM on a Monday evening, and I was on my way home from work. I opened Discord and told Winnie: "Look through Vue-related packages and see if there are any high-value bugs that would be easy to fix."

Winnie is my [OpenClaw](https://openclaw.ai) agent, running on a Mac Mini at home. I chat with it from my phone; it works on the computer.

A few minutes later, Winnie had scanned the issue trackers for Nuxt, Vue Router, VueUse, and other projects, filtering out issues that had no PR yet and were reasonable in difficulty. One caught my eye — [#34482](https://github.com/nuxt/nuxt/issues/34482): page titles set with `useHead` in `.server.vue` pages were disappearing after hydration. [Daniel Roe](https://github.com/danielroe) had already confirmed it needed a fix.

"This one looks good. See if you can reproduce it."

Winnie cloned the reporter's reproduction, confirmed the bug with Playwright, and then traced through the Nuxt source code to locate the root cause. I watched the updates roll in on the subway: "Is this the minimal viable change? Don't refactor anything while you're at it." The direction was right.

By 7:30, the fix was written and verified. "Should we add tests?" "Does this project have a convention for comments?" — quality details that took just one message to confirm from my phone.

Shortly after 8 PM, the [PR](https://github.com/nuxt/nuxt/pull/34491) was up. Eight lines total. I had just walked through my front door.

The next morning, Daniel Roe had already merged it.

## How the Human and the Agent Split the Work

I never opened a laptop throughout this entire process. But that doesn't mean the AI could have handled it alone.

Looking back, certain decisions could only be made by a human: which issue to pick, the fix strategy ("minimal change, no refactoring"), and quality checks (comment style, test coverage). These are engineering judgments, not code generation. Winnie handled everything that required sitting in front of a computer — scanning issue trackers, tracing source code, reproducing the bug, writing the fix and tests, committing and pushing.

If I had to use a driving analogy: I decided where to go and which route to take. Winnie stepped on the gas and checked the mirrors. All I needed was a phone and Discord.

## Why This Is a Milestone

Fixing 8 lines of code isn't exactly a technical feat.

But in the past, the thing that always stopped me from contributing to open source was never ability — it was **activation cost**: understanding the architecture of a large monorepo, tracing root causes in an unfamiliar codebase, setting up the environment to run tests, checking the coding style... None of these steps are hard on their own, but stacked together they add up to "forget it, I'll just binge-watch something this weekend."

OpenClaw didn't change my technical skills — I could already read Vue's hydration logic just fine. What it changed was the friction. I recently came across a quote from [Peter Steinberger](https://www.youtube.com/watch?v=8lF7HmQ_RgY) (OpenClaw's creator, who recently joined OpenAI) that captures it well:

> You used to have to carefully pick which side project to work on, because writing software is hard. Now the bottleneck has shifted from "can you build it" to "do you know what to build."

On the subway, from my phone, in one hour. Once the barrier is low enough, you start finding yourself willing to try a lot more things.

This is probably where AI as a capability amplifier matters most — not enabling you to do things you couldn't do before, but making you willing to start things you were too lazy to begin.
