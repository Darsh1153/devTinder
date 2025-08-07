const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
    },
    emailId: {
        type: String,
        lowercase: true,
        required: true,
        unique: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email id is invalid");
            }
        }
    },
    password: {
        type: String,
        required: true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Use a strong password");
            }
        }
    },
    age: {
        type: Number,
    },
    gender: {
        type: String,
        validate(value) {
            if (!["male", "female", "others"].includes(value)) {
                throw new Error("Gender data is invalid!")
            }
        }
    },
    photoUrl: {
        type: String,
        default: " "
    },
    about: {
        type: String,
        default: "This is the default about section."
    },
    skills: [String],
},
    {
        timestamps: true
    })

    userSchema.methods.getJWT = async function () {
        const user = this;
        const token = await jwt.sign({ _id: user._id }, "Darsh$12");
        return token;
    }
    userSchema.methods.validatePassword = async function (userTypedPassword) {
        const user = this;
        const hashedPassword = user.password;
        const isValidate = await bcrypt.compare(userTypedPassword, hashedPassword);
        return isValidate;
    }

const User = mongoose.model("User", userSchema);

module.exports = User; 