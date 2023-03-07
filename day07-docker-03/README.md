
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


# setup environment
vim /etc/profile.d/maven.sh
# content
export JAVA_HOME=/usr/lib/jvm/default-java
export M2_HOME=/opt/maven
export MAVEN_HOME=/opt/maven
export PATH=${M2_HOME}/bin:${PATH}
# end content

# Cho quyen thuc thi file maven.sh
chmod +x /etc/profile.d/maven.sh
# 
source /etc/profile.d/maven.sh

#
#[8:05 CH] Trần Tuấn Kiệt
#mysql :bkacad-db01root/admin123

#[8:06 CH] Trần Tuấn Kiệt
#memcached :bkacad-memcached01bkacad-memcached02

#[8:06 CH] Trần Tuấn Kiệt
#rabbitmq :bkacad-rabbitmq01guest/guest

#upstream bkacad-app {  server bkacad-app:8080;    }server {  listen 80;location / {  proxy_pass http://bkacad-app;}}





# Build image vproapp
docker build -t vprofileapp:v1 .

docker images

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

# Build db image
docker build -t vprofiledb:v1 .


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