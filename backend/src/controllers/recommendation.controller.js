import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import {
  getRecommendedShops,
  getRecommendedBarbers,
} from "../services/recommendation.service.js";

const getRecommendationsController = asyncHandler(async (req, res) => {
  const shops = await getRecommendedShops(req.query);
  const barbers = await getRecommendedBarbers();

  res.status(200).json(
    new ApiResponse(200, "Recommendations retrieved successfully", {
      shops,
      barbers,
    })
  );
});

export { getRecommendationsController };
