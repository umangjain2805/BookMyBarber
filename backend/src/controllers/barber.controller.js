import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import {
  createBarber,
  getBarbersByShop,
  getBarberById,
  updateBarber,
  deleteBarber,
} from "../services/barber.service.js";

const createBarberController = asyncHandler(async (req, res) => {
  const barber = await createBarber(req.body, req.user._id, req.user.role);

  res.status(201).json(
    new ApiResponse(201, "Barber profile created successfully", barber)
  );
});

const getBarbersByShopController = asyncHandler(async (req, res) => {
  const { shopId } = req.params;
  const barbers = await getBarbersByShop(shopId);

  res.status(200).json(
    new ApiResponse(200, "Barbers retrieved successfully", barbers)
  );
});

const getBarberByIdController = asyncHandler(async (req, res) => {
  const barber = await getBarberById(req.params.id);

  res.status(200).json(
    new ApiResponse(200, "Barber retrieved successfully", barber)
  );
});

const updateBarberController = asyncHandler(async (req, res) => {
  const barber = await updateBarber(
    req.params.id,
    req.user._id,
    req.body,
    req.user.role
  );

  res.status(200).json(
    new ApiResponse(200, "Barber updated successfully", barber)
  );
});

const deleteBarberController = asyncHandler(async (req, res) => {
  await deleteBarber(req.params.id, req.user._id, req.user.role);

  res.status(200).json(
    new ApiResponse(200, "Barber deleted successfully")
  );
});

export {
  createBarberController,
  getBarbersByShopController,
  getBarberByIdController,
  updateBarberController,
  deleteBarberController,
};
