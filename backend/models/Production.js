const mongoose = require('mongoose');

const productionSchema = new mongoose.Schema({
  menuItemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MenuItem',
    required: true,
  },
  quantityProduced: {
    type: Number,
    required: true,
  },
  producedAt: {
    type: Date,
    default: Date.now,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // or Employee
  },
});

module.exports = mongoose.model('Production', productionSchema);
