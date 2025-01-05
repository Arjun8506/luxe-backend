const mongoose = require("mongoose");

const authUserCretateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    number:{
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
});



const AuthUser = mongoose.model("User", authUserCretateSchema);
module.exports = AuthUser;