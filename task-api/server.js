const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./openapi.json");
const pool = require("./db");
const Database = require("better-sqlite3");
const db = new Database("task.db");

db.prepare(
  `
CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    done INTEGER DEFAULT 0
)
`,
).run();
const count = db.prepare("SELECT COUNT(*) as total FROM tasks").get();
if (count.total === 0) {
  const insert = db.prepare(
    "INSERT INTO tasks (title, done) VALUES (?, ?)"
  );

  insert.run("Learn Express", 0);
  insert.run("Learn SQLite", 0);
  insert.run("Build CRUD API", 1);
}
console.log(count);
const app = express();
const port = 3000;

app.use(express.json());

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", (req, res) => {
  res.json({
    name: "taskAPI",
    version: "1.0",
    endpoints: ["/tasks"],
  });
});

app.get("/health", (req, res) => {
  res.json({
    status: "success",
  });
});

app.get("/tasks", (req, res) => {
  try {
    const tasks = db.prepare("SELECT * FROM tasks ORDER BY id").all();

    res.json(tasks);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

app.get("/tasks/:id", (req, res) => {
  try {
    const id = Number(req.params.id);

    const task = db.prepare("SELECT * FROM tasks WHERE id = ?").get(id);

    if (!task) {
      return res.status(404).json({
        error: "Task not found",
      });
    }

    res.json(task);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});
// post

app.post("/tasks", (req, res) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({
        error: "Title required",
      });
    }

    const result = db
      .prepare("INSERT INTO tasks (title, done) VALUES (?, ?)")
      .run(title, 0);

    const task = db
      .prepare("SELECT * FROM tasks WHERE id = ?")
      .get(result.lastInsertRowid);

    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});
//put

app.put("/tasks/:id", (req, res) => {
  try {
    const id = Number(req.params.id);
    const { title, done } = req.body;

    const result = db
      .prepare(
        `
        UPDATE tasks
        SET title = ?, done = ?
        WHERE id = ?
    `,
      )
      .run(title, done, id);

    if (result.changes === 0) {
      return res.status(404).json({
        error: "Task not found",
      });
    }

    const task = db.prepare("SELECT * FROM tasks WHERE id = ?").get(id);

    res.json(task);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

// delete

app.delete("/tasks/:id", (req, res) => {
  try {
    const id = Number(req.params.id);

    const result = db.prepare("DELETE FROM tasks WHERE id = ?").run(id);

    if (result.changes === 0) {
      return res.status(404).json({
        error: "Task not found",
      });
    }

    res.status(204).send();
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});
// server start
app.listen(port, () => {
  console.log(`server is running on port :${port}`);
});
