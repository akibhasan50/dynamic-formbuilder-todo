import axios from 'axios';

// ===== JSONPlaceholder API Functions =====

const BASE_URL = 'https://jsonplaceholder.typicode.com';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

export async function fetchTodos() {
  const response = await axiosInstance.get('/todos');
  return response.data;
}

export async function fetchUsers() {
  const response = await axiosInstance.get('/users');
  return response.data;
}
