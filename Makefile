.PHONY: all clean test

run:
	uv run main.py

watch:
	uv run main.py --watch

lint:
	uv run pre-commit run --all-files