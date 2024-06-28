import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateToken.js";

//@desc     Register new user
//@route    POST /api/auth/signup
//@access   Public
const signupUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, department, position, email } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({
      message: "User already exists",
    });
  }

  const user = await User.create({
    firstName,
    lastName,
    department,
    position,
    email,
    password: req.body.password,
  });

  const { password, __v, ...others } = user._doc;

  res.status(201).json(others);
});

//@desc     Login user
//@route    POST /api/auth/login
//@access   Public
const loginUser = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(400).json({
      message: "User does not exist",
    });
  } else if (user && !(await user.matchPassword(req.body.password))) {
    return res.status(401).json({
      message: "Invalid credentials",
    });
  }

  generateAccessToken(res, user._id, user.role);
  generateRefreshToken(res, user._id, user.role);

  const { password, __v, ...others } = user._doc;

  res.status(201).json(others);
});

//@desc     Logout user
//@route    POST /api/auth/logout
//@access   Private
const logoutUser = asyncHandler(async (req, res) => {
  res
    .clearCookie("access_token")
    .clearCookie("refresh_token")
    .json({ message: "user Logged out" });
});

//@desc     Refresh token
//@route    POST /api/auth/refresh
//@access   Private
const refreshToken = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies.refresh_token;

  if (!refreshToken) {
    return res.status(401).json({
      message: "No refresh token",
    });
  } else {
    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({
          message: "Invalid refresh token",
        });
      } else {
        const accessToken = generateAccessToken(res, user._id, user.role);

        res.status(200).json({ accessToken });
      }
    });
  }
});

export { signupUser, loginUser, logoutUser, refreshToken };
