import React from 'react';
import TaskCard from './TaskCard';

const statusList = ['To Do', 'In Progress', 'Done'];

const BoardView = ({ tasks, onEditTask, onDeleteTask, onStatusChange }) => {
  return (
    <div style={{ display: 'flex', gap: 16, flex: 1, padding: 16, overflowX: 'auto' }}>
      {statusList.map(status => (
        <div key={status} style={{ flex: 1, minWidth: 260, background: '#f9fafb', borderRadius: 8, padding: 12, border: '1px solid #eee' }}>
          <h3 style={{ fontSize: 16, marginBottom: 12 }}>{status}</h3>
          {tasks.filter(task => task.status === status).map(task => (
            <TaskCard
              key={task._id}
              task={task}
              onEdit={() => onEditTask(task)}
              onDelete={() => onDeleteTask(task._id)}
              onStatusChange={onStatusChange}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default BoardView; 