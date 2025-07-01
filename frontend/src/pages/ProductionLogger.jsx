import React, { useEffect, useState } from 'react';
import { Button } from '../components/ui/button';

const ProductionLogger = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState('');
  const [quantityCooked, setQuantityCooked] = useState(0);

  useEffect(() => {
    fetch('/api/menu-items')
      .then(res => res.json())
      .then(data => setMenuItems(data || []));
  }, []);

  const submitProduction = async () => {
    const res = await fetch('/api/production', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        menuItemId: selectedItem,
        quantityCooked
      })
    });

    if (res.ok) {
      alert('✅ Production logged and stock updated!');
    } else {
      const error = await res.json();
      alert(`❌ Failed: ${error.error}`);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 space-y-4">
      <h2 className="text-2xl font-bold">Production Log</h2>

      <select
        className="w-full border rounded px-3 py-2"
        value={selectedItem}
        onChange={e => setSelectedItem(e.target.value)}
      >
        <option value="">Select Menu Item</option>
        {menuItems.map(item => (
          <option key={item._id} value={item._id}>{item.name}</option>
        ))}
      </select>

      <input
        type="number"
        placeholder="Quantity Cooked"
        className="w-full border rounded px-3 py-2"
        value={quantityCooked}
        onChange={e => setQuantityCooked(parseFloat(e.target.value))}
      />

      <Button onClick={submitProduction} className="bg-blue-600 text-white w-full">
        🍳 Submit Production
      </Button>
    </div>
  );
};

export default ProductionLogger;
