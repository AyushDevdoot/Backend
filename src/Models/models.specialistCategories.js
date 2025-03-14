const mongoose = require('mongoose');

const specialistCategoriesSchema = new mongoose.Schema({
    autoId: {
        type: Number,
        unique: true,
        required: true,
    },
    categoryName: {
        type: String,
        maxLength: 100,
        required: true
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true
    },
}, { timestamps: true });

const SpecialistCategoriesModel = mongoose.model('specialistcategories', specialistCategoriesSchema);

module.exports = SpecialistCategoriesModel;
