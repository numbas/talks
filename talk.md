## Goal

Implement a model of adaptive assessment in Numbas, for diagnostic tests

* Efficiently identify weak spots in students' presumed knowledge
* Don't ask questions that are too easy or too hard

---

## DIAGNOSYS

![The old DIAGNOSYS interface](images/old-diagnosys.png)

---

## DIAGNOSYS

![A graph of 7 nodes. Each is labelled with a question mark. There are lines linking some of the nodes](images/diagnosys-1.svg)

---

## DIAGNOSYS

![The same graph. One of the nodes is now highlighted.](images/diagnosys-2.svg)

---

## DIAGNOSYS

![The highlighted node has been marked with a tick.](images/diagnosys-3.svg)

---

## DIAGNOSYS

![All nodes linked to the highlighted node on the left are marked with a tick.](images/diagnosys-4.svg)

---

## DIAGNOSYS

![Instead, the highlighted node is marked with a cross. All other nodes are still labelled with question marks.](images/diagnosys-5.svg)

---

## DIAGNOSYS

![All nodes linked to the highlighted node on the right are marked with a cross.](images/diagnosys-6.svg)

---

## Implementation in Numbas

* Exam author defines topics and learning objectives.
* Controlled by a _diagnostic algorithm_.
* Some built-in, can extend or write your own.

(See the [documentation](https://docs.numbas.org.uk/en/latest/exam/diagnostic.html))

---

![The DIAGNOSYS exam in Numbas](images/diagnosys-question.png)

---

![The Numbas diagnostic exam editor](images/diagnostic-editor.png)

---

![A flow chart. First node labelled "Initialise state", leads to a node labelled "Pick a question". That leads in a circle to "Student answers", then "Produce options". The path then branches. Following round the circle leads to "Update state", then back to "Pick a question". The other branch leads to a final node labelled "Test ends".](images/loop.svg)

---

## Useful when

You want to test:

* small
* easily-assessed
* hierarchical

pieces of knowledge

---

## Writing an adaptive test is hard

Need to write _lots_ of questions.

Must think hard about model of knowledge, and relations between topics.

---

## Thanks!

* [numbas.org.uk](https://www.numbas.org.uk)
* [numbas@ncl.ac.uk](mailto:numbas@ncl.ac.uk)
