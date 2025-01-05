const AddToCard = require("../models/addtoCart");

exports.addToCart = async (req, res) => {
  try {
    const productId = req.body.productId;
    const userId = req.user.id;
    console.log(userId);
    const objData = {
      productId: productId,
      userId: userId,
    };
    const checkProduct = await AddToCard.findOne({ productId: productId });
    if (checkProduct) {
      return res.json({
        status: "failed",
        message: "Service already added to cart",
      });
    } else {
      const result = await AddToCard.create(objData);

      if (result) {
        return res.json({
          status: "success",
          message: "product added to cart successfully",
          data: result,
        });
      } else {
        return res.json({
          status: "failed",
          message: "product not added to cart",
        });
      }
    }
  } catch (error) {
    res.json({
      status: "failed",
      message: "internal server error",
      error,
    });
  }
};

exports.fetchCart = async (req, res) => {
  try {
    const result = await AddToCard.find({}).populate("productId").populate("userId");
    return res.json({
      status: "success",
      message: "cart fetched successfully",
      data: result,
    });
  } catch (error) {
    res.json({
      status: "failed",
      message: "internal server error",
      error,
    });
  }
};