import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import ItemList from './components/ItemList';
import ItemForm from './components/ItemForm'
import ItemDetail from './components/ItemDetail'
import EditItem from './components/EditItem'


export default function App() {
return (
<div className="container">
<header className="header">
<h1>ร้านหนังสือ (Front-end)</h1>
<nav>
<Link to="/">รายการ</Link>
<Link to="/create">เพิ่มสินค้า</Link>
</nav>
</header>

<main>
<Routes>
<Route path="/" element={<ItemList />} />
<Route path="/create" element={<ItemForm />} />
<Route path="/edit/:id" element={<EditItem editMode />} />
<Route path="/items/:id" element={<ItemDetail />} />
</Routes>
</main>
</div>
)
}