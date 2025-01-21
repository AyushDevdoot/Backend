const mongoose = require('mongoose');

const reproductiveHealthServicesSchema = new mongoose.Schema({
    serviceName: {
        type: String,
        maxLength: 100,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    categoryId: {
        type: String,
        ref: "reproductivehealthcategories",
        required: true
    }
}, { timestamps: true });

const ReproductiveHealthServicesModel = mongoose.model('reproductivehealthservices', reproductiveHealthServicesSchema);

module.exports = ReproductiveHealthServicesModel;