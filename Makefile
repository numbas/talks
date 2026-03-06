BRANCH=$(shell jj bookmark list -r "heads(::@- & bookmarks())" -T name)
VIDEOS=$(wildcard videos/*.webm)

THUMBNAILS=$(patsubst %.webm, %.png, $(VIDEOS))

index.html: talk.typ slideshow.typ
	TYPST_FEATURES=html typst compile $< --format html $@

upload:
	rsync -avzr ./* chirun:/var/www/chirun.org.uk/talks/$(BRANCH)
	@echo "The slides are online at https://chirun.org.uk/talks/$(BRANCH)"

videos/%.png: videos/%.webm
	ffmpeg -nostdin -y -ss 0 -i $< -vf "scale=iw*sar:ih,select=eq(n\,0)" -vframes 1 $@

thumbnails: $(THUMBNAILS)

watch:
	TYPST_FEATURES=html typst watch talk.typ --format html index.html & python3 /home/christian/bin/httpserver.py $(PORT)

