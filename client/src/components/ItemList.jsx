import React, { useState } from "react";
import Swal from "sweetalert2";
import { deleteBook, deleteJournal, deleteComic } from "../services/api.js";

export default function ItemList({ items, onEdit, onView, type }) {

  const handleDelete = async (id) => {
    if (!confirm("ต้องการลบรายการนี้หรือไม่?")) return;

    try {
      if (type === "books") await deleteBook(id);
      else if (type === "journals") await deleteJournal(id);
      else await deleteComic(id);

      Swal.fire("สำเร็จ!", "ลบเรียบร้อยแล้ว", "success");
    } catch (err) {
      console.error(err);
      Swal.fire("ผิดพลาด!", "ลบไม่สำเร็จ", "error");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">📚 {type.toUpperCase()}</h2>
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Cover</th>
            <th className="border p-2">Title</th>
            <th className="border p-2">Author</th>
            <th className="border p-2">Year</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.length === 0 ? (
            <tr><td colSpan="5" className="text-center p-4">ไม่มีข้อมูล</td></tr>
          ) : (
            items.map(item => (
              <tr key={item.itemId || item.id}>
                <td className="border p-2">
                  <img src={item.coverImage} alt={item.title} className="w-16 h-20 object-cover" />
                </td>
                <td className="border p-2">{item.title}</td>
                <td className="border p-2">{item.author || "-"}</td>
                <td className="border p-2">{item.publishYear || "-"}</td>
                <td className="border p-2 space-x-2">
                  <button className="bg-blue-500 text-white px-2 py-1 rounded" onClick={() => onView(item)}>👁</button>
                  <button className="bg-yellow-500 text-white px-2 py-1 rounded" onClick={() => onEdit(item)}>✏️</button>
                  <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => handleDelete(item.itemId || item.id)}>🗑</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
