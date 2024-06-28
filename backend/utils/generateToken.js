import jwt from "jsonwebtoken";

// Helper function to generate access tokens
const generateAccessToken = (res, userId, role) => {
  const accessToken = jwt.sign(
    { _id: userId, role },
    process.env.JWT_ACCESS_SECRET,
    {
      expiresIn: "1h",
    }
  );

  res.cookie("access_token", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production" ? true : false,
    sameSite: "strict",
    maxAge: 1 * 60 * 60 * 1000,
  });

  return accessToken;
};

// Helper function to generate refresh tokens
const generateRefreshToken = (res, userId, role) => {
  const refreshToken = jwt.sign(
    { _id: userId, role },
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: "7d",
    }
  );

  res.cookie("refresh_token", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production" ? true : false,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

export { generateAccessToken, generateRefreshToken };
