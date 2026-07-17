import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import {
  createShop,
  getAllShops,
  getShopById,
  updateShop,
  deleteShop,
} from "../services/shop.service.js";

const createShopController = asyncHandler(async (req, res) => {
  const shop = await createShop(req.body, req.user._id);

  res.status(201).json(
    new ApiResponse(201, "Shop created successfully", shop)
  );
});

const getAllShopsController = asyncHandler(async (req, res) => {
  const shops = await getAllShops(req.query);

  res.status(200).json(
    new ApiResponse(200, "Shops retrieved successfully", shops)
  );
});

const getShopByIdController = asyncHandler(async (req, res) => {
  const shop = await getShopById(req.params.id);

  res.status(200).json(
    new ApiResponse(200, "Shop retrieved successfully", shop)
  );
});

const updateShopController = asyncHandler(async (req, res) => {
  const shop = await updateShop(
    req.params.id,
    req.user._id,
    req.body,
    req.user.role
  );

  res.status(200).json(
    new ApiResponse(200, "Shop updated successfully", shop)
  );
});

const deleteShopController = asyncHandler(async (req, res) => {
  await deleteShop(req.params.id, req.user._id, req.user.role);

  res.status(200).json(
    new ApiResponse(200, "Shop deleted successfully")
  );
});

export {
  createShopController,
  getAllShopsController,
  getShopByIdController,
  updateShopController,
  deleteShopController,
};
