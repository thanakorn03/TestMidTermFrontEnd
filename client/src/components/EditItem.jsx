import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/axiosInstance';

export default function EditItem() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  // Form state
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await api.get(`/books/${id}`);
        if (res.data.success) {
          const data = res.data.data;
          setBook(data);
          setTitle(data.title || '');
          setAuthor(data.author || '');
          setCategory(data.category || '');
          setDescription(data.description || '');
        }
      } catch (err) {
        console.error('Error fetching book:', err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  const validate = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = 'Title is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const payload = { title, author, category, description };
      await api.put(`/books/${id}`, payload);
      alert('Book updated successfully!');
      navigate(`/items/${id}`);
    } catch (err) {
      console.error('Error updating book:', err.response?.data || err.message);
      alert('Update failed!');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!book) return <p>Book not found</p>;

  return (
    <div style={{ maxWidth: '600px', margin: '20px auto', padding: '10px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Edit Book</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{
              width: '100%',
              padding: '8px',
              borderColor: errors.title ? 'red' : '#ccc',
              borderWidth: '1px',
              borderRadius: '4px'
            }}
          />
          {errors.title && <span style={{ color: 'red', fontSize: '12px' }}>{errors.title}</span>}
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Author:</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Category:</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', minHeight: '100px' }}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
          <button type="submit" style={{ padding: '8px 20px' }}>Update</button>
          <button type="button" style={{ padding: '8px 20px' }} onClick={() => navigate(-1)}>Cancel</button>
        </div>
      </form>
    </div>
  );
}
