const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//rate here will always be in usd
const exchangeRate = new mongoose.Schema({
    currency: {
        type: String,
        default: 'USD',
    },
    rate: {
        type: Number,
    },
}, { timestamps: true });


exchangeRate.index({currency: 1});
const ExchangeRate = mongoose.model('exchangeRate', exchangeRate);
module.exports = ExchangeRate;
