import React, { useState, useEffect } from "react";
import ItemList from "../components/ItemList.jsx";
import ItemForm from "../components/ItemForm.jsx";
import FilterBar from "../components/Filter.jsx";
import Stats from "../components/Stats.jsx";
import BookDetail from "../components/BookDetail.jsx";
import Swal from "sweetalert2";

import {
  getBooks, getJournals, getComics,
  filterBooks, filterJournals, filterComics
} from "../services/api.js";

export default function Home() {
  const [type, setType] = useState("books"); // books, journals, comics
  const [items, setItems] = useState([]);
  const [currentFilters, setCurrentFilters] = useState({});
  const [viewItemId, setViewItemId] = useState(null);
  const [editItem, setEditItem] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadItems();
  }, [type]);

  const loadItems = async () => {
    try {
      let res;
      if (type === "books") res = await getBooks();
      else if (type === "journals") res = await getJournals();
      else res = await getComics();

      setItems(res.data.data || []);
    } catch (err) {
      console.error(err);
      Swal.fire("ผิดพลาด!", "โหลดข้อมูลไม่สำเร็จ", "error");
    }
  };

  const handleFilter = async (filters) => {
    setCurrentFilters(filters);
    try {
      let res;
      if (type === "books") res = await filterBooks(filters);
      else if (type === "journals") res = await filterJournals(filters);
      else res = await filterComics(filters);

      setItems(res.data.data || []);
    } catch (err) {
      console.error(err);
      Swal.fire("ผิดพลาด!", "กรองข้อมูลไม่สำเร็จ", "error");
    }
  };

  const handleView = (item) => {
    setViewItemId(item.itemId || item.id);
    setEditItem(null);
    setShowForm(false);
  };

  const handleEdit = (item) => {
    setEditItem(item);
    setViewItemId(null);
    setShowForm(true);
  };

  const handleBack = () => {
    setViewItemId(null);
    setEditItem(null);
    setShowForm(false);
    loadItems(); // reload list
  };

  return (
    <div className="p-4">
      <Stats />

      {/* เลือกประเภท */}
      <div className="mb-4">
        <select
          value={type}
          onChange={e => setType(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="books">Books</option>
          <option value="journals">Journals</option>
          <option value="comics">Comics</option>
        </select>
      </div>

      {/* Filter */}
      <FilterBar onFilter={handleFilter} />

      {/* Current Filters */}
      <div className="mb-4 p-2 bg-gray-100 rounded">
        <strong>Current Filters:</strong>{" "}
        {Object.keys(currentFilters).map(key =>
          currentFilters[key] ? `${key}: ${currentFilters[key]} ` : ""
        )}
      </div>

      {/* Item List */}
      {!showForm && !viewItemId && (
        <ItemList items={items} onEdit={handleEdit} onView={handleView} type={type} />
      )}

      {/* Add Button */}
      {!showForm && !viewItemId && (
        <button
          className="bg-green-600 text-white px-4 py-2 rounded mb-4"
          onClick={() => { setShowForm(true); setEditItem(null); }}
        >
          ➕ เพิ่ม
        </button>
      )}

      {/* Form */}
      {showForm && <ItemForm editItem={editItem} onSuccess={handleBack} type={type} />}

      {/* Detail */}
      {viewItemId && (
        <>
          <BookDetail itemId={viewItemId} type={type} />
          <button
            className="bg-gray-400 text-white px-2 py-1 rounded mt-2"
            onClick={handleBack}
          >
            🔙 กลับ
          </button>
        </>
      )}
    </div>
  );
}
