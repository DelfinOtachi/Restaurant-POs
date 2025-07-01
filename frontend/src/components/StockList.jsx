import React from 'react';

export default function StockList({ items, onEdit, onDelete, onLog }) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Stock Items</h2>
      <table className="w-full border table-auto text-sm">
        <thead>
          <tr className="bg-gray-200 ">
            <th>Name</th>
            <th>Unit</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Reorder</th>
            <th>Expiry</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item._id} className="border-b">
              <td >{item.name}</td>
              <td>{item.unit}</td>
              <td>{item.closingStock}</td>
              <td>{item.unitPrice}</td>
              <td>{item.reorderLevel}</td>
              <td>{item.expiryDate ? item.expiryDate.slice(0, 10) : '-'}</td>
              <td className="space-x-2">
                <button
                  onClick={() => onEdit(item)}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(item._id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
                <button
                  onClick={() => onLog(item)}
                  className="text-green-600 hover:underline"
                >
                  Log
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
