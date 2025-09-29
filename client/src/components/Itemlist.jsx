    import React, { useEffect, useState } from 'react'
    import { Link } from 'react-router-dom'
    import { fetchItems, deleteItem } from '../services/api'


    export default function ItemList() {
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const load = async () => {
  setLoading(true)
  try {
    const res = await fetchItems()
    console.log("API response:", res.data)
    setItems(res.data.data || [])   // 👈 ดึง array ออกจาก data
  } catch (err) {
    setError(err.message || 'เกิดข้อผิดพลาด')
  } finally {
    setLoading(false)
  }
}


    useEffect(() => { load() }, [])


    const handleDelete = async (id) => {
    if (!confirm('คุณต้องการลบสินค้านี้หรือไม่?')) return
    try {
    await deleteItem(id)
    await load()
    } catch (err) {
    alert('ลบไม่สำเร็จ: ' + err.message)
    }
    }


    if (loading) return <p>กำลังโหลด...</p>
    if (error) return <p>ข้อผิดพลาด: {error}</p>


    return (
    <div>
    <h2>รายการสินค้า</h2>
    <table className="table">
    <thead>
    <tr>
    <th>itemId</th>
    <th>Title</th>
    <th>Author</th>
    <th>Category</th>
    <th>ปี</th>
    <th>สถานะ</th>
    <th>การกระทำ</th>
    </tr>
    </thead>
    <tbody>
    {items.map((it) => (
    <tr key={it.itemId}>
    <td>{it.itemId}</td>
    <td><Link to={`/items/${it.itemId}`}>{it.title}</Link></td>
    <td>{it.author}</td>
    <td>{it.category}</td>
    <td>{it.publishYear}</td>
    <td>{it.status}</td>
    <td>
    <Link to={`/edit/${it.itemId}`} className="btn">แก้ไข</Link>
    <button className="btn danger" onClick={() => handleDelete(it.itemId)}>ลบ</button>
    </td>
    </tr>
    ))}
    </tbody>
    </table>
    </div>
    )
    }