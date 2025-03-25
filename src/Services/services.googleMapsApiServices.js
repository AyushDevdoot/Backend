const https = require("https");

function searchNearbyHospitals(apiKey, latitude, longitude, radius = 1000) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({
      includedTypes: ["hospital"],
      maxResultCount: 5,
      locationRestriction: {
        circle: {
          center: { latitude, longitude },
          radius: radius,
        },
      },
    });

    const options = {
      hostname: "places.googleapis.com",
      path: "/v1/places:searchNearby",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": "places.displayName,places.formattedAddress",
      },
    };

    const req = https.request(options, (res) => {
      let data = "";

      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        try {
          const parsedData = JSON.parse(data);
          resolve(parsedData.places || []);
        } catch (error) {
          reject("Error parsing response");
        }
      });
    });

    req.on("error", (error) => {
      reject(error);
    });

    req.write(postData);
    req.end();
  });
}

module.exports = { searchNearbyHospitals };
