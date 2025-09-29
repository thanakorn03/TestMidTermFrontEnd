import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../utils/axiosInstance';

export default function ItemDetail() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await api.get(`/books/${id}`);
        console.log('API response:', res.data); // debug
        // ดึงข้อมูลจาก res.data.data
        if (res.data.success) {
          setBook(res.data.data);
        } else {
          setBook(null);
        }
      } catch (err) {
        console.error('Error fetching book:', err.response?.data || err.message);
        setBook(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!book) return <p>Book not found</p>;

  return (
    <div style={{ maxWidth: '700px', margin: '20px auto', padding: '10px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h1>{book.title}</h1>
      <img src={book.coverImage} alt={book.title} style={{ width: '100%', height: 'auto', marginBottom: '20px', borderRadius: '4px' }} />
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>Category:</strong> {book.category}</p>
      <p><strong>Genre:</strong> {book.genre}</p>
      <p><strong>Publish Year:</strong> {book.publishYear}</p>
      <p><strong>ISBN:</strong> {book.isbn}</p>
      <p><strong>Status:</strong> {book.status}</p>
      <p><strong>Publisher:</strong> {book.publisher}</p>
      <p><strong>Edition:</strong> {book.edition}</p>
      <p><strong>Page Count:</strong> {book.pageCount}</p>
      <p><strong>Language:</strong> {book.language}</p>
      <p><strong>Location:</strong> {book.location}</p>
      <p><strong>Added Date:</strong> {new Date(book.addedDate).toLocaleString()}</p>
      <p><strong>Item Type:</strong> {book.itemType}</p>
      <p><strong>Description:</strong> {book.description}</p>
    </div>
  );
}
