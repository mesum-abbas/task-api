const express = require("express");

const app = express();
const port = 3000;

app.use(express.json());

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

// server start
app.listen(port, () => {
  console.log(`server is running on port :${port}`);
});
