const mongoose = require('mongoose');

const programModulesSchema = new mongoose.Schema({
    moduleName: {
        type: String,
        required: true
    },
    moduleDescription: {
        type: String,
        required: true
    },
    moduleDuration: {
        type: String,
        required: true
    },
    moduleLevel: {
        type: Number,
        required: true
    },
}, { timestamps: true });

const ProgramModulesModel = mongoose.model('programmodule', programModulesSchema);

module.exports = ProgramModulesModel;