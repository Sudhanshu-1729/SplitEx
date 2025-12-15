const BASE_URL = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_BASE_URL)
  || (typeof process !== 'undefined' && process.env && process.env.VITE_API_BASE_URL)
  || '';

const headers = {
  'Content-Type': 'application/json',
};

export async function fetchExpenses() {
  const response = await fetch(`${BASE_URL}/api/expenses`, { method: 'GET' });
  if (!response.ok) throw new Error('Failed to load expenses');
  return response.json();
}

export async function addExpense(expense) {
  const response = await fetch(`${BASE_URL}/api/expenses`, {
    method: 'POST',
    headers,
    body: JSON.stringify(expense),
  });
  if (!response.ok) {
    const text = await response.text().catch(() => '');
    throw new Error(text || 'Failed to add expense');
  }
  return response.json();
}

export async function deleteExpense(id) {
  const response = await fetch(`${BASE_URL}/api/expenses/${id}`, { method: 'DELETE' });
  if (!response.ok) {
    const text = await response.text().catch(() => '');
    throw new Error(text || 'Failed to delete expense');
  }
  return true;
}
