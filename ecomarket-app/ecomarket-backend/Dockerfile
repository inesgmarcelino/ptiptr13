
#Define a imagem que vamos utilizar
FROM node:18-bullseye

COPY . .

RUN npm install

ENV NODE_ENV=production

CMD node ./bin/www
