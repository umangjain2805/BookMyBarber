import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import { getSystemStats, getAllUsers } from "../services/admin.service.js";

const getSystemStatsController = asyncHandler(async (req, res) => {
  const stats = await getSystemStats();

  res.status(200).json(
    new ApiResponse(200, "System stats retrieved successfully", stats)
  );
});

const getAllUsersController = asyncHandler(async (req, res) => {
  const users = await getAllUsers();

  res.status(200).json(
    new ApiResponse(200, "Users retrieved successfully", users)
  );
});

export { getSystemStatsController, getAllUsersController };
