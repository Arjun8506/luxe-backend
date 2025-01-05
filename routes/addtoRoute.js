const express = require("express");
const { addToCart, fetchCart } = require("../controllers/addtoCartController");
const { authMiddleware } = require("../middlewares/authMiddleware");

const addToCardRouter = express.Router();


addToCardRouter.post("/",authMiddleware,addToCart)
addToCardRouter.get("/",authMiddleware,fetchCart)

module.exports = addToCardRouter;