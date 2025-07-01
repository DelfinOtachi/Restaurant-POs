import React, { useState } from "react";

const AddMenuForm = () => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    slug: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:5000/api/menus", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to add menu");
        return res.json();
      })
      .then((data) => {
        alert("Menu added successfully!");
        setForm({ name: "", description: "", slug: "" });
      })
      .catch((err) => {
        console.error(err);
        alert("Error adding menu");
      });
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "400px" }}>
      <h2>Add Menu</h2>
      <input
        name="name"
        type="text"
        placeholder="Menu Name"
        value={form.name}
        onChange={handleChange}
        required
      />
      <input
        name="description"
        type="text"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
      />
      <input
        name="slug"
        type="text"
        placeholder="Slug (optional)"
        value={form.slug}
        onChange={handleChange}
      />
      <button type="submit" style={{ background: "green", color: "white", padding: "0.5rem" }}>
        Add Menu
      </button>
    </form>
  );
};

export default AddMenuForm;
