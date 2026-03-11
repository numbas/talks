#import "slideshow.typ": slideshow, slide, abbr, freetext, aside, reveal, marker, rowlist, video

#show "e.g.": [_e.g._]


#show: doc => slideshow(
    title: [Accessibility of e-!assessment],
    presenter: "Christian Lawson-Perfect",
    affiliation: "Newcastle University",
    event: "Durham University Education and Pedagogy seminar, 2026-03-18",
    doc
)

#slide(title: "Abstract")[

    I'll give a brief introduction to the topic of accessibility, then talk about particular access considerations for mathematical e-assessment.

    #aside[Ask questions at any point. Please interrupt me if you didn't get something.]

]

#slide(title: "About me")[

    Learning software developer in the digital learning unit of Newcastle University' school of Maths, Stats and Physics.

    #html.hr()

    Developer of #link("https://numbas.org.uk")[Numbas] and #link("https://chirun.org.uk")[Chirun].

    Disabled in a few ways.

    #aside[I'll ask if anyone in the audience wants to declare a disability, and wait about 20 seconds for that to happen or not.]

]

#slide(title: "What does 'accessibility' mean?")[

    #reveal[
        #quote(attribution: [#link("https://accessibility.blog.gov.uk/2016/05/16/what-we-mean-when-we-talk-about-accessibility-2/")[Alistair Duggin, Accessibility in government]])[
            "Accessibility means that people can do what they need to do in a similar amount of time and effort as someone that does not have a disability. It means that people are empowered, can be independent, and will not be frustrated by something that is poorly designed or implemented."
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


    #aside[
        Perfect is not possible.

        Good is possible.
    ]

]

#slide(title: "Some access needs")[

    / Sensory:
        #rowlist[
          - Blind
          - Colourblind
          - Deaf
          - Visual sensitivity
        ]

    / Cognitive:
        #rowlist[
          - Dyslexia
          - Dyspraxia
          - Processing disorder
          - Memory loss
          - Autism
          - ADHD
        ]
        
    / Physical:
        #rowlist[
        - Limited mobility
        - Tremors
        - Fatigue
        ]

    / Cultural:
        #rowlist[
        - English as an additional language
        - Anxiety
        ]

    / Resources:
        #rowlist[
        - Poor internet connection
        - Small screen
        - Limited keyboard
        - Slow computer
        - Limited time
        ]


    These can be permanent, temporary or situational.
]

#slide(title: "Why should you care?")[

    Accessible teaching can:

    #html.ul(class: "markers")[
        #marker("🧑‍🦽 ")[Allow students to access teaching!]
        #marker("🤗 ")[Make students feel welcome.]
        #marker("🥱 ")[Reduce mental load.]
        #marker("💰 ")[Be the difference between staying on the course and dropping out.]
    ]

    #aside[Some lecturers seem to think that if they don't make adjustments, students will find a way to access the course anyway.]

]

#slide(title: "How WCAG thinks about it")[

    The #link("https://www.w3.org/WAI/standards-guidelines/wcag/")[Web Content Accessibility Guidelines] are concerned with whether content is:

    - Perceivable
    - Operable
    - Understandable

    #aside[
        The bulk of the talk is going to be a list of things to think about, like the WCAG guidelines but particularly for maths e-assessment.

        The examples I've illustrated them with are made up for this talk, but they're all based on real questions I've seen.
    ]

]

#slide(title: "Perceivable: Can mathematical notation be read?")[

    If you use MathJax, it provides lots of tools to make notation accessible.

    #aside[MathJax does the best possible job of automatically adding accessibility features to maths: it adds line breaks, annotations for screen readers, and allows the user to step through expressions a piece at a time.]

    _More on this later_

]

#slide(title: "Perceivable: Horizontal scrolling is tricky")[

  #figure(
    video(
      "videos/horizontal-scroll-maths.webm",
      alt: "An equation that has overflowed horizontally, so the last couple of terms have been cut off."
    )
  )

  #figure(
    image(
      "images/horizontal-scroll-maths-fixed.webp",
      alt: "The same equation, split across two lines, so you can see all of it."
    )
  )

    Break up long lines of maths.

    Tables with lots of columns can also overflow.
]

#slide(title: "Perceivable: Minimise vertical scrolling")[

    #figure(
      video(
        "videos/vertical-scrolling.webm",
        alt: "A question with a 9 digit number at the top, and an input box asking for that number, a couple of screens down. I scroll down to the input box and back up to the number several times, as I transcribe a few digits at a time."
      )
    )

    Does the student have to scroll up and down lots, to refer back to data?

]

#slide(title: "Perceivable: Colour - try not to")[
    #figure(
        image(
            "images/red-text.webp",
            alt: "The following data were collected: 11, 14 (red), 7, 3, 18 (red). The measurements in red were found to be invalid and removed from the data set. What is the mean of the remaining data?"
        )
    )

    Don't use only colour to convey meaning.
]


