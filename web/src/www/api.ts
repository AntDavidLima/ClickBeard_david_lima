import axios from 'axios';

const user = JSON.parse(localStorage.getItem('user') as string);

export const api = axios.create({
  baseURL: 'http://localhost:3333',
  headers: {
    Authorization: user !== '' ? `Bearer ${user?.token}` : null,
  },
});
