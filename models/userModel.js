const mongoose = require("mongoose");

const userSchema =  mongoose.Schema(
  {
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
    profile:{
      type: String,
      default: "https://bootdey.com/img/Content/avatar/avatar7.png"
    }
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
