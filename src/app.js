const express = require("express");
const connectDb = require("./config/database");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());
app.use(cookieParser());



const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);



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



