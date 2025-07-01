import React, { useEffect, useState } from "react";

const AddMenuItemForm = () => {
  const [menus, setMenus] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    categoryId: "",
    menuId: "",
    available: true,
  });

  useEffect(() => {
    // Fetch menus
    fetch("http://localhost:5000/api/menus")
      .then(res => res.json())
      .then(data => setMenus(data))
      .catch(err => console.error("Error loading menus:", err));

    // Fetch categories
    fetch("http://localhost:5000/api/categories")
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error("Error loading categories:", err));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      price: parseFloat(form.price),
    };

    fetch("http://localhost:5000/api/menu-items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then(res => {
        if (!res.ok) throw new Error("Failed to add menu item");
        return res.json();
      })
      .then(() => {
        alert("Menu item added!");
        setForm({
          name: "",
          price: "",
          categoryId: "",
          menuId: "",
          available: true,
        });
      })
      .catch(err => {
        console.error(err);
        alert("Failed to add menu item.");
      });
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "400px" }}>
      <h2>Add Menu Item</h2>
      <input
        type="text"
        name="name"
        placeholder="Item Name"
        value={form.name}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={form.price}
        onChange={handleChange}
        required
      />
      <select
        name="menuId"
        value={form.menuId}
        onChange={handleChange}
        required
      >
        <option value="">Select Menu</option>
        {menus.map((menu) => (
          <option key={menu._id} value={menu._id}>{menu.name}</option>
        ))}
      </select>
      <select
        name="categoryId"
        value={form.categoryId}
        onChange={handleChange}
        required
      >
        <option value="">Select Category</option>
        {categories.map((category) => (
          <option key={category._id} value={category._id}>{category.name}</option>
        ))}
      </select>
      <label>
        <input
          type="checkbox"
          name="available"
          checked={form.available}
          onChange={handleChange}
        />{" "}
        Available
      </label>
      <button type="submit" style={{ background: "green", color: "white", padding: "0.5rem" }}>
        Add Menu Item
      </button>
    </form>
  );
};

export default AddMenuItemForm;
