const mongoose = require('mongoose');

const reproWellExpertSchema = new mongoose.Schema({
    expertName: {
        type: String,
        required: true,
    },
    categoryName: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('reprowellexperts', reproWellExpertSchema);