#slide(title: "Perceivable: Colour - annotate instead")[
    #figure(
        image(
            "images/underlined-text.webp",
            alt: "The following data were collected: 11, 14 (underlined), 7, 3, 18 (underlined). The underlined measurements, 14 and 18, were found to be invalid and removed from the data set. What is the mean of the remaining data?"
        )
    )

    Decorations or annotations can work instead of or as well as colour.

    Check that annotations are announced by screen readers.
]

#slide(title: "Perceivable: Colour - beware missing contrast")[

    #figure(
        image(
            "images/bad-colour-boxes.svg",
            alt: "Three boxes, with white, red and green backgrounds respectively, and black text inside them."
        )
    )

    Some colour combinations are invisible to colourblind people, e.g. red and black.

]

#slide(title: "Perceivable: cope with customised display")[

    #figure(
        image(
            "images/hardcoded-colour.webp",
            alt: "The same screenshot twice, once with black text on a white background, and the other with white text on black. There is a diagram of a sequence, with black text in both screenshots. It's invisible against the black background."
        )
    )

    The system should allow students to change the interface to suit their needs, e.g. colours, text, scaling.

    Make sure your content is still accessible after this.

]

#slide(title: "Perceivable: Data in a table")[

    #figure(
        image(
            "images/data-table.webp",
            alt: "A table with 10 columns and 4 rows. The column headers are Width (cm) and Height (cm), repeated twice. There is a thick line between the top and bottom two rows, and dashed lines between other adjacent rows."
        )
    )

    Include headers

    Avoid horizontal scrolling

]

#slide(title: "Perceivable: Text formatting")[

    #figure(
        image(
            "images/inconsistent-formatting.webp",
            alt: "Italic capital letter M equals a two-by-two matrix. Give an eigenvalue (bold) of bold upright capital letter M. Let bold letter v equal upright capital letter M inverse italic letter x. What is italic letter v?"
        )
    )

    Be consistent with text formatting.

    This includes mathematical notation.

]

#slide(title: "Perceivable: Answer input")[

    #figure(
        image(
            "images/explain-answer-input.webp",
            alt: "Part a: What are the roots of x? Answers: 2 and 1. Marked incorrect. Expected answer: 1 and 2. Part b: What is the product of x, y and z? Answer: xyz, with a preview rendering showing xyz in monospaced font. Expected answer: x*y*z, with a review showing xyz in italic mathematical letters."
        )
    )

    Can the student tell how their answer will be interpreted?

    If they're shown a live preview, make sure it is announced by screen readers.

]

#slide(title: "Perceivable: References")[

    #figure(
        image(
            "images/reference-table.webp",
            alt: "A very low resolution photo of a table headed \"Dry Measure\"."
        )
    )

    Make sure referenced values from other sources such as textbooks are accessible.

]

#slide(title: "Perceivable: Diagrams")[

    Diagrams must have text descriptions.

    If they contain text, why not put it in the prose too/instead?

    They should be high enough resolution to be legible when zoomed in.

    Label things and refer to them by that label.

]

#slide(title: "Operable: Basic operability")[

    Most e-assessment systems are delivered as web apps.

    The usual concerns about operability of the interface apply: moving between questions; navigating between sections.

    Don't mess with the tab key!

]

#slide(title: "Operable: Entering answers")[

    #figure(
        image(
            "images/difficult-maths-input.webp",
            alt: "Rearrange in terms of x: y equals alpha x plus beta subscript zero. Input box contains (y-ß0)/alfa. Marked incorrect. Expected answer: (y-beta_0)/alpha."
        )
    )

    Can the student enter answers?

    This requires both knowledge and ability.
    Particularly challenging for mathematical expressions.

]

#slide(title: "Operable: Syntax")[

    Is the syntax well understood? Do they need guidance? 

    - Greek letters
    - Names of functions, e.g. `sqrt`.
    - Symbols - must they type the name? If so, tell them. Some students will go and find the Unicode character.
    - Objects outside polynomials/trig usually have different notation on computer to handwritten.

]

#slide(title: "Operable: Numbers")[

    #figure(
        image(
            "images/number-notation.webp",
            alt: "Part a: what is the maximum height, in cm? Answer: 195,6. Marked incorrect. Expected answer: 195.6. Part b: what is the radius of the planet Vumjum, in m? Answer: 5.53*10^12, marked incorrect. Expected answer: 5.53e12"
        )
    )

    Different conventions around number notation exist, across countries and disciplines.

    Make sure the student knows which convention to use.

]

#slide(title: "Operable: Special characters")[
    
    Can their keyboard type the necessary characters?

    People with e.g. Chinese keyboards have different sets of symbols available.

    Limited mobility makes typing non-alphanumeric characters difficult.

    Mobile keyboards like to add spaces and punctuation unless told otherwise.

]

