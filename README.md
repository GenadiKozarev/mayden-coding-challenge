# mayden-coding-challenge

```
cd backend
cp .env.example .env // Update the .env file with your own values after creating a MySQL database named 'mayden_challenge_shopping_db'
npm install
npm run test // (optional)
npm run dev // starts the server on port 3001 or the port specified in the .env file
```

```
cd frontend
npm install
npm start // starts the frontend app on http://localhost:5173/
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

Explanation:

- React App: Renders the UI, handles user interactions. Uses Axios to call the server’s REST endpoints.
- Express Controllers: Defines the routes (`/items`, `/items/:id`, etc.). Receives requests, delegates to the Service layer.
- Service Layer: Manages business logic (validates data, orchestrates DB operations).
- Model (TypeORM): Defines the data entities (e.g., “Item” with fields like `name`, `price`, `purchased`). Responsible for persisting data to MySQL.
- MySQL DB: The data storage.
