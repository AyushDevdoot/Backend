const UserInfoModel = require("../Models/models.userInfo");

const createUserInfoServices = async (userInfo) => {
    const finalBody = new UserInfoModel(userInfo);
    return await finalBody.save();
};

const getUserInfoServices = async (query) => {
    return await UserInfoModel.find(query);
};

const getUserInfoByIdServices = async (userId) => {
    return await UserInfoModel.find({ _id: userId });
};

const updateUserInfoServices = async (userId, userInfoBody) => {
    return await UserInfoModel.updateOne({ _id: userId }, userInfoBody);
};

module.exports = {
    createUserInfoServices,
    getUserInfoServices,
    getUserInfoByIdServices,
    updateUserInfoServices
};
