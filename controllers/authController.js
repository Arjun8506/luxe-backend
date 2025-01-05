const AuthUser = require("../models/authModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
exports.registerUser = async (req, res) => {
  try {
    const data = req.body;
    const objdata = {
      name: data.name,
      email: data.email,
      password: data.password,
      number: data.name,
      role:"user"
    };
    const userExist = await AuthUser.findOne({ email: objdata.email }); 
    if (userExist) {
      return res.json({
        status: "failed",
        message: "user already exist",
      });
    }

    const salt = await bcrypt.genSalt(10);
    objdata.password = await bcrypt.hash(objdata.password, salt);

    const user = await AuthUser.create(objdata);
    if (!user) {
      return res.json({
        status: "failed",
        message: "user not registered",
      });
    } else {
      res.json({
        status: "success",
        message: "user registered successfully",
        data: user,
      });
    }
  } catch (error) {
    res.json({
      status: "failed",
      message: "unauthorized user",
      error,
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await AuthUser.findOne({ email: email }, { __v: 0, });
    if (!user) {
      return res.json({
        status: "failed",
        message: "user not found",  
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    if (!isMatch) {
      return res.json({
        status: "failed",
        message: "invalid credentials",
      });
    }
    const objdata = user.toObject();
    objdata["token"] = token;
    res.json({
      status: "success",
      message: "user logged in successfully",
      data: objdata,
    });
  } catch (error) {
    res.json({
      status: "failed",
      message: "unauthorized user",
      error,
    });
  }
};