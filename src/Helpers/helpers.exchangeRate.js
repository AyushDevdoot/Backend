const axios = require('axios');

// Function to fetch exchange rate data
const fetchExchangeRates = async () => {
    try {
        const response = await axios.get('https://open.er-api.com/v6/latest/USD');
        
        // Assuming the response data contains exchange rates
        const exchangeRates = response.data;

        // Log the exchange rates
        console.log('Exchange Rates:', exchangeRates);

    } catch (error) {
        console.error('Error fetching exchange rates:', error.message);
    }
};

module.exports = {
    fetchExchangeRates,

}
