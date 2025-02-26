const AuthModel = require("../Models/models.auth");

const createUserCoachAuthService = async (body) => {
    const finalBody = new AuthModel(body)
    return await finalBody.save()
}

const getUserCoachAuthDetailsByEmailService = async (email) => {
    return await AuthModel
        .findOne({ email }).populate({ path: 'references', populate: { path: 'reference'}});
};

const getUserCoachAuthDetailsByIdService = async (userId) => {
    return await AuthModel.findOne({ _id: userId }).populate('references.reference');
}


const updateUserCoachAuthDetailsByIdService = async (userId, body) => {
    return await AuthModel.findOneAndUpdate({ _id: userId }, body)
}
module.exports = {
    	createUserCoachAuthService,
    	getUserCoachAuthDetailsByEmailService,
	    getUserCoachAuthDetailsByIdService,
    	updateUserCoachAuthDetailsByIdService
}
