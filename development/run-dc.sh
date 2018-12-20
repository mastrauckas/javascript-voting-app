#!/bin/sh

cd ../front-end
yarn
cd ../development

cd ../api
yarn
cd ../development

docker-compose --project-directory .. up
docker-compose --project-directory .. down