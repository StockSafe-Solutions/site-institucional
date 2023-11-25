FROM mysql:latest

ENV MYSQL_ROOT_PASSWORD=urubu100

COPY ./init-database/ /docker-entrypoint-initdb.d/

EXPOSE 3306
