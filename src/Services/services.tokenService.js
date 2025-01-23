const jwt = require('jsonwebtoken');
require('dotenv').config(); 

const generatedToken= (payload, tokenType,expiresIn="1h")=>{
    return jwt.sign(
        {...payload,tokenType},process.env.JWT_SECRET_KEY,{expiresIn} 
    
)
}

module.exports = {
    generatedToken
}

