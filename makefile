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
build:
	@cd cmd/app && go build -o ../../main main.go && cd ../..
daemon:
	@make up && make build && ./main & disown
stress:
	@gobench -u http://localhost -k=true -c 500 -t 10
backup:
	@go run cmd/command-tools/main.go -action=backup
leads:
	@go run cmd/command-tools/main.go -action=leads
portal:
	@go run cmd/command-tools/main.go -action=portal
admin-create:
	@go run cmd/command-tools/main.go -action=portal
