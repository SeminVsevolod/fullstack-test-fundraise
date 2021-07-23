const mongoose = require('mongoose');

// Схема пожертвования
const donationSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: [true, 'Amount required'],
    },
    currency: {
        type: String,
        required: [true, 'Currency required'],
    },
});

// Модель пожертвования на основе схемы
const Donation = mongoose.model('Donation', donationSchema, 'donations');

module.exports = Donation;