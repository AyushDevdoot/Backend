const coachBankDetailsModel = require('../Models/models.coachBankDetails');

const createCoachBankDetailsServices= async (coachBankDetails) =>{
    const finalBody = new coachBankDetailsModel(coachBankDetails)
    return await finalBody.save()
}

const getCoachBankDetailsByIdService = async (coachId) => {
    return await coachBankDetailsModel.findOne({ coachId: coachId })
}

module.exports ={
    createCoachBankDetailsServices,
    getCoachBankDetailsByIdService
}