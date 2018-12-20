#!/bin/sh

sudo /etc/init.d/nginx stop

sudo unlink /etc/nginx/sites-enabled/default

sudo rm -frv /usr/share/nginx/static-files
sudo rm -frv /usr/share/nginx/html

sudo cp -au ./build/. /usr/share/nginx/static-files
sudo cp -au ./nginx/front-end-app.conf /etc/nginx/conf.d/

sudo /etc/init.d/nginx start