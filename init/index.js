const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = 3000;

mongoose.connect("mongodb+srv://Abhi:abhi2005@gaushalasironj.umyuism.mongodb.net/SironjGaushala")
  .then(() => {
    console.log("✅ Connected to MongoDB");
    startServer();
  })
  .catch((err) => {
    console.log("❌ Error connecting to MongoDB:", err);
  });

async function startServer() {
  const User = require('../models/userModels');
  
  try {
    const user = await User.create({
      username: '',
      password: ''
    });

    console.log("✅ User created:", user);
  } catch (err) {
    console.error("❌ Failed to insert user:", err.message);
  }

  app.listen(port, () => {
    console.log("🚀 Server started on port", port);
  });
}
