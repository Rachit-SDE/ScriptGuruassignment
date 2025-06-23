import React, { useState, useEffect } from 'react';

const statusOptions = ['To Do', 'In Progress', 'Done'];
const priorityOptions = ['Low', 'Medium', 'High'];

const TaskModal = ({ open, onClose, onSave, initialTask }) => {
  const [task, setTask] = useState({
    title: '',
    description: '',
    status: 'To Do',
    priority: 'Medium',
    assignedTo: '',
    dueDate: ''
  });

  useEffect(() => {
    if (initialTask) {
      setTask({ ...initialTask, dueDate: initialTask.dueDate ? initialTask.dueDate.slice(0, 10) : '' });
    } else {
      setTask({ title: '', description: '', status: 'To Do', priority: 'Medium', assignedTo: '', dueDate: '' });
    }
  }, [initialTask, open]);

  if (!open) return null;

  const handleChange = e => {
    const { name, value } = e.target;
    setTask(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!task.title.trim()) return;
    onSave(task);
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: '#0005', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
      <form onSubmit={handleSubmit} style={{ background: '#fff', padding: 24, borderRadius: 8, minWidth: 320, boxShadow: '0 2px 16px #0002', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <h2 style={{ margin: 0, fontSize: 18 }}>{initialTask ? 'Edit Task' : 'New Task'}</h2>
        <input name="title" value={task.title} onChange={handleChange} placeholder="Title" required style={{ padding: 8, fontSize: 15 }} />
        <textarea name="description" value={task.description} onChange={handleChange} placeholder="Description" rows={3} style={{ padding: 8, fontSize: 15 }} />
        <div style={{ display: 'flex', gap: 8 }}>
          <select name="status" value={task.status} onChange={handleChange} style={{ flex: 1 }}>
            {statusOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
          <select name="priority" value={task.priority} onChange={handleChange} style={{ flex: 1 }}>
            {priorityOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </div>
        <input name="assignedTo" value={task.assignedTo} onChange={handleChange} placeholder="Assigned To" style={{ padding: 8, fontSize: 15 }} />
        <input name="dueDate" value={task.dueDate} onChange={handleChange} type="date" style={{ padding: 8, fontSize: 15 }} />
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 8 }}>
          <button type="button" onClick={onClose} style={{ padding: '6px 16px', background: '#eee', border: 'none', borderRadius: 4 }}>Cancel</button>
          <button type="submit" style={{ padding: '6px 16px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: 4 }}>{initialTask ? 'Save' : 'Create'}</button>
        </div>
      </form>
    </div>
  );
};

export default TaskModal; 