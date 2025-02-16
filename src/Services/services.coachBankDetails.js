const coachBankDetailsModel = require('../Models/models.coachBankDetails');

const createCoachBankDetailsServices= async (coachBankDetails) =>{
    const finalBody = new coachBankDetailsModel(coachBankDetails)
    return await finalBody.save()
}
module.exports ={
    createCoachBankDetailsServices
}