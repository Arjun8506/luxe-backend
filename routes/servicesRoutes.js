const express = require("express");
const router = express.Router();
const serviceListController = require("../controllers/serviceController");

router.post("/create", serviceListController.createServiceList);
router.post("/add/:id", serviceListController.addService);
router.get("/all", serviceListController.getServiceList);
router.put("/update/:id", serviceListController.updateService);
router.delete("/delete/:id", serviceListController.deleteService);

module.exports = router;
