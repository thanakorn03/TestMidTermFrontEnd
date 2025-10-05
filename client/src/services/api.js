// src/services/api.js
import axios from "axios";

// ------------------- BASE URL -------------------
const BASE_URL_BOOKS = import.meta.env.VITE_API_URL_BOOKS; // /api/books
const BASE_URL_JOURNALS = import.meta.env.VITE_API_URL_JOURNALS; // /api/journals
const BASE_URL_COMICS = import.meta.env.VITE_API_URL_COMICS; // /api/comics

// ------------------- BOOKS -------------------
// CRUD
export const getBooks = () => axios.get(BASE_URL_BOOKS);
export const getBookById = (id) => axios.get(`${BASE_URL_BOOKS}/${id}`);
export const addBook = (data) => axios.post(BASE_URL_BOOKS, data);
export const updateBook = (id, data) => axios.put(`${BASE_URL_BOOKS}/${id}`, data);
export const deleteBook = (id) => axios.delete(`${BASE_URL_BOOKS}/${id}`);

// Search & Filter
export const searchBooks = (query) =>
  axios.get(`${BASE_URL_BOOKS}/search`, { params: { q: query } });

export const filterBooks = (filters) => {
  const params = {};
  Object.keys(filters).forEach((key) => {
    if (filters[key]) params[key] = filters[key];
  });
  return axios.get(`${BASE_URL_BOOKS}`, { params });
};

// Stats
export const getBookStats = () => axios.get(`${BASE_URL_BOOKS}/stats`);

// Get by unique itemId
export const getBookByUniqueId = (itemId) => axios.get(`${BASE_URL_BOOKS}/${itemId}`);

// ------------------- JOURNALS -------------------
// CRUD
export const getJournals = () => axios.get(BASE_URL_JOURNALS);
export const getJournalById = (id) => axios.get(`${BASE_URL_JOURNALS}/${id}`);
export const addJournal = (data) => axios.post(BASE_URL_JOURNALS, data);
export const updateJournal = (id, data) => axios.put(`${BASE_URL_JOURNALS}/${id}`, data);
export const deleteJournal = (id) => axios.delete(`${BASE_URL_JOURNALS}/${id}`);

// Search & Filter
export const searchJournals = (query) =>
  axios.get(`${BASE_URL_JOURNALS}/advanced-search`, { params: { q: query } });

export const filterJournals = (filters) =>
  axios.get(`${BASE_URL_JOURNALS}/advanced-search`, { params: filters });

// Status & Availability & Details
export const getJournalStatus = (id) => axios.get(`${BASE_URL_JOURNALS}/${id}/status`);
export const getAvailableJournals = () => axios.get(`${BASE_URL_JOURNALS}/available`);
export const getJournalDetails = (id) => axios.get(`${BASE_URL_JOURNALS}/${id}/details`);

// ------------------- COMICS -------------------
// CRUD
export const getComics = () => axios.get(BASE_URL_COMICS);
export const getComicById = (id) => axios.get(`${BASE_URL_COMICS}/${id}`);
export const addComic = (data) => axios.post(BASE_URL_COMICS, data);
export const updateComic = (id, data) => axios.put(`${BASE_URL_COMICS}/${id}`, data);
export const deleteComic = (id) => axios.delete(`${BASE_URL_COMICS}/${id}`);

// Search & Filter
export const searchComics = (query) =>
  axios.get(`${BASE_URL_COMICS}/advanced-search`, { params: { q: query } });

export const filterComics = (filters) =>
  axios.get(`${BASE_URL_COMICS}/advanced-search`, { params: filters });

// Status & Availability
export const getComicStatus = (id) => axios.get(`${BASE_URL_COMICS}/${id}/status`);
export const getAvailableComics = () => axios.get(`${BASE_URL_COMICS}/available`);
