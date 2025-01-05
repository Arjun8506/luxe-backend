const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    image: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    year: { type: String },
    type: { type: String },
    power: { type: String },
    mrp: { type: Number ,required: true},
    discountedPrice: { type: Number },
    features: [{ type: String }],
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category" ,required: true},
    subcategoryId: { type: mongoose.Schema.Types.ObjectId, ref: "SubCategory"},
    brand: { type: String },
    color: { type: String },
   
});

const ProductModel = mongoose.model("Product", productSchema);
module.exports = ProductModel;