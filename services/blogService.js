const BlogModel = require("../models/blogModel");
const CustomError = require("../utils/custom-Error");
const Component = require("../models/componentModel");

exports.addBlogService = async (blog,slug) => {
  try {
    const result = new BlogModel({ blog,slug });
    result.save();
    return result;
  } catch (error) {
    throw new CustomError(500, "error while creating blogs");
  }
};

exports.updateBlogService = async (blogId, updateData) => {
  try {
    const result = await BlogModel.findByIdAndUpdate(
      blogId,
      { blog: updateData },
      {
        new: true,
      }
    );
    console.log(updateData, "ye hai");
    return result;
  } catch (error) {
    throw new CustomError(500, "internal server error");
  }
};

exports.deleteBlogService = async (blogId) => {
  try {
    const result = await BlogModel.findByIdAndDelete(blogId);

    if (!result) {
      throw new CustomError(404, "No blog found with this ID");
    }

    result;
  } catch (error) {
    throw new CustomError(500, "Internal Server Error");
  }
};


exports.fetchBlogService = async () => {
  try {
    const result = await BlogModel.find();
    const topSection = await Component.findOne({slug:"blogs",name:"topSection"});
    const final = {topSection,result}
    return final
  } catch (error) {
    throw new CustomError(500, "error while fetching blogs");
  }
};

exports.fetchBlogBySlug = async (slug) => {
  try {
    const result = await BlogModel.findOne({slug});
    return result
  } catch (error) {
    throw new CustomError(500, "error fetching blogs");
  }
};
