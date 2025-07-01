import React, { useState } from 'react';
import axios from 'axios';

const StockUsageLogForm = ({ stockItemId, onSuccess }) => {
  const [form, setForm] = useState({
    quantity: '',
    type: 'sale',
    referenceId: '',
    referenceType: '',
    note: '',
    usedBy: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const res = await axios.post(`http://localhost:5000/api/stocks/${stockItemId}/log`, form);
      setSuccess('Log added successfully!');
      setForm({
        quantity: '',
        type: 'sale',
        referenceId: '',
        referenceType: '',
        note: '',
        usedBy: '',
      });
      if (onSuccess) onSuccess(res.data); // optional callback to refresh stock
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || 'Failed to log usage');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded shadow-md w-full max-w-md mx-auto">
      <h2 className="text-lg font-semibold mb-3">Log Stock Usage</h2>

      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}

      <div className="mb-2">
        <label className="block">Quantity:</label>
        <input
          type="number"
          name="quantity"
          value={form.quantity}
          onChange={handleChange}
          required
          className="border rounded px-2 py-1 w-full"
        />
      </div>

      <div className="mb-2">
        <label className="block">Type:</label>
        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="border rounded px-2 py-1 w-full"
        >
          <option value="sale">Sale</option>
          <option value="restock">Restock</option>
          <option value="wastage">Wastage</option>
          <option value="correction">Correction</option>
        </select>
      </div>

      <div className="mb-2">
        <label className="block">Reference ID (optional):</label>
        <input
          type="text"
          name="referenceId"
          value={form.referenceId}
          onChange={handleChange}
          className="border rounded px-2 py-1 w-full"
        />
      </div>

      <div className="mb-2">
        <label className="block">Reference Type (optional):</label>
        <input
          type="text"
          name="referenceType"
          value={form.referenceType}
          onChange={handleChange}
          className="border rounded px-2 py-1 w-full"
        />
      </div>

      <div className="mb-2">
        <label className="block">Note:</label>
        <textarea
          name="note"
          value={form.note}
          onChange={handleChange}
          className="border rounded px-2 py-1 w-full"
        />
      </div>

      <div className="mb-3">
        <label className="block">Used By:</label>
        <input
          type="text"
          name="usedBy"
          value={form.usedBy}
          onChange={handleChange}
          className="border rounded px-2 py-1 w-full"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Submit Log
      </button>
    </form>
  );
};

export default StockUsageLogForm;
