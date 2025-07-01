import React, { useState } from "react";

const AddUserForm = () => {
  const defaultForm = {
    name: "",
    username: "",
    idNumber: "",
    phone: "",
    email: "",
    password: "",
    authRole: "user",
    isEmployee: false,
    jobRole: "",
    employmentType: "",
    hireDate: ""
  };

  const [form, setForm] = useState(defaultForm);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const data = await res.json();
      console.log("Server response:", data);

      if (res.ok) {
        alert("User added!");
        setForm(defaultForm);
      } else {
        alert("Error: " + data.error);
      }
    } catch (err) {
      alert("Network error");
      console.error(err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-white rounded shadow w-96 space-y-3"
    >
      <h2 className="text-xl font-semibold">Add User</h2>

      <input
        placeholder="Name"
        value={form.name}
        name="name"
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />
      <input
        placeholder="Username"
        value={form.username}
        name="username"
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />
      <input
        placeholder="Phone"
        value={form.phone}
        name="phone"
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={form.email}
        name="email"
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />
      <input
        type="password"
        placeholder="Password"
        value={form.password}
        name="password"
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />

      <div className="space-y-1">
        <label className="block text-sm">Authorization Role</label>
        <select
          name="authRole"
          value={form.authRole}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
          <option value="superadmin">Superadmin</option>
        </select>
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          name="isEmployee"
          checked={form.isEmployee}
          onChange={handleChange}
        />
        <label>Is Employee?</label>
      </div>

      {form.isEmployee && (
        <>
          <input
            placeholder="ID Number"
            value={form.idNumber}
            name="idNumber"
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          <div>
            <label className="block text-sm">Job Role</label>
            <select
              name="jobRole"
              value={form.jobRole}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            >
              <option value="">Select Role</option>
              <option value="cashier">Cashier</option>
              <option value="chef">Chef</option>
              <option value="waiter">Waiter</option>
              <option value="manager">Manager</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm">Employment Type</label>
            <select
              name="employmentType"
              value={form.employmentType}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            >
              <option value="">Select Type</option>
              <option value="full-time">Full-time</option>
              <option value="part-time">Part-time</option>
              <option value="contract">Contract</option>
            </select>
          </div>

          <div>
            <label className="block text-sm">Hire Date</label>
            <input
              type="date"
              name="hireDate"
              value={form.hireDate}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>
        </>
      )}

      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
      >
        Add User
      </button>
    </form>
  );
};

export default AddUserForm;
