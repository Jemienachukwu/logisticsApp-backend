const User = require("../models/userModels");
const bcrypt = require("bcryptjs");
const router = require("express").Router();

router.route("/register").post(async (req, res) => {
  const { firstName, lastName, email, phoneNumber, password } = req.body;

  const number = await User.findOne({ phoneNumber });
  const emailVerify = await User.findOne({ email });

  if (number || emailVerify) {
    res.json({
      //   hasError: true,
      message: "Phone or email already exist",
    });
  }

  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, salt);

  const user = User.create({
    email,
    phoneNumber,
    firstName,
    lastName,
    password: passwordHash,
  });

  res.json({
    hasError: false,
    message: "user created successfully",
    user,
  });
});
