const CustomError = require("./customError");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImageToCloudinaryTwo = async (fileBuffer) => {
  try {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          resource_type: "image",
          // transformation: [
          //   { width: 500, height: 500, crop: "limit", format: "jpg" },
          // ],
        },
        (error, result) => {
          if (error) {
            console.error("Cloudinary upload failed:", error);
            return reject(error);
          }
          console.log("Cloudinary upload result:", result);
          resolve(result.secure_url);
        }
      );

      stream.end(fileBuffer);
    });
  } catch (error) {
    console.error("Cloudinary upload failed:", error);
    throw new CustomError(
      500,
      `Failed to upload image to Cloudinary: ${error.message}`
    );
  }
};

module.exports = { uploadImageToCloudinaryTwo };