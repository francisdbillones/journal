---
layout: post
title: context rot
tags:
    - generative-ai
    - technology
---

I've been working a lot more with agents recently, and developing my own theory of mind as a result.

I know it's hardly novel, but "context rot" and the particular manner in which you curate the information you provide the agent for it to do its task has got me thinking a lot of the way we humans ourselves perform our tasks. Mostly because they are *eerily* similar.

"Context rot" is the empirical phenomenon in which LLM "performance" degrades as more and more tokens fill up the context. "Context engineering" is the art (because there is no hard science to this) of continuously managing what stays and what goes in an agent's context as it works.

It can very much be thought of as a "hack", because the "ideal" LLM experience is just manufacturing the prompt. Context management is an unfortunate additional side-quest.

What's interesting is that a lot of human engineering principle maps cleanly to solving this problem. Abstraction, composition, responsibility separation — all are principles I've drawn from when steering the agent, which begs the question: are they themselves "hacks"?


**What is the perfect program?**

It depends on the specific metric you're optimizing for. It's easy to define what it means to optimize for time/memory; all of those programs would look like pure bare-metal assembly with zero abstractions.

...what is optimizing for "maintainability"? It's easy and intuitive for us humans to "understand" what this means (in a loose definition of "understand" — what is and is not maintainable code is still very much an unsolved and heavily debated topic). It's not a metric that LLM post-training loops can optimize for.

It *sounds* foundational, just like optimizing for time/memory. But then is optimizing for "agent maintainability" foundational as well? 

Or is "maintainability" itself a hack as well?
