import React, { useState } from 'react';
import { format } from 'date-fns';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Trash2 } from 'lucide-react';

const menuCategories = [
  { id: 'drinks', name: 'Drinks', icon: '🥤' },
  { id: 'burgers', name: 'Burgers', icon: '🍔' },
  { id: 'sides', name: 'Sides', icon: '🍟' },
  { id: 'desserts', name: 'Desserts', icon: '🍰' },
];

const menuItems = {
  burgers: [
    { id: 1, name: 'Cheeseburger', price: 5.00, img: '🍔' },
    { id: 2, name: 'Hamburger', price: 4.50, img: '🍔' },
    { id: 3, name: 'Veggie Burger', price: 5.50, img: '🥬' },
  ],
  drinks: [
    { id: 4, name: 'Coca Cola', price: 2.50, img: '🥤' },
    { id: 5, name: 'Lemonade', price: 2.50, img: '🍋' },
  ],
  sides: [
    { id: 6, name: 'Fries', price: 3.00, img: '🍟' },
    { id: 7, name: 'Onion Rings', price: 3.50, img: '🧅' },
  ],
  desserts: [
    { id: 8, name: 'Milkshake', price: 3.50, img: '🥤' },
  ]
};

export default function OrderPage() {
  const [selectedCategory, setSelectedCategory] = useState('burgers');
  const [orderItems, setOrderItems] = useState([]);
  const [tableNumber, setTableNumber] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [guestCount, setGuestCount] = useState('');

  const handleAddItem = (item) => {
    setOrderItems((prev) => {
      const exists = prev.find((i) => i.id === item.id);
      if (exists) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const handleRemoveItem = (id) => {
    setOrderItems((prev) => prev.filter((item) => item.id !== id));
  };

  const currentDate = format(new Date(), 'eeee, MMMM d yyyy');
  const currentTime = format(new Date(), 'p');

  const subtotal = orderItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Good morning, Hannah</h1>
          <p className="text-gray-500">Give your best service to our customers</p>
        </div>
        <div className="text-right text-gray-600">
          <div>{currentDate}</div>
          <div className="flex items-center gap-1 justify-end text-sm"><Clock className="w-4 h-4" /> {currentTime}</div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex gap-6">
        {/* Left Column */}
        <div className="w-2/3 space-y-4">
          <div className="flex gap-2">
            {menuCategories.map(cat => (
              <Button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                variant={selectedCategory === cat.id ? "default" : "secondary"}
              >
                {cat.icon} {cat.name}
              </Button>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-4">
            {menuItems[selectedCategory].map(item => (
              <Card key={item.id} className="hover:shadow-md cursor-pointer" onClick={() => handleAddItem(item)}>
                <CardContent className="p-4 text-center">
                  <div className="text-4xl mb-2">{item.img}</div>
                  <div className="font-semibold">{item.name}</div>
                  <div className="text-gray-600">${item.price.toFixed(2)}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-4 mt-4">
            <input
              type="text"
              placeholder="Table No."
              value={tableNumber}
              onChange={(e) => setTableNumber(e.target.value)}
              className="border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Customer Name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="border p-2 rounded"
            />
            <input
              type="number"
              placeholder="No. of Guests"
              value={guestCount}
              onChange={(e) => setGuestCount(e.target.value)}
              className="border p-2 rounded"
            />
          </div>
        </div>

        {/* Right Column - Receipt */}
        <div className="w-1/3">
          <Card>
            <CardContent className="p-4 space-y-4">
              <h2 className="font-semibold">Receipt</h2>
              <div className="text-sm text-gray-700">
                <div><strong>Table:</strong> {tableNumber || '-'}</div>
                <div><strong>Customer:</strong> {customerName || '-'}</div>
                <div><strong>Guests:</strong> {guestCount || '-'}</div>
              </div>

              {orderItems.map(item => (
                <div key={item.id} className="flex justify-between items-center border-b pb-1">
                  <div>
                    <div className="font-medium">{item.name} x {item.qty}</div>
                    <div className="text-sm text-gray-500">${(item.price * item.qty).toFixed(2)}</div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => handleRemoveItem(item.id)}>
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                </div>
              ))}

              <div className="pt-2 border-t text-sm text-gray-700">
                <div>Subtotal: ${subtotal.toFixed(2)}</div>
                <div>Tax (10%): ${tax.toFixed(2)}</div>
                <div className="font-bold">Total: ${total.toFixed(2)}</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
