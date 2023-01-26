# Systems-Integration

## Setup VM
- [ ] <a href="https://raw.githubusercontent.com/MurtadhaM/Infrastructure/main/Automation/DigitalOcean%20API/CreateDropletWithSSHKey.sh"> Create VM </a>
- [ ] <a href="#Packages"> Install Dependencies</a>
- [ ] <a href="#FIREWALL"> Setup Firewall </a>
- [ ] <a href="#NGINX"> Setup Nginx</a>
- [ ] Setup NodeJS
- [ ] Setup Database
- [ ] Setup REST API
- [ ] Setup Frontend
- [ ] Start ALL THE SERVICES

# Packages
 yum install epel-release yum-utils -y
 yum install nginx -y
 yum install firewalld -y
 yum install nodejs -y
yum install nano -y
yum install tmux -y
yum install zsh -y
yum install git -y
yum install zsh -y
yum install zsh-syntax-highlighting -y
yum install zsh-autosuggestions -y
yum install zsh-completions -y








## Start ALL THE SERVICES

tmux new -d /usr/share/nginx/node_modules/.bin/json-server  -p 3002 -H 45.55.32.24  db.json


node /usr/share/nginx/Systems-Integration-main/RESTAPI/server.js


node /usr/share/nginx/server.js

