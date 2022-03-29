BRANCH=$(shell git branch --show-current)

index.html: talk.md
	python3 make_talk.py

upload:
	rsync -vzr ./* numbas:/srv/www/numbas/talks/$(BRANCH)

