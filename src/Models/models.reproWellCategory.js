const mongoose = require('mongoose');

const reproWellCategorySchema = new mongoose.Schema({
    autoId: {
        type: Number,
        unique: true,
        required: true,
    },
    categoryName: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    isActive: {
        type: Boolean,
    }
}, { timestamps: true });

module.exports = mongoose.model('reprowellcategories', reproWellCategorySchema);