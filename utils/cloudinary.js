const CustomError = require("./customError");
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImageToCloudinary = async (fileBuffer) => {
  try {
    if (fileBuffer) {
      const uploadFromBuffer = (buffer) => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              folder: "luxe",
            },
            (error, result) => {
              if (error) {
                reject(error);
              } else {
                resolve(result);
              }
            }
          );
          streamifier.createReadStream(buffer).pipe(stream);
        });
      };
      const result = await uploadFromBuffer(fileBuffer.buffer);
      console.log(result, "cloudinary result");
      return result.url;
    }
  } catch (error) {
    console.error("Cloudinary upload failed:", error);
    throw new CustomError(
      500,
      `Failed to upload image to Cloudinary: ${error.message}`
    );
  }
};

module.exports = { uploadImageToCloudinary };
