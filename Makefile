BRANCH=$(shell jj log -T 'bookmarks.map(|b| b.name()) ++ "\n"' --no-graph | head | xargs)

RUNTIME_PATH=../editor/editor/static/previews/question

index.html: talk.md template.html numbas-runtime/numbas.css numbas-runtime/numbas.js numbas-runtime/iconfont numbas-runtime/exam_template.html
	python3 make_talk.py

numbas-runtime/iconfont: $(RUNTIME_PATH)/resources/iconfont
	@mkdir -p numbas-runtime
	cp -r $< $@

numbas-runtime/numbas.css: $(RUNTIME_PATH)/numbas.css
	@mkdir -p numbas-runtime
	cp $< $@

numbas-runtime/numbas.js: $(RUNTIME_PATH)/numbas.js
	@mkdir -p numbas-runtime
	cp $< $@

upload:
	@if [ "" = "$(BRANCH)" ]; then\
		echo "Can't work out what the current branch is.";\
	else\
		rsync -avzr ./* numbas:/srv/www/numbas/talks/$(BRANCH);\
	fi
