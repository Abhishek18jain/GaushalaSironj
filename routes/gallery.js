const express = require("express");
const router = express.Router();
const multer = require("multer");
const wrapAsync = require("../utlis/wrapAsync")
const {storage} = require("../cloudConfig")
const upload = multer({ storage });
const methodOverride = require("method-override");
router.use(methodOverride("_method"));
const {gallery} = require("../controllers/galleryController")
const Gallery = require("../models/galleryModel");
// Gallery Page
router.get("/", wrapAsync(gallery));
// Upload Route
router.post("/upload", upload.array("image", 50), wrapAsync(async (req, res) => {
  const uploads = req.files.map(file => ({
    image: { url: file.path, filename: file.filename }
  }));

  await Gallery.insertMany(uploads);
  res.redirect("/gallery");
}));
//delete

router.delete("/:id",wrapAsync(async (req, res) => {
  const { id } = req.params;
  const image = await Gallery.findById(id);

  // Delete from Cloudinary too
  const { cloudinary } = require("../cloudinary");
  await cloudinary.uploader.destroy(image.image.filename);

  // Delete from MongoDB
  await Gallery.findByIdAndDelete(id);
  res.redirect("/gallery");
}));

module.exports = router;
