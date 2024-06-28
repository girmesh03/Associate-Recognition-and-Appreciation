import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";

//@desc     Get all users
//@route    GET /api/users
//@access   Private
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  console.log("users", users);
  res.status(200).json(users);
});

export { getAllUsers };
