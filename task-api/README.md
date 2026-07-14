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