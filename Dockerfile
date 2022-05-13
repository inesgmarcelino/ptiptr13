#Define a imagem que vamos utilizar
FROM node:18-bullseye
#Define a diretoria a usar
WORKDIR /ptiptr13
#copia os conteudos todos do pasta para uma pasta igual
COPY . .

CMD npm run deploy


EXPOSE 3000
