const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    references:[
        {
            reference: {
                type: Schema.Type.ObjectId,
                required: true,
                refPath: 'referenceType'
            },
            referenceType: {
                type: String,
                required: true,
                enum: ['coachInfo', 'userInfo'] 
            }
        }
    ],
    isActive: {
        type: Boolean,
        required: true,
        default: true
    }
}, { timestamps: true });
const UserModel = mongoose.model('user', userSchema);

module.exports = UserModel;