/*
#slide(title: "Operable: Timing")[

    #figure(
        video(
            "videos/time-limit.webm",
            alt: "Very slowly typing in an answer. While still typing, a box pops up saying \"You only have 5 minutes left. Hurry up, you absolute loser!\""
        )
    )

    An extended or removed time limit is a really common adjustment. Consider just not having one!

]
*/

#slide(title: "Operable: Submission")[

    #figure(
        video(
            "videos/limited-submissions.webm",
            alt: "This one's really easy. The answer is pi. Round your answer to 2 decimal places. I enter 3.141592, marked incorrect. Then delete to 3.1, also marked incorrect. I then submit 3.14, marked incorrect with the feedback \"lol noob.\""
        )
    )

    Why limit the number of submissions?

    Students might mistakes entering their answers (and might be more likely to make mistakes due to disability).

    Anxiety might prevent students from entering an answer if it's their only chance.

]

/*
#slide(title: "Operable: Allow operator error")[

    Allow students to undo anything they've done, within reason.

    But beware of feedback.

]
*/

/*
#slide(title: "Operable: Invalid answers")[

    #figure(
        image(
            "images/invalid-input.webp",
            alt: "Answer: f(sinx). Marked incorrect. Warning box: your answer was interpreted to use the unexpected variable name 'sinx'."
        )
    )

    Don't let students submit an answer that is obviously wrong.

    e.g. if expected answer only has free variable `x`, an answer using `f` is a sign that they've made a syntax error.

]
*/

/*
#slide(title: "Operable: Anticipate mistakes")[

    Try to give marks when they make input errors.
    e.g. `sin2x` - you know the student had the right thing in mind, so either prompt them to fix the input or give the marks.

]
*/

#slide(title: "Operable: Several sessions")[

    Students have good reasons to complete homework in several sessions.

    Make sure they can come back to an assessment and carry on where they were.

    #aside[This is usually the concern of the system developer, but you should think about it when including any custom interactive elements.]
]

#slide(title: "Understandable")[

    This is the thing that most question authors can actually do something about.

    Does the student understand what they need to do?

    Remember to tell them!
]


#slide(title: "Understandable: Prompt")[

    The prompt should tell the student what to do, unambiguously.

    It's important to make sure you give enough information.

    Applies to handwritten assignments too, but the computer can be more strict in what it accepts, so your instructions need to be more precise, accordingly.

]

#slide(title: "Understandable: Feedback")[

    Can the student make sense of feedback?

    Write in full sentences.

    Try not to show the student codes that they don't recognise.

    #aside[Such as codes for marking notes, or error codes.]

    Feedback should explain how the score was calculated.

    When referring back to things, use the same names, e.g. prefer "coefficient of friction" to "input 1".

]

#slide(title: "Understandable: Reading level")[

    WCAG has a "reading level" criterion. \
    But can we assume undergrad maths students have a higher reading level? \
    Think about dyslexia, EAL.

    Students taking maths service courses have a lower maths reading level. \
    Adapt your language accordingly.

]

#slide(title: "Understandable: Memory")[

    #figure(
        image(
            "images/confusing-multiple-choice.webp",
            width: 80%,
            alt: "Which statement is false? Let x = (1,2)(3,4,5,6). Then x is in the same coset as the inverse of y. Let x = (1,2)(3,4,5,6). Then the inverse of x is in the same coset as the inverse of y. Let x = (1,2,3)(4,5,6). Then the inverse of x is in the same coset as y. Let x = (1,2)(3,4,5,6). Then the inverse of x is in the same coset as y. Let x = (1,2)(3,4,5,6). Then x is in the same coset as y."
        )
    )

    Minimise what the student needs to keep in their head.
    They might forget what you've just told them, or misremember.

]

/*
#slide(title: "Understandable: Terminology")[

    Not everyone uses the same words for things, e.g. 'brackets' vs 'parentheses'.

    Make sure students agree with you on what words and symbols mean.

]
*/

/*
#slide(title: "Understandable: Error messages")[

    Error messages should tell the student what was wrong, and ideally suggest a way of fixing it.

]
*/

/*
#slide(title: "Understandable: Parts of expressions")[

    Sometimes you only want the student to enter part of an expression, giving them a scaffold, necessarily introducing new symbols as placeholders for their answer.
    This can be confusing.

    e.g. "write the integral as \\(\\int \\frac{1}{f(x)} + \\frac{x}{g(x)} \\, dx\\)", so they must give \\(f(x)\\)and \\(g(x)\\).

    Or "rearrange for \\(y\\)". \
    Then the prompt is \\(y = \\) `input`. \
    Some students will start their answers with `y = `.

]
*/

