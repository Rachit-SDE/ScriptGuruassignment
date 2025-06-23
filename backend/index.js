import express from "express"
import { connectDB } from "./config/db.js"
import 'dotenv/config'
import boardsRouter from './routes/boards.js'
import tasksRouter from './routes/tasks.js'
import cors from 'cors'

const app = express()
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
// DB Connection
(async () => {
  await connectDB();

  app.get("/", (req, res) => {
    res.send("API Working")
  });

  app.use('/boards', boardsRouter);
  app.use('/tasks', tasksRouter);

  app.listen(port, () => {
    console.log(`Server Started on http://localhost:${port}`)
  });
})();