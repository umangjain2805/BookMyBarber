import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import { registerUser, loginUser } from "../services/auth.service.js";
import generateToken from "../utils/generateToken.js";

const register = asyncHandler(async (req, res) => {
  const user = await registerUser(req.body);

  const token = generateToken(res, user._id);

  res.status(201).json(
    new ApiResponse(
      201,
      "User registered successfully",
      { user, token }
    )
  );
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await loginUser(email, password);

  const token = generateToken(res, user._id);

  res.status(200).json(
    new ApiResponse(
      200,
      "User logged in successfully",
      { user, token }
    )
  );
});

const logout = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json(
    new ApiResponse(
      200,
      "User logged out successfully"
    )
  );
});

export { register, login, logout };
