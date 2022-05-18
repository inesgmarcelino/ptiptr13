#Define a imagem que vamos utilizar
FROM node:18-bullseye

COPY . .

RUN npm install
RUN npm run build

RUN rm -r public
RUN rm -r src
RUN rm -r node_modules
RUN rm package-lock.json
RUN rm package.json
RUN rm README.md
RUN rm .gitignore

RUN npm install -g serve

CMD npm start
