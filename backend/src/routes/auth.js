const express = require("express");

const authRouter = express.Router();
const User = require("../models/user");
const { validateSignUpData } = require("../utils/validations");
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
        const savedUser = await user.save();
        const jwtToken = await user.getJWT();
        res.cookie("token", jwtToken);
        res.send(savedUser);
    } catch (err) {
        res.status(400).send("Error creating user: " + err);
    }
})

authRouter.post("/login", async (req, res) => {
    try {
        const { emailId, password } = req.body;
        const user = await User.findOne({ emailId: emailId });
        if (!user) {
            res.status(401).send("Invalid EmailID");
        }
        const passwordValidation = await user.validatePassword(password);
        if (passwordValidation) {
            // creating token
            // send back the token to client
            const jwtToken = await user.getJWT();
            res.cookie("token", jwtToken);
            res.send(user);
        } else {
            res.status(401).send("Invalid Password");
        }
    }
    catch (err) {
        res.send("ERROR: " + err.message);
    }
})

authRouter.post("/logout", (req, res) => {
    res.cookie("token", null, {
        expires: new Date(Date.now())
    })
    res.send("Logout successful");
})

module.exports = authRouter;