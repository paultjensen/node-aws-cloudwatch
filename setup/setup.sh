#!/usr/bin/env bash
sudo apt-get update && sudo apt-get upgrade

#Install curl
sudo apt install curl

#Install NodeJS and NPM
curl -sL https://deb.nodesource.com/setup_11.x | sudo -E bash -
sudo apt-get install -y nodejs