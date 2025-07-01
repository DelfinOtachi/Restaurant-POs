// components/RecipeForm.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RecipeForm = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [stockItems, setStockItems] = useState([]);
  const [selectedMenuItem, setSelectedMenuItem] = useState('');
  const [ingredients, setIngredients] = useState([{ stockItemId: '', quantity: 0 }]);
  const [instructions, setInstructions] = useState('');

  useEffect(() => {
    // Fetch available menu items and stock items
    const fetchData = async () => {
      try {
        const [menuRes, stockRes] = await Promise.all([
          axios.get('http://localhost:5000/api/menu-items'),
          axios.get('http://localhost:5000/api/stocks'),
        ]);
        setMenuItems(menuRes.data);
        setStockItems(stockRes.data);
      } catch (err) {
        console.error('Failed to fetch menu or stock items', err);
      }
    };
    fetchData();
  }, []);

  const handleIngredientChange = (index, field, value) => {
    const newIngredients = [...ingredients];
newIngredients[index][field] = field === 'quantity' ? parseFloat(value) || 0 : value;
    setIngredients(newIngredients);
  };

  const addIngredient = () => {
    setIngredients([...ingredients, { stockItemId: '', quantity: 0 }]);
  };

  const removeIngredient = (index) => {
    const newIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(newIngredients);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:5000/api/recipes/${selectedMenuItem}`, {
        menuItemId: selectedMenuItem,
        ingredients,
        instructions,
      });
      alert('✅ Recipe saved!');
      setSelectedMenuItem('');
      setIngredients([{ stockItemId: '', quantity: 0 }]);
      setInstructions('');
    } catch (err) {
      console.error(err);
      alert('❌ Failed to save recipe');
    }
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-md max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Create Recipe</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Menu Item</label>
          <select
            value={selectedMenuItem}
            onChange={(e) => setSelectedMenuItem(e.target.value)}
            className="w-full border p-2"
            required
          >
            <option value="">Select...</option>
            {menuItems.map((item) => (
              <option key={item._id} value={item._id}>{item.name}</option>
            ))}
          </select>
        </div>

        <h4 className="font-semibold mb-2">Ingredients</h4>
        {ingredients.map((ingredient, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <select
              value={ingredient.stockItemId}
              onChange={(e) => handleIngredientChange(index, 'stockItemId', e.target.value)}
              className="flex-1 border p-2"
              required
            >
              <option value="">Select ingredient...</option>
              {stockItems.map((item) => (
                <option key={item._id} value={item._id}>{item.name}</option>
              ))}
            </select>
            <input
              type="number"
              placeholder="Quantity"
              value={ingredient.quantity}
              onChange={(e) => handleIngredientChange(index, 'quantity', e.target.value)}
              className="w-24 border p-2"
              step="0.01"
              min="0"
              required
            />
            {ingredients.length > 1 && (
              <button type="button" onClick={() => removeIngredient(index)} className="text-red-500">✕</button>
            )}
          </div>
        ))}
        <button type="button" onClick={addIngredient} className="mb-3 text-blue-600">
          ➕ Add Ingredient
        </button>

        <div className="mb-3">
          <label>Instructions (optional)</label>
          <textarea
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            className="w-full border p-2"
            rows="3"
          />
        </div>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Save Recipe
        </button>
      </form>
    </div>
  );
};

export default RecipeForm;
