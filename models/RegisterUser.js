const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const express = require("express");

const RegisterUserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    cpassword: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// we are hashing the password
const RegisterUserModel = mongoose.model("registeruser", RegisterUserSchema);
module.exports = RegisterUserModel;

// here we are calling the pre function which has two parameters 1. type 2. function
// RegisterUserSchema.pre("save", async function (next) {
//   // to check this code is running or not we can check like this
//   console.log("hi i am from inside");
//   if (this.isModified("password")) {
//     this.password = bcrypt.hash(this.password, 10);
//     this.cpassword = bcrypt.hash(this.cpassword, 10);
//   }
//   next();
// });