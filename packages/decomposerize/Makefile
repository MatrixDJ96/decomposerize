.PHONY: node_modules eslint test clean build rebuild release install uninstall publish

PREFIX ?= /usr/local
BINDIR = $(PREFIX)/bin

node_modules:
	yarn

eslint: node_modules
	yarn run eslint cli.js src/**/*.js --fix --format codeframe

test: eslint
	yarn flow check
	yarn run jest --no-watchman

clean:
	rm -f dist/decomposerize.js
	rm -f dist/cli.bundle.js
	rm -f dist/decomposerize

build: node_modules
	yarn rollup -c
	yarn esbuild cli.js --bundle --platform=node --format=cjs --outfile=dist/cli.bundle.js

rebuild: clean build

release: rebuild
	node --build-sea sea-config.json
	chmod +x dist/decomposerize

install:
	install -m 755 dist/decomposerize $(BINDIR)/decomposerize

uninstall:
	rm -f $(BINDIR)/decomposerize

publish: rebuild
	npm publish
