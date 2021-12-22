export GOOSE_DRIVER := postgres
export GOOSE_DBSTRING := host=localhost port=5432 user=postgres password=postgres dbname=module_13_db sslmode=disable
export MONGO_DBSTRING := localhost:27017/leadgen
export APP_PORT := 8080
export APP_DSN := $(MONGO_DBSTRING)
export APP_SERVICE_NAME := domain-server
export APP_LOG_LEVEL := 5
export APP_GRAY_LOG_HOST := graylog:12201
export APP_PORTAL_URL := https://api.g-n.ru/v1
export APP_PORTAL_KEY := 8N3783vyK7V3230v
export APP_INITIAL_ROOT_PASSWORD := Qwerty123
export APP_SALT := secret
export APP_TOKEN_TTL:= 120m
export APP_REFRESH_TOKEN_TTL:= 120m
export APP_TOKEN_SECRET:= secret
 
up:
	@docker-compose up -d
run:
	@cd cmd/app && go run main.go
setup:
	@cd cmd/setup && go run main.go
build:
	@cd cmd/app && go build -o ../../main main.go && cd ../.. && ./main
runb:
	@./main
swaggen:
	@mkdir -p internal/generated
	@swagger generate server -f ./api/api.yml -t ./internal/generated
