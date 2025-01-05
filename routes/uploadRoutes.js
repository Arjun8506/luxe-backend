// const express = require("express");
// const upload = require("../middlewares/uploadMiddleware");
// const router = express.Router();

// // API for image upload

// router.post("/upload", upload.single("image"), (req, res) => {
//   if (!req.file) {
//     return res.status(400).json({ message: "no file uploaded" });
//   }

//   const imageUrl = `/images/${req.file.filename}`;
//   res.json({ message: "image uploaded successfully", imageUrl });
// });


//  module.exports = router;