import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import {
  addBook, updateBook,
  addJournal, updateJournal,
  addComic, updateComic
} from "../services/api.js";

export default function ItemForm({ editItem, onSuccess, type }) {
  const defaultForm = {
    title: "",
    author: "",
    category: "",
    publishYear: "",
    publisher: "",
    location: "",
    description: "",
    coverImage: "https://example.com/cover.jpg",
    // Book / Comic
    isbn: "",
    edition: "",
    pageCount: "",
    language: "",
    genre: "",
    // Journal
    issn: "",
    volume: "",
    issue: "",
    publicationFrequency: ""
  };

  const [form, setForm] = useState(defaultForm);

  useEffect(() => {
    if (editItem) setForm({ ...defaultForm, ...editItem });
  }, [editItem]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
  e.preventDefault();

  // ตรวจสอบฟิลด์ required
  const requiredFields = ["title", "author", "category", "publisher", "location"];
  for (let f of requiredFields) {
    if (!form[f]?.trim())
      return Swal.fire("ผิดพลาด!", `กรุณากรอก ${f}`, "error");
  }

  // สร้าง payload ตาม type
  let data;
  if (type === "books" || type === "comics") {
    const requiredISBN = ["isbn", "title", "author", "category", "publisher"];
    for (let f of requiredISBN) {
      if (!form[f]?.trim())
        return Swal.fire("ผิดพลาด!", `กรุณากรอก ${f}`, "error");
    }
    data = { ...form, publishYear: Number(form.publishYear)||0, pageCount: Number(form.pageCount)||0 };
  } else if (type === "journals") {
    const requiredISSN = ["issn", "volume", "issue", "publicationFrequency"];
    for (let f of requiredISSN) {
      if (!form[f]?.trim())
        return Swal.fire("ผิดพลาด!", `กรุณากรอก ${f}`, "error");
    }
    // ไม่ส่ง isbn ให้ Journal
    const { isbn, edition, pageCount, language, genre, ...journalData } = form;
    data = { ...journalData, publishYear: Number(form.publishYear)||0 };
  }

  try {
    if (type === "books") {
      editItem ? await updateBook(editItem.itemId, data) : await addBook(data);
    } else if (type === "comics") {
      editItem ? await updateComic(editItem.itemId, data) : await addComic(data);
    } else {
      editItem ? await updateJournal(editItem.itemId, data) : await addJournal(data);
    }

    Swal.fire("สำเร็จ!", editItem ? "แก้ไขเรียบร้อย" : "เพิ่มเรียบร้อย", "success");
    onSuccess?.();
    setForm(defaultForm); // reset form
  } catch (err) {
    console.error(err.response?.data || err);
    Swal.fire("ผิดพลาด!", err.response?.data?.message || "บันทึกไม่สำเร็จ", "error");
  }
};

  return (
    <form onSubmit={handleSubmit} className="space-y-2 p-4 border rounded shadow-md bg-white">
      {/* Fields common */}
      <input name="title" placeholder="Title" value={form.title} onChange={handleChange} className="w-full border p-2 rounded" required />
      <input name="author" placeholder="Author" value={form.author} onChange={handleChange} className="w-full border p-2 rounded" required />
      <input name="category" placeholder="Category" value={form.category} onChange={handleChange} className="w-full border p-2 rounded" required />
      <input name="publishYear" type="number" placeholder="Publish Year" value={form.publishYear} onChange={handleChange} className="w-full border p-2 rounded" />
      <input name="publisher" placeholder="Publisher" value={form.publisher} onChange={handleChange} className="w-full border p-2 rounded" required />
      <input name="location" placeholder="Location" value={form.location} onChange={handleChange} className="w-full border p-2 rounded" required />
      <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} className="w-full border p-2 rounded" />
      <input name="coverImage" placeholder="Cover Image URL" value={form.coverImage} onChange={handleChange} className="w-full border p-2 rounded" />

      {/* Fields เฉพาะ Book / Comic */}
      {(type === "books" || type === "comics") && (
        <>
          <input name="isbn" placeholder="ISBN" value={form.isbn} onChange={handleChange} className="w-full border p-2 rounded" />
          <input name="edition" placeholder="Edition" value={form.edition} onChange={handleChange} className="w-full border p-2 rounded" />
          <input name="pageCount" type="number" placeholder="Page Count" value={form.pageCount} onChange={handleChange} className="w-full border p-2 rounded" />
          <input name="language" placeholder="Language" value={form.language} onChange={handleChange} className="w-full border p-2 rounded" />
          <input name="genre" placeholder="Genre" value={form.genre} onChange={handleChange} className="w-full border p-2 rounded" />
        </>
      )}

      {/* Fields เฉพาะ Journal */}
      {type === "journals" && (
        <>
          <input name="issn" placeholder="ISSN" value={form.issn} onChange={handleChange} className="w-full border p-2 rounded" />
          <input name="volume" placeholder="Volume" value={form.volume} onChange={handleChange} className="w-full border p-2 rounded" />
          <input name="issue" placeholder="Issue" value={form.issue} onChange={handleChange} className="w-full border p-2 rounded" />
          <input name="publicationFrequency" placeholder="Publication Frequency" value={form.publicationFrequency} onChange={handleChange} className="w-full border p-2 rounded" />
        </>
      )}

      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
        {editItem ? "แก้ไข" : "เพิ่ม"} {type}
      </button>
    </form>
  );
}
