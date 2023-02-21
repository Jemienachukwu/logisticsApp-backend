import User from "../models/userModels.js";
import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";

export const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, phoneNumber, password } = req.body;
  const emailVerify = await User.findOne({ email }, null, { maxTimeMS: 5000 });
  const phoneVerify = await User.findOne({ phoneNumber }, null, {
    maxTimeMS: 5000,
  });

  if (emailVerify || phoneVerify) {
    return res.status(401).json({ message: "Phone or email already exist" });
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

    return res.status(201).json({ message: "user created successfully" });
  }
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    const passwordVerify = await bcrypt.compare(password, user.password);
    if (passwordVerify) {
      res.json({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        roles: user.roles,
        token: generateToken(user._id),
        isAdmin: user.isAdmin,
        profilePic: user.profilePic,
        phoneNumber: user.phoneNumber,
      });
    } else {
      return res.status(401).json({ message: "Invalid password" });
    }
  } else {
    return res.status(401).json({ message: "Invalid credentials" });
  }
});

export const userProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      roles: user.roles,
      isAdmin: user.isAdmin,
      profilePic: user.profilePic,
      phoneNumber: user.phoneNumber,
    });
  } else {
    res.status(404);
    throw new Error("user not found");
  }
});
