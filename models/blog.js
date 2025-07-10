const mongoose = require('mongoose');
const commentSchema = new mongoose.Schema({
  name: { type: String, default: "Anonymous" },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const blogSchema = new mongoose.Schema({
  title: String,
  image: {
    url: String,
    filename: String
  },
  content: String,
  createdAt: { type: Date, default: Date.now },
  likes: { type: Number, default: 0 },
  comments: [commentSchema] // ✅ Added comments array
});


module.exports = mongoose.model('Blog', blogSchema);
