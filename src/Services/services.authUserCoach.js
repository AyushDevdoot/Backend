const AuthModel = require("../Models/models.auth");

const createUserCoachAuthService = async (body) => {
    const finalBody = new AuthModel(body)
    return await finalBody.save()
}


const getUserCoachDetailsByEmailService = async (email) => {
    return await AuthModel.findOne({ email }).populate('references.reference');

}

const getUserCoachDetailsByIdService = async (userId) => {
    return await AuthModel.findOne({ _id: userId }).populate('references.reference');
}


const getUserCoachAuthDetailsByIdService = async (userId) => {
    return await AuthModel.findOne({ _id: userId });
}


const updateUserCoachDetailsByIdService = async (userId, body) => {
    return await AuthModel.findOneAndUpdate({ _id: userId }, body)
}
module.exports = {
    	createUserCoachAuthService,
    	getUserCoachDetailsByEmailService,
    	getUserCoachDetailsByIdService,
	getUserCoachAuthDetailsByIdService,
    	updateUserCoachDetailsByIdService
}
