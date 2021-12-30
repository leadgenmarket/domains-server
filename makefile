export APP_PORT := 80
export APP_DSN := localhost:27017/leadgen
export APP_SERVICE_NAME := domain-server
export APP_LOG_LEVEL := 5
export APP_PORTAL_URL := https://api.g-n.ru/v1
export APP_PORTAL_KEY := 8N3783vyK7V3230v
export APP_INITIAL_ROOT_PASSWORD := ledgenRoot4455
export APP_SALT := secret
export APP_TOKEN_TTL:= 120m
export APP_REFRESH_TOKEN_TTL:= 120m
export APP_TOKEN_SECRET:= secret
export APP_FILE_STORE_PATH:= ./file-store
export APP_SSL_SERVING := false
export APP_SERVER_IP_ADRESS := 5.23.55.120
export APP_REDIS_URL := localhost:6379
export APP_CACHE_DURATION := 4320m
export APP_CLOUD_STORE_PATH:= leadgen_domains_server
export APP_YANDEX_API_TOKEN := api #убрать
 
up:
	@docker-compose up
recreate:
	@docker-compose up --build --force-recreate --renew-anon-volumes
client-run:
	@cd admin && npm run start
run:
	@go run cmd/app/main.go
setup:
	@go run cmd/setup/main.go
backup:
	@go run cmd/backup/main.go
build:
	@cd cmd/app && go build -o ../../main main.go && cd ../..
build-d:
	@cd cmd/app && go build -o ../../main main.go && cd ../.. && ./main & disown
daemon:
	@make up && make build && ./main & disown
runb:
	@./main
build-prod:
	@docker-compose --env-file .env up 
swaggen:
	@mkdir -p internal/generated
	@swagger generate server -f ./api/api.yml -t ./internal/generated
stress:
	@gobench -u http://localhost -k=true -c 500 -t 10
