const { uploadImageToCloudinaryTwo } = require("../utils/cloudinarytwo");
const CustomError = require("../utils/customError");

const uploadImage = async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) {
      throw new CustomError(400, "No files uploaded");
    }

    const uploadedImages = [];
    for (const file of req.files) {
      const imageUrl = await uploadImageToCloudinaryTwo(file.buffer);
      uploadedImages.push(imageUrl);
    }

    res.status(200).json({
      status:"success",
      message: "Images uploaded successfully",
      images: uploadedImages,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { uploadImage };
