require("dotenv").config(); 
const { searchNearbyHospitals } = require("../Services/services.googleMapsApiServices");

const API_KEY = process.env.GOOGLE_API_KEY; // Fetch API key from .env

const getNearbyHospitals = async (req, res) => {
  const { latitude, longitude, radius } = req.query;

  if (!latitude || !longitude) {
    return res.status(400).json({ error: "Latitude and longitude are required" });
  }

  try {
    const hospitals = await searchNearbyHospitals(
      API_KEY,
      parseFloat(latitude),
      parseFloat(longitude),
      parseInt(radius) || 1000
    );
    res.json({ hospitals });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

module.exports = { getNearbyHospitals };
