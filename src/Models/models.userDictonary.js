const mongoose = require('mongoose');

const userDictonarySchema = new mongoose.Schema({
    userId: {
        type: String,
        ref: 'user',
        required: true
    },
    medicalRecords: {
        type: [
            {
                date: {
                    type: String,
                    required: true
                },
                problem: {
                    type: String,
                    required: true
                },
                treatment: {
                    type: String,
                    required: true
                }
            }
        ],
        required: true,
        default: []
    },
    lastVaccinationDate: {
        type: [
            {
                date: {
                    type: String,
                    required: true
                },
                vaccine: {
                    type: String,
                    required: true
                },
                administeredBy: {
                    type: String,
                    required: true
                }
            }
        ],
        required: true,
        default: []
    },
    lastCheckup: {
        type: [
            {
                date: {
                    type: String,
                    required: true
                },
                checkupType: {
                    type: String,
                    enum: ['physical', 'mental', 'other', "annual"],
                    required: true
                },
                doctor: {
                    type: String,
                    required: true
                },
                notes: {
                    type: String
                }
            }
        ],
        required: true,
        default: []
    },
    allergies: {
        type: [
            {
                allergyName: {
                    type: String,
                    required: true
                },
                allergyReaction: {
                    type: String,
                    required: true
                }
            }
        ],
        required: true,
        default: []
    },
    currentMedication: {
        type: [
            {
                medicineName: {
                    type: String,
                    required: true
                },
                dosage: {
                    type: String,
                    required: true
                },
                frequency: {
                    type: String,
                    enum: ['daily', 'weekly', 'monthly', 'yearly'],
                    required: true
                },
                medicineType: {
                    type: String,
                    enum: ["tablet", "capsule", "liquid", "injection", "other"],
                    required: true
                },
            }
        ],
        required: true,
        default: []
    },
    emergencyContact: {
        type: [
            {
                name: {
                    type: String,
                    required: true
                },
                phone: {
                    type: String,
                    required: true
                },
                relationship: {
                    type: String,
                    enum: ['mother', 'father', 'brother', 'sister', 'partner', 'friend', 'other'],
                    required: true
                },
                address: {
                    type: String,
                    required: true,
                },
            }
        ],
        required: true,
        default: []
    },
    firstAid: {
        type: Boolean,
        required: true,
        default: false
    }
});

const UserDictonaryModel = mongoose.model('UserDictonary', userDictonarySchema);

module.exports = UserDictonaryModel;