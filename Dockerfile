FROM mysql:latest

ENV MYSQL_ROOT_PASSWORD=urubu100

COPY ./arquivos_sql/ /docker-entrypoint-initdb.d/

EXPOSE 3306
