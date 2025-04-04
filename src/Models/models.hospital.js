const mongoose = require('mongoose');

const hospitalSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true },
        address: { type: String, default: 'Not available' },
        type: { type: String, enum: ['private', 'government'], default: 'private' },
        specialization: {
            type: String,
            enum: [
                'Critical Care & Emergency',
                'Specialty & Super-Specialty',
                'Maternal & Child Care Centers',
                'Mental Health & Rehabilitation',
                'Burn and Trauma Centers',
                'Veterinary & Animal Hospitals',
                'Geriatric Care & Senior Living',
                'Plastic Surgery & Reconstructive'
            ],
            default: 'General'
        },
        rating: { type: Number, default: 0 },
        emergency: { type: Boolean, default: false },
        phone: { type: String, default: 'Not available' },
        website: { type: String, default: 'Not available' },
        wheelchair: { type: String, default: 'Unknown' },
        distance: { type: Number, default: 0 },
        googleMapsUrl: { type: String, default: '' }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Hospital', hospitalSchema);