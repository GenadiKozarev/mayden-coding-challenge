# mayden-coding-challenge

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
- MySQL DB: Actual data storage.

Testing:

- Backend: Using Jest for unit/integration tests against Controllers/Services/Models.
- Frontend: React Testing Library (also under Jest).
