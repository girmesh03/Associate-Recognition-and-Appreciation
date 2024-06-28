import express from "express";
const router = express.Router();

import {
  signupUser,
  loginUser,
  logoutUser,
  refreshToken,
} from "../controllers/authControllers.js";

router.route("/signup").post(signupUser);
router.route("/login").post(loginUser);
router.route("/logout").delete(logoutUser);
router.route("/refresh").post(refreshToken);

export default router;
