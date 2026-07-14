const express = require("express");

const app = express();
const port = 3000;

app.use(express.json());

let tasks = [
  {
    id: 1,
    title: "learn express",
    done: false,
  },
  {
    id: 2,
    title: "Complete Flyrank assignment",
    done: false,
  },
  {
    id: 3,
    title: "push to github",
    done: false,
  },
];

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
  res.json(tasks);
});

app.get("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const task = tasks.find((t) => t.id === id);
  if (!task) {
    return res.status(404).json({
      error: `task ${id} not found`,
    });
  }
  res.json(task);
});

// post

app.post("/tasks", (req, res) => {
  const { title } = req.body;

  // Validation
  if (!title) {
    return res.status(400).json({
      error: "Title is required",
    });
  }

  // Create Task
  const newTask = {
    id: tasks.length + 1,
    title: title,
    done: false,
  };

  tasks.push(newTask);

  res.status(201).json(newTask);
});


//put

app.put("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);

  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return res.status(404).json({
      error: "Task not found",
    });
  }

  const { title, done } = req.body;

  if (title !== undefined) {
    task.title = title;
  }

  if (done !== undefined) {
    task.done = done;
  }

  res.json(task);
});
// server start
app.listen(port, () => {
  console.log(`server is running on port :${port}`);
});
