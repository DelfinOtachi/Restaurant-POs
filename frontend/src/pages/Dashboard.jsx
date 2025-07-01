import React, { useState } from 'react';
import { format } from 'date-fns';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock } from 'lucide-react';

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

export default function Dashboard() {
  const [selectedCategory, setSelectedCategory] = useState('burgers');
  const [showReceipt, setShowReceipt] = useState(false);

  const handleAddOrder = () => {
    setShowReceipt(true);
  };

  const currentDate = format(new Date(), 'eeee, MMMM d yyyy');
  const currentTime = format(new Date(), 'p');

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
              <Card key={item.id} className="hover:shadow-md">
                <CardContent className="p-4 text-center">
                  <div className="text-4xl mb-2">{item.img}</div>
                  <div className="font-semibold">{item.name}</div>
                  <div className="text-gray-600">${item.price.toFixed(2)}</div>
                </CardContent>
              </Card>
            ))}
          </div>
          <Button className="mt-4 bg-green-600 hover:bg-green-700" onClick={handleAddOrder}>
            Add Order
          </Button>
        </div>

        {/* Right Column */}
        <div className="w-1/3">
          <Card>
            <CardContent className="p-4">
              <h2 className="font-semibold mb-2">
                {showReceipt ? 'Receipt' : 'Recent Orders'}
              </h2>
              <div className="text-gray-500 text-sm">
                {showReceipt ? 'Order #1025 - Total: $14.30' : 'No recent orders.'}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
