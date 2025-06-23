# 📝 ScriptGuru Task Manager

A modern, full-stack Kanban-style board and task management application. Built with React (Vite + Tailwind CSS) for the frontend and Node.js/Express + MongoDB for the backend.


*************** Main Page ***************
 Screenshot 2025-06-23 115503.png

 ********** Add Board Section ****************
 Screenshot 2025-06-23 115515.png


 ************ Add Task Section ****************
 Screenshot 2025-06-23 115526.png


---

## ✨ Features
- **Boards & Tasks:** Create, view, and manage multiple boards and their tasks.
- **Task Management:** Add, edit, delete, and move tasks between statuses (To Do, In Progress, Done).
- **Responsive UI:** Clean, modern interface with sidebar navigation and modals.
- **RESTful API:** Well-structured backend with clear endpoints for all operations.

---

## 🛠️ Tech Stack
- **Frontend:** React, Vite, Tailwind CSS, ESLint
- **Backend:** Node.js, Express, Mongoose, MongoDB, dotenv, CORS

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd ScriptGuruTask
```

### 2. Setup the Backend
```bash
cd backend
npm install
# Create a .env file with your MongoDB URI (see .env.example if available)
npm start
```

### 3. Setup the Frontend
```bash
cd ../frontend
npm install
npm run dev
```

- Frontend: http://localhost:5173
- Backend API: http://localhost:4000

---

## 📦 API Overview

### Boards
- `GET /boards` — List all boards
- `POST /boards` — Create a new board `{ name }`
- `GET /boards/:id/tasks` — List tasks in a board
- `POST /boards/:id/tasks` — Create a task in a board

### Tasks
- `PUT /tasks/:id` — Update a task
- `DELETE /tasks/:id` — Delete a task

#### Task Model
```js
{
  title: String,
  description: String,
  status: 'To Do' | 'In Progress' | 'Done',
  priority: 'Low' | 'Medium' | 'High',
  assignedTo: String,
  dueDate: Date,
  boardId: ObjectId,
  createdAt: Date
}
```

---

## 📸 Screenshots
_Add screenshots or GIFs here to showcase the UI_

---

## 🤝 Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## 📄 License
[ISC](LICENSE) 