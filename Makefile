BRANCH=$(shell git branch --show-current)

RUNTIME_PATH=../editor/editor/static/previews/question

index.html: talk.md numbas-exams/easy-question.exam numbas-runtime/numbas.css numbas-runtime/numbas.js numbas-runtime/iconfont numbas-runtime/exam_template.html
	python3 make_talk.py

numbas-runtime/iconfont: $(RUNTIME_PATH)/resources/iconfont
	cp -r $< $@

numbas-runtime/numbas.css: $(RUNTIME_PATH)/numbas.css
	cp $< $@

numbas-runtime/numbas.js: $(RUNTIME_PATH)/numbas.js
	cp $< $@

upload:
	rsync -avzr ./* numbas:/srv/www/numbas/talks/$(BRANCH)

