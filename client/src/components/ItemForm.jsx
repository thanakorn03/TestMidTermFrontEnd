import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createItem, fetchItem, updateItem } from '../services/api';

const empty = {
  itemId: '',
  title: '',
  author: '',
  category: '',
  publishYear: '',
  isbn: '',
  publisher: '',
  status: 'AVAILABLE',
  coverImage: '',
  description: '',
  location: '',
  addedDate: '',
  itemType: '',
  edition: '',
  pageCount: '',
  language: '',
  genre: ''
};

export default function ItemForm({ editMode }) {
  const [form, setForm] = useState(empty);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [touched, setTouched] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (editMode && id) {
      (async () => {
        setLoading(true);
        try {
          const res = await fetchItem(id);
          if (res.data.success) {
            setForm({ ...res.data.data });
          }
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [editMode, id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setTouched({ ...touched, [e.target.name]: true });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requiredFields = ['title', 'itemId'];
    const emptyRequired = requiredFields.filter(f => !form[f]);
    if (emptyRequired.length > 0) {
      alert('กรุณากรอกฟิลด์ที่จำเป็น');
      return;
    }
    try {
      if (editMode) {
        await updateItem(id, form);
        alert('อัปเดตข้อมูลเรียบร้อยแล้ว!');
        navigate(`/items/${id}`);
      } else {
        await createItem(form);
        alert('เพิ่มสินค้าสำเร็จ!');
        navigate('/');
      }
    } catch (err) {
      alert('บันทึกไม่สำเร็จ: ' + err.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={{ maxWidth: '900px', margin: '20px auto', padding: '20px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0,0,0,0.1)', background: '#fff' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>{editMode ? 'แก้ไขสินค้า' : 'เพิ่มสินค้าใหม่'}</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {/* Form */}
        <form onSubmit={handleSubmit} style={{ flex: '2 1 400px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
          {[
            { label: 'รหัส (itemId)', name: 'itemId', required: !editMode },
            { label: 'ชื่อ (title)', name: 'title', required: true },
            { label: 'ผู้แต่ง (author)', name: 'author' },
            { label: 'หมวดหมู่ (category)', name: 'category' },
            { label: 'ปีที่พิมพ์ (publishYear)', name: 'publishYear', type: 'number' },
            { label: 'ISBN', name: 'isbn' },
            { label: 'สำนักพิมพ์ (publisher)', name: 'publisher' },
            { label: 'สถานะ (status)', name: 'status', type: 'select', options: ['AVAILABLE', 'BORROWED', 'RESERVED'] },
            { label: 'Edition', name: 'edition' },
            { label: 'จำนวนหน้า (pageCount)', name: 'pageCount', type: 'number' },
            { label: 'ภาษา (language)', name: 'language' },
            { label: 'Genre', name: 'genre' },
            { label: 'ประเภทสินค้า (itemType)', name: 'itemType' },
            { label: 'วันที่เพิ่ม (addedDate)', name: 'addedDate', type: 'date' },
            { label: 'ตำแหน่ง (location)', name: 'location' },
            { label: 'รูปปก (coverImage URL)', name: 'coverImage' }
          ].map(field => (
            <label key={field.name} style={{ display: 'flex', flexDirection: 'column', gridColumn: field.name === 'description' ? '1 / -1' : undefined }}>
              {field.label}
              {field.type === 'select' ? (
                <select
                  name={field.name}
                  value={form[field.name]}
                  onChange={handleChange}
                  style={{
                    borderColor: touched[field.name] && field.required && !form[field.name] ? 'red' : '#ccc'
                  }}
                >
                  {field.options.map(opt => <option key={opt}>{opt}</option>)}
                </select>
              ) : (
                <input
                  type={field.type || 'text'}
                  name={field.name}
                  value={form[field.name] || ''}
                  onChange={handleChange}
                  style={{
                    borderColor: touched[field.name] && field.required && !form[field.name] ? 'red' : '#ccc'
                  }}
                  required={field.required}
                  disabled={field.name === 'itemId' && editMode}
                />
              )}
            </label>
          ))}
          <label style={{ gridColumn: '1 / -1', display: 'flex', flexDirection: 'column' }}>
            คำอธิบาย
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              style={{ borderColor: touched['description'] && !form.description ? 'red' : '#ccc' }}
            />
          </label>
          <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'center', gap: '10px' }}>
            <button type="submit" style={{ padding: '8px 20px', background: '#4CAF50', color: '#fff', border: 'none', borderRadius: '4px' }}>บันทึก</button>
            <button type="button" onClick={() => navigate(-1)} style={{ padding: '8px 20px', background: '#ccc', border: 'none', borderRadius: '4px' }}>ยกเลิก</button>
          </div>
        </form>

        {/* Preview รูปปก */}
        <div style={{ flex: '1 1 200px', textAlign: 'center' }}>
          <h3>Preview รูปปก</h3>
          {form.coverImage ? (
            <img src={form.coverImage} alt={form.title} style={{ width: '100%', borderRadius: '8px', marginTop: '10px' }} />
          ) : (
            <div style={{ width: '100%', height: '300px', border: '2px dashed #ccc', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '8px', marginTop: '10px' }}>
              <span>ยังไม่มีรูปปก</span>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Responsive */}
      <style>
        {`
          @media (max-width: 768px) {
            form { grid-template-columns: 1fr; }
            div[style*="display: flex"][style*="flex-wrap: wrap"] { flex-direction: column; }
          }
        `}
      </style>
    </div>
  );
}
