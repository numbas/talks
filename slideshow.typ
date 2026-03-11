#let nslide = counter("slide")

#let rowlist(content) = html.elem("ul", attrs: (class: "rowlist"))[#content.children.filter(x=> x.has("body")).map(x=>html.li(x.body)).join()]

#let video(src, alt: "") = html.elem("video", attrs: (src: src, alt: alt, loop: "", poster: src.replace(regex("\..*?$"),".webp")))

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

#let slide(title: "", it) = context {
    let slug(t) = if t == "" {"slide-" + nslide.display()} else {t.replace(regex("\W"),"-").replace(regex("-+"),"-")}

    let title_slug = slug(title)

    nslide.step()

    context html.section(id: title_slug, style: "--slide-number: "+nslide.display())[
        = #title
        #it
    ]
}

// note what time this slide was reached in a practice run
#let last_slide_time = state("last_slide_time", 0)

#let advance(n) = {
  last_slide_time.update(old => n)
}

#let lpad(s,n,padder: "0") = padder*(n - str(s).len())+str(s)

#let show_duration(d) = {
  let s = calc.rem(d,60)
  let m = (d - s)/60
  [#html.elem("time")[#lpad(m,2):#lpad(s,2)]]
}

#let slide_time(ts) = {
  /*
  let bits = ts.split(":")
  let t = int(bits.at(0))*60 + int(bits.at(1))
  let diff = context show_duration(t - last_slide_time.get())
  [Time: #context diff]
  advance(t)
  */
}

#let time_split() = html.elem("hr", attrs: (class: "time-split"))

#let slideshow(title: "", presenter: "", affiliation: "", event: "", content) = {
html.html(lang: "en")[
    #show "-!": sym.hyph.nobreak

    //#show heading: it => html.h1(it.body)

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
    #context html.body(style: "--num-slides: " + str(nslide.final().at(0)))[

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
                = #title

                #presenter \
                #affiliation

                #html.p(class: "event")[#event]
            ]

            #content

//            #html.section[
//                #outline(target: heading)
//            ]

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
