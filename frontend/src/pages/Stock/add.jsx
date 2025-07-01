import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddStock = () => {
  const [categories, setCategories] = useState([]);
  const [menus, setMenus] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const existingItem = location.state?.item;

  const [formData, setFormData] = useState({
    name: existingItem?.name || '',
    unit: existingItem?.unit || '',
    type: existingItem?.type || '',
    menuItemId: existingItem?.menuItemId || '',
    categoryId: existingItem?.categoryId || '',
    menuId: existingItem?.menuId || '',
    quantity: existingItem?.quantity || 0,
    reorderLevel: existingItem?.reorderLevel || 0,
    lowStockAlert: existingItem?.lowStockAlert || false,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesRes, menusRes, menuItemsRes] = await Promise.all([
          axios.get('http://localhost:5000/api/categories'),
          axios.get('http://localhost:5000/api/menus'),
          axios.get('http://localhost:5000/api/menu-items')
        ]);
        setCategories(categoriesRes.data);
        setMenus(menusRes.data);
        setMenuItems(menuItemsRes.data);
      } catch (error) {
        console.error('Failed to fetch data:', error);
        toast.error('Failed to load data.');
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === 'menuItemId') {
      const selectedItem = menuItems.find(item => item._id === value);
      setFormData(prev => ({
        ...prev,
        menuItemId: value,
        categoryId: selectedItem?.categoryId || '',
        menuId: selectedItem?.menuId || '',
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (existingItem) {
        await axios.put(`http://localhost:5000/api/stock/${existingItem._id}`, formData);
        toast.success('Stock item updated successfully!');
      } else {
        await axios.post('http://localhost:5000/api/stock', formData);
        toast.success('Stock item added successfully!');
      }
      navigate('/stock');
    } catch (error) {
      console.error('Failed to submit:', error);
      toast.error('Failed to save stock item.');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">{existingItem ? 'Edit' : 'Add'} Stock Item</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="block">Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} className="border p-2 w-full" />
        </div>

        <div>
          <label className="block">Unit</label>
          <input type="text" name="unit" value={formData.unit} onChange={handleChange} className="border p-2 w-full" />
        </div>

        <div>
          <label className="block">Type</label>
          <select name="type" value={formData.type} onChange={handleChange} className="border p-2 w-full">
            <option value="">Select Type</option>
            <option value="Raw Material">Raw Material</option>
            <option value="Final Product">Final Product</option>
          </select>
        </div>

        {formData.type === 'Final Product' && (
          <div>
            <label className="block">Menu Item</label>
            <select name="menuItemId" value={formData.menuItemId} onChange={handleChange} className="border p-2 w-full">
              <option value="">Select Menu Item</option>
              {menuItems.map(item => (
                <option key={item._id} value={item._id}>{item.name}</option>
              ))}
            </select>
          </div>
        )}

        <div>
          <label className="block">Category</label>
          <select name="categoryId" value={formData.categoryId} disabled className="border p-2 w-full">
            <option value="">Select Category</option>
            {categories.map(cat => (
              <option key={cat._id} value={cat._id}>{cat.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block">Menu</label>
          <select name="menuId" value={formData.menuId} disabled className="border p-2 w-full">
            <option value="">Select Menu</option>
            {menus.map(menu => (
              <option key={menu._id} value={menu._id}>{menu.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block">Quantity</label>
          <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} className="border p-2 w-full" />
        </div>

        <div>
          <label className="block">Reorder Level</label>
          <input type="number" name="reorderLevel" value={formData.reorderLevel} onChange={handleChange} className="border p-2 w-full" />
        </div>

        <div className="flex items-center">
          <input type="checkbox" name="lowStockAlert" checked={formData.lowStockAlert} onChange={handleChange} className="mr-2" />
          <label>Low Stock Alert</label>
        </div>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          {existingItem ? 'Update' : 'Add'} Stock
        </button>
      </form>
    </div>
  );
};

export default AddStock;
