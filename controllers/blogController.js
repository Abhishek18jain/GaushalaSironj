const express = require('express');
const router = express.Router();
const Blog = require('../models/blog');
const ExpressError = require("../utlis/ExpressError.js")

module.exports.isAdmin = (req, res, next) => {
    if (req.isAuthenticated()){
         return next()
        };
    res.redirect('/admin/login');
}
module.exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    req.flash('error', 'Please login first');
    res.redirect('/admin/login');
}

module.exports.allBlogs = async (req, res) => {
  const blogs = await Blog.find().sort({ createdAt: -1 });
  res.render('blog/index', { blogs });
}
module.exports.createBlog = async (req, res) => {
  const { title, content } = req.body;
  const url = req.file.path;
  const filename = req.file.filename;
  const newBlog = await Blog.create({
    title,
    image: {
      url,
      filename,
    },
    content
  });
  res.redirect('/blogs');
}
module.exports.showBlog = async (req, res) => {
  const { id } = req.params;
    const blog = await Blog.findById(id);
    if (!blog) throw new ExpressError('Blog Not Found', 404);
    res.render("blog/show", { blog });  // show.ejs hona chahiye views/blogs/ me
  }
  module.exports.updateBlog = async (req, res) => {
    const {id} = req.params;
    const { title, image, content } = req.body;
    await Blog.findByIdAndUpdate(id, { title, image, content });
     if (!blog) throw new ExpressError('Cannot update: Blog Not Found', 404);
    res.redirect(`/blogs/${id}`);
  }
  module.exports.edit =  async (req, res) => {
  const blog = await Blog.findById(req.params.id);
    if (!blog) throw new ExpressError('Cannot edit: Blog Not Found', 404);
  res.render('blog/edit', { blog });
}
  module.exports.deleteBlog = async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
    if (!blog) throw new ExpressError('Cannot delete: Blog Not Found', 404);
  res.redirect('/blogs');
}