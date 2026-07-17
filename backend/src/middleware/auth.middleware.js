import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import User from "../models/User.js";

export const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Read token from cookie first, then headers
  if (req.cookies && req.cookies.jwt) {
    token = req.cookies.jwt;
  } else if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    throw new ApiError(401, "Not authorized, no token provided");
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get user from the database (exclude password)
    req.user = await User.findById(decoded.id).select("-password");
    if (!req.user) {
      throw new ApiError(401, "Not authorized, user not found");
    }

    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error.message);
    throw new ApiError(401, "Not authorized, token failed");
  }
});