#slide(title: "Mathematical notation")[

    Mathematical notation is not universal, unambiguous, or even consistent.

    See #link("https://whystartat.xyz")[WhyStartAt.xyz].

    Ensure that students understand the notation you use.

]

#slide(title: "Mathematical notation: Conventions")[

    If the system forces a particular convention, either use that convention in your other teaching material, or explain it in the assignment.

    e.g. `(a,b)` could mean:

    - The gcd of \\(a\\) and \\(b\\)
    - A 2D vector
    - A cyclic permutation
    - The ideal generated by \\(a\\) and \\(b\\)
    - The open interval between \\(a\\) and \\(b\\)
]

#slide(title: "Mathematical notation: Small details")[

    #figure(
        image(
            "images/visually-similar-symbols.webp",
            alt: "4 v plus 3 nu equals 2 rho plus 5 p. Italic small letter x = 1, upright small letter x = (1,2). f prime of x plus f of x equals 0, but the prime is drawn on top of the bracket around x."
        )
    )

    Many students can not reliably notice the small differences in font styles that convey information in maths notation.

    #aside[This can trip them up when entering their answers - you show them a preview with the "wrong" font, but they don't notice.]

    Diacritics convey meaning but are easily missed or confused.

]

#slide(title: "Diagrams: Descriptions")[

    #figure(
        image(
            "images/scatter-plot.webp",
            alt: "A scatter plot with of score against time taken. The majority of dots lie in a triangle with corners at the origin, time 60 and score 10, and time 60 and score 70. There are also two prominent lines: a horizontal one at score around 25, and a vertical one at time 60."
        )
    )

    Write short alt text, and a longer description of the important information elsewhere.

    There isn't a good automatic solution for describing diagrams.

]

#slide(title: "Diagrams: write descriptions yourself")[

    #image(
            "images/scatter-plot.webp",
            width: 40%,
            height: 50%,
            alt: "A scatter plot with of score against time taken. The majority of dots lie in a triangle with corners at the origin, time 60 and score 10, and time 60 and score 70. There are also two prominent lines: a horizontal one at score around 25, and a vertical one at time 60.",
        )

    #quote["An abstract image featuring a gradient of horizontal green lines fading into a white background, creating a soft contrasting effect. The design is minimalistic with an emphasis on simplicity."]

    Get an LLM to write alt text *AT YOUR PERIL*.
]

#slide(title: "Interactive diagrams: Allow reset")[

    #figure(
        video(
            "videos/reset-diagram.webm",
            alt: "Prompt: create a quadrilatetal. A diagram with a button labelled \"Add a point\". I click the button five times, so am stuck with five points."
        )
    )

    Make it possible to reset interactive diagrams.

]

#slide(title: "Interactive diagrams: Input devices")[

    #figure(
        video(
            "videos/diagram-linked-input.webm",
            alt: "Prompt: move the point to (1,-1). A diagram showing a Cartesian grid and a point at the origin. I use the mouse to drag the point to the coordinates. Marked correct. I then restart the question and type coordinates in a box below the diagram, which moves the point."
        )
    )

    Interactive diagrams must be usable with only the keyboard, as well as with only a touch screen.

    Show coordinates in text, and allow the student to type new coordinates.

]

#slide(title: "Interactive diagrams: precision")[

    #figure(
        video(
            "videos/diagram-snap-and-grab.webm",
            alt: "A diagram showing a grid with a point at the origin, a circle in the top right quadrant, and lots of small points in a small grid on the left. I grab the larger point and move it around. It snaps to integer grid points, and to the circle. I then try to grab one of the small points, instead grabbing others a few times before getting the right one."
        )
    )

    Snap to grid points or objects when it makes sense to.

    Consider the "grab radius" of objects.

]

/*
#slide(title: "Using other software")[

    e.g. coding in Python or R

    Explain how to get answers from the other software into the assessment.
    Make this as easy as you can.

]
*/

#slide(title: "Listen to students")[
    When students tell you an assessment is inaccessible, act.

    Ask students if they had any trouble accessing assessments.
]

#slide(title: "Iterating")[

    After an assessment has run, look at the answers students gave, for signs that:

    - instructions were unclear
    - students didn't know how to enter their answers
    - students accidentally entered something other than their intention
    - students got confused

]

#slide(title: "Other aspects of accessible teaching")[

    Work with Scarlett Spackman in 2024: 

    #link("https://www.mas.ncl.ac.uk/accessible-teaching/")[Accessible teaching for Maths, Stats and Physics]

]

#slide(title: "Accessible conferences and events")[

    Guidance written by me, Elaine Lopez, Jennifer Deane, and others:

    #link("https://www.staff.ncl.ac.uk/christian.perfect/accessibility-checklist-for-events/")[Accessibility checklist for conferences and events]

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
