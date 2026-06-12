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

## POST /users/login

Logs in an existing user and returns an authentication token.

### Description
This endpoint validates the user credentials and returns a JWT token along with the user object.

### Request Data
The request body must be sent as JSON with the following structure:

```json
{
  "email": "john.doe@example.com",
  "password": "securePassword123"
}
```

- `email` (string, required) - Must be a valid email format
- `password` (string, required) - Minimum 6 characters

### Responses

- **200 OK**
  - Successful login returns a token and user object.
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
  - Validation failed (invalid email format or too-short password).
  ```json
  {
    "errors": [
      { "msg": "Invalid Email", "param": "email", "location": "body" }
    ]
  }
  ```

- **401 Unauthorized**
  - Invalid email or password.
  ```json
  {
    "message": "Invalid email or password"
  }
  ```

- **500 Internal Server Error**
  - Unexpected server error during login.

### Notes
- Passwords are checked against hashed values using bcrypt.
- A JSON Web Token (JWT) is generated on successful login.
- Ensure `JWT_SECRET` is set in environment variables.

### Notes
- Passwords are hashed before being stored in the database.
- A JSON Web Token (JWT) is generated upon successful registration.
- Ensure `JWT_SECRET` is set in environment variables.

## Captain Routes

### POST /captains/register

Registers a new captain and returns a JWT token plus the created captain object.

#### Request Body
```json
{
  "fullname": {
    "firstname": "Jane", // required, string, min 3 chars
    "lastname": "Doe" // optional, string, min 3 chars
  },
  "email": "jane.doe@example.com", // required, valid email
  "password": "secureCaptainPass", // required, min 6 chars
  "vehicle": {
    "color": "blue", // required, min 3 chars
    "plate": "ABC123", // required, min 3 chars
    "capacity": "4", // required
    "vehicleType": "car" // required, one of car, bike, scooter
  }
}
```

#### Successful Response (201 Created)
```json
{
  "token": "<jwt_token>",
  "captain": {
    "_id": "...",
    "fullname": { "firstname": "Jane", "lastname": "Doe" },
    "email": "jane.doe@example.com",
    "color": "blue",
    "plate": "ABC123",
    "capacity": "4",
    "vehicleType": "car"
  }
}
```

#### Error Responses
- **400 Bad Request**: Validation failed or captain email already exists.
```json
{
  "errors": [
    { "msg": "Invalid email", "param": "email", "location": "body" }
  ]
}
```

- **500 Internal Server Error**: Unexpected server-side failure.

---

### POST /captains/login

Authenticates a captain and returns a JWT token.

#### Request Body
```json
{
  "email": "jane.doe@example.com", // required, valid email
  "password": "secureCaptainPass" // required, min 6 chars
}
```

#### Successful Response (200 OK)
```json
{
  "token": "<jwt_token>",
  "captain": {
    "_id": "...",
    "fullname": { "firstname": "Jane", "lastname": "Doe" },
    "email": "jane.doe@example.com",
    "color": "blue",
    "plate": "ABC123",
    "capacity": "4",
    "vehicleType": "car"
  }
}
```

#### Error Responses
- **400 Bad Request**: Validation failed.
```json
{
  "errors": [
    { "msg": "Invalid Email", "param": "email", "location": "body" }
  ]
}
```

- **401 Unauthorized**: Invalid email or password.
```json
{
  "message": "Invalid email or password"
}
```

- **500 Internal Server Error**: Unexpected server-side failure.

---

### GET /captains/profile

Returns the authenticated captain's profile.

#### Request
- No body required.
- Requires authentication via `authCaptain` middleware.

#### Successful Response (200 OK)
```json
{
  "_id": "...",
  "fullname": { "firstname": "Jane", "lastname": "Doe" },
  "email": "jane.doe@example.com",
  "color": "blue",
  "plate": "ABC123",
  "capacity": "4",
  "vehicleType": "car"
}
```

#### Error Responses
- **401 Unauthorized**: Missing or invalid auth token.
```json
{
  "message": "Authentication required"
}
```

- **500 Internal Server Error**: Unexpected server-side failure.

---

### POST /captains/logout

Logs out the authenticated captain by clearing the token and blacklisting it.

#### Request
- No body required.
- Requires authentication via `authCaptain` middleware.

#### Successful Response (200 OK)
```json
{
  "message": "Logout successful"
}
```

#### Error Responses
- **401 Unauthorized**: Missing or invalid auth token.
```json
{
  "message": "Authentication required"
}
```

- **500 Internal Server Error**: Unexpected server-side failure.
