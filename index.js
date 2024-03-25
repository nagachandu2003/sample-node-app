const express = require("express");

const app = express()
app.use(express.json())

app.get("/", (req,res) => {
    res.status(200).send("Hello I am Home Page");
})

app.listen(3002,() => {
    console.log("Server is Running at http://localhost:/3002");
})