# syntax=docker/dockerfile:1

FROM golang:1.20-alpine3.18 as build

# Set destination for COPY
WORKDIR /app

# Download Go modules
COPY . ./

RUN go mod download



# Copy the source code. Note the slash at the end, as explained in
# https://docs.docker.com/reference/dockerfile/#copy

#RUN go install ./struct-db

# Build
RUN go build -o /user-auth

# Optional:
# To bind to a TCP port, runtime parameters must be supplied to the docker command.
# But we can document in the Dockerfile what ports
# the application is going to listen on by default.
# https://docs.docker.com/reference/dockerfile/#expose

FROM alpine:3.18

WORKDIR /

COPY --from=build /user-auth ./app/
EXPOSE 1323 
EXPOSE 5432

# Run
ENTRYPOINT ["app/user-auth"]