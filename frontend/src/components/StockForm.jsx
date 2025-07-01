import React, { useState, useEffect } from 'react';

export default function StockForm({ onSubmit, initial }) {
  const [form, setForm] = useState({
    name: '',
    unit: '',
    openingStock: 0,
    unitPrice: 0,
    reorderLevel: 0,
    expiryDate: '',
    type: 'ingredient',
    menuID: '', // ✅ Use menuID instead of menuItemId
  });

  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    if (initial) setForm(initial);
  }, [initial]);

  // Fetch available menu items from API
  useEffect(() => {
    fetch('http://localhost:5000/api/menus')
      .then(res => res.json())
      .then(data => {
        setMenuItems(data.items || data); // Adjust depending on API shape
      })
      .catch(err => {
        console.error('❌ Failed to fetch menu items:', err);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm({
      name: '',
      unit: '',
      openingStock: 0,
      unitPrice: 0,
      reorderLevel: 0,
      expiryDate: '',
      type: 'ingredient',
      menuID: '',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 space-y-2">
      <h2 className="text-lg font-bold">Add / Edit Stock Item</h2>

      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required className="border p-1 w-full" />

      <input name="unit" placeholder="Unit (e.g. kg, bottle)" value={form.unit} onChange={handleChange} required className="border p-1 w-full" />

      <input name="openingStock" type="number" placeholder="Opening Stock" value={form.openingStock} onChange={handleChange} className="border p-1 w-full" />

      <input name="unitPrice" type="number" placeholder="Unit Price" value={form.unitPrice} onChange={handleChange} className="border p-1 w-full" />

      <input name="reorderLevel" type="number" placeholder="Reorder Level" value={form.reorderLevel} onChange={handleChange} className="border p-1 w-full" />

      <input name="expiryDate" type="date" value={form.expiryDate} onChange={handleChange} className="border p-1 w-full" />

      <select name="type" value={form.type} onChange={handleChange} className="border p-1 w-full">
        <option value="ingredient">Ingredient</option>
        <option value="packaging">Packaging</option>
        <option value="finalProduct">Final Product</option>
        <option value="misc">Misc</option>
      </select>

      <select name="menuID" value={form.menuID} onChange={handleChange} className="border p-1 w-full">
        <option value="">Select Menu Item (optional)</option>
        {menuItems.map(mi => (
          <option key={mi._id} value={mi._id}>
            {mi.name || mi.title || mi.code || 'Unnamed'}
          </option>
        ))}
      </select>

      <button type="submit" className="bg-blue-500 text-white px-3 py-1 rounded">Save</button>
    </form>
  );
}
