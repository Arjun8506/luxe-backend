const serviceListService = require("../services/serviceListService");
const CustomError = require("../utils/customError");

exports.createServiceList = async (req, res, next) => {
  try {
    const { icon, title, image, services } = req.body;

    if (!icon || !title || !image || !services) {
      return res.status(400).json({
        status: "failed",
        message: "missing required fields",
      });
    }

    const serviceListData = { icon, title, image, services };
    const newServiceList = await serviceListService.createServiceList(
      serviceListData
    );

    return res.status(201).json({
      status: "success",
      message: "service created successfully",
      data: newServiceList,
    });
  } catch (error) {
    next(error);
  }
};

exports.addService = async (req, res, next) => {
  const serviceListId = req.params.id;
  const { data } = req.body;
  try {
    const result = await serviceListService.addService(serviceListId, data);
    return res.status(201).json({
      status: "success",
      message: "service created successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

exports.getServiceList = async (req, res, next) => {
  try {
    const result = await serviceListService.getServiceList();
    return res.status(200).json({
      status: "success",
      message: "services fetched successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateService = async (req, res, next) => {
  try {
    const serviceListId = req.params.id;
    const { serviceId, serviceData } = req.body;

    const result = await serviceListService.updateServiceList(
      serviceListId,
      serviceId,
      serviceData
    );
    return res.status(200).json({
      status: "success",
      message: "service updated successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteService = async (req, res, next) => {
  const serviceListId = req.params.id;
  const { serviceId } = req.body;
  try {
    await serviceListService.deleteService(serviceListId, serviceId);
    return res.status(200).json({
      status: "success",
      message: "service deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
