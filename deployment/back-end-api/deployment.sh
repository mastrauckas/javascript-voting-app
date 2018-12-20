#!/bin/sh

if ! id -u jva-user > /dev/null 2>&1; then
  sudo useradd -r -s /bin/nologin jva-user
fi

if systemctl list-unit-files --type=service | grep -Fq 'javascript-voting-app'; then
  sudo systemctl stop javascript-voting-app
fi

sudo cp -au ./javascript-voting-app.service /lib/systemd/system/
sudo rm -frv /app
sudo cp -au ./nodejs/. /app

if systemctl list-unit-files --type=service | grep -Fq 'javascript-voting-app'; then
  sudo systemctl start javascript-voting-app
  sudo systemctl enable javascript-voting-app
else
  # Reload systemd
  sudo systemctl daemon-reload
  # Need to enable it for reboots.
  sudo systemctl enable javascript-voting-app
fi
