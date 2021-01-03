FROM node:10

WORKDIR /usr/src/frontend

COPY package.json ./

RUN yarn

COPY . .

EXPOSE 3000

CMD ["yarn", "start"]