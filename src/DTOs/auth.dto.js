
const createAuthDto = (data) => {
    const { 
        email,
	password,
    } = data;
    
    return {
	    email, 
	    password
    };
}
const isValidEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
};


const validateAuthDto = (data) =>{
    const { email, password } = data
    const errors = {};
    if (!email || !isValidEmail(email)){
        errors.email = "Need a valid email";
    }
    return errors;
};



module.exports = {
    createAuthDto,
    validateAuthDto,
};
