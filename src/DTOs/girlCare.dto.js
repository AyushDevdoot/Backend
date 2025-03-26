const { validateGirlSafetyFields } = require("./girlSaftey.dto");

const createGirlCareFormDto = (data) => {
    const {fullName, email, phoneNumber, age, programModule, modeOfSession, preferredDate, specialNotes} = data;
    return {
        fullName,
        email,
        phoneNumber,
        age,
        programModule,
        modeOfSession,
        preferredDate,
        specialNotes
    }
}

const validateGirlCareForm = (data) => {
        const errors = [];

        if (!data.fullName) errors.push('Full name is required');

        if (!data.email || !/^.+@.+\..+$/.test(data.email)) errors.push('Valid email is required');
        
        if (!data.phoneNumber || data.phoneNumber.length < 10) errors.push('Phone number is required and must be at least 10 digits');
        
        if (!data.age || data.age < 1 || data.age > 120) errors.push('Age must be between 1 and 120');
        
        if (!data.programModule || !["Self Defence", "Hygiene Education", "Access to Sanitary Productions", "Health and Safety Seminars", "Support For victims"].includes(data.programModule)) 
            errors.push('Invalid program module');
        
        if (!data.modeOfSession || !['Virtual', 'Physical'].includes(data.modeOfSession))
            errors.push('Invalid mode of session');
        
        if (!data.preferredDate || isNaN(new Date(data.preferredDate).getTime()))
            errors.push('Valid preferred date is required');

        return errors.length ? { isValid: false, errors } : { isValid: true };
    }


module.exports = { createGirlCareFormDto, validateGirlCareForm };