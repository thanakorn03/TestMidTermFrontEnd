import React, { useState } from "react";

export default function FilterBar({ onFilter }) {
  const [filters, setFilters] = useState({ category: "", author: "", publishYear: "", genre: "" });

  const handleChange = (e) => setFilters({ ...filters, [e.target.name]: e.target.value });
  const handleSubmit = (e) => { e.preventDefault(); onFilter(filters); };

  return (
    <form onSubmit={handleSubmit} className="flex space-x-2 mb-4">
      <input type="text" name="category" placeholder="Category" value={filters.category} onChange={handleChange} className="border p-2 rounded" />
      <input type="text" name="author" placeholder="Author" value={filters.author} onChange={handleChange} className="border p-2 rounded" />
      <input type="number" name="publishYear" placeholder="Year" value={filters.publishYear} onChange={handleChange} className="border p-2 rounded" />
      <input type="text" name="genre" placeholder="Genre" value={filters.genre} onChange={handleChange} className="border p-2 rounded" />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Filter</button>
    </form>
  );
}
