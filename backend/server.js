const express = require('express');

const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => console.log('✅ MongoDB Connected'))
    .catch(err => console.error('❌ MongoDB connection error:', err));

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));


// ROUTES
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/menu-items', require('./routes/menuItemRoutes'));
//app.use('/api/stock-items', require('./routes/stockItemRoutes'));
app.use('/api/suppliers', require('./routes/supplierRoutes'));
app.use('/api/purchases', require('./routes/purchaseRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/tables', require('./routes/tableRoutes'));
app.use('/api/categories', require('./routes/categoryRoute'));
app.use('/api/audit-logs', require('./routes/auditLogRoutes'));
app.use('/api/menus', require('./routes/menuRoutes'));
app.use('/api/sales', require('./routes/sales'));
app.use('/api/employees', require('./routes/employee'));
app.use('/api/ingredients', require('./routes/ingredientRoutes'));
app.use('/api/production', require('./routes/production'));
app.use('/api/recipes', require('./routes/recipeRoutes')); // ✅ Make sure this exists
app.use('/api/fixed-assets', require('./routes/fixedAssetsRoutes'));
app.use('/api/finance', require('./routes/financeRoutes'));
app.use('/api/maintenance', require('./routes/maintenanceRoutes'));
app.use('/api/stocks', require('./routes/stockRoutes')); // ✅ This line is now active

// SERVER START
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));