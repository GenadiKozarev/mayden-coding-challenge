# mayden-coding-challenge

How to run the project:

```
# (1) clone repository
git clone git@github.com:GenadiKozarev/mayden-coding-challenge.git 

# (2) go to the backend directory
cd mayden-coding-challenge/backend

# (3) create a MySQL database named 'mayden_challenge_shopping_db'

# (4) copy the .env.example file to .env and update it with your own values
cp .env.example .env

# (5) install dependencies
npm install

# (6) check if the tests are passing (optional)
npm run test

# (7) start the server (on port 3001 or the port specified in your .env file)
npm run dev 

# (8) go to the frontend directory
cd ../frontend

# (9) install dependencies
npm install

# (10) start the frontend app
npm start

# (11) Open your browser and go to http://localhost:5173/
```

Environment Variables

This project requires certain environment variables to be set for proper operation. You should create a `.env` file in the `/backend` directory of the project based on the provided `.env.example` file.

Architecture:

     ┌───────────────────────────┐
     │         React App         │
     │ (TypeScript + Axios etc.) │
     └─────────────┬─────────────┘
                   │  (HTTP)
                   │
           ┌───────v───────┐
           │   ExpressJS   │
           │  (Controller) │
           └───────┬───────┘
                   │
                   │
           ┌───────v───────┐
           │  Service Layer│
           └───────┬───────┘
                   │
                   │
           ┌───────v───────┐
           │    Model      │
           │(TypeORM + SQL)│
           └───────┬───────┘
                   │
                   │
           ┌───────v───────┐
           │   MySQL DB    │
           └───────────────┘

Details:

- React App: Renders the UI, handles user interactions. Uses Axios to call the server’s REST endpoints.
- Express Controllers: Defines the routes (`/items`, `/items/:id`, etc.). Receives requests, delegates to the Service layer.
- Service Layer: Manages business logic (validates data, orchestrates DB operations).
- Model (TypeORM): Defines the data entities (e.g., “Item” with fields like `name`, `price`, `purchased`). Responsible for persisting data to MySQL.
- MySQL DB: The data storage.
