import React from "react";
import { useNavigate } from "react-router-dom";
import ItemList from "../components/ItemList.jsx";

export default function ListPage() {
  const navigate = useNavigate();

  const handleEdit = (item) => {
    navigate(`/form/${item._id}`); // ส่ง id ไปหน้า form
  };

  const handleView = (item) => {
    alert(JSON.stringify(item, null, 2));
  };

  return (
    <div>
      <h1>📚 รายการหนังสือ</h1>
      <button onClick={() => navigate("/form")}>➕ เพิ่มหนังสือ</button>
      <ItemList onEdit={handleEdit} onView={handleView} />
    </div>
  );
}
