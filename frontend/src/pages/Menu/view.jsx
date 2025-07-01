// src/pages/Menu/View.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function ViewMenu() {
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/menus')
      .then(res => setMenus(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Menu Items</h1>
      <table className="min-w-full bg-white rounded shadow">
        <thead>
          <tr>
            <th className="py-2 px-4 border">Name</th>
            <th className="py-2 px-4 border">Category</th>
            <th className="py-2 px-4 border">Price</th>
            <th className="py-2 px-4 border">Available</th>
          </tr>
        </thead>
        <tbody>
          {menus.map(menu => (
            <tr key={menu._id}>
              <td className="py-2 px-4 border">{menu.name}</td>
              <td className="py-2 px-4 border">{menu.category}</td>
              <td className="py-2 px-4 border">${menu.price}</td>
              <td className="py-2 px-4 border">{menu.available ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
