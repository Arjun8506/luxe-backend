const express = require("express");
const componentController = require("../controllers/componentController");
const multer = require("multer");
const upload = multer();
const router = express.Router();

router
  .route("/:id")
  .get(componentController.getComponentById)
  .put(componentController.updateComponent);

router.post(
  "/create",
  upload.single("image"),
  componentController.addComponent
);
router.get("/slug/:slug", componentController.getComponentBySlug);

module.exports = router;
