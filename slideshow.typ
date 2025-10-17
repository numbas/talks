#let nslide = counter("slide")

#let rowlist(..items) = html.ul(class: "row")[#items.pos().map(item => html.li[#item]).join("\n")]

#let freetext = html.elem("div", attrs: (contenteditable: ""))

#let aside(it) = html.aside[#it]

#let reveal(it) = [
    #html.details[
        #html.summary[]
        #it
    ]
]

#let marker(m, content) = html.li(style: "--marker: '"+m+"'")[#content]

#let abbr(long, short) = html.abbr(title: long)[#short]

#let slide(title: "", it) = [
    #let slug(t) = if t == "" {"slide-" + nslide.display()} else {t.replace(regex("\W"),"-").replace(regex("-+"),"-")}

    #nslide.step()
    #context html.section(id: slug(title), style: "--slide-number: "+nslide.display())[
        #html.h1[#title]
        #it
    ]
]

#let slideshow(title: "", presenter: "", affiliation: "", event: "", content) = {
html.html(lang: "en")[
    #show "-!": sym.hyph.nobreak

    #set quote(block: true)

    #html.head()[
        #html.base(target: "_blank")
        #html.meta(charset: "utf-8")
        #html.meta(name: "viewport", content: "width=device-width, initial-scale=1.0")
        #html.link(rel: "stylesheet", href: "style.css", id: "theme")
        #html.script(src: "presentation.js", type: "module")
        #html.script(id: "MathJax-script", async: true, src: "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js")
        #html.title[#title]
    ]
    #html.body(class: "poo")[

        #html.header[
            #html.a(href: "https://ncl.ac.uk")[
                #html.elem("svg", attrs: (aria-label: "Newcastle University", viewBox: "0 0 793.45331 225.10667", xmlns: "http://www.w3.org/2000/svg"))[
                    #html.elem("use", attrs: (href: "images/ncl-logo.svg#logo", width: "793", height: "225"))
                ]
            ]
            #html.a(id: "qrcode")
            #std.title[#title]
        ]

        #html.main[
            #html.section(id: "start")[
                #html.h1[#title]

                #presenter \
                #affiliation

                #html.p(class: "event")[#event]
            ]

            #content

            #html.section(id: "config")[
                This is the screen where I configure the display to suit the audience. This text is here so I can see what a long line of text will look like!

                #html.hr()

                #html.div(id: "controls")
            ]
        ]

        #html.footer[
            #html.a(id: "url")
        ]
    ]
]
}
