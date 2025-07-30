const validator = require("validator");

const validateSignUpData = (req) => {
    
    const {firstName, lastName, emailId, password} = req.body;
    
    if(!firstName || !lastName){
        throw new Error("Please enter names");
    }
    else if(firstName.length < 4 || firstName.length > 50){
        throw new Error("Name should be only between 4 to 50");
    }
    else if(!validator.isEmail(emailId)){
        throw new Error("Email address is not valid");
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Enter a strong password");
    }

}

module.exports = validateSignUpData;