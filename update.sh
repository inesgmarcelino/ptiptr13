docker kill $(docker ps)
docker image prune -a -f
docker system prune
./launch.sh