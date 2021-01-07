FROM node:10

WORKDIR /usr/src/app

RUN rm package.json

COPY package.staging.json /usr/src/app/package.json

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]