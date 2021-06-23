**Goal**: Implement a model of adaptive assessment in Numbas, for:

* diagnostic tests
* assessment for learning

---

## DIAGNOSYS

* A _knowledge graph_ of topics, linked by dependency.
* One question per node on the graph.
* Classify each node as "passed" or "failed".
* After answering a question, mark it and its backward/forward dependencies as passed/failed.
* Learning objectives are subsets of the nodes, e.g. "Algebra", "Calculus".
* Use student's qualifications to estimate starting point.
* Limited "lives" for retrying a question.

---

![A graph of 7 nodes. Each is labelled with a question mark. There are lines linking some of the nodes](images/diagnosys-1.svg)

---

![The same graph. One of the nodes is now highlighted.](images/diagnosys-2.svg)

---

![The highlighted node has been marked with a tick.](images/diagnosys-3.svg)

---

![All nodes linked to the highlighted node on the left are marked with a tick.](images/diagnosys-4.svg)

---

![Instead, the highlighted node is marked with a cross. All other nodes are still labelled with question marks.](images/diagnosys-5.svg)

---

![All nodes linked to the highlighted node on the right are marked with a cross.](images/diagnosys-6.svg)

---

## "Mastery"

Inspired by Duolingo.

* Roughly linear.
* Each topic has several questions.
* All questions must be answered correctly.
* Failed questions are put back on the end of a queue.

---

![A graph of 6 nodes. The third and fourth node both link to the second and fifth nodes. The fifth node is highlighted and an arrow from it points to a list of items numbered 1 to 4.](images/mastery-1.svg)

---

![Item number 1 is marked with a tick and shaded out.](images/mastery-2.svg)

---

![Item number 2 is marked with a cross.](images/mastery-3.svg)

---

![Item number 2 moves to the end of the list. Now item number 3 is at the top.](images/mastery-4.svg)

---

## Mathspace

[Talk by Mo Jebara at EAMS 2018](https://eams.ncl.ac.uk/archive/2018/sessions/keynote-mo-jebara/)

* Inner loop: immediate question feedback
* Middle loop: pick a question within a topic
* Outer loop: pick a topic

---

![The Mathspace knowledge graph - nodes linked by edges](images/mathspace-graph.png)

---

## Item response theory

* Update P(pass topic) after each answer.
* Stop asking questions when confidence is high.

---

## Another model (Möbius?)

* Estimate student's knowledge level on a linear scale.
* Move up or down based on answers.
* Ask N questions, chosen based on student's level.

---

## Implementation in Numbas

* Exam author defines topics and learning objectives.
* Topics have "depends on" / "leads to" relations.
* One question group per topic.
* Controlled by a _diagnostic algorithm_.
* Some built-in, can extend or write your own.

(See the [documentation](https://docs.numbas.org.uk/en/latest/exam/diagnostic.html))

---

![A flow chart. First node labelled "Initialise state", leads to a node labelled "Pick a question". That leads in a circle to "Student answers", then "Produce options". The path then branches. Following round the circle leads to "Update state", then back to "Pick a question". The other branch leads to a final node labelled "Test ends".](images/loop.svg)

---

![The same flowchart, with annotations describing feedback at each stage. After "pick a question", feedback is "% completion, estimate of level, current topic". After "Student answers", feedback is "Usual part feedback". After "Produce options" and before "Update state", feedback is "Correct/incorrect; suggested next step". After "Test ends", feedback is "Scores for objectives; summary text."](images/loop-with-feedback.svg)

---

## Success

I've reimplemented DIAGNOSYS in Numbas.

[numbas.mathcentre.ac.uk/exam/22135/diagnosys](https://numbas.mathcentre.ac.uk/exam/22135/diagnosys/)

---

## Writing an adaptive test is hard

Need to write _lots_ of questions.

Must think hard about model of knowledge, and relations between topics.

---

![Two tweets. First is by Howie Hua: Your brain throwing out the definition of a derivative once you learn the power rule. Below is a picture of Indiana Jones replacing an idol labelled with the limit definition of a derivative with a sandbag labelled with the standard derivative of a power of x. Second tweet by David Butler: But did you know the definition before you learned the power rule?](images/howie-david.png)

---

## Partial success!

To do:

* Use DIAGNOSYS on students
* Improve the editing interface: more easily configurable settings
* Implement some other models

**Your input is very welcome!**
