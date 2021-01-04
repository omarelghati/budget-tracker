FROM node:10

WORKDIR /usr/src/backend

COPY package*.json ./

RUN npm install

COPY . /usr/src/backend

EXPOSE 3001

CMD ["npm", "start"]