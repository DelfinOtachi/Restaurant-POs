import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '../components/ui/button';

const RecipeBuilder = () => {
  const { menuItemId } = useParams();
  const [stockItems, setStockItems] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  // Fetch all stock items (for ingredient selection)
  useEffect(() => {
  fetch('http://localhost:5000/api/stock-items')
    .then(res => res.json())
    .then(data => {
      console.log('💡 API response:', data);
setStockItems(data.items || []);
    })
    .catch(err => {
      console.error('❌ Failed to fetch stock items:', err);
    });
}, []);


  const addIngredient = () => {
    setIngredients([...ingredients, { stockItemId: '', quantity: 0, unit: '' }]);
  };

  const handleChange = (i, field, value) => {
    const updated = [...ingredients];
    updated[i][field] = value;
    setIngredients(updated);
  };

  const saveRecipe = async () => {
  const formattedIngredients = ingredients.map(({ stockItemId, quantity }) => ({
    ingredientId: stockItemId,
    quantity
  }));

  const res = await fetch(`http://localhost:5000/api/recipes/${menuItemId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ingredients: formattedIngredients })
  });

  if (res.ok) {
    alert('✅ Recipe saved');
  } else {
    alert('❌ Failed to save recipe');
  }
};

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-4">
      <h2 className="text-2xl font-bold">Recipe Builder</h2>

      {ingredients.map((ing, i) => (
        <div key={i} className="flex gap-2 items-center">
          <select
  value={ing.stockItemId}
  onChange={e => handleChange(i, 'stockItemId', e.target.value)}
  className="border px-2 py-1 rounded w-1/2"
>
  <option value="">Select Ingredient</option>
  {stockItems.map(item => (
    <option key={item._id} value={item._id}>
      {item.name})
    </option>
  ))}
</select>


          <input
            type="number"
            value={ing.quantity}
            onChange={e => handleChange(i, 'quantity', parseFloat(e.target.value))}
            className="border px-2 py-1 rounded w-24"
            placeholder="Qty"
          />

          <input
            type="text"
            value={ing.unit}
            onChange={e => handleChange(i, 'unit', e.target.value)}
            className="border px-2 py-1 rounded w-24"
            placeholder="Unit"
          />
        </div>
      ))}

      <div className="flex gap-2">
        <Button onClick={addIngredient}>➕ Add Ingredient</Button>
        <Button onClick={saveRecipe} className="bg-green-600 text-white">
          💾 Save Recipe
        </Button>
      </div>
    </div>
  );
};

export default RecipeBuilder;
