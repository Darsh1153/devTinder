const express = require("express");

const connectDb = require("./config/database");
const User = require("./models/user");

const app = express();

app.use(express.json());    

app.post("/signup", async (req, res) => {

    const user = new User(req.body);
    try{
        await user.save();
        res.send("User created successfully");
    }catch(err){
        res.status(400).send("Error creating user: " + err);
    }

    // const user = new User({
    //     firstName: 123,
    //     lastName: "Sharma",
    //     mailId: "darshan@sharma.com",
    //     password: "darshu@123",
    // })
    // try{
    // await user.save();
    // res.send("User created successfully");
    // } catch (err){
    //     res.status(400).send("Error creating user: " + err);
    // }
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



