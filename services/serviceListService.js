const { default: mongoose } = require("mongoose");
const ServiceList = require("../models/serviceModel");
const CustomError = require("../utils/customError");

exports.createServiceList = async (servicesListData) => {
  try {
    const serviceList = new ServiceList(servicesListData);
    await serviceList.save();
    return serviceList;
  } catch (error) {
    throw new CustomError(500, error.message);
  }
};

exports.addService = async (serviceListId, data) => {
  try {
    const serviceList = await ServiceList.findById(serviceListId);
    if (!serviceList) {
      throw new CustomError(404, "service list not found");
    }
    serviceList.services.push(data);
    await serviceList.save();
    return serviceList;
  } catch (error) {
    throw new CustomError(500, error.message);
  }
};

exports.getServiceList = async () => {
  try {
    const serviceList = await ServiceList.find();
    return serviceList;
  } catch (error) {
    throw new CustomError(500, "error fetching service list");
  }
};

exports.updateServiceList = async (serviceListId, serviceId, serviceData) => {
  try {
    const serviceList = await ServiceList.findById(serviceListId);
    if (!serviceList) {
      throw new CustomError(404, "ServiceList not found");
    }
    const objectId = new mongoose.Types.ObjectId(serviceId);

    // Find the service using the ObjectId
    const service = serviceList.services.id(objectId);
    if (!service) {
      throw new CustomError(404, "Service not found in the ServiceList");
    }

    Object.assign(service, serviceData);
    await serviceList.save();
    return serviceList;
  } catch (error) {
    throw new CustomError(500, "Error updating the service list");
  }
};

exports.deleteService = async (serviceListId, serviceId) => {
  try {
    const serviceList = await ServiceList.findById(serviceListId);
    if (!serviceList || !serviceList.services.length) {
      throw new CustomError(404, "ServiceList not found");
    }
    serviceList.services = serviceList.services.filter(
      (service) => service._id.toString() !== serviceId
    );
    await serviceList.save();
    return serviceList;
  } catch (error) {
    throw new CustomError(500, "Error deleting service");
  }
};