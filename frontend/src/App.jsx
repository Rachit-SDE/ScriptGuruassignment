import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import BoardView from './components/BoardView';
import TaskModal from './components/TaskModal';
import {
  getBoards,
  createBoard,
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from './api';

const App = () => {
  const [boards, setBoards] = useState([]);
  const [selectedBoardId, setSelectedBoardId] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch boards on mount
  useEffect(() => {
    setLoading(true);
    getBoards()
      .then(data => {
        setBoards(data);
        if (data.length > 0 && !selectedBoardId) {
          setSelectedBoardId(data[0]._id);
        }
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
    // eslint-disable-next-line
  }, []);

  // Fetch tasks when selected board changes
  useEffect(() => {
    if (!selectedBoardId) return;
    setLoading(true);
    getTasks(selectedBoardId)
      .then(data => setTasks(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [selectedBoardId]);

  // Board handlers
  const handleSelectBoard = (id) => setSelectedBoardId(id);
  const handleAddBoard = async () => {
    const name = prompt('Board name?');
    if (name && name.trim()) {
      setLoading(true);
      try {
        const newBoard = await createBoard(name.trim());
        setBoards(prev => [...prev, newBoard]);
        setSelectedBoardId(newBoard._id);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  // Task handlers
  const handleOpenNewTask = () => {
    setEditingTask(null);
    setModalOpen(true);
  };
  const handleEditTask = (task) => {
    setEditingTask(task);
    setModalOpen(true);
  };
  const handleDeleteTask = async (id) => {
    setLoading(true);
    try {
      await deleteTask(id);
      setTasks(tasks.filter(t => t._id !== id));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  const handleStatusChange = async (id, status) => {
    setLoading(true);
    try {
      const updated = await updateTask(id, { status });
      setTasks(tasks.map(t => t._id === id ? updated : t));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  const handleSaveTask = async (task) => {
    setLoading(true);
    try {
      if (editingTask) {
        const updated = await updateTask(editingTask._id, task);
        setTasks(tasks.map(t => t._id === editingTask._id ? updated : t));
      } else {
        const created = await createTask(selectedBoardId, task);
        setTasks([...tasks, created]);
      }
      setModalOpen(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const selectedBoard = boards.find(b => b._id === selectedBoardId);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f3f4f6' }}>
      <Sidebar
        boards={boards}
        selectedBoardId={selectedBoardId}
        onSelectBoard={handleSelectBoard}
        onAddBoard={handleAddBoard}
      />
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px 0 24px' }}>
          <h1 style={{ fontSize: 22, margin: 0 }}>{selectedBoard ? selectedBoard.name : 'No Board Selected'}</h1>
          <button onClick={handleOpenNewTask} style={{ padding: '8px 18px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: 4, fontSize: 15 }}>+ New Task</button>
        </div>
        {loading && <div style={{ padding: 16 }}>Loading...</div>}
        {error && <div style={{ color: 'red', padding: 16 }}>{error}</div>}
        <BoardView
          tasks={tasks}
          onEditTask={handleEditTask}
          onDeleteTask={handleDeleteTask}
          onStatusChange={handleStatusChange}
        />
      </main>
      <TaskModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveTask}
        initialTask={editingTask}
      />
    </div>
  );
};

export default App;