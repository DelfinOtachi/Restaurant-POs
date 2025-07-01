import React, { useEffect, useState } from "react";

const AddCategoryForm = () => {
  const [menus, setMenus] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    menuId: ""
  });

  useEffect(() => {
    // Fetch menus for dropdown
    fetch("http://localhost:5000/api/menus")
      .then(res => res.json())
      .then(data => setMenus(data))
      .catch(err => console.error(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:5000/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    })
      .then(res => res.json())
      .then(data => {
        alert("Category added!");
        setForm({ name: "", description: "", menuId: "" });
      })
      .catch(err => console.error(err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Category</h2>
      <input
        type="text"
        placeholder="Category Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />
      <select
        value={form.menuId}
        onChange={(e) => setForm({ ...form, menuId: e.target.value })}
        required
      >
        <option value="">Select Menu</option>
        {menus.map((menu) => (
          <option key={menu._id} value={menu._id}>
            {menu.name}
          </option>
        ))}
      </select>
      <button type="submit" className="bg-green-500">Add Category</button>
    </form>
  );
};

export default AddCategoryForm;
