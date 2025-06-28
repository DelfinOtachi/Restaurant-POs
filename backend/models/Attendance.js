const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    date: Date,
    signIn: Date,
    signOut: Date
});
module.exports = mongoose.model('Attendance', attendancet67Schema);