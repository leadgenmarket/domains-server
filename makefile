export MONGO_DBSTRING := localhost:27017/leadgen
export APP_PORT := 80
export APP_DSN := $(MONGO_DBSTRING)
export APP_SERVICE_NAME := domain-server
export APP_LOG_LEVEL := 5
export APP_GRAY_LOG_HOST := graylog:12201
export APP_PORTAL_URL := https://api.g-n.ru/v1
export APP_PORTAL_KEY := 8N3783vyK7V3230v
export APP_INITIAL_ROOT_PASSWORD := ledgenRoot4455
export APP_SALT := secret
export APP_TOKEN_TTL:= 120m
export APP_REFRESH_TOKEN_TTL:= 120m
export APP_TOKEN_SECRET:= secret
export APP_FILE_STORE_PATH:= ./file-store
export APP_SSL_SERVING := true
export APP_SERVER_IP_ADRESS := 5.23.55.120
 
up:
	@docker-compose up -d
client-run:
	@cd admin && npm run start
run:
	@go run cmd/app/main.go
setup:
	@cd cmd/setup && go run main.go
build:
	@cd cmd/app && go build -o ../../main main.go && cd ../.. && ./main
build:
	@cd cmd/app && go build -o ../../main main.go && cd ../.. && ./main -d
runb:
	@./main
swaggen:
	@mkdir -p internal/generated
	@swagger generate server -f ./api/api.yml -t ./internal/generated
