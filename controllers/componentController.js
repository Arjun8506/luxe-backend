const componentService = require("../services/componentService");

const addComponent = async (req, res) => {
  try {
    const { slug, name, comp } = req.body;

    if (!slug || !name || !comp) {
      return res.status(400).json({
        message: "Invalid input. 'slug' and 'comp' are required.",
      });
    }

    const updatedComponent = await componentService.addComponent({
      slug,
      name,
      comp,
    });

    res.status(201).json({
      status: "success",
      message: updatedComponent.isNew
        ? "component created successfully"
        : "component updated successfully",
      component: updatedComponent.data,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: error.message,
    });
  }
};

const updateComponent = async (req, res, next) => {
  const { id } = req.params;
  const comp = req.body;

  try {
    const updatedComponent = await componentService.updateComponentById(
      id,
      comp
    );

    if (!updatedComponent) {
      return res.status(404).json({
        status: "failed",
        message: "component not found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "component updated successfully",
      data: updatedComponent,
    });
  } catch (error) {
    next(error);
  }
};

const getComponentById = async (req, res) => {
  try {
    const { id } = req.params;
    const component = await componentService.getComponentById(id);
    res
      .status(200)
      .json({ message: "Component retrieved successfully", component });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

const getComponentBySlug = async (req, res) => {  
  const { slug } = req.params;
  try {
    const components = await componentService.getComponentBySlug(slug);
    if (!components || components.length === 0) {
      return res.status(404).json({
        message: "component not found",
      });
    }

    // Transform the array into an object with component  `name` as keys
    const componentsByName = components.reduce((acc, component) => {
      acc[component.name] = component;
      return acc;
    }, {});

    res.status(200).json(componentsByName);
  } catch (error) {
    res.status(500).json({
      message: "error fetching components",
    });
  }
};

module.exports = {
  updateComponent,
  getComponentById,
  addComponent,
  getComponentBySlug,
};
