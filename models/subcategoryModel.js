const mongoose = require("mongoose");

const subcategorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
},{
    timestamps: true
});

const SubCategoryModel = mongoose.model("SubCategory", subcategorySchema);
module.exports = SubCategoryModel;