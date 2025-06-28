const Employee = require('../models/Employee');
const User = require('../models/User');

// Create new employee
exports.createEmployee = async(req, res) => {
    try {
        const { userId, position, employmentType, hireDate, isActive } = req.body;

        // Optional: check if user already assigned
        const exists = await Employee.findOne({ userId });
        if (exists) return res.status(400).json({ error: 'User is already assigned as an employee' });

        const employee = new Employee({ userId, position, employmentType, hireDate, isActive });
        await employee.save();
        res.status(201).json(employee);
    } catch (err) {
        res.status(500).json({ error: err.message || 'Failed to create employee' });
    }
};

// Get all employees (optional: populate user)
exports.getAllEmployees = async(req, res) => {
    try {
        const employees = await Employee.find().populate('userId', 'name email');
        res.json(employees);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch employees' });
    }
};

// Get one employee
exports.getEmployeeById = async(req, res) => {
    try {
        const employee = await Employee.findById(req.params.id).populate('userId', 'name email');
        if (!employee) return res.status(404).json({ error: 'Employee not found' });
        res.json(employee);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch employee' });
    }
};

// Update employee
exports.updateEmployee = async(req, res) => {
    try {
        const updates = req.body;
        const employee = await Employee.findByIdAndUpdate(req.params.id, updates, { new: true });
        if (!employee) return res.status(404).json({ error: 'Employee not found' });
        res.json(employee);
    } catch (err) {
        res.status(500).json({ error: 'Failed to update employee' });
    }
};

// Delete employee
exports.deleteEmployee = async(req, res) => {
    try {
        const deleted = await Employee.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ error: 'Employee not found' });
        res.json({ message: 'Employee deleted', deleted });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete employee' });
    }
};