run-dev:
	docker compose --file docker/docker-compose.yml --env-file ./.env up -d 
stop-dev:
	docker compose --file docker/docker-compose.yml --env-file ./.env down