title = "A tour of advanced mathematical assessment in Numbas"
presenter = "<a href=\"https://www.staff.ncl.ac.uk/christian.perfect/\">Christian Lawson-Perfect</a>"
affiliation = "Newcastle University"
event = "<a href=\"https://pcwww.liv.ac.uk/~itho17/workshop2025/\">Automated grading in mathematics & statistics: beyond the basics</a>, Liverpool University, July 2025"

+++

# Abstract

Numbas is an open-source e-assessment system aimed at mathematical disciplines, developed at Newcastle University. Since the beginning, we've been using it to assess topics at all stages of our maths and stats degree course, from A-Level transition to stage 4 pure maths modules.

I'll talk about how Numbas has been designed to assess advanced mathematical subjects and demonstrate some material making use of these features.

---

# Where are we starting from?

The framing of this event suggests that most of the audience are using basic, possibly randomised, single-input questions automatically marked by comparison with an expected answer.



e.g. "Calculate <math><mi>f</mi><mo>(</mo><mi>x</mi><mo>)</mo></math>", marked by comparing student's answer with the correct value of <math><mi>f</mi><mo>(</mo><mi>x</mi><mo>)</mo></math>.

More sophisticated assessment systems have existed for longer than I have!

See Sangwin's book.

So: do I show really whizz-bang, cutting-edge stuff, or stuff we've been doing for years but which this audience hasn't seen?

---

# My position on assessment

Formative assessment is useful.

Summative assessment is a necessary evil.

---

# Basics

None of this is specific to advanced mathematics.

## Parts

Break up a long question into parts which are marked independently of each other.

## Steps

Give an option to break up a longer calculation into smaller pieces: offer scaffolding.

---

# The user interface

We don't want to penalise students for small mistakes or misunderstandings.

* Don't accept unmarkable input, and always give immediate feedback so the student can fix it.
* Always allow the student to change their answer.
* Show how parts relate to each other, e.g. "this part's marking depends on your answer to the previous part."

---

# Adaptive marking

Replace a question variable with the student's answer to a previous part.

Allows "error carried forward" marking.

Or, adventurously, allow the student to make up their own question. (more on that later)

---

# Alternative answers

Mark against a few different expected answers / marking settings.

Give tailored feedback; catch common errors; generally give some more wiggle room.

---

# Custom marking algorithms

Test the properties of the student's answer.

Do several things with it.

Give detailed feedback.

Branching decision trees.

Build up a series of feedback notes.

Combine several answer inputs.

e.g. 

* "Give an example of X"

There's almost always more than one valid answer to a question.

---

# Custom part types

Use different input methods / formats.

---

# Explore mode

Allow more choice.

Assess the student's choice of method.

Let the student design their own question.

Follow an algorithm.

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
