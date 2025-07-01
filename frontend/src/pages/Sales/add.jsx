import React, { useEffect, useState } from "react";

const AddSalesForm = () => {
  const [orders, setOrders] = useState([]);
  const [form, setForm] = useState({
    orderId: "",
    amountPaid: "",
    discount: 0,
    totalAmountBeforeDiscount: "",
    paymentMethod: "Cash",
    cashierName: ""
  });

  useEffect(() => {
    // Load pending orders
    fetch("http://localhost:5000/api/orders?status=Pending")
      .then(res => res.json())
      .then(data => setOrders(data))
      .catch(console.error);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:5000/api/sales", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    })
      .then(res => res.json())
      .then(data => {
        alert("Sale recorded!");
        setForm({
          orderId: "",
          amountPaid: "",
          discount: 0,
          totalAmountBeforeDiscount: "",
          paymentMethod: "Cash",
          cashierName: ""
        });
      })
      .catch(console.error);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold mb-4">Add Sale</h2>

      <select
        value={form.orderId}
        onChange={(e) => setForm({ ...form, orderId: e.target.value })}
        required
      >
        <option value="">Select Order</option>
        {orders.map(order => (
          <option key={order._id} value={order._id}>
            Order #{order._id.slice(-5)}
          </option>
        ))}
      </select>

      <input
        type="number"
        placeholder="Total Before Discount"
        value={form.totalAmountBeforeDiscount}
        onChange={(e) =>
          setForm({ ...form, totalAmountBeforeDiscount: Number(e.target.value) })
        }
        required
      />

      <input
        type="number"
        placeholder="Discount"
        value={form.discount}
        onChange={(e) =>
          setForm({ ...form, discount: Number(e.target.value) })
        }
      />

      <input
        type="number"
        placeholder="Amount Paid"
        value={form.amountPaid}
        onChange={(e) =>
          setForm({ ...form, amountPaid: Number(e.target.value) })
        }
        required
      />

      <select
        value={form.paymentMethod}
        onChange={(e) =>
          setForm({ ...form, paymentMethod: e.target.value })
        }
      >
        {['Cash', 'Card', 'Mobile Money', 'Bank Transfer', 'Other'].map(method => (
          <option key={method} value={method}>{method}</option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Cashier Name"
        value={form.cashierName}
        onChange={(e) =>
          setForm({ ...form, cashierName: e.target.value })
        }
      />

      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded mt-3">
        Submit Sale
      </button>
    </form>
  );
};

export default AddSalesForm;
