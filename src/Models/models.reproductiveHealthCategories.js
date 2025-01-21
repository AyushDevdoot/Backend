const mongoose = require('mongoose');

const reproductiveHealthCategoriesSchema = new mongoose.Schema({
    categoryName: {
        type: String,
        maxLength: 100,
        required: true
    },
    description: {
        type: String,
        required: true
    }
}, { timestamps: true });

const ReproductiveHealthCategoriesModel = mongoose.model('reproductivehealthcategories', reproductiveHealthCategoriesSchema);

module.exports = ReproductiveHealthCategoriesModel;