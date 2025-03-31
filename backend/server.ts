import express from "express";
import cors from "cors";
import compression from "compression";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet());
app.use(compression());
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
);

app.use(cors());
app.use(express.json());
// Sample in-memory tasks array
let tasks = [
  { id: "1", title: "Task 1", status: "To Do" },
  { id: "2", title: "Task 2", status: "In Progress" },
  { id: "3", title: "Task 3", status: "Done" },
];

// ✅ Get all tasks
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// ✅ Add a new task
app.post("/tasks", (req, res) => {
  const newTask = { id: Date.now().toString(), ...req.body };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// ✅ Update a task status
app.put("/tasks/:id", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  tasks = tasks.map((task) => (task.id === id ? { ...task, status } : task));
  res.json({ message: "Task updated!" });
});

// ✅ Delete a task
app.delete("/tasks/:id", (req, res) => {
  const { id } = req.params;
  tasks = tasks.filter((task) => task.id !== id);
  res.json({ message: "Task deleted!" });
});

app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
