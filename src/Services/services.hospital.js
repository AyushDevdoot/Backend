const axios = require('axios');
const NodeCache = require('node-cache');


const hospitalCache = new NodeCache({ stdTTL: 3600 });

class HospitalService {
    constructor() {
        this.SPECIALIZATIONS = {
            CRITICAL_CARE: 'Critical Care & Emergency',
            SUPER_SPECIALTY: 'Specialty & Super-Specialty',
            MATERNAL_CHILD_CARE: 'Maternal & Child Care Centers',
            MENTAL_HEALTH: 'Mental Health & Rehabilitation',
            BURN_TRAUMA: 'Burn and Trauma Centers',
            VETERINARY: 'Veterinary & Animal Hospitals',
            GERIATRIC_CARE: 'Geriatric Care & Senior Living',
            PLASTIC_SURGERY: 'Plastic Surgery & Reconstructive'
        };
    }

    async fetchNearbyHospitals(params) {
        try {
            const { latitude, longitude, radius = 5000 } = params;

            const overpassUrl = 'https://overpass-api.de/api/interpreter';
            const query = `
                [out:json][timeout:25];
                (
                    node["amenity"="hospital"](around:${radius},${latitude},${longitude});
                    way["amenity"="hospital"](around:${radius},${latitude},${longitude});
                    relation["amenity"="hospital"](around:${radius},${latitude},${longitude});
                );
                out body;
                >;
                out skel qt;
            `;

            const response = await axios.get(overpassUrl, { params: { data: query } });

            if (!response.data || !response.data.elements) {
                throw new Error('Invalid response from Overpass API');
            }

            const hospitals = response.data.elements
                .filter((element) => element.tags && element.tags.name)
                .map((element) => this.mapHospitalData(element, latitude, longitude));

            return hospitals;
        } catch (error) {
            console.error('Error fetching hospitals:', error.message);
            throw new Error(`Failed to fetch hospitals: ${error.message}`);
        }
    }

    mapHospitalData(element, userLat, userLon) {
        const lat = element.lat || (element.center ? element.center.lat : null);
        const lon = element.lon || (element.center ? element.center.lon : null);

        return {
            id: element.id.toString(),
            name: element.tags.name,
            latitude: lat,
            longitude: lon,
            address: this.formatAddress(element.tags),
            specialization: this.determineSpecialization(element.tags),
            type: this.determineHospitalType(element.tags),
            rating: this.calculateRating(element.tags),
            distance: this.calculateDistance(userLat, userLon, lat, lon),
            googleMapsUrl: this.getGoogleMapsUrl(lat, lon)
        };
    }

    formatAddress(tags) {
        // Format the address based on available tags
        const addressParts = [
            tags['addr:housenumber'],
            tags['addr:street'],
            tags['addr:city'],
            tags['addr:state'],
            tags['addr:postcode'],
            tags['addr:country']
        ];

        // Filter out undefined or null values and join them with commas
        return addressParts.filter((part) => part).join(', ') || 'Address not available';
    }

    determineSpecialization(tags) {
        if (tags.healthcare === 'critical' || tags.emergency === 'yes') {
            return this.SPECIALIZATIONS.CRITICAL_CARE;
        }
        if (tags.healthcare === 'specialty') {
            return this.SPECIALIZATIONS.SUPER_SPECIALTY;
        }
        if (tags.healthcare === 'maternal' || tags.healthcare === 'child') {
            return this.SPECIALIZATIONS.MATERNAL_CHILD_CARE;
        }
        if (tags.healthcare === 'mental' || tags.healthcare === 'rehabilitation') {
            return this.SPECIALIZATIONS.MENTAL_HEALTH;
        }
        if (tags.healthcare === 'burn' || tags.healthcare === 'trauma') {
            return this.SPECIALIZATIONS.BURN_TRAUMA;
        }
        if (tags.veterinary === 'yes') {
            return this.SPECIALIZATIONS.VETERINARY;
        }
        if (tags.healthcare === 'geriatric') {
            return this.SPECIALIZATIONS.GERIATRIC_CARE;
        }
        if (tags.healthcare === 'plastic_surgery') {
            return this.SPECIALIZATIONS.PLASTIC_SURGERY;
        }
        return 'General';
    }

    determineHospitalType(tags) {
        if (tags.operator_type === 'private' || tags.ownership === 'private') {
            return 'Private';
        }
        if (tags.operator_type === 'government' || tags.ownership === 'government') {
            return 'Government';
        }
        return 'Unknown';
    }

    calculateRating(tags) {
        // Placeholder for rating calculation logic
        return tags.rating ? parseFloat(tags.rating) : 0;
    }

    calculateDistance(lat1, lon1, lat2, lon2) {
        if (!lat1 || !lon1 || !lat2 || !lon2) return null;

        const R = 6371; // Earth's radius in km
        const dLat = this.deg2rad(lat2 - lat1);
        const dLon = this.deg2rad(lon2 - lon1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c; // Distance in km
        return Number(distance.toFixed(2));
    }

    deg2rad(deg) {
        return deg * (Math.PI / 180);
    }

    getGoogleMapsUrl(latitude, longitude) {
        return `https://www.google.com/maps?q=${latitude},${longitude}`;
    }
}

module.exports = new HospitalService();