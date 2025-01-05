const CategoryModel = require("../models/categoryModel");
const { uploadImageToCloudinary } = require("../utils/cloudinary");

exports.addCategory = async (req, res) => {
    try {
        const data = req.body;
        console.log(data)
    const icon = await uploadImageToCloudinary(req.file);
        const objData = {
            name: data.name,
            icon: icon
        }
        const addCategory = await CategoryModel.create(objData);

        if(!addCategory){
            return res.json({
                status: "failed",
                message: "category not added",
            });
        }
        res.json({
            status: "success",
            message: "category added successfully",
            data: addCategory,
        });
    } catch (error) {
        res.json({
            status: "failed",
            message: "internal server error",
            error
        })
    }
}


exports.fetchCategory = async (req, res) => {
    try {
        const fetchCategory = await CategoryModel.find({});
        if(!fetchCategory){
             res.json({
                status: "failed",
                message: "category not fetched",
                data:[]
            })
        }
        res.json({
            status: "success",
            message: "category fetched successfully",
            data: fetchCategory,
        });
    } catch (error) {
        res.json({
            status: "failed",
            message: "internal server error",
            error
        })
    }
}

exports.deleteCategory = async (req, res) => {
    try {
        const deleteCategory = await CategoryModel.deleteOne({_id:req.params.id});
        if(!deleteCategory){
            return res.json({
                status: "failed",
                message: "category not deleted",
            });
        }
        res.json({
            status: "success",
            message: "category deleted successfully",
            data: deleteCategory,
        });
    } catch (error) {
        res.json({
            status: "failed",
            message: "internal server error",
            error
        })
    }
}


exports.updateCategory = async (req, res) => {
    try {
        const data = req.body;
        const objData = {
            name: data.name,
            icon: data.icon
        }
        const updateCategory = await CategoryModel.updateOne({_id:req.params.id},objData);
        if(!updateCategory){
            return res.json({
                status: "failed",
                message: "category not updated",
            });
        }
        res.json({
            status: "success",
            message: "category updated successfully",
            data: updateCategory,
        });
    } catch (error) {
        res.json({
            status: "failed",
            message: "internal server error",
            error
        })
    }
}
