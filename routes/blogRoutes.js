const express = require('express');
const router = express.Router();
const multer = require("multer");
const wrapAsync = require("../utlis/wrapAsync")
const {storage} = require("../cloudConfig")
const {allBlogs , createBlog , showBlog, updateBlog,edit, deleteBlog , isAdmin, isLoggedIn} = require("../controllers/blogController")
const upload = multer({storage }); // basic storage, ya cloudinary ka config use karo
const Blog = require('../models/blog');

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
// Like a blog
router.post('/:id/like', wrapAsync(async (req, res) => {
  const { id } = req.params;
  const blog = await Blog.findByIdAndUpdate(id, { $inc: { likes: 1 } });
  if (!blog) {
    req.flash('error', 'Blog not found!');
    return res.redirect('/blogs');
  }
  res.redirect(`/blogs/${id}`);
}));


// Comment on a blog
router.post('/:id/comment', wrapAsync(async (req, res) => {
  const { name, text } = req.body;
  await Blog.findByIdAndUpdate(req.params.id, {
    $push: { comments: { name: name || "Anonymous", text } }
  });
  res.redirect(`/blogs/${req.params.id}`);
}));
//delete comment
// DELETE comment (Admin Only)
router.post('/:id/comments/:commentId/delete', isAdmin, isLoggedIn, wrapAsync(async (req, res) => {
  const { id, commentId } = req.params;

  // Remove the comment by $pull
  await Blog.findByIdAndUpdate(id, {
    $pull: { comments: { _id: commentId } }
  });

  req.flash('success', 'Comment deleted.');
  res.redirect(`/blogs/${id}`);
}));



module.exports = router;
