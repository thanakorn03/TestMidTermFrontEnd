import axios from 'axios';

const API_BASE_URL = 'https://bookshop-api-er7t.onrender.com/api'; // backend จริง

export const API = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' }
});

// CRUD Items
export const fetchItems = () => API.get('/items');
export const fetchItem = (id) => API.get(`/items/${id}`);
export const createItem = (payload) => API.post('/items', payload);
export const updateItem = (id, payload) => API.put(`/items/${id}`, payload);
export const deleteItem = (id) => API.delete(`/items/${id}`);

// Filter Books (ตาม docs: /books/filter)
export const filterBooks = (params) =>
  API.get('/books/filter', { params }); 
  // params = { category, status, author, publisher, genre, language, page, limit, title }
