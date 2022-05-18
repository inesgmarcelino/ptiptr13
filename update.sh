docker kill $(docker ps)
docker image prune -a -f
docker system prune 
docker-compose build
./launch.sh