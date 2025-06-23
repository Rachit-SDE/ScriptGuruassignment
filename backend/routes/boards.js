import express from 'express';
import Board from '../models/Board.js';
import Task from '../models/Task.js';
import cors from 'cors'

const router = express.Router();

const app = express();

// GET /boards - list boards
router.get('/', async (req, res) => {
  try {
    const boards = await Board.find().sort({ createdAt: -1 });
    res.json(boards);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.use(
  cors({
    origin: ["*"],
    credentials: true,
  })
);

// POST /boards - create board
router.post('/', async (req, res) => {
  try {
    const { name } = req.body;
   
    if (!name) return res.status(400).json({ error: 'Name is required' });
    const board = await Board.create({ name });
    res.status(201).json(board);
  } catch (err) {
    res.status(500).json({ error: "server error" });
  }
});

// GET /boards/:id/tasks - get tasks in board
router.get('/:id/tasks', async (req, res) => {
  try {
    const tasks = await Task.find({ boardId: req.params.id }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /boards/:id/tasks - create task in board
router.post('/:id/tasks', async (req, res) => {
  try {
    const { title, description, status, priority, assignedTo, dueDate } = req.body;
    if (!title) return res.status(400).json({ error: 'Title is required' });
    const task = await Task.create({
      title,
      description,
      status,
      priority,
      assignedTo,
      dueDate,
      boardId: req.params.id,
    });
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router; 