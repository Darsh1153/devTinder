const express = require("express");

const connectDb = require("./config/database");
const User = require("./models/user");
const validateSignUpData = require("./utils/validations");
const bcrypt = require("bcrypt");

const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {

    try {
        const { firstName, lastName, emailId, password } = req.body;
        // validations
        validateSignUpData(req);

        // encrypt password
        const hashedPassword = await bcrypt.hash(password, 10);``

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
    try{
        const {emailId, password} = req.body;
        const user = await User.findOne({emailId: emailId});
        console.log(user);
        if(!user){
            throw new Error("Email id doesn't exist");
        }
        const passwordValidation = await bcrypt.compare(password, user.password)
        if(passwordValidation){
            res.send("Login successful!");
        }else{
            throw new Error("Password is not valid");
        }
    }
    catch(err){
        res.send("ERROR: " + err.message);
    }
})

// find one document in a collection
// app.get("/getUser", async (req, res) => {
//     try{
//         const getReq = req.body.firstName;
//         console.log(getReq);
//         const data = await User.findOne({firstName: getReq});
//         res.send(data);
//     }
//     catch(err){
//         res.status(404).send("Something went wrong", err);
//     }
// })

app.get("/feed", async (req, res) => {
    try {
        const data = await User.find({});
        res.send(data);
    } catch (err) {
        res.status(404).send("Something went wrong", err);
    }
})
app.delete("/deleteUser", async (req, res) => {
    try {
        const deleteReq = req.body._id;
        await User.deleteOne({ _id: deleteReq });
        res.send("User deleted successfully");
    } catch (err) {
        res.status(404).send("Something went wrong", err);
    }
})

app.patch("/updateUser", async (req, res) => {
    const userId = req.body.userId;
    const data = req.body;
    try {
        const ALLOWED_KEYS = ["userId", "firstName", "lastName", "password", "photoUrl", "about", "skills"];
        const isUpdateAllowed = Object.keys(data).every((k) => ALLOWED_KEYS.includes(k));
        if (!isUpdateAllowed) {
            throw new Error("Cannot update field");
        }
        if (data.skills.length > 5) {
            throw new Error("List out only 5 skills");
        }
        const user = await User.findByIdAndUpdate({ _id: userId }, data, { runValidators: true })
        console.log(user);
        res.send("User updated successfully");
    }
    catch (err) {
        res.status(404).send("Something went wrong" + err);
    }
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



