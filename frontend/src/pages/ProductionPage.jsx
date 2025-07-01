import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductionPage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [selectedMenuId, setSelectedMenuId] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Fetch available menu items on mount
  useEffect(() => {
    axios.get('http://localhost:5000/api/menu-items')
      .then(res => setMenuItems(res.data))
      .catch(err => console.error('Error loading menus', err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedMenuId || quantity <= 0) return;

    setLoading(true);
    setMessage('');

    try {
      const res = await axios.post('http://localhost:5000/api/production', {
                 menuItemId: selectedMenuId, // ✅ renamed to match backend
                 quantity,
                 preparedBy: 'Admin'         // ✅ match expected key
          });

      setMessage(`✅ Successfully produced ${quantity} unit(s) of item.`);
    } catch (err) {
      console.error(err);
      setMessage('❌ Failed to record production');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Production</h2>

      <form onSubmit={handleSubmit}>
        <label>
          Select Menu Item:
          <select value={selectedMenuId} onChange={(e) => setSelectedMenuId(e.target.value)}>
            <option value="">-- Choose --</option>
            {menuItems.map(item => (
              <option key={item._id} value={item._id}>{item.name}</option>
            ))}
          </select>
        </label>

        <br /><br />

        <label>
          Quantity to Produce:
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            min="1"
          />
        </label>

        <br /><br />

        <button type="submit" disabled={loading}>
          {loading ? 'Processing...' : 'Record Production'}
        </button>
      </form>

      <br />

      {message && <p>{message}</p>}
    </div>
  );
};

export default ProductionPage;
