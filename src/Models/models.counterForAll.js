// here we can define schema for counter , and can then use for creating a auto increament area
const mongoose = require('mongoose');

const counterSchema = new mongoose.Schema({
    counter_for: {
        type: String,
        require: true,
    },
    counter_value: {
        type: Number,
        default: 0,
        require: true
    },
});

const Counter = mongoose.model('Counter', counterSchema);

module.exports = Counter;
