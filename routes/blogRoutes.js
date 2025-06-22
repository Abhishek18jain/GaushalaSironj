const express = require('express');
const router = express.Router();
const multer = require("multer");
const wrapAsync = require("../utlis/wrapAsync")
const {storage} = require("../cloudConfig")
const {allBlogs , createBlog , showBlog, updateBlog,edit, deleteBlog , isAdmin, isLoggedIn} = require("../controllers/blogController")
const upload = multer({storage }); // basic storage, ya cloudinary ka config use karo

// Show all blogs
router.get('/', (allBlogs));

// New blog form
router.get('/new',isAdmin,isLoggedIn,wrapAsync( (req, res) => {
  res.render('blog/new');
}));

// Create blog  
router.post("/",isAdmin,isLoggedIn, upload.single("image"), wrapAsync(createBlog));
//show-specific-blog
router.get("/:id",wrapAsync(showBlog))
// Edit blog form
router.get('/:id/edit',isAdmin,isLoggedIn,wrapAsync(edit));

// Update blog
router.post('/:id/update',isAdmin,isLoggedIn, wrapAsync(updateBlog));

// Delete blog
router.post('/:id/delete',isAdmin,isLoggedIn, wrapAsync(deleteBlog));

module.exports = router;
