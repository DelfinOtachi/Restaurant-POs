import React, { useState } from 'react';

const AddTableForm = () => {
  const [form, setForm] = useState({
    name: '',
    number: '',
    capacity: '',
    location: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:5000/api/tables', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
      .then(res => res.json())
      .then(data => {
        alert('Table added!');
        setForm({ name: '', number: '', capacity: '', location: '' });
      })
      .catch(err => console.error('Error adding table:', err));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white shadow rounded max-w-md mx-auto">
      <h2 className="text-xl font-bold">Add Table</h2>
      <input
        type="text"
        name="name"
        placeholder="Table Name"
        value={form.name}
        onChange={handleChange}
        required
        className="w-full border p-2"
      />
      <input
        type="number"
        name="number"
        placeholder="Table Number"
        value={form.number}
        onChange={handleChange}
        required
        className="w-full border p-2"
      />
      <input
        type="number"
        name="capacity"
        placeholder="Capacity"
        value={form.capacity}
        onChange={handleChange}
        className="w-full border p-2"
      />
      <select
        name="location"
        value={form.location}
        onChange={handleChange}
        required
        className="w-full border p-2"
      >
        <option value="">Select Location</option>
        <option value="bar">Bar</option>
        <option value="restaurant">Restaurant</option>
      </select>
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Add Table</button>
    </form>
  );
};

export default AddTableForm;
