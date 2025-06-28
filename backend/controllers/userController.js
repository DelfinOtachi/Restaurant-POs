const User = require('../models/User');

// Create a new user
exports.createUser = async(req, res) => {
    try {
        const {
            name,
            username,
            idNumber,
            phone,
            email,
            password,
            authRole = 'user',
            isEmployee = false,
            jobRole = null,
            employmentType = null,
            hireDate = null,
        } = req.body;

        const newUser = new User({
            name,
            username,
            idNumber,
            phone,
            email,
            password, // You should hash this in production
            authRole,
            isEmployee,
            jobRole: isEmployee ? jobRole : null,
            employmentType: isEmployee ? employmentType : null,
            hireDate: isEmployee ? hireDate || new Date() : null,
        });

        await newUser.save();
        res.status(201).json(newUser);

    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get all users
exports.getUsers = async(req, res) => {
    try {
        const users = await User.find().sort({ createdAt: -1 });
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get single user
exports.getUserById = async(req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update user
exports.updateUser = async(req, res) => {
    try {
        const updateData = {...req.body };

        if (!updateData.isEmployee) {
            updateData.jobRole = null;
            updateData.employmentType = null;
            updateData.hireDate = null;
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            updateData, { new: true, runValidators: true }
        );

        if (!updatedUser) return res.status(404).json({ error: 'User not found' });

        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete user
exports.deleteUser = async(req, res) => {
    try {
        const deleted = await User.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ error: 'User not found' });
        res.json({ message: 'User deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};