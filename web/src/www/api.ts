import axios from 'axios';

const user = JSON.parse(localStorage.getItem('user') as string);

const API_HOST = import.meta.env.VITE_API_HOST;
const API_PORT = import.meta.env.VITE_API_PORT;

export const api = axios.create({
  baseURL: `http://${API_HOST}:${API_PORT}`,
  headers: {
    Authorization: user !== '' ? `Bearer ${user?.token}` : null,
  },
});
