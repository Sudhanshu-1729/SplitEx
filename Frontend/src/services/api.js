const BASE_URL = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_BASE_URL)
  || (typeof process !== 'undefined' && process.env && process.env.VITE_API_BASE_URL)
  || '';

let authToken = null;
export function setAuthToken(token) {
  authToken = token;
}
export function clearAuthToken() {
  authToken = null;
}

function buildHeaders() {
  const h = { 'Content-Type': 'application/json' };
  if (authToken) h['Authorization'] = `Bearer ${authToken}`;
  return h;
}

export async function fetchExpenses() {
  const response = await fetch(`${BASE_URL}/api/expenses`, { method: 'GET' });
  if (!response.ok) throw new Error('Failed to load expenses');
  return response.json();
}

export async function addExpense(expense) {
  const response = await fetch(`${BASE_URL}/api/expenses`, {
    method: 'POST',
    headers: buildHeaders(),
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

// Auth APIs
export async function register(email, password, name) {
  const res = await fetch(`${BASE_URL}/api/auth/register`, {
    method: 'POST',
    headers: buildHeaders(),
    body: JSON.stringify({ email, password, name }),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function login(email, password) {
  const res = await fetch(`${BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: buildHeaders(),
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function getMe() {
  const res = await fetch(`${BASE_URL}/api/auth/me`, { headers: buildHeaders() });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
