#import "slideshow.typ": slideshow, slide, abbr, freetext, aside, reveal, marker, rowlist


#show: doc => slideshow(
    title: [Accessibility of e-!assessment],
    presenter: "Christian Lawson-Perfect",
    affiliation: "Newcastle University",
    event: "Durham University Education and Pedagody seminar, 2026-03-18",
    doc
)

#slide(title: "TO DO")[

    - Look at Numbas interface and spot accessibility things.
    - Think about different kinds of access needs, and how you resolve them.
    - Examples

]

#slide(title: "Situations a person might find themself in")[

    - Blind
    - Colourblind
    - Deaf
    - Visual sensitivity
    - Limited mobility
    - Dyslexia
    - Fatigue
    - Processing disorder
    - Memory loss
    - EAL
    - Autism
    - ADHD
    - Poor internet connection
    - Small screen
    - Limited keyboard
    - Slow computer
    - Limited time

]

#slide(title: "Abstract")[

    I'll give a brief introduction to the topic of accessibility, then talk about particular access considerations for mathematical e-assessment.

]

#slide(title: "About me")[

    Learning software developer in the digital learning unit of Newcastle University' school of Maths, Stats and Physics.

    #html.hr()

    Developer of #link("https://numbas.org.uk")[Numbas] and #link("https://chirun.org.uk")[Chirun].

    Disabled in a few ways.

]

#slide(title: "What does 'accessibility' mean?")[

    #reveal[
        #quote(attribution: [#link("https://accessibility.blog.gov.uk/2016/05/16/what-we-mean-when-we-talk-about-accessibility-2/")[Alistair Duggin, Accessibility in government]])[
            Accessibility means that people can do what they need to do in a similar amount of time and effort as someone that does not have a disability. It means that people are empowered, can be independent, and will not be frustrated by something that is poorly designed or implemented.
        ]
    
        I'll extend "disability" to "any circumstance that poses an obstacle".
    ]

]

#slide(title: "Our obligations under law")[

    #reveal[

        The Equality Act 2010 and #abbr("Public Sector Bodies Accessibility Regulations")[PSBAR] 2018 requires all public sector organisations to provide online content that meets the #abbr("Web Content Accessibility Guidelines")[WCAG] 2.2 AA standard.

        #link("https://accessibility.education.gov.uk/")[accessibility.education.gov.uk] and #link("https://www.jisc.ac.uk/guides/accessibility-regulations-what-you-need-to-know")[JISC] have helpful pages.

        *In short:*

        - You've got to do it.
        - Unless it would impose a _disproportionate burden_.
        - But that doesn't mean what you think it means.
        - Just do it.

    ]
]

#slide(title: "The principle")[

    Let the student show you what they can do.

    Help them to feel comfortable while they do that.

]

#slide[

    Perfect is not possible.

    Good is possible.

]

#slide(title: "Some access needs")[

    #freetext

    #reveal[
        #rowlist(
            [Visual],
            [Cognitive],
            [Hearing],
            [Motor],
            [Tiredness]
        )

        #rowlist(
            [Permanent],
            [Temporary],
            [Situational]
        )
    ]
]

#slide(title: "Why should you care?")[

Accessible teaching can:

#html.ul(class: "markers")[
    #marker("🧑‍🦽 ")[Allow students to access teaching!]
    #marker("🤗 ")[Make students feel welcome.]
    #marker("🥱 ")[Reduce mental load.]
    #marker("💰 ")[Be the difference between staying on the course and dropping out.]
]

]

#slide(title: "How WCAG thinks about it")[

The Web Content Accessibility Guidelines are concerned with whether content is:

- Perceivable
- Operable
- Understandable

]

#slide(title: "Perceivable")[

Can mathematical notation be read?

Horizontal scrolling is tricky.
- Break up long lines of maths.
- Tables with lots of columns can overflow.

Does the student have to scroll up and down lots, to refer back to data?
If an input is linked to a diagram or some other output, can they be on screen at the same time?

Colour: try not to.
Don't use only colour to convey meaning.
Some colour combinations are invisible to colourblind people, e.g. red on black.

The system should allow students to change the interface to suit their needs, e.g. colours, text, scaling.
Make sure your content is still accessible after this.

Data in a table
- Include headers
- Avoid horizontal scrolling

Be consistent with text formatting.
This includes mathematical notation.

Answer input: can you tell how your answer will be interpreted?

Make sure referenced values from other sources such as textbooks are accessible.

Diagrams:

- Need text descriptions
- If they contain text, why not put it in text too/instead?
- Should be high enough resolution to be legible when zoomed in.
- Label things and refer to them by that label.

]

#slide(title: "Operable")[

Most e-assessment systems are delivered as web apps.
The usual concerns about operability of the interface apply: moving between questions; navigating between sections.

Can the student enter answers?

When the answer is a mathematical expression, are they able to enter it?

- Syntax - well understood? Do they need guidance? 
    * Greek letters
    * Names of functions, e.g. `sqrt`.
    * Symbols - must they type the name? If so, tell them. Some students will go and find the Unicode character.
    * Objects outside polynomials/trig usually have different notation on computer to handwritten.
