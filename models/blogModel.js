const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
  slug: { type: String, required: true },
  blog: {
    type: Object,
    required: true,
  },
});

const BlogModel = mongoose.model("Blogs", BlogSchema);
module.exports = BlogModel;
