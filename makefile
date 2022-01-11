export APP_PORT:=80
export APP_DSN:=mongodb:27017/leadgen
export APP_SERVICE_NAME:=domain-server
export APP_LOG_LEVEL:=5
export APP_PORTAL_URL:=https://api.g-n.ru/v1
export APP_GRAY_LOG_HOST:=graylog:12201
export APP_PORTAL_KEY:=8N3783vyK7V3230v
export APP_INITIAL_ROOT_USER:=laurkan
export APP_INITIAL_ROOT_PASSWORD:=GYsg4w3xPn
export APP_SALT:=r}rGj&MK2g{66f
export APP_TOKEN_TTL:=120m
export APP_REFRESH_TOKEN_TTL:=120m
export APP_TOKEN_SECRET:=BR_UJ[8qH88StG
export APP_FILE_STORE_PATH:=./file-store
export APP_SSL_SERVING:=true
export APP_SERVER_IP_ADRESS:=5.23.55.120
export APP_REDIS_URL:=redis:6379
export APP_CACHE_DURATION:=4320m
export APP_CLOUD_STORE_PATH:= leadgen_domains_server
export APP_YANDEX_API_TOKEN:=AQAAAAAGwGwfAAeXUPCJMewwskieiey_tAPIAJc
export APP_ADMIN_URL:=admin.leadactiv.ru

up:
	@docker-compose up -d & disown
recreate:
	@docker-compose up --build --force-recreate --renew-anon-volumes
client-run:
	@cd admin && npm run start
run:
	@go run cmd/app/main.go
setup:
	@go run cmd/setup/main.go
build:
	@cd cmd/app && go build -o ../../main main.go && cd ../..
daemon:
	@make up && make build && ./main & disown
stress:
	@gobench -u http://localhost -k=true -c 500 -t 10
backup:
	@go run cmd/command-tools/main.go -action=backup
backup-cont:
	@docker-compose run --rm app /go/bin/command -action=backup
leads:
	@docker-compose run --rm app /go/bin/command -action=leads
portal:
	@docker-compose run --rm app /go/bin/command -action=portal
prices:
	@docker-compose run --rm app /go/bin/command -action=prices
admin:
	@docker-compose run --rm app /go/bin/command -action=admin
