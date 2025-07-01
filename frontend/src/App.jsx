import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/user/Dashboard';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import Navbar from './components/Navbar';
import AdminDashboard from './pages/admin/adminDashboard'; //
import AddCategoryForm from './pages/Categories/add.jsx';
import AddMenuItemForm from "./pages/MenuItems/add.jsx";
import AddMenuForm from './pages/Menu/add.jsx';
import AddTableForm from './pages/Tables/add.jsx';
import AddOrderForm from './pages/orders/add.jsx';
import AddSalesForm from './pages/Sales/add.jsx';
import AddUserForm from './pages/Users/add.jsx';
import StockForm from './pages/Stock/add.jsx';
import AddEmployeeForm from './pages/Employees/add.jsx';
import PaymentPage from './pages/PaymentPage';
import RecipeBuilder from './pages/RecipeBuilder';
import ProductionLogger from './pages/ProductionLogger';
import StockPage from './pages/StockPage';
import RecipePage from './pages/RecipePage';
import ProductionPage from './pages/ProductionPage';


export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className={darkMode ? 'dark' : ''}>
      <Router>
        <Navbar />
        <div className="p-6 min-h-screen bg-gray-100 dark:bg-gray-900">
          <Routes> 
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/add-category" element={<AddCategoryForm />} />
            <Route path="/add-menu" element={<AddMenuForm />} />
            <Route path="/add-menu-item" element={<AddMenuItemForm />} />
            <Route path="/add-menu" element={<AddMenuForm />} />
            <Route path="/add-table" element={<AddTableForm />} />
            <Route path="/add-user" element={<AddUserForm />} />
            <Route path="/add-order" element={<AddOrderForm />} />
            <Route path="/add-stock" element={<StockForm />} />
             <Route path="/add-employee" element={<AddEmployeeForm />} />
            <Route path="/adminDashboard" element={<AdminDashboard darkMode={darkMode} setDarkMode={setDarkMode} />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/stock-page" element={<StockPage />} /> //RecipePage
            <Route path="/payment/:orderId" element={<PaymentPage />} />
                <Route path="/recipes/:menuItemId" element={<RecipeBuilder />} />
            <Route path="/recipe/new" element={<RecipePage />} />

        <Route path="/production" element={<ProductionPage />} />


            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}
