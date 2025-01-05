const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");

router.post("/create", blogController.createBlog);
router.put("/update/:id", blogController.updateBlog);
router.delete("/delete/:id", blogController.deleteBlog);
router.get("/all", blogController.fetchBlog);
router.get("/", blogController.fetchBlogBySlug);

module.exports = router;