- Special characters - can their keyboard type the necessary characters? People with e.g. Chinese keyboards have different sets of symbols available. Limited mobility makes typing non-alphanumeric characters difficult.
- Spacing - mobile keyboards like to add spaces and punctuation unless told otherwise.

State the expected precision, precisely.

Timing

- An extended or removed time limit is a really common adjustment. Consider just not doing it!

Why limit number of submissions?
Students might mistakes entering their answers (and might be more likely to make mistakes due to disability).
Anxiety might prevent students from entering an answer if it's their only chance.

Allow students to undo anything they've done.
But beware of save-scumming.

Don't let students submit an answer that is obviously wrong.
e.g. if expected answer only has free variable `x`, student answer using `s`, `i` and `n` is a sign that they've made a syntax error.

Try to give marks when they make input errors.
e.g. `sin2x` - you know the student had the right thing in mind, so either prompt them to fix the input or give the marks.

Students have good reasons to complete homework in several sessions.
Make sure they can come back to an assessment and carry on where they were.

]

#slide(title: "Understandable")[

This is the thing that most question authors can actually do something about.

Does the student understand what they need to do?
Remember to tell them!

#aside[
    The prompt should tell the student what to do, unambiguously.
    It's important to make sure you give enough information.
    Applies to handwritten assignments too, but the computer can be more strict in what it accepts, so your instructions need to be more precise, accordingly.
]

Can they make sense of feedback?

WCAG has a "reading level" criterion.
But can we assume undergrad maths students have a higher reading level?
Think about dyslexia, EAL.

Students taking maths service courses have a lower maths reading level.
Adapt your language accordingly.

Minimise what the student needs to keep in their head.
They might forget what you've just told them, or misremember.

- Multiple choice questions of the form "pick between these four similar statements" are very difficult if you're dyslexic.

Not everyone uses the same words for things, e.g. 'brackets' vs 'parentheses'.

Feedback should explain how the score was calculated.
When referring back to things, use the same names, e.g. "gap 1" vs "coefficient of friction".

If parts are linked, explain that.

- If the answer from a previous part is used in this part for error-carried-forward, explain that.

Error messages should tell the student what was wrong, and ideally suggest a way of fixing it.

Sometimes you only want the student to enter part of an expression, giving them a scaffold, necessarily introducing new symbols as placeholders for their answer.
This can be confusing.

e.g. "write the integral as \(\int \frac{1}{f(x)} + \frac{x}{g(x)} dx\)", so they must give \(f(x)\)and \(g(x)\).

Or "rearrange for \(y\): \(x = f(y)\). Then the prompt is \(y = \) `input`.
Some students will start their answers with `y = `.

]

#slide(title: "Mathematical notation")[

Mathematical notation is not consistent, unambiguous, or universal.

See #link("https://whystartat.xyz")[WhyStartAt.xyz].

Ensure that students understand the notation you use.

If the system forces a particular convention, either use that convention in your other teaching material, or explain it in the assignment.
e.g. notation for gcd.

But students can not reliably notice the small differences in e.g. font styles that convey information in maths notation.
e.g. italic vs roman letters, Greek letters that look like Roman ones.
This can trip them up when entering their answers - you show them a preview with the "wrong" font, but they don't notice.

Diacritics convey meaning but are easily missed or confused.
e.g. prime too close to brackets.

]

#slide(title: "Diagrams")[

There isn't a good automatic solution for describing diagrams.

Write short alt text, and a longer description of the important information elsewhere.

Interactive diagrams pose many challenges.

Make it possible to reset interactive diagrams.

Defo aim for keyboard accessibility.
Show coordinates in text, and allow the student to type them as well as moving a point.

Snap to grid points or objects when it makes sense to.

Consider the "grab radius" of objects.

]

#slide(title: "Using other software")[

e.g. coding in Python or R

Explain how to get answers from the other software into the assessment.
Make this as easy as you can.

]

#slide(title: "Iterating")[

After an assessment has run, look at the answers students gave, for signs that:

- instructions were unclear
- students didn't know how to enter their answers
- students accidentally entered something other than their intention
- students got confused

]

#slide(title: "Other aspects of accessibility")[

Work with Scarlett Spackman in 2024: 

#link("https://www.mas.ncl.ac.uk/accessible-teaching/")[Accessible teaching for Maths, Stats and Physics]

- Upload course material in advance.
- Make recordings of lectures.
- Communicate clearly.

]

#slide(title: "People working on maths accessibility")[

- #link("https://sites.google.com/view/accessible-maths/home")[JISC accessible maths working group] - please join!
- #link("https://www.birmingham.ac.uk/staff/profiles/computer-science/academic-staff/sorge-volker")[Volker Sorge]
- #link("https://www.peterkrautzberger.org/about/")[Peter Krautzberger]
- #link("https://people.bath.ac.uk/cspehj/")[Emma Cliffe]

]

#slide(title: "Thanks!")[

/ Numbas: #link("https://www.numbas.org.uk")[numbas.org.uk]
/ Email: #link("mailto:msp.digital.learning@ncl.ac.uk")[#"msp.digital.learning@ncl.ac.uk"]

]
