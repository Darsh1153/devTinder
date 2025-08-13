const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
    try {
        // get the token
        const cookies = req.cookies;
        const { token } = cookies;
        if (!token) {
            res.status(401).send("Please login");
        }
        // validation
        const decodedObj = jwt.verify(token, "Darsh$12");
        const { _id } = decodedObj;

        // get the user
        const user = await User.findById(_id);
        if (!user) {
            throw new Error("User not found");
        }

        req.user = user;
        next();
    }
    catch (err) {
        res.status(400).send("Error: " + err.message);
    }
}

module.exports = userAuth;