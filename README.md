1.docker compose  -f docker-compose.yml -f docker-compose.dev.yml up -d --build

2.docker exec -it kigler-node-1 mongosh

3.use admin
db.createUser({
  user: "1223d",
  pwd: "1223d",
  roles: ["root"]
})

4. docker compose down

5.docker compose  -f docker-compose.yml -f docker-compose.dev.yml up -d --build


