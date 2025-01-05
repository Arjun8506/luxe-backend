const express = require("express");
const { addCategory, fetchCategory, deleteCategory, updateCategory } = require("../controllers/categoryController");
const { addSubCategory, fetchSubCategory, deleteSubCategory, updateSubCategory } = require("../controllers/subcategoryController");
const { addProduct, filterByCategory, allProducts } = require("../controllers/productController");
const multer = require("multer")
const upload = multer();


const productRouter = express.Router();


// category

productRouter.post("/category",upload.single("icon"),addCategory);
productRouter.get("/category",fetchCategory);
productRouter.delete("/category/:id",deleteCategory);
productRouter.put("/category/:id",updateCategory);

// subcategory

productRouter.post("/subcategory",addSubCategory);
productRouter.get("/subcategory",fetchSubCategory);
productRouter.delete("/subcategory/:id",deleteSubCategory);
productRouter.put("/subcategory/:id",updateSubCategory);

// product

productRouter.post("/",upload.single("image"),addProduct);
productRouter.get("/:categoryId",filterByCategory);
productRouter.get("/",allProducts);




module.exports = productRouter;