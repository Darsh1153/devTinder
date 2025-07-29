const express = require("express");

const connectDb = require("./config/database");
const User = require("./models/user");

const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        res.send("User created successfully");
    } catch (err) {
        res.status(400).send("Error creating user: " + err);
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
        const user = await User.findByIdAndUpdate({ _id: userId }, data)
        console.log(user);
        res.send("User updated successfully");
    }
    catch (err) {
        res.status(404).send("Something went wrong", err);
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



