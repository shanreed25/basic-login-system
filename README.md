# Basic Login System


### Project Setup
- [X] Create a new project directory and initialize it with `npm`.
- [X] Install the necessary packages: `express`, `mongoose`, `bcrypt`, `jsonwebtoken`, and `dotenv`.
- [X] Set up your `server.js` file, an Express router for your user-related endpoints, and a `User` model based on the schema from Lesson 1.
- [X] Establish a connection to your MongoDB database. Use a `.env` file to store your `MONGO_URI`, a `JWT_SECRET`, and a `PORT.

###  Build the Registration Endpoint
- [X] Create a POST route `/api/users/register`.
- [X] In this route, take the `username`, `email`, and `password` from the `req.body`.
- [X] Check if a user with the given email already exists. If so, return a 400 status with an appropriate message.
- [X] If the user does not exist, create a new User document with the provided data. The pre-save hook you wrote in Lesson 1 should automatically hash the password.
- [X] Save the new user to the database.
- [X] Respond with a 201 status and the newly created user object (excluding the password).