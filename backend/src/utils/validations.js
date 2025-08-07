const validator = require("validator");

const validateSignUpData = (req) => {

    const { firstName, lastName, emailId, password } = req.body;

    if (!firstName || !lastName) {
        throw new Error("Please enter names");
    }
    else if (firstName.length < 4 || firstName.length > 50) {
        throw new Error("Name should be only between 4 to 50");
    }
    else if (!validator.isEmail(emailId)) {
        throw new Error("Email address is not valid");
    }
    else if (!validator.isStrongPassword(password)) {
        throw new Error("Enter a strong password");
    }

}

const validateAllowedFields = (req, res) => {
    const allowedField = ["firstName", "lastName", "emailId", "about", "photoUrl", "skills"];
    const isValidFieldAllowed = Object.keys(req.body).every(field => allowedField.includes(field));
    if (!isValidFieldAllowed) {
        throw new Error("Invalid update request");
    }
    return isValidFieldAllowed;

}

module.exports = { validateSignUpData, validateAllowedFields };