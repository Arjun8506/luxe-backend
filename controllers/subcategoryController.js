const SubCategoryModel = require("../models/subcategoryModel");

exports.addSubCategory = async (req, res) => {
  try {
    const data = req.body;
    const objData = {
      name: data.name,
      categoryId: data.categoryId,
    };
    const addSubCategory = await SubCategoryModel.create(objData);

    if (!addSubCategory) {
      return res.json({
        status: "failed",
        message: "subcategory not added",
      });
    }
    res.json({
      status: "success",
      message: "subcategory added successfully",
      data: addSubCategory,
    });
  } catch (error) {
    res.json({
      status: "failed",
      message: "internal server error",
      error,
    });
  }
};

exports.fetchSubCategory = async (req, res) => {
  try {
    const fetchSubCategory = await SubCategoryModel.find({}).populate(
      "categoryId"
    );
    if (!fetchSubCategory) {
      res.json({
        status: "failed",
        message: "subcategory not fetched",
        data: [],
      });
    }
    res.json({
      status: "success",
      message: "subcategory fetched successfully",
      data: fetchSubCategory,
    });
  } catch (error) {
    res.json({
      status: "failed",
      message: "internal server error",
      error,
    });
  }
};

exports.deleteSubCategory = async (req, res) => {
  try {
    const deleteSubCategory = await SubCategoryModel.deleteOne({
      _id: req.params.id,
    });
    if (!deleteSubCategory) {
      return res.json({
        status: "failed",
        message: "subcategory not deleted",
      });
    }
    res.json({
      status: "success",
      message: "subcategory deleted successfully",
      data: deleteSubCategory,
    });
  } catch (error) {
    res.json({
      status: "failed",
      message: "internal server error",
      error,
    });
  }
};

exports.updateSubCategory = async (req, res) => {
  try {
    const data = req.body;
    const objData = {
      name: data.name,
      categoryId: data.categoryId,
    };
    const updateSubCategory = await SubCategoryModel.updateOne(
      { _id: req.params.id },
      objData
    );
    if (!updateSubCategory) {
      return res.json({
        status: "failed",
        message: "subcategory not updated",
      });
    }
    res.json({
      status: "success",
      message: "subcategory updated successfully",
      data: updateSubCategory,
    });
  } catch (error) {
    res.json({
      status: "failed",
      message: "internal server error",
      error,
    });
  }
};
