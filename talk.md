title = "A tour of advanced mathematical assessment in Numbas"
presenter = "<a href=\"https://www.staff.ncl.ac.uk/christian.perfect/\">Christian Lawson-Perfect</a>"
affiliation = "Newcastle University"
event = "<a href=\"https://pcwww.liv.ac.uk/~itho17/workshop2025/\">Automated grading in mathematics & statistics: beyond the basics</a>, Liverpool University, July 2025"

+++

# Where are we starting from?

The framing of this event suggests "basic" means single-input, possibly randomised, questions automatically marked by comparison with an expected answer.

e.g. "Calculate <math><mi>f</mi><mo>(</mo><mi>x</mi><mo>)</mo></math>", marked by comparing student's answer with the correct value of <math><mi>f</mi><mo>(</mo><mi>x</mi><mo>)</mo></math>.

More sophisticated assessment systems than this have existed for longer than I have!

---

# My position on assessment

Formative assessment is useful.

Summative assessment is a necessary evil.

---

# What we use Numbas for

Modules with Numbas assessments in the last two years:

<table class="small-text" style="font-size: min(1.7cqw, 2cqh);">
<thead>
<tr>
<th colspan="4">Stage</th>
</tr>
<tr>
<th>1</th>
<th>2</th>
<th>3</th>
<th>4</th>
</tr>
</thead>
<tbody>
<tr>
<td>
<ul>
    <li>Algebra</li>
    <li>Calculus and Differential Equations</li>
    <li>Dynamics</li>
    <li>Logic, Sets and Counting</li>
    <li>Multivariable Calculus</li>
    <li>Number Systems</li>
    <li>Probability, Statistics & R</li>
    <li>Problem Solving with Python</li>
    <li>Real Analysis</li>
</ul>
</td>

<td>
<ul>
    <li>Bayesian methods</li>
    <li>Complex Analysis</li>
    <li>Computational Probability and Statistics with R</li>
    <li>Differential Equations Transforms and Waves</li>
    <li>Fluid Dynamics</li>
    <li>Groups and Discrete Mathematics</li>
    <li>Linear Algebra</li>
    <li>Scientific Computation with Python</li>
    <li>Vector Calculus</li>
</ul>
</td>

<td>
<ul>
    <li>Coding Theory</li>
    <li>Electromagnetism</li>
    <li>Instabilities</li>
    <li>Mathematical Biology</li>
    <li>Methods for Differential Equations</li>
    <li>Metric Spaces and Topology</li>
    <li>Partial Differential Equations</li>
    <li>Relativity</li>
    <li>Stochastic Processes</li>
    <li>Topology</li>
</ul>
</td>

<td>
<ul>
    <li>General Relativity</li>
    <li>Metric Spaces and Topology</li>
    <li>Statistical Foundations of Business Analytics</li>
</ul>
</td>

</tbody>
</table>

---

# We cheat a bit

A lot of high-stakes assessments have the rote stuff assessed by Numbas, and harder stuff marked by hand.

---

# How we write material for advanced modules

Simple question types go a long way!

We sometimes write an extension to add functions or new data types.

---

# Basics

None of this is specific to advanced mathematics.

## Parts

Break up a long question into parts which are marked independently of each other.

## Steps

Give an option to break up a longer calculation into smaller pieces: offer scaffolding.

---

# Parts and steps

<numbas-exam noload source_url="exams/parts-and-steps.exam" locale="en-GB"></numbas-exam>

---

# Adaptive marking

Replace a question variable with the student's answer to a previous part.

Allows "error carried forward" marking.

Or, adventurously, allow the student to make up their own question. (more on that later)

---

# Adaptive marking

<numbas-exam noload source_url="exams/adaptive-marking.exam" locale="en-GB"></numbas-exam>

---

# Alternative answers

Mark against a few different expected answers / marking settings.

Give tailored feedback; catch common errors; generally give some more wiggle room.

---

# Alternative answers

<numbas-exam noload source_url="exams/alternative-answers.exam" locale="en-GB"></numbas-exam>

---

# Custom marking algorithms

You can change how any part in Numbas is marked.

Feedback and score are built up through a series of *notes*.

* Test the properties of the student's answer.
* Do several things with it.
* Give detailed feedback.
* Branching decision trees.
* Combine several answer inputs.

There's almost always more than one valid answer to a question.

---

# Custom marking algorithms

<numbas-exam noload source_url="exams/custom-marking-algorithm.exam" locale="en-GB"></numbas-exam>

---

# Custom part types

Use different input methods / formats.

---

# Permutation cycle notation input

<numbas-exam noload source_url="exams/group-theory.exam" locale="en-GB"><script type="application/json" slot="extension-data">{"permutations": {"root": "numbas-runtime/extensions/permutations/", "stylesheets": [], "javascripts": ["permutations.js"]}}</script></numbas-exam>

---

# Graph input

<numbas-exam noload source_url="exams/graph-theory.exam" locale="en-GB"><script type="application/json" slot="extension-data">{"graph-theory": {"root": "numbas-runtime/extensions/graph-theory", "stylesheets": ["graph-theory.css"], "javascripts": ["graph-theory.js", "graph-app.js", "svg.js"]}}</script></numbas-exam>

---

# Explore mode

Allow more choice.

Assess the student's choice of method.

Let the student design their own question.

Follow the steps of an algorithm.

---

# Explore mode

<numbas-exam noload source_url="exams/permutations-explore.exam" locale="en-GB"><script type="application/json" slot="extension-data">{"permutations": {"root": "numbas-runtime/extensions/permutations/", "stylesheets": [], "javascripts": ["permutations.js"]}}</script></numbas-exam>

---

# Explore mode

<numbas-exam noload source_url="exams/polynomial-explore.exam" locale="en-GB"><script type="application/json" slot="extension-data">{"polynomials": {"root": "numbas-runtime/extensions/polynomials/", "stylesheets": [], "javascripts": ["polynomials.js"]}}</script></numbas-exam>

---

# Thanks!

<dl>
<dt>Website</dt>
<dd><a href="https://www.numbas.org.uk">numbas.org.uk</a></dd>

<dt>Email</dt>
<dd><a href="mailto:numbas@ncl.ac.uk">numbas@ncl.ac.uk</a></dd>

<dt>Fediverse</dt>
<dd><a href="https://mathstodon.xyz/@numbas">@numbas@mathstodon.xyz</a></dd>

<dt>Source code</dt>
<dd><a href="https://github.com/numbas">github.com/numbas</a></dd>
</dl>
