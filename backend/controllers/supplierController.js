const Supplier = require('../models/Supplier');

// Get all suppliers
exports.getAllSuppliers = async(req, res) => {
    try {
        const suppliers = await Supplier.find();
        res.json(suppliers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get one supplier
exports.getSupplierById = async(req, res) => {
    try {
        const supplier = await Supplier.findById(req.params.id);
        if (!supplier) return res.status(404).json({ message: 'Not found' });
        res.json(supplier);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Add new supplier
exports.createSupplier = async(req, res) => {
    try {
        const supplier = new Supplier(req.body);
        await supplier.save();
        res.status(201).json(supplier);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Update supplier
exports.updateSupplier = async(req, res) => {
    try {
        const updated = await Supplier.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated) return res.status(404).json({ message: 'Not found' });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete supplier
exports.deleteSupplier = async(req, res) => {
    try {
        const deleted = await Supplier.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: 'Not found' });
        res.json({ message: 'Deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};