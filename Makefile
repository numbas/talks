BRANCH=$(shell jj bookmark list -r "heads(::@- & bookmarks())" -T name)
VIDEOM=$(wildcard videos/*.mp4)
VIDEOS=$(wildcard videos/*.webm)

CVIDEOS=$(patsubst %.mp4, %.webm, $(VIDEOM))

THUMBNAILS=$(patsubst %.webm, %.webp, $(VIDEOS))

IMAGES=$(patsubst %.png, %.webp, $(wildcard images/*.png))

index.html: talk.typ slideshow.typ $(THUMBNAILS) $(IMAGES) $(CVIDEOS)
	TYPST_FEATURES=html typst compile $< --format html $@

upload:
	rsync -avzr ./* numbas:/srv/www/numbas/talks/$(BRANCH)
	@echo "The slides are online at https://numbas.org.uk/talks/$(BRANCH)"

videos/%.webp: videos/%.webm
	ffmpeg -nostdin -y -ss 0 -i $< -vf "scale=iw*sar:ih,select=eq(n\,0)" -vframes 1 $@

videos/%.webm: videos/%.mp4
	ffmpeg -i $< $@

images/%.webp: images/%.png
	convert $< $@

thumbnails: $(THUMBNAILS)

images: $(IMAGES)

videos: $(CVIDEOS)

watch:
	TYPST_FEATURES=html typst watch talk.typ --format html index.html & python3 /home/christian/bin/httpserver.py $(PORT)

