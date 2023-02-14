import User from "../models/userModels.js";
import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";

export const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, phoneNumber, password } = req.body;
  const emailVerify = await User.findOne({ email });
  const phoneVerify = await User.findOne({ phoneNumber });

  if (emailVerify || phoneVerify) {
    res.json({
      hasError: true,
      message: "Phone or email already exist",
    });
    return;
  } else {
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const user = {
      firstName,
      lastName,
      email,
      phoneNumber,
    };

    await User.create({
      email,
      phoneNumber,
      firstName,
      lastName,
      password: passwordHash,
      user,
    });

    res.json({
      hasError: false,

      message: "user created successfully",
      user,
    });
  }
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  const passwordVerify = await user.matchPassword(password);

  if (user && passwordVerify) {
    res.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      roles: user.roles,
      //   token: generateToken(user._id),
      isAdmin: user.isAdmin,
      hasError: false,
      profilePic: user.profilePic,
      phoneNumber: user.phoneNumber,
    });
  } else {
    res.json({
      hasError: true,
      message: "invalid email or password",
    });
  }
});
