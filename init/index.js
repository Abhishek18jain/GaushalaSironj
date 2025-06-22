
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = 3000;
 mongoose.connect("mongodb://localhost:27017/JeevDaya", {
}).then(() => {
    console.log("Connected to MongoDB"
    );
}).catch((err) => {
console.log("Error connecting to MongoDB:", err);
})



const User = require('../models/userModels');
User.create({ username:'Jinodayjeevdayakendrasironj@gmail.com', password:'Muni&hri@108' });
app.listen(port,()=>{
    console.log("server started")
})