const mongoose = require('mongoose');

const healthGoalsSchema = new mongoose.Schema({
    goalName: {
        type: String,
        required: true
    },
}, { timestamps: true });

const HealthGoalsModel = mongoose.model('healthgoals', healthGoalsSchema);

module.exports = HealthGoalsModel;