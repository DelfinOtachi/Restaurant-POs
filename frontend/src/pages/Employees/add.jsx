import React, { useState, useEffect } from 'react';

const AddEmployeeForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    userId: '',
    position: '',
    employmentType: 'full-time',
    hireDate: '',
    isActive: true,
  });

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Match schema enum values
  const positions = ['admin', 'cashier', 'chef', 'waiter', 'manager', 'other'];
  const employmentTypes = ['full-time', 'part-time', 'contract'];

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/users'); // Adjust as per your route
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error('Error fetching users:', err);
      }
    };
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('http://localhost:5000/api/employees', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to create employee');

      if (onSuccess) onSuccess(data);
      alert('Employee added!');
      setFormData({
        userId: '',
        position: '',
        employmentType: 'full-time',
        hireDate: '',
        isActive: true,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 500, margin: 'auto' }}>
      <h2>Add Employee</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div>
        <label>User</label>
        <select name="userId" value={formData.userId} onChange={handleChange} required>
          <option value="">Select User</option>
          {users.map((u) => (
            <option key={u._id} value={u._id}>
              {u.name || u.email}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Position</label>
        <select name="position" value={formData.position} onChange={handleChange} required>
          <option value="">Select Position</option>
          {positions.map((pos) => (
            <option key={pos} value={pos}>
              {pos.charAt(0).toUpperCase() + pos.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Employment Type</label>
        <select name="employmentType" value={formData.employmentType} onChange={handleChange} required>
          {employmentTypes.map((type) => (
            <option key={type} value={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Hire Date</label>
        <input
          type="date"
          name="hireDate"
          value={formData.hireDate}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            name="isActive"
            checked={formData.isActive}
            onChange={handleChange}
          />
          Active
        </label>
      </div>

      <button type="submit" disabled={loading}>
        {loading ? 'Saving...' : 'Add Employee'}
      </button>
    </form>
  );
};

export default AddEmployeeForm;
