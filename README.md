# Systems-Integration

## Setup VM
- [ ] <a href="#Hosting"> Create VM </a>
- [ ] <a href="#Packages"> Install Dependencies</a>
- [ ] <a href="#Nginx"> Setup Nginx</a>
- [ ] <a href="#Node"> Setup Node</a>
- [ ] <a href="#Database"> Setup Database</a>
- [ ] <a href="#Start"> Start ALL THE SERVICES</a>

# HOSTING
```
curl -L https://raw.githubusercontent.com/MurtadhaM/Infrastructure/main/Automation/DigitalOcean%20API/CreateDropletWithSSHKey.sh | bash
```


# Packages
```bash
yum update 
yum install epel-release yum-utils nginx nodejs nano tmux zsh git zsh zsh-syntax-highlighting zsh-autosuggestions zsh-completions  pm2  net-tools  lsof  -y
```
# Nginx
```bash
curl -L https://raw.githubusercontent.com/MurtadhaM/Systems-Integration/main/Nginx.sh | bash
```
# Node
```bash
curl -L https://raw.githubusercontent.com/MurtadhaM/Systems-Integration/main/NodeJS.sh | bash
```

# Database
```bash
curl -L https://raw.githubusercontent.com/MurtadhaM/Systems-Integration/main/SetupSQL.sh | bash
```

# Start
```bash
tmux new -d /usr/share/nginx/node_modules/.bin/json-server  -p 3002 -H 45.55.32.24  db.json
pm2 start /usr/share/nginx/Systems-Integration-main/RESTAPI/server.js
pm2 start  /usr/share/nginx/server.js
```


