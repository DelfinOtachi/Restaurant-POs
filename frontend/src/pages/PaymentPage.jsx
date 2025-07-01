import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';

const PaymentPage = () => {
  const navigate = useNavigate();
  const [orderItems, setOrderItems] = useState([]);
  const [amountPaid, setAmountPaid] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('Cash');

  useEffect(() => {
    const storedItems = localStorage.getItem("orderItems");
    if (storedItems) {
      setOrderItems(JSON.parse(storedItems));
    }
  }, []);

  const getSubtotal = () =>
    orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const total = Math.max(getSubtotal() - discount, 0);
  const change = Math.max(amountPaid - total, 0);

  const handleConfirmPayment = async () => {
    const orderId = localStorage.getItem("orderId");

    if (!orderId) {
      alert("⚠️ Missing order ID. Cannot process payment.");
      return;
    }

    if (amountPaid < total) {
      alert("❌ Amount paid is less than total. Please enter the correct amount.");
      return;
    }

    const payload = {
      orderId,
      amountPaid,
      discount,
      totalAmountBeforeDiscount: getSubtotal(),
      paymentMethod,
      cashierName: "Hannah"
    };

    try {
      const res = await fetch('http://localhost:5000/api/sales', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Unknown server error");
      }

      localStorage.removeItem("orderItems");
      localStorage.removeItem("orderId");

      alert("✅ Payment confirmed and recorded.");
      navigate('/');
    } catch (err) {
      console.error("❌ Payment submission failed:", err.message);
      alert(`❌ Payment failed: ${err.message}`);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">💳 Payment</h1>

      <div className="border p-4 rounded-lg shadow-sm space-y-4 bg-white">
        <h2 className="font-semibold text-lg">🧾 Order Summary</h2>

        {orderItems.length === 0 ? (
          <p className="text-gray-500">No items found in order.</p>
        ) : (
          <>
            {orderItems.map(item => (
              <div key={item._id} className="flex justify-between text-sm text-gray-700">
                <span>{item.name} × {item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}

            <div className="border-t pt-2 font-medium flex justify-between">
              <span>Subtotal:</span>
              <span>${getSubtotal().toFixed(2)}</span>
            </div>

            <div className="flex justify-between items-center">
              <label className="text-sm">Discount:</label>
              <input
                type="number"
                className="border rounded px-2 py-1 w-24 text-right"
                value={discount}
                min="0"
                onChange={e => setDiscount(Math.max(0, parseFloat(e.target.value) || 0))}
              />
            </div>

            <div className="font-bold flex justify-between">
              <span>Total to Pay:</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <div className="flex justify-between items-center">
              <label className="text-sm">Amount Paid:</label>
              <input
                type="number"
                className="border rounded px-2 py-1 w-24 text-right"
                value={amountPaid}
                min="0"
                onChange={e => setAmountPaid(Math.max(0, parseFloat(e.target.value) || 0))}
              />
            </div>

            <div className="flex justify-between items-center">
              <label className="text-sm">Payment Method:</label>
              <select
                className="border rounded px-2 py-1 w-32"
                value={paymentMethod}
                onChange={e => setPaymentMethod(e.target.value)}
              >
                <option value="Cash">Cash</option>
                <option value="Card">Card</option>
                <option value="Mpesa">Mpesa</option>
              </select>
            </div>

            <div className="font-semibold flex justify-between">
              <span>Change to Give:</span>
              <span className={change < 0 ? 'text-red-500' : ''}>${change.toFixed(2)}</span>
            </div>
          </>
        )}
      </div>

      <div className="space-y-2">
        <Button
          className="w-full bg-green-600 text-white"
          onClick={handleConfirmPayment}
          disabled={orderItems.length === 0}
        >
          ✅ Confirm Payment
        </Button>

        <Button variant="outline" className="w-full" onClick={() => navigate(-1)}>
          ↩️ Back
        </Button>
      </div>
    </div>
  );
};

export default PaymentPage;
