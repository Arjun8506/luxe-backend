const mongoose = require("mongoose");

const addToCardSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
});

const AddToCard = mongoose.model("AddToCard", addToCardSchema);
module.exports = AddToCard;