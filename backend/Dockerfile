FROM node:10

WORKDIR /usr/src/app

COPY package*.json ./

RUN apk --no-cache add --virtual builds-deps build-base python

RUN npm install

COPY . /usr/src/app

EXPOSE 3001

CMD ["npm", "start"]