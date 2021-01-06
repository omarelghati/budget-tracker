FROM larsla/mongo-armv7l:latest

COPY setup.sh ./setup.sh

EXPOSE 27017
VOLUME /data/db
RUN ["chmod", "+x", "./setup.sh"]
RUN ./setup.sh