const mongoose = require('mongoose');

const reproWellExpertSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    categoryName: {
        type: String,
        required: true,
    },
    specialization: {
        type: String,
        required: true,
    },
    experience: {
        type: String,
        required: true,
    },
    hospital: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
    },
    services: {
        type: String,
        required: true,
    },
}, {timestamps: true})

module.exports = mongoose.model('reprowellexperts', reproWellExpertSchema);