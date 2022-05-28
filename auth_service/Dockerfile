#Define a imagem que vamos utilizar
FROM node:18-bullseye

WORKDIR /

COPY app.js app.js
COPY package.json package.json

RUN npm install

CMD node app.js