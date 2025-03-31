const mongoose = require("mongoose");

const HospitalSchema = new mongoose.Schema({
    hospitalName: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
    },
    contactNumber: {
        type: String,
        required: true,
        trim: true,
    },
    streetAddress: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
    },
    area: {
        type: String,
        required: true,
        trim: true,
    },
    district: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    pincode: {
        type: String,
        required: true
    },
    position: {
        type: String,
    },
    hospitalType: {
        type: String,
        enum: ["government", "private"],
        required: true
    },
    doctors: {
        type: [
            {
                name: {
                    type: String,
                    required: true
                },
                speciality: {
                    type: String,
                    required: true
                },
                experience: {
                    type: String,
                    required: true
                },
                doctorId: {
                    type: String,
                    ref: "doctor"
                },
                _id: false
            }
        ]
    },
    category: {
        type: String,
        enum: ["critical-care", "surgery", "maternity", "speciality", "mental-health", "burn", "veterinary", "geriatric-care"],
        required: true
    },
    specialitiesOffered: {
        type: [String],
        required: true
    },
    servicesOffered: {
        type: [String],
        required: true
    },
    packages: {
        type: [String]
    },
    review: {
        type: Number,
        default: 0
    },
    email: {
        type: String,
        required: true
    },
    website: {
        type: String,
        required: true
    },
    faq: {
        type: [String],
    },
    opdTimings: {
        type: String,
        required: true
    },
    ambulanceCount: {
        type: Number,
        required: true
    },
})



const HospitalModel = mongoose.model("hospital", HospitalSchema);

module.exports = HospitalModel;