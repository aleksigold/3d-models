run:
	uv run main.py

watch:
	uv run main.py --watch

lint:
	pre-commit run --all-files