const express = require("express");
const router = express.Router();
const Gallery = require("../models/galleryModel");
module.exports.gallery = async (req, res) => {
  const images = await Gallery.find({});
  res.render("gallery/index", { images });
}