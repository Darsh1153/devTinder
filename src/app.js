const express = require("express");

const app = express();

const isAuthenticated = require("./middlewares/auth");



app.use("/admin", isAuthenticated);

app.get("/admin/getAllData", (req, res) => {
    res.send("All data retrieved successfully");
})

app.delete("/admin/deleteData", (req, res) => {
    res.send("Data deleted successfully");
})


app.listen(7777, () => {
    console.log("Server is running on port 7777");
})