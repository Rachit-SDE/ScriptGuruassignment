import React from 'react';

const statusOptions = ['To Do', 'In Progress', 'Done'];
const priorityColors = { Low: '#a7f3d0', Medium: '#fde68a', High: '#fca5a5' };

const TaskCard = ({ task, onEdit, onDelete, onStatusChange }) => {
  return (
    <div style={{ background: '#fff', border: '1px solid #ddd', borderRadius: 6, padding: 12, marginBottom: 10, boxShadow: '0 1px 2px #0001' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <strong>{task.title}</strong>
        <span style={{ background: priorityColors[task.priority], color: '#222', borderRadius: 4, padding: '2px 8px', fontSize: 12, marginLeft: 8 }}>
          {task.priority}
        </span>
      </div>
      <div style={{ fontSize: 13, color: '#555', margin: '6px 0' }}>{task.description}</div>
      <div style={{ fontSize: 12, color: '#666' }}>
        <span>Assigned: {task.assignedTo || '-'}</span><br />
        <span>Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : '-'}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', marginTop: 8, gap: 8 }}>
        <select value={task.status} onChange={e => onStatusChange(task._id, e.target.value)} style={{ fontSize: 12, padding: 2 }}>
          {statusOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
        <button onClick={onEdit} style={{ fontSize: 12, padding: '2px 8px', marginLeft: 4 }}>Edit</button>
        <button onClick={onDelete} style={{ fontSize: 12, padding: '2px 8px', marginLeft: 2, color: '#b91c1c' }}>Delete</button>
      </div>
    </div>
  );
};

export default TaskCard; 