import re
from markdown import markdown
from markdown.extensions import Extension
from markdown.inlinepatterns import ImageInlineProcessor, IMAGE_LINK_RE, LINK_RE, LinkInlineProcessor
import xml.etree.ElementTree as etree

class SVGProcessor(ImageInlineProcessor):
    def handleMatch(self, m, data):
        text, index, handled = self.getText(data, m.end(0))
        if not handled:
            return None, None, None

        src, title, index, handled = self.getLink(data, index)
        if not handled:
            return None, None, None

        if src.endswith('.svg'):
            print(src)
            el = etree.Element("figure")
            with open(src) as f:
                el.text = self.md.htmlStash.store(f.read())
        else:
            el = etree.Element("img")

            el.set("src", src)

        if title is not None:
            el.set("title", title)

        el.set('alt', self.unescape(text))
        return el, m.start(0), index

class LinkInlineTargetProcessor(LinkInlineProcessor):
    def handleMatch(self, *args, **kwargs):
        el, start, index = super().handleMatch(*args, **kwargs)
        el.set('target','_blank')
        return el, start, index

class MyExtension(Extension):
    def extendMarkdown(self, md):
        md.inlinePatterns.register(SVGProcessor(IMAGE_LINK_RE,md),'svg',151)
        md.inlinePatterns.register(LinkInlineTargetProcessor(LINK_RE,md),'link',161)

if __name__ == '__main__':
    with open('talk.md') as f:
        slides = re.split(r'\n-{3,}\n',f.read())

    slides = [f'<section>{slide}</section>' for slide in [markdown(t, extensions=[MyExtension()]) for t in slides]]

    starter = '<!-- markdown content -->'
    ender = '<!-- /markdown content -->'
    with open('index.html') as f:
        html = f.read()

    start = html.find(starter)
    end = html.find(ender)

    ohtml = html[:start]+starter+'\n'+'\n'.join(slides)+'\n'+ender+html[end+len(ender):]

    with open('index.html','w') as f:
        f.write(ohtml)
