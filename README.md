# Bookowl

app for finding books in your personal taste, find similar titles and manage your personal list.

## About

BookOwl was created as a personal learning project with the goal of practicing React, vanilla CSS, REST API integration, Express routing, and PostgreSQL — building a real-world application from scratch without relying on abstractions like TypeScript, Next.js, or ORMs.

The app lets you search for books, explore similar titles based on genre and category, and save interesting books to a personal library.

## Features

- Search for books via the Google Books API
- View detailed information about a book — title, author, description, and cover image
- Find similar books based on the selected book's categories
- Save books to a personal PostgreSQL database
- View and manage your saved books
- Load more search results

## Tech Stack

**Frontend**

- React 19
- Vite
- React Router
- Vanilla CSS (mobile-first)

**Backend**

- Node.js
- Express
- PostgreSQL
- pg (raw SQL — no ORM)

**External API**

- Google Books API

## Technical Decisions

- **No TypeScript** — a deliberate choice to focus on application flow and architecture without the overhead of type management
- **No Next.js** — Express was chosen to practice manual route setup and REST API design
- **No ORM** — raw SQL with `pg` was chosen to build a solid understanding of database communication before using abstractions like Drizzle
- **Vanilla CSS** — chosen to revisit and strengthen CSS fundamentals, mobile-first

## Getting Started

### Prerequisites

- Node.js
- PostgreSQL

### Installation

1. Clone the repository

```bash
   git clone https://github.com/dogge84hotmailcom/bookowl.git
```

2. Install dependencies for both client and server

```bash
   cd client && npm install
   cd ../server && npm install
```

3. Create a `.env` file in the `server` folder
   GOOGLE_BOOKS_API_KEY=your_key_here
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=postgres
   DB_PASSWORD=your_password
   DB_NAME=bookowl

4. Create the PostgreSQL database and table

```sql
   CREATE DATABASE bookowl;
   CREATE TABLE saved_books (
     id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
     google_books_id VARCHAR NOT NULL UNIQUE,
     title VARCHAR NOT NULL,
     author VARCHAR NOT NULL,
     thumbnail VARCHAR
   );
```

5. Start the server

```bash
   cd server && npm run dev
```

6. Start the client

```bash
   cd client && npm run dev
```

The app runs on `http://localhost:5173`
