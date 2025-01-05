const ProductModel = require("../models/productModel");
const { uploadImageToCloudinary } = require("../utils/cloudinary");

exports.addProduct = async (req, res) => {
  try {
    const data = req.body;
    const image = await uploadImageToCloudinary(req.file);
    
    const newProduct = new ProductModel({
      image: image,
      title: data.title,
      description: data.description,
      year: data.year,
      type: data.type,
      power: data.power,
      mrp: data.mrp,
      discountedPrice: data.discountedPrice,
      features: JSON.parse(data.features),
      categoryId: data.categoryId,
      subcategoryId: data.subcategoryId || null,
      brand: data.brand,
      color: data.color,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json({
      success: true,
      message: "Product added successfully!",
      product: savedProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error adding product",
      error: error.message,
    });
  }};

exports.filterByCategory = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const products = await ProductModel.find({ categoryId: categoryId });
    if (products.length === 0) {
      res.json({
        success: false,
        message: "No products found for this category",
        data: [],
      });   
    } else {
      res.json({
        success: true,
        message: "Products found",
        data: products,
      });
    }
  } catch (error) {
    res.json({
      success: false,
      message: "Error fetching products",
      error: error.message,
    });
  }
};

exports.allProducts = async (req, res) => {
  try {
    const products = await ProductModel.find({}).populate("categoryId");
    if (products.length === 0) {
      res.json({
        success: false,
        message: "No products found",
        data: [],
      });
    } else {
      res.json({
        success: true,
        message: "Products found",
        data: products,
      });
    }
  } catch (error) {
    res.json({
      success: false,
      message: "Error fetching products",
      error: error.message,
    });
  }
};