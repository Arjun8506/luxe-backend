const mongoose = require("mongoose");

const addToCardSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    }
});

const AddToCard = mongoose.model("AddToCard", addToCardSchema);
module.exports = AddToCard;