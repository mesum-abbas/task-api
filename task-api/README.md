# Task API

A simple RESTful Task Management API built with Node.js and Express for the FlyRank Internship Assignment.

## Features

- Get all tasks
- Get task by ID
- Create task
- Update task
- Delete task
- Swagger API Documentation

## Tech Stack

- Node.js
- Express.js
- Swagger UI

## Installation

```bash
npm install
```

## Run

```bash
npm run dev
```

## API Documentation

Open:

```
http://localhost:3000/docs
```

## Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | / | Home |
| GET | /health | Health Check |
| GET | /tasks | Get all tasks |
| GET | /tasks/:id | Get task by ID |
| POST | /tasks | Create task |
| PUT | /tasks/:id | Update task |
| DELETE | /tasks/:id | Delete task |


# Task API

A RESTful Task Management API built with Node.js, Express, PostgreSQL, and Docker.

## Features

- Create Task
- Read All Tasks
- Read Single Task
- Update Task
- Delete Task
- Swagger API Documentation
- PostgreSQL Database
- Dockerized PostgreSQL
- Environment Variables using .env

---

## Tech Stack

- Node.js
- Express.js
- PostgreSQL
- Docker
- Swagger UI

---

## Installation

### 1. Clone Repository

```bash
git clone <your-repository-url>
cd task-api
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create .env

```env
DATABASE_URL=postgres://postgres:postgres@localhost:5432/taskdb
PORT=3000
```

### 4. Start PostgreSQL Docker Container

```bash
docker run -d \
--name postgres-db \
-e POSTGRES_USER=postgres \
-e POSTGRES_PASSWORD=postgres \
-e POSTGRES_DB=taskdb \
-p 5432:5432 \
-v postgres_data:/var/lib/postgresql/data \
postgres:17
```

### 5. Create Database Table

```sql
CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    done BOOLEAN DEFAULT FALSE
);
```

### 6. Start Server

```bash
npm run dev
```

---

## API Documentation

Open:

```
http://localhost:3000/docs
```

---

## API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | /tasks | Get all tasks |
| GET | /tasks/:id | Get single task |
| POST | /tasks | Create task |
| PUT | /tasks/:id | Update task |
| DELETE | /tasks/:id | Delete task |

---

## Architecture

The application originally used an in-memory array for data storage.

It was migrated to PostgreSQL by replacing the storage layer while keeping the Express routes and CRUD functionality unchanged.

---

## Persistence Test

The application was tested by:

- Creating records
- Restarting the PostgreSQL Docker container
- Verifying that all records still existed

This confirms data persistence using Docker Volumes.

---

## Author

Mesum Abbas
# SQLite Database

## Why SQLite?

SQLite was chosen because it is lightweight, requires no separate server, and stores data in a single database file. It is ideal for learning CRUD operations and persistence.

## Database File

The database is stored locally as:

```
task.db
```

## Run the Project

```bash
npm install
npm start
```

The database and tasks table will be created automatically if they do not already exist.

## Example SQL Query

```sql
SELECT * FROM tasks;
```

## Database Screenshot

(Insert screenshot of DB Browser here.)