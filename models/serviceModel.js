const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  image: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  year: { type: String },
  type: { type: String },
  power: { type: String },
  originalPrice: { type: String },
  discountedPrice: { type: String },
  features: [{ type: String }],
});

const serviceListSchema = new mongoose.Schema({
  icon: { type: String, required: true },
  title: { type: String, required: true },
  image: { type: String, required: true },
  services: [serviceSchema],
});

const ServiceList = mongoose.model("ServiceList", serviceListSchema);

module.exports = ServiceList;
