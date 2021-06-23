BRANCH=$(shell git branch --show-current)

index.html: talk.md
	python3 markdown.py

upload:
	rsync -vzr ./* numbas:/srv/www/numbas/talks/$(BRANCH)

