const express = require("express");
const cors = require("cors");

const app = express();

const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

let todos = [
  {
    id: 1,
    title: "TB Clound Computing",
    description: "Kerjain Tugas Besar Cloud Computing",
    completed: false,
    dueDate: "2025-06-28",
    createdAt: "2025-06-71T13:00:00Z",
  },
];

let currentId = 2;

app.get("/api/todos", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Data retrieved successfully",
    data: todos,
  });
});

app.post("/api/todos", (req, res) => {
  const { title, description, dueDate } = req.body;
  const newTodo = {
    id: currentId++,
    title,
    description,
    completed: false,
    dueDate,
    createdAt: new Date().toISOString(),
  };
  todos.push(newTodo);
  res.status(201).json({
    status: "success",
    message: "To-do added successfully",
    data: newTodo,
  });
});

app.get("/api/todos/:id", (req, res) => {
  const todo = todos.find((t) => t.id === parseInt(req.params.id));
  if (todo) {
    res.status(200).json({
      status: "success",
      message: "Data retrieved successfully",
      data: todo,
    });
  } else {
    res.status(404).json({
      status: "error",
      message: "To-do with the given ID not found",
    });
  }
});

app.put("/api/todos/:id", (req, res) => {
  const todoIndex = todos.findIndex((t) => t.id === parseInt(req.params.id));
  if (todoIndex !== -1) {
    const { title, description, completed, dueDate } = req.body;
    todos[todoIndex] = {
      ...todos[todoIndex],
      title,
      description,
      completed,
      dueDate,
    };
    res.status(200).json({
      status: "success",
      message: "To-do updated successfully",
      data: todos[todoIndex],
    });
  } else {
    res.status(404).json({
      status: "error",
      message: "To-do with the given ID not found",
    });
  }
});

app.delete("/api/todos/:id", (req, res) => {
  const todoIndex = todos.findIndex((t) => t.id === parseInt(req.params.id));
  if (todoIndex !== -1) {
    todos.splice(todoIndex, 1);
    res.status(200).json({
      status: "success",
      message: "To-do deleted successfully",
      data: null,
    });
  } else {
    res.status(404).json({
      status: "error",
      message: "To-do with the given ID not found",
    });
  }
});

app.listen(port, () => {
  console.log(`Backend server berjalan di http://localhost:${port}`);
});
