import React, { useEffect, useState } from 'react';
import { getMenuItems, createMenuItem } from '../api/menuItems';

export default function MenuPage() {
  const [menuItems, setMenuItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', price: 0 });

  useEffect(() => {
    getMenuItems().then(res => setMenuItems(res.data));
  }, []);

  const handleAdd = async () => {
    const res = await createMenuItem(newItem);
    setMenuItems([...menuItems, res.data]);
    setNewItem({ name: '', price: 0 });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Menu Items</h1>

      <input
        type="text"
        value={newItem.name}
        placeholder="Name"
        onChange={e => setNewItem({ ...newItem, name: e.target.value })}
      />
      <input
        type="number"
        value={newItem.price}
        placeholder="Price"
        onChange={e => setNewItem({ ...newItem, price: parseFloat(e.target.value) })}
      />
      <button onClick={handleAdd}>Add Item</button>

      <ul>
        {menuItems.map(item => (
          <li key={item._id}>{item.name} - ${item.price}</li>
        ))}
      </ul>
    </div>
  );
}
