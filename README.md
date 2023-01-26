# Systems-Integration

## Setup VM
- [ ] <a href="#Hosting"> Create VM </a>
- [ ] <a href="#Packages"> Install Dependencies</a>
- [ ] <a href="#Nginx"> Setup Nginx</a>
- [ ] <a href="#Node"> Setup Node</a>
- [ ] <a href="#Database"> Setup Database</a>
- [ ] <a href="#RESTAPI"> Setup REST API</a>
- [ ] <a href="#Frontend"> Setup Frontend</a>
- [ ] <a href="#Start"> Start ALL THE SERVICES</a>

# HOSTING
```
curl -L https://raw.githubusercontent.com/MurtadhaM/Infrastructure/main/Automation/DigitalOcean%20API/CreateDropletWithSSHKey.sh | bash
```


# Packages
yum install epel-release yum-utils -y
yum install nginx -y
yum install nodejs -y
yum install nano -y
yum install tmux -y
yum install zsh -y
yum install git -y
yum install zsh -y
yum install zsh-syntax-highlighting -y
yum install zsh-autosuggestions -y
yum install zsh-completions -y
yum install pm2 -y

# Nginx
```
curl -L https://raw.githubusercontent.com/MurtadhaM/Systems-Integration/main/Nginx.sh | bash
```

# Node
```
curl -L https://raw.githubusercontent.com/MurtadhaM/Systems-Integration/main/NodeJS.sh | bash
```

# Database
```









## Start ALL THE SERVICES

tmux new -d /usr/share/nginx/node_modules/.bin/json-server  -p 3002 -H 45.55.32.24  db.json


node /usr/share/nginx/Systems-Integration-main/RESTAPI/server.js


node /usr/share/nginx/server.js

