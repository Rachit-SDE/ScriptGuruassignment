const API_BASE_URL = 'https://scriptguruassignment-2.onrender.com';

// Boards
export async function getBoards() {
  const res = await fetch(`${API_BASE_URL}/boards`);
  if (!res.ok) throw new Error('Failed to fetch boards');
  return res.json();
}

export async function createBoard(name) {
  const res = await fetch(`${API_BASE_URL}/boards`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name }),
  });
  if (!res.ok) throw new Error('Failed to create board');
  return res.json();
}

// Tasks
export async function getTasks(boardId) {
  const res = await fetch(`${API_BASE_URL}/boards/${boardId}/tasks`);
  if (!res.ok) throw new Error('Failed to fetch tasks');
  return res.json();
}

export async function createTask(boardId, task) {
  const res = await fetch(`${API_BASE_URL}/boards/${boardId}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
  });
  if (!res.ok) throw new Error('Failed to create task');
  return res.json();
}

export async function updateTask(taskId, updates) {
  const res = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  });
  if (!res.ok) throw new Error('Failed to update task');
  return res.json();
}

export async function deleteTask(taskId) {
  const res = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
    method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete task');
  return res.json();
} 
