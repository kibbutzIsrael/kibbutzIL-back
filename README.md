1. docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build

2. docker exec -it kibbutzil-back-mongo-1 mongosh

use admin

db.createUser({
  user: "1223d",
  pwd: "1223d",
  roles: ["root"]
})

3. exit

4. docker-compose down

5. docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build






Swagger API Documentation: [localhost:3000/api](http://localhost:3000/api)
