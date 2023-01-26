
#!/bin/sh

yum install epel-release yum-utils -y
# yum install nginx -y
# systemctl start nginx
# systemctl enable nginx
yum install firewalld -y
systemctl start firewalld
systemctl enable firewalld
firewall-cmd --permanent --zone=public --add-service=http
firewall-cmd --permanent --zone=public --add-service=https
firewall-cmd --zone=public --add-port=3000/tcp --permanent
firewall-cmd --zone=public --add-port=3001/tcp --permanent
firewall-cmd --zone=public --add-port=3002/tcp --permanent
firewall-cmd --zone=public --add-port=3003/tcp --permanent
firewall-cmd --zone=public --add-port=3306/tcp --permanent
firewall-cmd --zone=public --add-port=8080/tcp --permanent
firewall-cmd --reload
yum makecache
yum install git -y
curl -sL https://rpm.nodesource.com/setup_12.x | sudo bash -
yum install nodejs -y
yum install mariadb-server -y
systemctl start mariadb.service
systemctl enable mariadb.service
git --version
node --version




sed -e 's/\s*\([\+0-9a-zA-Z]*\).*/\1/' << EOF | mysql_secure_installation
      # current root password (emtpy after installation)
    y # Set root password?
     # new root password
     # new root password
    n # Remove anonymous users?
    n # Disallow root login remotely?
    n # Remove test database and access to it?
    y # Reload privilege tables now?
EOF

mysql -e "CREATE USER 'admin'@'%' IDENTIFIED BY ''; GRANT ALL PRIVILEGES ON *.* TO 'admin'@'%' WITH GRANT OPTION;"


mysql -e "GRANT ALL PRIVILEGES ON *.* TO 'admin'@'%' IDENTIFIED BY '';"

curl https://www.w3resource.com/sql/sample-database-of-sql-in-mysql-format.txt --output db.sql

mysql -e "CREATE DATABASE sample;"
mysql sample < db.sql


# EXPRESS
cd ~
npm init -y && npm i mariadb express


