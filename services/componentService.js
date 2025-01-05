const Component = require("../models/componentModel");
const CustomError = require("../utils/customError");
const mongoose = require("mongoose");

const addComponent = async (componentData) => {
try {
    const existingComponent = await Component.findOne({
      slug: componentData.slug,
      name: componentData.name,
    });
    if (existingComponent) {
      // updat the existing component
      existingComponent.comp = componentData.comp; // update the component data
      const updatedComponent = await existingComponent.save();

      return { isNew: false, data: updatedComponent };
    }

    const newComponent = new Component(componentData);
    const savedComponent = await newComponent.save();

    return { isNew: true, data: savedComponent };
  } catch (error) {
    throw new Error(`Error creating component: ${error.message}`);
  }
};

const updateComponentById = async (id, updateData) => {
  try {
    const updatedComponent = await Component.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    return updatedComponent;
  } catch (error) {
    throw new CustomError(error.message);
  }
};

const getComponentById = async (id) => {
  console.log(id, "id here");

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new CustomError(400, "Invalid ID format");
  }

  try {
    const component = await Component.findById(id);

    if (!component) {
      throw new CustomError(404, "Component not found");
    }

    return component;
  } catch (error) {
    throw new CustomError(500, error.message);
  }
};

const getComponentBySlug = async (slug) => {
  try {
    return await Component.find({ slug });
  } catch (error) {
    throw new CustomError(500, "error fetching components");
  }
};

module.exports = {
  updateComponentById,
  getComponentById,
  addComponent,
  getComponentBySlug,
};