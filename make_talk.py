from bs4 import BeautifulSoup
import re
from markdown import markdown
from markdown.extensions import Extension
from markdown.inlinepatterns import ImageInlineProcessor, IMAGE_LINK_RE, LINK_RE, LinkInlineProcessor, InlineProcessor
import tomllib
import xml.etree.ElementTree as etree

class SVGProcessor(ImageInlineProcessor):
    def handleMatch(self, m, data):
        text, index, handled = self.getText(data, m.end(0))
        if not handled:
            return None, None, None

        src, title, index, handled = self.getLink(data, index)
        if not handled:
            return None, None, None

        alt_text = self.unescape(text)

        if src.endswith('.svg'):
            print(src)
            el = etree.Element("figure")
            el.set('aria-label', alt_text)
            with open(src) as f:
                el.text = self.md.htmlStash.store(f.read())
        else:
            el = etree.Element("img")

            el.set("src", src)
            el.set('alt', alt_text)

        if title is not None:
            el.set("title", title)

        return el, m.start(0), index

class LinkInlineTargetProcessor(LinkInlineProcessor):
    def handleMatch(self, *args, **kwargs):
        el, start, index = super().handleMatch(*args, **kwargs)
        if el is not None:
            el.set('target','_blank')
        return el, start, index

class inlineMathProcessor( InlineProcessor ):
    def handleMatch( self, m, data ):
        # MathJAX handles all the math. Just set the uses_math flag, and
        # protect the contents from markdown expansion.
        self.md.uses_math = True
        return m.group(0), m.start(0), m.end(0)

class MyExtension(Extension):
    def extendMarkdown(self, md):
        md.inlinePatterns.register(SVGProcessor(IMAGE_LINK_RE,md),'svg',151)
        md.inlinePatterns.register(LinkInlineTargetProcessor(LINK_RE,md),'link',161)

        self.add_math_extension(md)

    def add_math_extension(self, md):
        mathRegExps = [
            r'(?<!\\)\\\((.+?)\\\)',    # \( ... \)
            r'(?<!\\)\\\[.+?\\\]',      # \[ ... \]
            r'(?<!\\)\\begin{([a-z]+?\*?)}.+?\\end{\1}',
        ]
        for i, pattern in enumerate(mathRegExps):
            # we should have higher priority than 'escape' which has 180
            md.inlinePatterns.register(
                inlineMathProcessor( pattern, md ), f'math-inline-{i}', 185)

slugs = set()

def slugify(value, v=0):
    slug = re.sub(r'[\W_]+', '_', value).lower()[:20]
    slug = re.sub(r'^_*(.*?)_*$', r'\1', slug)

    if v > 0:
        suffix = f'_{v}'
        slug = slug[:-len(suffix)]
        if slug.endswith('_'):
            slug = slug[:-1]
        slug = slug + suffix

    n = 2
    oslug = slug
    while slug in slugs:
        slug = f'{slug}-{n}'
        n += 1

    slugs.add(slug)
    return slug

def slide_html(i, num_slides, html):
    slide_id = f"slide-{i}"

    soup = BeautifulSoup(html, features='lxml')
    try:
        header = soup.h1.text
        slide_id = slugify(header)
    except AttributeError:
        pass

    return f'<section data-slide-number="{i}" style="--slide-number: {(i+1)/num_slides}" id="{slide_id}">{html}</section>'

if __name__ == '__main__':
    with open('talk.md') as f:
        source = f.read()
        metadata_toml, body = re.split(r'\n\+{3,}\n', source)

    metadata = tomllib.loads(metadata_toml)
    slides = re.split(r'\n-{3,}\n', body)
    num_slides = len(slides)+2

    extensions = [
        MyExtension(),
        'pymdownx.blocks.details',
    ]

    slides = [slide_html(i,num_slides,slide) for i, slide in enumerate([markdown(t, extensions=extensions) for t in slides]+['<p>This slide intentionally left blank</p>'])]

    with open('template.html') as f:
        template_html = f.read()

    metadata['markdown content'] = '\n'.join(slides)

    with open('numbas-runtime/exam_template.html') as f:
        metadata['numbas_exam_template'] = f.read()

    # Extremely weak templating system: replace ``{{key}}`` with the value of ``key`` in ``metadata``.
    ohtml = re.sub(r'\{\{(?P<key>[^}]+)\}\}', lambda m: metadata.get(m.group('key'),''), template_html)

    with open('index.html','w') as f:
        f.write(ohtml)
