import React, { useEffect, useState } from 'react';
import { filterBooks } from '../services/api';
import { Link } from 'react-router-dom';

const categories = ['Classic Games', 'Action', 'Adventure', 'Puzzle'];
const statuses = ['AVAILABLE', 'BORROWED', 'RESERVED'];
const authors = ['T. OK Nonchang', 'Other Author'];
const publishers = ['Ubisoft', 'Other Publisher'];
const languages = ['English', 'Thai', 'Japanese'];
const genres = ['2.5D third-person perspective', 'FPS', 'RPG'];

export default function BookFilter() {
  const [filters, setFilters] = useState({
    category: '',
    status: '',
    author: '',
    publisher: '',
    language: '',
    genre: '',
    title: '',
    page: 1,
    limit: 200
  });

  const [books, setBooks] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await filterBooks(filters);
      if (res.data.success) {
        setBooks(res.data.data);
        setTotal(res.data.total || res.data.data.length);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [filters]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value, page: 1 });
  };

  const handlePageChange = (newPage) => {
    setFilters({ ...filters, page: newPage });
  };

  const totalPages = Math.ceil(total / filters.limit);

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>ค้นหาหนังสือ</h2>

      {/* Filter Form */}
      <div style={{
        display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '20px', justifyContent: 'center'
      }}>
        <input
          type="text"
          placeholder="ค้นหา Title"
          name="title"
          value={filters.title}
          onChange={handleChange}
          style={{ padding: '8px', flex: '1 1 150px', minWidth: '120px' }}
        />
        {[['category', categories], ['status', statuses], ['author', authors], ['publisher', publishers], ['language', languages], ['genre', genres]].map(([name, options]) => (
          <select key={name} name={name} value={filters[name]} onChange={handleChange} style={{ padding: '8px', flex: '1 1 150px', minWidth: '120px' }}>
            <option value="">{name.charAt(0).toUpperCase() + name.slice(1)}</option>
            {options.map(o => <option key={o}>{o}</option>)}
          </select>
        ))}
      </div>

      {/* Books Grid */}
      {loading ? (
        <p style={{ textAlign: 'center' }}>Loading...</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '15px' }}>
          {books.map(book => (
            <Link key={book.itemId} to={`/items/${book.itemId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div style={{
                border: '1px solid #ccc', borderRadius: '8px', overflow: 'hidden', background: '#fff', boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                display: 'flex', flexDirection: 'column', height: '100%'
              }}>
                <img src={book.coverImage} alt={book.title} style={{ width: '100%', height: '250px', objectFit: 'cover' }} />
                <div style={{ padding: '10px', flex: '1' }}>
                  <h3 style={{ margin: '5px 0', fontSize: '16px' }}>{book.title}</h3>
                  <p style={{ margin: '2px 0', fontSize: '13px' }}>Author: {book.author}</p>
                  <p style={{ margin: '2px 0', fontSize: '13px' }}>Category: {book.category}</p>
                  <p style={{ margin: '2px 0', fontSize: '13px' }}>Status: {book.status}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
        <button disabled={filters.page <= 1} onClick={() => handlePageChange(filters.page - 1)}>ก่อนหน้า</button>
        <span>Page {filters.page} / {totalPages || 1}</span>
        <button disabled={filters.page >= totalPages} onClick={() => handlePageChange(filters.page + 1)}>ถัดไป</button>
      </div>
    </div>
  );
}
