const mongoose = require("mongoose");

const connectDb = async () => {
    await mongoose.connect("mongodb+srv://Darshan:CFRPSWRc5lCNmRPr@master-nodejs.etwgaey.mongodb.net/devTinder");
}

module.exports = connectDb;