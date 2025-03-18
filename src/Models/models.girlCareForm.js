const mongoose = require('mongoose');

const girlCareFormSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    match: [/.+\@.+\..+/, 'Please fill a valid email address'],
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true,
    min: 1,
    max: 120
  },
  programModule: {
    type: String,
    required: true,
    enum: ["Self Defence", "Hygiene Education", "Access to Sanitary Productions", "Health and Safety Seminars", "Support For victims"]
  },
  modeOfSession: {  
    type: String,
    required: true,
    enum: ['Virtual', 'Physical']
  },
  preferredDate: {
    type: Date,
    required: true
  },
  specialNotes: {
    type: String,
    required: false
  }
});

module.exports = mongoose.model('girlCareForms', girlCareFormSchema);