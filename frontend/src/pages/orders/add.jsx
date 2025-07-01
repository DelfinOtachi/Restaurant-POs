import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { Clock, Trash2 } from 'lucide-react';
import { Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from "file-saver";
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';

const HOTEL_NAME = "Mwalimu Hurricane Hotel";
const SERVER_NAME = "Hannah";

export default function Dashboard() {
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [orderItems, setOrderItems] = useState([]);
  const [mode, setMode] = useState("order");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const receiptRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, menuRes] = await Promise.all([
          fetch('http://localhost:5000/api/categories'),
          fetch('http://localhost:5000/api/menu-items')
        ]);

        if (!catRes.ok || !menuRes.ok) throw new Error("Failed to load data");

        const categories = await catRes.json();
        const menuItems = await menuRes.json();

        setCategories(categories);
        setMenuItems(menuItems);
        if (categories.length > 0) setSelectedCategory(categories[0]._id);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleItemClick = (item) => {
    const existing = orderItems.find(i => i._id === item._id);
    if (existing) {
      setOrderItems(prev =>
        prev.map(i =>
          i._id === item._id ? { ...i, quantity: i.quantity + 1 } : i
        )
      );
    } else {
      setOrderItems(prev => [...prev, { ...item, quantity: 1 }]);
    }
  };

  const handleQuantityChange = (itemId, delta) => {
    setOrderItems(prev =>
      prev.map(i =>
        i._id === itemId ? { ...i, quantity: Math.max(1, i.quantity + delta) } : i
      )
    );
  };

  const handleRemoveItem = (itemId) => {
    setOrderItems(prev => prev.filter(i => i._id !== itemId));
  };

  const handleSubmitOrder = async () => {
    if (orderItems.length === 0) {
      alert("Add items to the order before submitting.");
      return;
    }

    const orderPayload = {
      items: orderItems.map(item => ({
        menuItemId: item._id,
        quantity: item.quantity,
        price: item.price
      })),
      status: 'Pending',
      waitressName: SERVER_NAME
    };

    try {
      const res = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload)
      });

      const data = await res.json();

      if (!res.ok || !data._id) {
        throw new Error(data.message || "Order creation failed");
      }

      localStorage.setItem("orderItems", JSON.stringify(orderItems));
      localStorage.setItem("orderId", data._id);

      // ✅ Redirect to payment page
      navigate(`/payment/${data._id}`);
    } catch (err) {
      console.error("❌ Order submission failed:", err.message);
      alert("Order submission failed. Please try again.");
    }
  };

  const getItemsForCategory = useCallback((catId) => {
    return menuItems.filter(item => item.categoryId === catId);
  }, [menuItems]);

  const getTotal = useCallback(() => {
    return orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
  }, [orderItems]);

  const downloadReceiptDocx = () => {
    const doc = new Document({
      sections: [
        {
          children: [
            new Paragraph({
              children: [new TextRun({ text: HOTEL_NAME, bold: true, size: 28 })],
              alignment: "center"
            }),
            new Paragraph(""),
            new Paragraph(`Date: ${new Date().toLocaleString()}`),
            new Paragraph(""),
            new Paragraph("Order Summary:"),
            ...orderItems.map(item =>
              new Paragraph(`${item.name} - Qty: ${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`)
            ),
            new Paragraph(""),
            new Paragraph({
              children: [new TextRun({ text: `Total: $${getTotal()}`, bold: true })],
            }),
            new Paragraph(""),
            new Paragraph(`You were served by: ${SERVER_NAME}`),
            new Paragraph(`Thank you for choosing ${HOTEL_NAME}.`),
          ],
        },
      ],
    });

    Packer.toBlob(doc).then(blob => {
      saveAs(blob, `receipt_${Date.now()}.docx`);
    });
  };

  const handleBackToOrder = () => {
    setMode("order");
    setOrderItems([]);
    localStorage.removeItem("orderItems");
    localStorage.removeItem("orderId");
  };

  const currentDate = format(new Date(), 'eeee, MMMM d yyyy');
  const currentTime = format(new Date(), 'p');

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">Error: {error}</div>;

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-start print:hidden">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Good morning, {SERVER_NAME}</h1>
          <p className="text-gray-500">Give your best service to our customers</p>
        </div>
        <div className="text-right text-gray-600">
          <div>{currentDate}</div>
          <div className="flex items-center gap-1 justify-end text-sm">
            <Clock className="w-4 h-4" /> {currentTime}
          </div>
        </div>
      </div>

      <div className="flex gap-6">
        <div className="w-2/3 space-y-4 print:hidden">
          <div className="flex gap-2 flex-wrap">
            {categories.map(cat => (
              <Button
                key={cat._id}
                onClick={() => setSelectedCategory(cat._id)}
                variant={selectedCategory === cat._id ? "default" : "secondary"}
              >
                {cat.icon || '📦'} {cat.name}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-4">
            {getItemsForCategory(selectedCategory).map(item => (
              <Card
                key={item._id}
                className="hover:shadow-md cursor-pointer"
                onClick={() => handleItemClick(item)}
              >
                <CardContent className="p-4 text-center">
                  <div className="text-4xl mb-2">{item.icon || '🍽️'}</div>
                  <div className="font-semibold">{item.name}</div>
                  <div className="text-gray-600">${item.price.toFixed(2)}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {mode === "order" && orderItems.length > 0 && (
            <div className="mt-6 space-y-2">
              {orderItems.map((item) => (
                <div key={item._id} className="flex justify-between items-center text-sm border-b py-1">
                  <span>{item.name}</span>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" onClick={() => handleQuantityChange(item._id, -1)}>-</Button>
                    <span>{item.quantity}</span>
                    <Button variant="ghost" size="sm" onClick={() => handleQuantityChange(item._id, +1)}>+</Button>
                    <Button variant="destructive" size="icon" onClick={() => handleRemoveItem(item._id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="w-1/3">
          <Card>
            <CardContent className="p-4 space-y-4" ref={receiptRef}>
              <div className="text-center font-bold text-lg">{HOTEL_NAME}</div>
              <div className="text-sm text-center text-gray-500 mb-2">{new Date().toLocaleString()}</div>

              <h2 className="font-semibold text-base mb-2">{mode === "order" ? "Current Order" : "Customer Receipt"}</h2>

              {orderItems.length === 0 ? (
                <div className="text-gray-500 text-sm">No items added yet.</div>
              ) : (
                <div className="space-y-3">
                  {orderItems.map((item) => (
                    <div key={item._id} className="flex justify-between text-sm">
                      <div className="font-medium">{item.name}</div>
                      <div className="text-right">
                        <div>{item.quantity} × ${item.price.toFixed(2)}</div>
                        <div className="text-gray-500 text-xs">${(item.quantity * item.price).toFixed(2)}</div>
                      </div>
                    </div>
                  ))}

                  <div className="border-t pt-2 text-right font-semibold">
                    Total: ${getTotal()}
                  </div>

                  {mode === "receipt" && (
                    <>
                      {localStorage.getItem("orderId") && (
                        <div className="text-sm text-gray-500 text-center">
                          Order ID: {localStorage.getItem("orderId")}
                        </div>
                      )}
                      <div className="text-sm text-gray-600 mt-4 text-center">
                        You were served by: {SERVER_NAME}
                      </div>
                    </>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {orderItems.length > 0 && (
            <div className="mt-4 space-y-2 print:hidden">
              {mode === "receipt" ? (
                <Button onClick={handleBackToOrder} className="w-full bg-blue-600 text-white">↩️ New Order</Button>
              ) : (
                <>
                  <Button onClick={() => window.print()} variant="outline" className="w-full">🖨️ Issue Bill</Button>
                  <Button onClick={handleSubmitOrder} className="w-full bg-green-600 text-white">💰 Close Sale</Button>
                  <Button onClick={downloadReceiptDocx} variant="secondary" className="w-full">📄 Save Receipt (.DOCX)</Button>
                  <Button onClick={() => setOrderItems([])} variant="outline" className="w-full">❌ Clear Order</Button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
