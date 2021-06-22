import re

with open('talk.md') as f:
    slides = re.split(r'\n-{3,}\n',f.read())

slides = [f'<section data-markdown><textarea data-template>{slide}</textarea></section>' for slide in slides]

starter = '<!-- markdown content -->'
ender = '<!-- /markdown content -->'
with open('index.html') as f:
    html = f.read()

start = html.find(starter)
end = html.find(ender)

ohtml = html[:start]+starter+'\n'+'\n'.join(slides)+'\n'+ender+html[end+len(ender):]

with open('index.html','w') as f:
    f.write(ohtml)
