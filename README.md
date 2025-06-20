
# Library Management API 

A RESTful API for managing a library, built with **Express**, **TypeScript**, and **MongoDB (Mongoose)**.  
Supports full CRUD operations on books, users, and borrow records with validation, business logic, and aggregation.

---

## Features

- Create, read, update, and delete books and users  
- Borrow and return books with validation and business rules  
- Aggregated reports (e.g., number of borrowed books, popular titles)  
- Schema validation and error handling  
- Pre and post hooks for custom business logic  
- Well-structured REST API with JSON responses

---

## Tech Stack

- Node.js  
- Express.js  
- TypeScript  
- MongoDB with Mongoose  


---

## Getting Started

### Prerequisites

- Node.js (v16 or higher recommended)  
- MongoDB (local installation or MongoDB Atlas)  
- npm or yarn package manager

### Installation

1. Clone the repository:

```bash
https://github.com/hassan-nahid/Library-Management-API.git
cd Library-Management-API
```
2. Install dependencies:

```bash
npm install
# or
yarn install

```
3. Create a **.env** file in the root directory and add your MongoDB connection string and other environment variables:

```bash
PORT=5000
DATABASE_URL=your_mongodb_url
```

## Scripts

| Script            | Description                              |
| ----------------- | ---------------------------------------- |
| `npm run dev`     | Start development server with hot reload |
| `npm run build`   | Compile TypeScript to JavaScript         |
| `npm start`       | Run compiled production server           |

---

## API Endpoints

### 📚 Books

| Method | Endpoint        | Description         |
|--------|-----------------|---------------------|
| GET    | `/api/books`    | Get all books       |
| GET    | `/api/books/:id`| Get a book by ID    |
| POST   | `/api/books`    | Add a new book      |
| PUT    | `/api/books/:id`| Update a book       |
| DELETE | `/api/books/:id`| Delete a book       |



### 🔄 Borrow

| Method | Endpoint                    | Description             |
|--------|-----------------------------|-------------------------|
| GET    | `/api/borrow`               | Get all borrow records  |
| POST   | `/api/borrow`               | Borrow a book           |



