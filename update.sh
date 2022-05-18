docker kill $(docker ps)
docker image remove -f ptiptr13_app
docker image prune -a -f
docker system prune 
./launch.sh