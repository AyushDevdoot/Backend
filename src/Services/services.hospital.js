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
            const {
                latitude,
                longitude,
                radius = 5000,
                specialization,
                sortBy = 'distance',
                type,
                minRating
            } = params;

            const cacheKey = `hospitals_${latitude}_${longitude}_${radius}_${specialization}_${sortBy}_${type}_${minRating}`;
            
            const cachedData = hospitalCache.get(cacheKey);
            if (cachedData) {
                return cachedData;
            }

            const overpassUrl = 'https://overpass-api.de/api/interpreter';
            const query = this.buildOverpassQuery(latitude, longitude, radius, specialization);

            const response = await axios.get(overpassUrl, {
                params: { data: query },
                timeout: 30000
            });

            if (!response.data || !response.data.elements) {
                throw new Error('Invalid response from Overpass API');
            }

            let hospitals = response.data.elements
                .filter(element => element.tags && element.tags.name)
                .map(element => this.mapHospitalData(element, latitude, longitude));

            // Apply filters and sorting
            hospitals = this.filterAndSortHospitals(hospitals, {
                specialization,
                sortBy,
                type,
                minRating
            });

            // Cache the results
            hospitalCache.set(cacheKey, hospitals);

            return hospitals;

        } catch (error) {
            console.error('Error fetching hospitals:', error);
            throw new Error(`Failed to fetch hospitals: ${error.message}`);
        }
    }

    buildOverpassQuery(latitude, longitude, radius, specialization) {
        let query = `
            [out:json][timeout:25];
            (
                node["amenity"="hospital"](around:${radius},${latitude},${longitude});
                way["amenity"="hospital"](around:${radius},${latitude},${longitude});
                relation["amenity"="hospital"](around:${radius},${latitude},${longitude});
        `;

        if (specialization === this.SPECIALIZATIONS.VETERINARY) {
            query += `
                node["amenity"="veterinary"](around:${radius},${latitude},${longitude});
                way["amenity"="veterinary"](around:${radius},${latitude},${longitude});
            `;
        }

        query += `
            );
            out body;
            >;
            out skel qt;
        `;

        return query;
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

    filterAndSortHospitals(hospitals, { specialization, sortBy, type, minRating }) {
        // Filter by specialization
        if (specialization) {
            hospitals = hospitals.filter(hospital => hospital.specialization === specialization);
        }

        // Filter by type
        if (type) {
            hospitals = hospitals.filter(hospital => hospital.type.toLowerCase() === type.toLowerCase());
        }

        // Filter by minimum rating
        if (minRating) {
            hospitals = hospitals.filter(hospital => hospital.rating >= minRating);
        }

        // Sort by distance or rating
        if (sortBy === 'distance') {
            hospitals.sort((a, b) => a.distance - b.distance);
        } else if (sortBy === 'rating') {
            hospitals.sort((a, b) => b.rating - a.rating);
        }

        return hospitals;
    }

    calculateDistance(lat1, lon1, lat2, lon2) {
        if (!lat1 || !lon1 || !lat2 || !lon2) return null;

        const R = 6371; // Earth's radius in km
        const dLat = this.deg2rad(lat2 - lat1);
        const dLon = this.deg2rad(lon2 - lon1);
        const a = 
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
            Math.sin(dLon/2) * Math.sin(dLon/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        const distance = R * c; // Distance in km
        return Number(distance.toFixed(2));
    }

    deg2rad(deg) {
        return deg * (Math.PI/180);
    }

    getGoogleMapsUrl(latitude, longitude) {
        return `https://www.google.com/maps?q=${latitude},${longitude}`;
    }
}

module.exports = new HospitalService();