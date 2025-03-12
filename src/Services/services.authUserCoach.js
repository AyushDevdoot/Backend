const AuthModel = require("../Models/models.auth");

const createUserCoachAuthService = async (body) => {
    const finalBody = new AuthModel(body)
    return await finalBody.save()
}

const getUserCoachAuthDetailsByEmailService = async (email) => {
    return await AuthModel
        .findOne({ email }).populate({ path: 'references', populate: { path: 'reference'}});
};

const getAuthDetailsByEmailService = async (email) => {
    return await AuthModel.findOne({ email });
};


const getAuthDetailsByIdService = async (id) => {
	return await AuthModel.findOne({ _id: id });
};

const getUserCoachAuthDetailsByIdService = async (userId) => {
    return await AuthModel.findOne({ _id: userId }).populate('references.reference');
}


const updateAuthDetailsByIdService = async (userId, body) => {
    return await AuthModel.findOneAndUpdate({ _id: userId }, body)
}
module.exports = {
    createUserCoachAuthService,
    getAuthDetailsByIdService,
    getAuthDetailsByEmailService,
    getUserCoachAuthDetailsByEmailService,
    getUserCoachAuthDetailsByIdService,
    updateAuthDetailsByIdService
}
