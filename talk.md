> “In the coming year, I’m going to focus less on developing new features in Numbas, and more on organising the content we’ve already got.”

<span style="font-size:3em">🙄</span>

---

# [numbas.mathcentre.ac.uk/stats](https://numbas.mathcentre.ac.uk/stats/):

* 100,000+ questions
* ~9,500 published items
* ~8,000 users
* ~1,500 institutions

---

# Community stats

* Runtime [translated](https://www.numbas.org.uk/contributing-to-numbas/#numbas-in-your-own-language) to 18 languages (LTI tool only 2!)
* ~20 pull requests in the last year
* No stats on LTI use
* ~ [A dozen papers mentioning Numbas](https://scholar.google.co.uk/scholar?as_ylo=2021&q=%22numbas%22&hl=en&as_sdt=0,5)

---

# LTI tool v3.0

* Getting a grip on async tasks!
* [Docker](https://docs.numbas.org.uk/lti/en/latest/installation/docker.html)
* Managing versions better

[numbas.org.uk/blog/2021/11/numbas-lti-provider-v3-0/](https://www.numbas.org.uk/blog/2021/11/numbas-lti-provider-v3-0/)

---

# .exam schema

[numbas.org.uk/schema](https://www.numbas.org.uk/schema/)

---

# Numbas Open Resource Library

**Aim:** Collect good, reliable open-access material in a moderated library.

[In progress](https://numbas.mathcentre.ac.uk/project/17986/)

Please join in on Thursday morning!

---

# Behind the design of Numbas

[numbas.org.uk/behind-the-design/](https://www.numbas.org.uk/behind-the-design/)

~ 13,000 words so far

---

# Custom input methods

## Motivation

I want an interaction that isn't possible with one of the built-ins.

## Solution

Extensions can define new input methods, and custom part types can use them.

[documentation](https://docs.numbas.org.uk/en/latest/extensions/writing-extensions.html#adding-a-new-answer-input-method)

---

# Pre-submit tasks

## Motivation

Something long-running or asynchronous needs to happen before marking.

## Solution

`pre_submit` marking note is evaluated before the rest of the marking algorithm.

[documentation](https://docs.numbas.org.uk/en/latest/marking-algorithm.html#pre-submit-tasks)

---

# Extensions

* [Programming](https://www.numbas.org.uk/blog/2022/02/assess-programming-in-python-and-r-with-numbas/) - more on Wednesday
* [Graph theory](https://www.numbas.org.uk/blog/2022/03/development-update-march-2022/#h-graph-theory-extension) ([demo](https://numbas.mathcentre.ac.uk/exam/27245/graph-theory-questions/preview/))
* [Improvements to JSXGraph](https://www.numbas.org.uk/blog/2021/10/improvements-to-the-jsxgraph-extension/)

---

# Queues

## Motivation

* Manage submissions to the [Open Resource Library](https://numbas.mathcentre.ac.uk/queue/1/)
* Better tools for checking workflow

## Solution 

_Queues_ attached to projects, with checklists and comment threads.

---

# Autocompletion in the editor

<video src="images/numbas-editor-autocomplete.mp4" autoplay loop>

---

# Goals for the immediate future

* Producing [working-out](https://www.numbas.org.uk/blog/2022/03/development-update-march-2022/#h-working-out)
* Lock-down app
* Improve diagnostic mode
* More contributors! ([173](https://github.com/numbas/Numbas/issues) + [101](https://github.com/numbas/editor/issues) + [73](https://github.com/numbas/numbas-lti-provider/issues) = 346 open issues!)
