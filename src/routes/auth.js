const express = require("express");

const authRouter = express.Router();
const User = require("../models/user");
const validateSignUpData = require("../utils/validations");
const bcrypt = require("bcrypt");

authRouter.post("/signup", async (req, res) => {

    try {
        const { firstName, lastName, emailId, password } = req.body;
        // validations
        validateSignUpData(req);

        // encrypt password
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            firstName,
            lastName,
            emailId,
            password: hashedPassword
        })
        await user.save();
        res.send("User created successfully");
    } catch (err) {
        res.status(400).send("Error creating user: " + err);
    }
})

authRouter.post("/login", async (req, res) => {
    try {
        const { emailId, password } = req.body;
        const user = await User.findOne({ emailId: emailId });
        if (!user) {
            throw new Error("Email id doesn't exist");
        }
        const passwordValidation = await user.validatePassword(password);
        if (passwordValidation) {
            // creating token
            // send back the token to client
            const jwtToken = await user.getJWT();
            res.cookie("token", jwtToken);
            res.send("Login successful!");
        } else {
            throw new Error("Password is not valid");
        }
    }
    catch (err) {
        res.send("ERROR: " + err.message);
    }
})

module.exports = authRouter;