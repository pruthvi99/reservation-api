# Hotel Reservation Microservices

Microservices architecture for reserving hotel rooms.

## Introduction

Hotel Reservation Microservices is a project designed to provide a scalable and efficient solution for hotel room reservations using microservices.

## Features

- Microservices architecture
- Hotel room reservation


## Installation

1. Run npm install:

   ```bash
   npm install
   ```
2. Ensure MongoDB is running locally on port 27017.

3. Create a MongoDB database named "hotel-reservation-db."

4. Create a collection named "reservations" within the "hotel-reservation-db" database.

5. Insert reservation data:
  - Use the provided reservations data in the file "src/hotel-reservation-db_reservations.json,"  
  - Or Create your own data using the file "src/dummyDataGenerator.js" by running: node dummyDataGenerator.js

6. npm run dev

7. Generate a JWT token:
   - Use the login route (`POST /reservations/login`) to generate a JWT token.
   - The generated token is valid for 1 hour.
   - Use the following POST data:
     ```json
     {
       "username": "123",
       "password": "abc"
     }
     ```
   - Use the JWT token as the Authorization Bearer {your_token} header for all reservation routes.
  
8. There is a "insomnia-exports" folder in the root, It can be imported into Insomnia or Postman for the REST Collection.

9. Finally you are ready to explore other routes.


## Endpoints details:


Endpoint: POST /reservations/login
Description: Generates a JWT token for authentication that is valid for 1 hour.
Get All Reservations

Endpoint: GET /reservations
Description: Retrieves all reservations in the database.
Get Reservation by ID

Endpoint: GET /reservations/:id
Description: Retrieves a specific reservation by its unique ID.
Create Reservation

Endpoint: POST /reservations
Description: Creates a reservation with posted data.
Delete Reservation by ID

Endpoint: DELETE /reservations/:id
Description: Deletes a specific reservation by ID.
Get Guest Stay Summary

Endpoint: GET /reservations/guestStaySummary/:guestID
Description: Retrieves past, future, and cancelled reservations of a particular guest.
Search Reservations

Endpoint: POST /reservations/search
Description: Searches reservations within a given from and to date.
