const mongoose = require('mongoose');

const specialistCategoriesSchema = new mongoose.Schema({
    categoryName: {
        type: String,
        maxLength: 100,
        required: true
    },
}, { timestamps: true });

const SpecialistCategoriesModel = mongoose.model('specialistcategories', specialistCategoriesSchema);

module.exports = SpecialistCategoriesModel;