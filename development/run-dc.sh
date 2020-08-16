#!/bin/sh

cd ../front-end-app
yarn
cd ../development

cd ../back-end-api
yarn
cd ../development

set -a
. ./.env

docker-compose --project-directory .. up
docker-compose --project-directory .. down