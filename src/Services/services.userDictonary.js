const UserDictonaryModel = require("../Models/models.userDictonary");

const createUserDictonaryServices = async (userDictonary) => {
    const finalBody = new UserDictonaryModel(userDictonary);
    return await finalBody.save();
};

const getUserDictonaryServices = async (userId) => {
    return await UserDictonaryModel.findOne({ userId });
};

const updateUserDictonaryServices = async (userId, body) => {
    return await UserDictonaryModel.updateOne({ userId }, body);
};

const deleteUserDictonaryServices = async (userId, contactId) => {
    return await UserDictonaryModel.updateOne(
        { userId }, // Match the user document
        { $pull: { emergencyContact: { _id: contactId } } } // Remove the contact
    )
};
module.exports = {
    createUserDictonaryServices,
    getUserDictonaryServices,
    updateUserDictonaryServices,
    deleteUserDictonaryServices
};