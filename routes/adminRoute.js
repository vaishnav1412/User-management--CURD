const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const { securePassword } = require("../config/bcryptConfig");


//Admin Login
router.post("/admin-login", (req, res) => {
  const adminEmail = "admin@gmail.com";
  const adminPassword = "12345";

  if (req.body.email === adminEmail && req.body.password === adminPassword) {
    const adminKey = jwt.sign({ id: "thisIsAdmin" }, process.env.JWT_Secret, {
      expiresIn: "1d",
    });
    res.status(200).send({
      message: "Admin logged in successfully",
      success: true,
      adminKey,
    });
  } else {
    res
      .status(200)
      .send({ message: "Username or password is incorrect", success: false });
  }
});

//get users list
router.post("/users-list", async (req, res) => {
  try {
    const users = await User.find();
    res
      .status(200)
      .send({ message: "Users fetched successsfully", success: true, users });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Something went wrong on server side" });
  }
});

//delete user by id
router.post("/delete-user-by-id", async (req, res) => {
  try {
    const data = await User.findOneAndDelete({_id:req.body.id});
    if (data) {
      res
        .status(200)
        .send({ message: "User deleted successfully", success: true });
    } else {
      res.status(200).send({ message: "User not found", success: false });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Server side error", success: false });
  }
});

//get user data
router.post("/get-user-data", async (req, res) => {
  try {
    const data = await User.findOne({ _id: req.body.id });
    if (data) {
      res
        .status(200)
        .send({
          message: "User data fetched successfully",
          success: true,
          data,
        });
    } else {
      res.status(200).send({ message: "User not found", success: false });
    }
  } catch (error) {
    res.status(500).send({ message: "Server Side Error", success: false });
  }
});

//edit user info
router.post("/edit-user-info", async (req, res) => {
  try {
    const data = await User.findByIdAndUpdate(req.body.id, {
      name: req.body.name,
      email: req.body.email,
    });
    if(data){
      res.status(200).send({message: "User updated succesfully" , success: true})
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "server side error", success: false });
  }
});

//add new user
router.post("/add-user", async (req,res) => {
  try {
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      return res
        .status(200)
        .send({ message: "User already exist", success: false });
    }
    const hashedPassword = await securePassword(req.body.password);
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    await user.save();
    res
      .status(200)
      .send({ message: "User created successfully", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "server side error", success: false });
  }
})

module.exports = router;
