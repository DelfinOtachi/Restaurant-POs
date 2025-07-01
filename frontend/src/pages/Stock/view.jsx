import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function StockList({ onLogUsageClick }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/stock-items/')
      .then(res => setItems(res.data.items || []))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>📦 Stock Items</h2>
      <ul>
        {items.map(item => (
          <li key={item._id}>
            {item.itemName} ({item.closingStock} {item.unit}) - 
            <button onClick={() => onLogUsageClick(item)}>Log Usage</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
