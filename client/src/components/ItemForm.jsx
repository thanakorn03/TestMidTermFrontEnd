import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import {
  addBook, updateBook,
  addJournal, updateJournal,
  addComic, updateComic
} from "../services/api.js";

export default function ItemForm({ editItem, onSuccess, type }) {
  const [form, setForm] = useState({
    title: "", author: "", category: "", publishYear: "", isbn: "",
    publisher: "", edition: "", pageCount: "", language: "", genre: "",
    description: "", coverImage: "https://example.com/cover.jpg", location: ""
  });

  useEffect(() => {
    if (editItem) setForm({ ...form, ...editItem });
  }, [editItem]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = ["title", "author", "category", "publisher", "location"];
    for (let f of requiredFields) {
      if (!form[f]?.trim()) return Swal.fire("ผิดพลาด!", `กรุณากรอก ${f}`, "error");
    }

    const data = { ...form, publishYear: Number(form.publishYear)||0, pageCount: Number(form.pageCount)||0 };

    try {
      if (type === "books") {
        editItem ? await updateBook(editItem.itemId, data) : await addBook(data);
      } else if (type === "journals") {
        editItem ? await updateJournal(editItem.itemId, data) : await addJournal(data);
      } else {
        editItem ? await updateComic(editItem.itemId, data) : await addComic(data);
      }

      Swal.fire("สำเร็จ!", editItem ? "แก้ไขเรียบร้อย" : "เพิ่มเรียบร้อย", "success");
      onSuccess?.();
    } catch (err) {
      console.error(err);
      Swal.fire("ผิดพลาด!", "บันทึกไม่สำเร็จ", "error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2 p-4 border rounded shadow-md bg-white">
      {Object.keys(form).map(key => (
        <input
          key={key}
          type={key.includes("Year") || key.includes("Count") ? "number" : "text"}
          name={key} placeholder={key} value={form[key]} onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      ))}
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
        {editItem ? "แก้ไข" : "เพิ่ม"}
      </button>
    </form>
  );
}
