# ptiptr13

run server on gcp with 

sudo ./launch.sh



Para atualizar a imagem dum serviço (backend ou frontend)
sudo docker-composer build |nome_do_serviço| 

Para fazer debug:

Ver os logs do container:
sudo docker logs |container_name|

Aceder à consola do container:
sudo docker exec -it |container_name| bash

Depurar as configuraçoes de rede inter-containers:
sudo docker run exec -it nicolaka/netshoot


