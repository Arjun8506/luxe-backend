const blogService = require("../services/blogService");

exports.createBlog = async (req, res, next) => {
  try {
    const {blog,slug}  = req.body;

    const result = await blogService.addBlogService(blog,slug);
    return res.status(201).json({
      status: "success",
      message: "blog created successfully",
      blog: result.blog,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateBlog = async (req, res, next) => {
  try {
    const blogId = req.params.id;
    const { updateData } = req.body;

    const result = await blogService.updateBlogService(blogId, updateData);
    return res.status(200).json({
      status: "success",
      message: "blog updated successfully",
      blog: result.blog,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteBlog = async (req, res, next) => {
  try {
    const blogId = req.params.id;
    const result = await blogService.deleteBlogService(blogId);

    return res.status(200).json({
      status: "success",
      message: "blog deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

exports.fetchBlog = async (req, res, next) => {
  try {
    const result = await blogService.fetchBlogService();
    return res.status(200).json({
      status: "success",
      message: "blogs fetched successfully",
      topSection:result.topSection,
      data: result.result,
    });
  } catch (error) { 
    next(error);
  }
};

exports.fetchBlogBySlug = async (req, res, next) => {
  const {slug} = req.query;
  try {
    const result = await blogService.fetchBlogBySlug(slug);
    return res.status(200).json({
      status: "success",
      message: "blogs fetched successfully",
      data: result,
    });
  } catch (error) { 
    next(error);
  }
};