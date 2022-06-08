BRANCH=$(shell git branch --show-current)

index.html: talk.md
	python3 make_talk.py

upload:
	rsync -avzr ./* numbas:/srv/www/numbas/talks/$(BRANCH)

