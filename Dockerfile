#---Build stage---
FROM golang:1.17 AS builder
COPY ./cmd /go/src/cmd
COPY ./internal /go/src/internal
COPY ./pkg /go/src/pkg
COPY ./go.mod /go/src/go.mod
COPY ./go.sum /go/src/go.sum
WORKDIR /go/src/cmd/app

RUN GOOS=linux GOARCH=amd64 CGO_ENABLED=0 go build -ldflags='-w -s' -o /go/bin/service
WORKDIR /go/src/cmd/command-tools
RUN GOOS=linux GOARCH=amd64 CGO_ENABLED=0 go build -ldflags='-w -s' -o /go/bin/command
CMD /go/bin/service --port 8090 --host '0.0.0.0'

#---Final stage---
FROM alpine:latest
COPY --from=builder /go/bin/service /go/bin/service
COPY --from=builder /go/bin/command /go/bin/command
RUN mkdir -p /go/bin/admin
RUN mkdir -p /go/bin/admin/build
RUN mkdir -p /go/bin/templates
RUN mkdir -p /go/bin/templates/blue_template
RUN mkdir -p /go/bin/templates/blue_template/build
COPY ./admin/build /go/bin/admin/build
COPY ./templates/blue_template/build /go/bin/templates/blue_template/build
CMD /go/bin/service --port 8090 --host '0.0.0.0'