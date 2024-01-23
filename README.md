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

-------------------------------------

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

### ContactFormController
The `ContactFormController` handles operations related to managing contact form entries.

- **getAllContacts**: Retrieves all contact form entries.
  - Endpoint: `/contacts`
  - Method: GET
  - Responses:
    - `200 OK`: Successfully retrieved list of contacts.
    - `500 Internal Server Error`: Error in fetching data.

- **createContact**: Adds a new contact form entry.
  - Endpoint: `/contacts`
  - Method: POST
  - Body: `{ "contactName": String, "contactEmail": String, "contactMessageBody": String }`
  - Responses:
    - `201 Created`: Contact successfully added.
    - `400 Bad Request`: Missing or invalid data in the request.

- **updateContact**, **deleteContact**, etc.: Other functions for updating and deleting contacts as needed.

### MailingListController
The `MailingListController` is responsible for managing the mailing list, including adding and retrieving email addresses.

- **getAllMails**: Fetches all emails in the mailing list.
  - Endpoint: `/mailingList`
  - Method: GET
  - Responses:
    - `200 OK`: Successfully retrieved emails.
    - `500 Internal Server Error`: Error in fetching data.

- **addMail**: Adds an email to the mailing list.
  - Endpoint: `/mailingList`
  - Method: POST
  - Body: `{ "email": String }`
  - Responses:
    - `201 Created`: Email successfully added to the mailing list.
    - `400 Bad Request`: Missing or invalid data in the request.

- **updateMail**, **deleteMail**, etc.: Other functions for updating and deleting emails from the mailing list as required.

### OrganizationController
The `OrganizationController` manages operations related to organizations.

- **addNew**: Adds a new organization.
  - Endpoint: `/organizations`
  - Method: POST
  - Body: `{ "organizationName": String, "organizationPhoneNumber": String, ... }`
  - Responses:
    - `201 Created`: Organization successfully added.
    - `400 Bad Request`: Missing or invalid data in the request.

- **edit**: Updates an existing organization.
  - Endpoint: `/organizations/:id`
  - Method: PUT
  - Body: `{ "organizationName": String, ... }`
  - Responses:
    - `200 OK`: Organization successfully updated.
    - `404 Not Found`: Organization not found.

- **remove**: Deletes an organization.
  - Endpoint: `/organizations/:id`
  - Method: DELETE
  - Responses:
    - `200 OK`: Organization successfully deleted.
    - `404 Not Found`: Organization not found.

- **getAll**, **getById**: Functions for retrieving all organizations or a specific one by ID.

### OrganizationFormController
The `OrganizationFormController` handles operations for organization forms.

- **getAllOrganizations**: Retrieves all organization form entries.
  - Endpoint: `/organizationForms`
  - Method: GET
  - Responses:
    - `200 OK`: Successfully retrieved list of organization forms.
    - `500 Internal Server Error`: Error in fetching data.

- **createOrganization**: Adds a new organization form entry.
  - Endpoint: `/organizationForms`
  - Method: POST
  - Body: `{ "organizationName": String, "organizationPhoneNumber": String, ... }`
  - Responses:
    - `201 Created`: Organization form successfully added.
    - `400 Bad Request`: Missing or invalid data in the request.

- **updateOrganization**, **deleteOrganization**: Other functions for updating and deleting organization form entries as needed.

### UserController
The `UserController` manages operations related to user data and interactions.

- **getAllUsers**: Retrieves all users.
  - Endpoint: `/users`
  - Method: GET
  - Responses:
    - `200 OK`: Successfully retrieved list of users.
    - `500 Internal Server Error`: Error in fetching data.

- **updateMe**: Allows a user to update their own information.
  - Endpoint: `/users/updateMe`
  - Method: PATCH
  - Body: `{ "name": String, "email": String, ... }`
  - Responses:
    - `200 OK`: User information successfully updated.
    - `400 Bad Request`: Missing or invalid data in the request.

- **deleteMe**: Allows a user to delete their own account.
  - Endpoint: `/users/deleteMe`
  - Method: DELETE
  - Responses:
    - `204 No Content`: User successfully deleted.

- **Other Functions**: The controller may include additional functionalities like user creation, retrieval by ID, etc.

### VolunteerFormController
The `VolunteerFormController` is responsible for handling volunteer forms and related operations.

- **getAllVolunteers**: Fetches all volunteer form entries.
  - Endpoint: `/volunteers`
  - Method: GET
  - Responses:
    - `200 OK`: Successfully retrieved volunteer forms.
    - `500 Internal Server Error`: Error in fetching data.

- **createVolunteer**: Adds a new volunteer form entry.
  - Endpoint: `/volunteers`
  - Method: POST
  - Body: `{ "fullName": String, "email": String, ... }`
  - Responses:
    - `201 Created`: Volunteer form successfully added.
    - `400 Bad Request`: Missing or invalid data in the request.

- **updateVolunteer**, **deleteVolunteer**: Other functions for updating and deleting volunteer form entries as needed.

[... More controllers to be documented ...]








