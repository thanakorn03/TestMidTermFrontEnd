import React, { useState, useEffect } from "react";
import { getBookByUniqueId, getJournalDetails, getComicById } from "../services/api.js";

export default function BookDetail({ itemId, type }) {
  const [item, setItem] = useState(null);

  useEffect(() => {
    const loadItem = async () => {
      try {
        let res;
        if (type === "books") res = await getBookByUniqueId(itemId);
        else if (type === "journals") res = await getJournalDetails(itemId);
        else res = await getComicById(itemId);

        setItem(res.data.data || res.data);
      } catch (err) {
        console.error(err);
      }
    };
    loadItem();
  }, [itemId, type]);

  if (!item) return <p>Loading...</p>;

  return (
    <div className="p-4 border rounded shadow-md bg-white">
      <h2 className="text-xl font-bold mb-2">{item.title}</h2>
      <p><strong>Author:</strong> {item.author || "-"}</p>
      <p><strong>Category:</strong> {item.category || "-"}</p>
      <p><strong>Publish Year:</strong> {item.publishYear || "-"}</p>
      <p><strong>ISBN:</strong> {item.isbn || "-"}</p>
      <p><strong>Publisher:</strong> {item.publisher || "-"}</p>
      <p><strong>Edition:</strong> {item.edition || "-"}</p>
      <p><strong>Page Count:</strong> {item.pageCount || "-"}</p>
      <p><strong>Language:</strong> {item.language || "-"}</p>
      <p><strong>Genre:</strong> {item.genre || "-"}</p>
      <p><strong>Description:</strong> {item.description || "-"}</p>
      <p><strong>Location:</strong> {item.location || "-"}</p>
      {item.coverImage && <img src={item.coverImage} alt={item.title} className="w-32 h-40 object-cover mt-2" />}
    </div>
  );
}
