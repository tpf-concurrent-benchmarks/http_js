-include .env

.EXPORT_ALL_VARIABLES:
	DATABASE_URL=${DATABASE_URL}
	POSTGRES_USER=${POSTGRES_USER}
	POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
	POSTGRES_DB=${POSTGRES_DB}
	APP_PORT=${APP_PORT}

create_directories:
	mkdir -p graphite
	mkdir -p data/postgres_data

copy_env:
	if [ ! -f .env ]; then cp .env.example .env; fi

init:
	docker swarm init || true

setup: init copy_env create_directories

build:
	docker rmi http_js -f || true
	docker build -t http_js .

remove:
	if docker stack ls | grep -q http_js; then \
		docker stack rm http_js; \
	fi

remove_stack:
	docker stack rm http_js

deploy: remove build

	until \
	docker stack deploy \
	-c docker-compose.yaml \
	http_js; \
	do sleep 1; \
	done

dev:
	npm run dev

logs:
	docker service logs http_js_app -f