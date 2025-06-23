import React from 'react';

const Sidebar = ({ boards, selectedBoardId, onSelectBoard, onAddBoard }) => {
  return (
    <aside style={{ width: 220, background: '#f4f4f4', padding: 16, borderRight: '1px solid #ddd', height: '100vh' }}>
      <h2 style={{ fontSize: 18, marginBottom: 16 }}>Boards</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {boards.map(board => (
          <li key={board._id}>
            <button
              style={{
                width: '100%',
                padding: 8,
                marginBottom: 8,
                background: board._id === selectedBoardId ? '#e0e7ff' : '#fff',
                border: '1px solid #ccc',
                borderRadius: 4,
                cursor: 'pointer',
                textAlign: 'left',
                fontWeight: board._id === selectedBoardId ? 'bold' : 'normal',
              }}
              onClick={() => onSelectBoard(board._id)}
            >
              {board.name}
            </button>
          </li>
        ))}
      </ul>
      <button onClick={onAddBoard} style={{ marginTop: 16, width: '100%', padding: 8, background: '#2563eb', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer' }}>
        + New Board
      </button>
    </aside>
  );
};

export default Sidebar; 