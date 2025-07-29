const mongoose = require("mongoose");

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
        unique: true
    },
    password: {
        type: String,
        required: true
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

const User = mongoose.model("User", userSchema);

module.exports = User; 