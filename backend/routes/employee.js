const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');
const User = require('../models/User');

// Get all employees
router.get('/', async(req, res) => {
    try {
        const employees = await Employee.find().populate('userId', 'username email role');
        res.json(employees);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get a specific employee
router.get('/:id', async(req, res) => {
    try {
        const employee = await Employee.findById(req.params.id).populate('userId', 'username email role');
        if (!employee) return res.status(404).json({ error: 'Employee not found' });
        res.json(employee);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create an employee
router.post('/', async(req, res) => {
    try {
        const { userId, position, employmentType, hireDate } = req.body;

        // Optional: Check if user exists
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ error: 'User not found' });

        const newEmployee = new Employee({ userId, position, employmentType, hireDate });
        await newEmployee.save();
        res.status(201).json(newEmployee);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Update an employee
router.put('/:id', async(req, res) => {
    try {
        const updated = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete an employee
router.delete('/:id', async(req, res) => {
    try {
        await Employee.findByIdAndDelete(req.params.id);
        res.json({ message: 'Employee deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;