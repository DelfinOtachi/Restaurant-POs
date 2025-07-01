import React, { useEffect, useState } from 'react';
import {
  getStockItems,
  createStockItem,
  updateStockItem,
  deleteStockItem
} from '../api/stockApi';

import StockList from '../components/StockList';
import StockForm from '../components/StockForm';
import StockUsageLogForm from './StockUsageLogForm';

export default function StockPage() {
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);
  const [loggingItem, setLoggingItem] = useState(null); // for usage logging

  const fetchItems = async () => {
    try {
      const { data } = await getStockItems();
      setItems(data);
    } catch (err) {
      console.error('Failed to fetch stock items:', err);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleSubmit = async (form) => {
    try {
      if (editing) {
        await updateStockItem(editing._id, form);
      } else {
        await createStockItem(form);
      }
      setEditing(null);
      fetchItems();
    } catch (err) {
      console.error('Submit error:', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this stock item?')) {
      try {
        await deleteStockItem(id);
        fetchItems();
      } catch (err) {
        console.error('Delete error:', err);
      }
    }
  };

  const handleLog = (item) => {
    setLoggingItem(item);
  };

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold mb-4">Stock Management</h1>

      <StockForm onSubmit={handleSubmit} initial={editing} />

      {loggingItem && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">
            Log Usage for: {loggingItem.name}
          </h2>
          <StockUsageLogForm
            stockItemId={loggingItem._id}
            onSuccess={() => {
              setLoggingItem(null);
              fetchItems();
            }}
          />
        </div>
      )}

      <StockList
        items={items}
        onEdit={setEditing}
        onDelete={handleDelete}
        onLog={handleLog} // make sure StockList uses this
      />
    </div>
  );
}
