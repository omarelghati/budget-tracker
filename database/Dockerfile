FROM larsla/mongo-armv7l:latest

COPY setup.sh /data/setup.sh

EXPOSE 27017
VOLUME /data/db
RUN ["chmod", "+x", "/data/setup.sh"]
RUN ./setup.sh