const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AuthSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    emailOtp: {
        type: Number,
    },
    mobileOtp: {
        type: Number,
    },
    references:[
        {
            reference: {
                type: Schema.Types.ObjectId,
                required: true,
                refPath: 'references.referenceType'
            },
            referenceType: {
                type: String,
                required: true,
                enum: ['coachinfo', 'userinfo'] 
            }
        }
    ],
    isActive: {
        type: Boolean,
        required: true,
        default: true
    }
}, { timestamps: true });


AuthSchema.index({email: 1});
const AuthModel = mongoose.model('authentication', AuthSchema);
module.exports = AuthModel;
