const mongoose = require('mongoose');

const packageTestSchema = new mongoose.Schema({
    packageId: {
        type: String,
        ref: "healthcheckuppackage",
        required: true
    },
    testId: {
        type: String,
        ref: "healthcheckuptest",
        required: true
    },
}, { timestamps: true });

const PackageTestModel = mongoose.model('packagetest', packageTestSchema);

module.exports = PackageTestModel;