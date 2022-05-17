
#Define a imagem que vamos utilizar
FROM node:18-bullseye

#Define a diretoria a usar
WORKDIR /
#copia os conteudos para a pasta backend
COPY ecomarket-backend ecomarket-backend
#define a current dir como backend
WORKDIR /ecomarket-backend
#instala dependencias
RUN npm install

WORKDIR /

COPY ecomarket-frontend ecomarket-frontend

WORKDIR /ecomarket-frontend

RUN npm install
RUN npm run build

RUN rm -r public
RUN rm -r src
RUN rm -r node_modules
RUN rm package-lock.json
RUN rm package.json
RUN rm README.md
RUN rm .gitignore

WORKDIR /

ENV NODE_ENV=production

COPY package.json package.json

RUN npm install -g serve

EXPOSE 3000

CMD npm start
