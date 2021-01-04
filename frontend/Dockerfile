FROM node:10

WORKDIR /usr/src/frontend

COPY package*.json ./

RUN npm install

COPY . /usr/src/frontend

EXPOSE 3000

CMD ["npm", "start"]