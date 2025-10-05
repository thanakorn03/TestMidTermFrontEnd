import React, { useEffect, useState } from "react";
import { getBooks } from "../services/api.js";

export default function Stats() {
  const [stats, setStats] = useState(null);

  const loadStats = async () => {
    try {
      const res = await getBooks();
      const books = res.data.data || [];

      const totalBooks = books.length;

      const topCategory = books.reduce((acc, book) => {
        acc[book.category] = (acc[book.category] || 0) + 1;
        return acc;
      }, {});
      const mostCategory = Object.keys(topCategory).reduce((a, b) =>
        topCategory[a] > topCategory[b] ? a : b,
      );

      const topAuthor = books.reduce((acc, book) => {
        acc[book.author] = (acc[book.author] || 0) + 1;
        return acc;
      }, {});
      const mostAuthor = Object.keys(topAuthor).reduce((a, b) =>
        topAuthor[a] > topAuthor[b] ? a : b,
      );

      setStats({
        totalBooks,
        topCategory: mostCategory || "-",
        topAuthor: mostAuthor || "-",
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  if (!stats) return null;

  return (
    <div className="p-4 mb-4 border rounded shadow-md bg-white">
      <h2 className="text-xl font-bold mb-2">📊 สถิติหนังสือ</h2>
      <p>จำนวนหนังสือทั้งหมด: {stats.totalBooks}</p>
      <p>หมวดหมู่ที่มีมากที่สุด: {stats.topCategory}</p>
      <p>ผู้แต่งที่มีมากที่สุด: {stats.topAuthor}</p>
    </div>
  );
}
