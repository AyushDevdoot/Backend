const AyurvedaConsultationFormModel = require("../Models/model.ayurvedaConsultationForm");

const createAyurvedicConsultationFormServices = async (ayurvedaConsultationForm) => {
    const finalBody = new AyurvedaConsultationFormModel(ayurvedaConsultationForm);
    return await finalBody.save();
}

module.exports = {
    createAyurvedicConsultationFormServices
}