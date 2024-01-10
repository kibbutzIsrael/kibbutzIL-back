1. docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build

2. docker exec -it kibbutzil-back-mongo-1 mongosh

db.createUser({
  user: "1223d",
  pwd: "1223d",
  roles: ["root"]
})

3. exit

4. docker-compose down

5. docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build




# docker logs kibbutzil-back-node-app-1


