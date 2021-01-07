FROM node:10

WORKDIR /usr/src/app

COPY package.staging.json ./

COPY package-*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]