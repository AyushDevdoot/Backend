
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

