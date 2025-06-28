// server.js (Mongoose + Express Setup)
const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const router = express.Router();


app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3000', // Allow your React frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));
const orderRoutes = require('./routes/orderRoutes');
const employeeRoutes = require('./routes/employee'); //
const ingredientsRoutes = require('./routes/ingredientRoutes');



// Connect MongoDB
mongoose.connect('mongodb://localhost:27017/mwalimu').then(() => console.log('MongoDB connected')).catch(console.error);

// Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/menu-items', require('./routes/menuItemRoutes'));
app.use('/api/stock-items', require('./routes/stockItemRoutes'));
app.use('/api/suppliers', require('./routes/supplierRoutes'));
app.use('/api/purchases', require('./routes/purchaseRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/tables', require('./routes/tableRoutes'));
app.use('/api/categories', require('./routes/categoryRoute'));
app.use('/api/audit-logs', require('./routes/auditLogRoutes'));
app.use('/api/menus', require('./routes/menuRoutes'));
app.use('/api/sales', require('./routes/sales'));
app.use('/api/employees', employeeRoutes);
//CRUD
app.use('/api/stock-items', require('./routes/stockItemRoutes')); //
app.use('/api/ingredients', ingredientsRoutes);


// Extra: Stock Alerts & Reports
//router.get('/alerts/low-stock', controller.getLowStockItems); // Items below alert level
//router.get('/alerts / expiring - soon ', controller.getExpiringItems); // Items expiring in 7 days

app.use('/api/fixed-assets', require('./routes/fixedAssetsRoutes'));
app.use('/api/finance', require('./routes/financeRoutes'));
app.use('/api/maintenance', require('./routes/maintenanceRoutes'));



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));