$ docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build

$ docker exec -it kigler-node-1 mongosh

db.createUser({
  user: "1223d",
  pwd: "1223d",
  roles: ["root"]
})

exit

$ docker-compose down

$ docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build


