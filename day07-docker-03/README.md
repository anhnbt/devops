
# install git & maven
sudo apt-get install git -y && sudo apt-get install maven -y
# clone code
git clone https://github.com/kevinram164/Bkacad-ClassDevops.git
# install JDK 1.8
sudo apt-get install openjdk-8-jdk -y
# di chuyen thu muc
cd Bkacad-ClassDevops
# build code
mvn install
# copy folder target
cp -rP target DockerFile/app/
# di chuyen thu muc
cd DockerFile/app
# edit file
vim Dockerfile

# content in Dockerfile
FROM tomcat:8-jre11
LABEL "Project"="Vprofile"
LABEL "Author"="AnhNBT"

RUN rm -fr /usr/local/tomcat/webapps/*
COPY target/vprofile-v2.war /usr/local/tomcat/webapps/ROOT.war

EXPOSE 8080
CMD ["catalina.sh", "run"]
WORKDIR /usr/local/tomcat/
VOLUME /usr/local/tomcat/webapps
# end content

# Build image vproapp
docker build -t vprofileapp:v1 .

docker images

# Create Web Config
mkdir -p /home/anhnbt/Bkacad-ClassDevops/DockerFile/web
vim nginxvproapp.conf

# content
upstream bkacad-app {
  server bkacad-app:8080;
}
server {
  listen 80;
  location / {
    proxy_pass http://bkacad-app;
  }
}
# end content
# TAO DOCKERFILE CHO WEB CONTAINER
cd ../web
vim Dockerfile
# content
FROM nginx
LABEL "Profile"="Vprofile"
LABEL "Author"="AnhNBT"
RUM rm -rf /etc/nginx/conf.d/default.conf
COPY nginxvproapp.conf /etc/nginx/conf.d/vproapp.conf
# end content

# Build web image
docker build -t vprofileweb:v1 .
# Tao Dockerfile cho db container
cd ../db
vim Dockerfile

# content
FROM mysql:5.7.25
LABEL "Project"="Vprofile"
LABEL "Author"="AnhNBT"

ENV MYSQL_ROOT_PASSWORD="admin123"
ENV MYSQL_DATABASE="accounts"

ADD db_backup.sql docker-entrypoint-initdb.d/db_backup.sql
# end content
cp ~/Bkacad-ClassDevops/src/main/resources/db_backup.sql ~/Bkacad-ClassDevops/db

# Build db image
docker build -t vprofiledb:v1 .

# Pull image rabbit, memcached
docker pull memcached
docker pull rabbitmq

# Cai dat docker compose
sudo curl -SL https://github.com/docker/compose/releases/download/v2.16.0/docker-compose-linux-x86_64 -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
docker-compose --version

# Tao folder compose
cd ../..
mkdir compose
cd compose
vim docker-compose.yml
# content
version: '3'
services:
  bkacad-db01:
    image: vprofiledb:v1
    ports:
      - "3306:3306"
    volumes:
      - vprodbdata:/var/lib/mysql
    environment:
      - MYSQL_ROOT_PASSWORD=admin123

  bkacad-memcached01:
    image: memcached
    ports:
      - "11211:11211"

  bkacad-rabbitmq01:
    image: rabbitmq
    ports:
      - "15672:15672"
    environment:
      - RABBITMQ_DEFAULT_USER=guest
      - RABBITMQ_DEFAULT_PASS=guest

  bkacad-app:
    image: vprofileapp:v1
    ports:
      - "8080:8080"
    volumes:
      - vproappdata:/usr/local/tomcat/webapps

  bkacad-web:
    image: vprofileweb:v1
    ports:
      - "80:80"

volumes:
  vprodbdata: {}
  vproappdata: {}
# end content
# start docker-compose
docker-compose up
