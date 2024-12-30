# Mayden Coding Challenge

A shopping list application that allows users to add, remove, and mark items as purchased. The application ensures data persistence using a MySQL database, enabling users to retain their shopping list across sessions.

## Table of Contents

- [Stories completed](#stories-completed)
- [Tech stack](#tech-stack)
- [How to run the project](#how-to-run-the-project)
- [Environment Variables](#environment-variables)
- [Architecture](#architecture)
- [Demo](#demo)

## Stories completed

- [x] **Story 1: View a list of items on a shopping list**
  - As a … Shopper
    - I want to … View items on my shopping list
    - So I can … See what I have chosen to purchase
  - Requirements:
    - Create a shopping list that can contain a list of groceries
- [x] **Story 2: Add items to the shopping list**
  - As a … Shopper
    - I want to … be able to add items to my shopping list
    - So I can … Add new items to my shopping list that don’t already exist on it
  - Requirements:
    - Create a way for a user to add an item to the shopping list
- [x] **Story 3: Remove stuff from the shopping list**
  - As a … Shopper
    - I want to … be able to remove items from my shopping list
    - So I can … Change my mind or fix my mistakes
  - Requirements:
    - Create a way for user to remove an item to the shopping lis
- [x] **Story 4: When I’ve bought something from my list I want to be able to cross it off the list**
  - As a … Shopper
    - I want to … have a way of marking off when I’ve picked up an item
    - So I can … see what I still need to find
  - Requirements:
    - Create a way for users to know what they have and haven’t already picked up
- [x] **Story 5: Persist the data so I can view the list if I move away from the page**
  - As a … Shopper
    - I want to … be able to still see the state of my shopping list when I come back to it
    - So I can … still see the items I’ve added and marked off when I get to the supermarket
  - Requirements:
    - Persist shopping list state between page visits

## Tech stack

### Frontend

- **React** with **TypeScript**: For building the user interface.
- **Axios**: For making HTTP requests to the backend.
- **Vite**: As the build tool for faster development.

### Backend

- **ExpressJS** with **TypeScript**: For building the RESTful API.
- **TypeORM**: For interacting with the MySQL database using an object-relational mapping approach.
- **MySQL**: As the relational database for data persistence.
- **Jest** & **Supertest**: For writing and running backend tests.

## How to run the project

Follow these steps to set up and run the project locally:

1. **Clone the repository**

   ```bash
   git clone git@github.com:GenadiKozarev/mayden-coding-challenge.git 

2. **Backend setup**

   ```bash
   cd mayden-coding-challenge/backend

3. **Create MySQL database**

  - Ensure you have MySQL installed and running. Create a database named `mayden_challenge_shopping_db`

     ```
     CREATE DATABASE mayden_challenge_shopping_db;
     ```

4. **Configure environment variables**

  - Copy the `.env.example` file to `.env` and update it with your own database credentials and configurations.

     ```
     cp .env.example .env
     ```

5. **Install backend dependencies**

   ```bash
   npm install
   ```

6. **Run backend tests (optional)**

  - Ensure all backend functionalities are working as expected.

     ```
     npm run test 
     ```

7. **Start the backend server**

  - The server will run on port `3001` or the port specified in your `.env` file.

     ```
     npm run dev 
     ```

8. **Frontend Setup**

  - Open a new terminal window/tab and navigate to the frontend directory.

     ```
     cd ../frontend
     ```

9. **Install frontend dependencies**

     ```
     npm install
     ```

10. **Start the frontend application**

  - The frontend will run on port `5173` by default.

     ```
     npm run dev 
     ```

11. **Open your browser and go to http://localhost:5173**

## Environment Variables

The project requires certain environment variables to function correctly. Create a `.env` file in the `/backend` directory based on the provided `.env.example` file. Below are the essential variables:
```
DB_HOST=your_database_host
DB_USER=your_database_username
DB_PASS=your_database_password
DB_NAME=mayden_challenge_shopping_db
PORT=3001
```

- DB_HOST: Hostname of your MySQL database (e.g., 127.0.0.1).
- DB_USER: Username for your MySQL database.
- DB_PASS: Password for your MySQL database. 
- (do not update) DB_NAME=mayden_challenge_shopping_db
- (do not update) PORT=3001

## Architecture

```
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
```

Components

- React App: Renders the user interface and handles user interactions. Utilizes Axios to communicate with the backend's RESTful API.
- Express Controllers: Defines API routes (/items, /items/:id, etc.). Handles incoming HTTP requests and delegates operations to the Service layer.
- Service Layer: Contains business logic, such as validating data and orchestrating database operations.
- Model (TypeORM): Defines data entities (e.g., Item with fields like name and purchased). Responsible for persisting data to the MySQL database.
- MySQL DB: Serves as the persistent data storage for the application.

## Demo

https://github.com/user-attachments/assets/08a5e868-4a01-4f9f-8577-c3f2e7d71184

<img width="1493" alt="preview" src="https://github.com/user-attachments/assets/3b190f39-3bc3-4e98-b04b-42e0cf7d17cb" />
