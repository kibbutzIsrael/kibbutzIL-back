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

Swagger API Documentation: [localhost:3000/api](http://localhost:3000/api)

# kibbutzIL-back Project Documentation

This documentation provides a detailed overview of the kibbutzIL-back project, focusing on its various components like controllers, models, routes, and utilities. Each section will give an insight into the purpose and functionality of these components.

## General Overview
The kibbutzIL-back project is a Node.js backend application structured to support various functionalities of a web service. It includes authentication, user management, contact forms, mailing lists, and organization-related features. The project uses Express for routing, Mongoose for MongoDB object modeling, and several other utilities to enhance its capabilities.

## Controllers

### AuthController
The `AuthController` manages user authentication processes, including user registration, login, and token management.

- **signup**: Registers a new user.
  - Endpoint: `/signup`
  - Method: POST
  - Body: `{ "fullName": String, "email": String, "password": String, "passwordConfirm": String, ... }`
  - Responses:
    - `201 Created`: User successfully created and token issued.
    - `400 Bad Request`: Missing or invalid fields in request body.

- **login**: Authenticates a user and issues a token.
  - Endpoint: `/login`
  - Method: POST
  - Body: `{ "email": String, "password": String }`
  - Responses:
    - `200 OK`: User successfully logged in and token issued.
    - `401 Unauthorized`: Incorrect email or password.

- **Other Functions**: The controller may also include other functionalities like token verification, access control for admin routes, etc.

[... More controllers to be documented ...]


