import axios from 'axios';
import { getToken } from './token.js';

const api = axios.create({
  baseURL: import.meta.env.API_BASE_URL
});

api.interceptors.request.use(config => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
