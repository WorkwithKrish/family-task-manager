import express from "express";
import multer from "multer";
import { authMiddleware } from "../middleware/authMiddleware";
import Task from "../models/Task";

const router = express.Router();

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req: any, file: any, cb: any) => cb(null, "uploads/"),
  filename: (req: any, file: any, cb: any) =>
    cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

// CREATE TASK (Only Admins & Parents)
router.post(
  "/",
  authMiddleware(["admin", "parent"]),
  upload.single("image"),
  async (req: any, res: any) => {
    try {
      const { title, description, assignedTo } = req.body;
      const image = req.file ? req.file.filename : null;

      const task = new Task({
        title,
        description,
        assignedTo,
        assignedBy: req.user.userId, // Automatically store the creator's ID
        image,
      });

      await task.save();

      res.status(201).json({ message: "Task created", task });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  }
);

// GET ALL TASKS (Admins & Parents see all, Students only see their tasks)
router.get(
  "/",
  authMiddleware(["admin", "parent", "student"]),
  async (req: any, res: any) => {
    try {
      let tasks;
      if (req.user.role === "student") {
        tasks = await Task.find({ assignedTo: req.user.userId });
      } else {
        tasks = await Task.find()
          .populate("assignedTo", "name role")
          .populate("assignedBy", "name role");
      }

      res.json(tasks);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  }
);

// UPDATE TASK STATUS (Only Admins & Parents)
router.put(
  "/:id",
  authMiddleware(["admin", "parent"]),
  async (req: any, res: any) => {
    try {
      const { status } = req.body;
      const task = await Task.findByIdAndUpdate(
        req.params.id,
        { status },
        { new: true }
      );

      if (!task) return res.status(404).json({ message: "Task not found" });

      res.json({ message: "Task updated", task });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  }
);

// DELETE TASK (Only Admins)
router.delete("/:id", authMiddleware(["admin"]), async (req: any, res: any) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
