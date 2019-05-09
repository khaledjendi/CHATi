#!/bin/bash

# create by: khaled jendi
# email: khaledj@kth.se

# ===== global variables =====

version=v12

# ===== docker =====
docker stop $(docker ps -a -q)
docker build --rm -f "Dockerfile" -t chati:$version .
docker tag chati:$version jschnitzer1/chati:$version
docker run --rm -d -p 80:80/tcp chati:$version
docker push jschnitzer1/chati:$version





