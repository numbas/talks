GRAPH_APP_REPO = ~/elm/graph-app

define GRAPH_APP_INTRO
Numbas.queueScript('graph-app',[], function() {
endef

define GRAPH_APP_END
});
endef
export GRAPH_APP_INTRO
export GRAPH_APP_END

all: graph-app.js files

graph-app.js: $(GRAPH_APP_REPO)/dist/graphapp.js $(GRAPH_APP_REPO)/dist/embed-graph-app.js
	@echo "$$GRAPH_APP_INTRO" > $@
	@for p in $^; do cat $$p >> $@; echo "" >> $@; done
	@echo "$$GRAPH_APP_END" >> $@

STANDALONE_SOURCES = style.css 
STANDALONE_FILES = $(patsubst %, $(GRAPH_APP_REPO)/dist/%, $(STANDALONE_SOURCES))

files: $(STANDALONE_FILES)
	@for p in $(STANDALONE_SOURCES); do cp $(GRAPH_APP_REPO)/dist/$$p standalone_scripts/$$p; done
