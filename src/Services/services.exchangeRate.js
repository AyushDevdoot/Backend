const ExchangeRateModel = require("../Models/models.exchangeRate");

const createExchangeRateServices = async (coachInfo) => {
    const finalBody = new ExchangeRateModel(coachInfo);
    return finalBody.save(); 
};

const getExchangeRateServices = async (query) => {
    return ExchangeRateModel.find(query).populate();
};

const getExchangeRateByCurrencyServices = async (currency) => {
    return ExchangeRateModel.findOne({ currency }); 
};

const updateExchangeRateByCurrencyServices = async (currency, updatedRate) => {
    return ExchangeRateModel.findOneAndUpdate(
        { currency }, 
        { rate: updatedRate }, 
        { new: true } 
    );
};

module.exports = {
    createExchangeRateServices,
    getExchangeRateServices,
    getExchangeRateByCurrencyServices,
    updateExchangeRateByCurrencyServices
};

