const express = require("express");

const connectDb = require("./config/database");
const User = require("./models/user");
const validateSignUpData = require("./utils/validations");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const userAuth = require("./middlewares/auth");

const app = express();

app.use(express.json());

app.use(cookieParser());

app.post("/signup", async (req, res) => {

    try {
        const { firstName, lastName, emailId, password } = req.body;
        // validations
        validateSignUpData(req);

        // encrypt password
        const hashedPassword = await bcrypt.hash(password, 10); ``

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

app.post("/login", async (req, res) => {
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
app.get("/profile", userAuth, async (req, res) => {

    const user = req.user;
    console.log(user);

    res.send(user);
})

app.post("/connectionRequest", userAuth, async (req, res) => {
    const user = req.user;
    res.send(user.firstName + "Connection sent");
})

connectDb()
    .then(() => {
        console.log("connection established between database.");
        app.listen(9000, () => {
            console.log("Server connected on port 9000");
        })
    })
    .catch(err => {
        console.log("connection denied", err);
    })



