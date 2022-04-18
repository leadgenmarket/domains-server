include .env
export APP_PORT
export APP_DSN
export APP_SERVICE_NAME
export APP_LOG_LEVEL
export APP_PORTAL_URL
export APP_GRAY_LOG_HOST
export APP_PORTAL_KEY
export APP_INITIAL_ROOT_USER
export APP_INITIAL_ROOT_PASSWORD
export APP_SALT
export APP_TOKEN_TTL
export APP_REFRESH_TOKEN_TTL
export APP_TOKEN_SECRET
export APP_FILE_STORE_PATH
export APP_SSL_SERVING
export APP_SERVER_IP_ADRESS
export APP_REDIS_URL
export APP_CACHE_DURATION
export APP_CLOUD_STORE_PATH
export APP_YANDEX_API_TOKEN
export APP_ADMIN_URL
export APP_PLANS_URL

up:
	@docker-compose up -d & disown
up-log:
	@docker-compose up
up-develop:
	@docker-compose -f docker-compose_develop.yml up
down:
	@docker-compose down
recreate:
	@docker-compose up --build --force-recreate --renew-anon-volumes
client-run:
	@cd admin && npm run start
run:
	@go run cmd/app/main.go
setup:
	@go run cmd/command-tools/main.go -action=group-changes
change-admin-pass:
	@docker-compose run --rm app /go/bin/command -action=admin_pass -pass=$(pass)
build:
	@cd cmd/app && go build -o ../../main main.go && cd ../..
daemon:
	@make up && make build && ./main & disown
stress:
	@gobench -u http://localhost -k=true -c 500 -t 10
backup:
	@go run cmd/command-tools/main.go -action=backup
group-loc:
	@go run cmd/command-tools/main.go -action=group-changes
backup-cont:
	@docker-compose run --rm app /go/bin/command -action=backup
leads:
	@docker-compose run --rm app /go/bin/command -action=leads
portal:
	@docker-compose run --rm app /go/bin/command -action=portal
prices:
	@docker-compose run --rm app /go/bin/command -action=prices
fixtures:
	@docker-compose run --rm app /go/bin/command -action=fixtures
admin:
	@docker-compose run --rm app /go/bin/command -action=admin
group:
	@docker-compose run --rm app /go/bin/command -action=group-changes
templates_build:
	@cd templates/blue_template && npm run build
	@cd templates/plans_template && npm run build
	@cd templates/purple_template && npm run build
	@cd templates/wa_template && npm run build
