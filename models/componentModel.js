const mongoose = require("mongoose");

const componentSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true },
    name: { type: String, required: true},
    comp: { type: Object, required: true },
  },
  {
    timestamps: true,
  }
);

const Component =
  mongoose.models.Component || mongoose.model("Component", componentSchema);

module.exports = Component;