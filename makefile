include .env

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
	@go run cmd/setup/main.go
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
