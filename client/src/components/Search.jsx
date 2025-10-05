import React, { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 flex space-x-2">
      <input
        type="text"
        placeholder="Search by title, author, ISBN..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border p-2 rounded flex-1"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        🔍
      </button>
    </form>
  );
}
