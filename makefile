export GOOSE_DRIVER := postgres
export GOOSE_DBSTRING := host=localhost port=5432 user=postgres password=postgres dbname=module_13_db sslmode=disable
export MONGO_DBSTRING := mongodb://leadgen:j.,)Lx;q;;6j@mongo-db:27017/cata
export APP_PORT := 8080
export APP_DSN := $(MONGO_DBSTRING)
export APP_SERVICE_NAME := domain-server
export APP_LOG_LEVEL := 5
export APP_GRAY_LOG_HOST := graylog:12201

up:
	@docker-compose up -d
run:
	@cd cmd/app && go run main.go
swaggen:
	@mkdir -p internal/generated
	@swagger generate server -f ./api/api.yml -t ./internal/generated
