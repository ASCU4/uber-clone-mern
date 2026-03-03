# Backend API Documentation

## POST /users/register

Registers a new user in the system.

### Description
This endpoint allows clients to create a new user account by providing required information including first name, last name, email, and password. Input is validated and password is hashed before storage.

### Request Data
The request body must be sent as JSON with the following structure:

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "securePassword123"
}
```

- `fullname.firstname` (string, required) - First name (minimum 3 characters)
- `fullname.lastname` (string, optional, minimum 3 characters)
- `email` (string, required) - Must be a valid email format
- `password` (string, required) - Minimum 6 characters

### Responses

- **201 Created**
  - Returns JSON containing an authentication token and the newly created user object (without password).
  ```json
  {
    "token": "<jwt_token>",
    "user": {
      "_id": "...",
      "fullname": { "firstname": "John", "lastname": "Doe" },
      "email": "john.doe@example.com"
    }
  }
  ```

- **400 Bad Request**
  - Validation failed. Response includes an `errors` array with details.
  ```json
  {
    "errors": [
      { "msg": "Invalid Email", "param": "email", "location": "body" },
      ...
    ]
  }
  ```

- **500 Internal Server Error**
  - Unexpected server error during registration.

### Notes
- Passwords are hashed before being stored in the database.
- A JSON Web Token (JWT) is generated upon successful registration.
- Ensure `JWT_SECRET` is set in environment variables.
