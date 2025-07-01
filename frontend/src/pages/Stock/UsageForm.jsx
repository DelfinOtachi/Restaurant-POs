import React, { useState } from 'react';
import axios from 'axios';

export default function UsageForm({ item, onBack }) {
  const [used, setUsed] = useState(0);
  const [spoiled, setSpoiled] = useState(0);
  const [purpose, setPurpose] = useState('');
  const [usedBy, setUsedBy] = useState('');
  const [note, setNote] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:5000/api/stock-items/log-usage/${item._id}`, {
        used,
        spoiled,
        purpose,
        usedBy,
        note,
      });
      alert('Usage logged!');
      onBack();
    } catch (err) {
      alert('Error logging usage');
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>🧾 Log Usage for {item.itemName}</h3>
      <input type="number" value={used} onChange={e => setUsed(+e.target.value)} placeholder="Used" />
      <input type="number" value={spoiled} onChange={e => setSpoiled(+e.target.value)} placeholder="Spoiled" />
      <input value={purpose} onChange={e => setPurpose(e.target.value)} placeholder="Purpose" />
      <input value={usedBy} onChange={e => setUsedBy(e.target.value)} placeholder="Used By" />
      <textarea value={note} onChange={e => setNote(e.target.value)} placeholder="Notes"></textarea>
      <button type="submit">Save</button>
      <button type="button" onClick={onBack}>Cancel</button>
    </form>
  );
}
