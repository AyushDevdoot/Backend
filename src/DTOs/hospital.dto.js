const Joi = require('joi');

const hospitalSearchDTO = Joi.object({
    latitude: Joi.number().required().messages({
        'any.required': 'Latitude is required',
        'number.base': 'Latitude must be a number'
    }),
    longitude: Joi.number().required().messages({
        'any.required': 'Longitude is required',
        'number.base': 'Longitude must be a number'
    }),
    radius: Joi.number().optional().default(5000).messages({
        'number.base': 'Radius must be a number'
    }),
    specialization: Joi.string()
        .valid(
            'Critical Care & Emergency',
            'Specialty & Super-Specialty',
            'Maternal & Child Care Centers',
            'Mental Health & Rehabilitation',
            'Burn and Trauma Centers',
            'Veterinary & Animal Hospitals',
            'Geriatric Care & Senior Living',
            'Plastic Surgery & Reconstructive'
        )
        .optional()
        .messages({
            'string.base': 'Specialization must be a string',
            'any.only': 'Invalid specialization'
        }),
    type: Joi.string()
        .valid('private', 'government')
        .optional()
        .messages({
            'string.base': 'Type must be a string',
            'any.only': 'Type must be either "private" or "government"'
        }),
    sortBy: Joi.string()
        .valid('distance', 'rating')
        .optional()
        .default('distance')
        .messages({
            'string.base': 'SortBy must be a string',
            'any.only': 'SortBy must be either "distance" or "rating"'
        }),
    minRating: Joi.number().optional().messages({
        'number.base': 'Minimum rating must be a number'
    })
});

module.exports = { hospitalSearchDTO };