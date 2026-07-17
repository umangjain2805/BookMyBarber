import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import {
  createService,
  getServicesByShop,
  updateService,
  deleteService,
} from "../services/service.service.js";

const createServiceController = asyncHandler(async (req, res) => {
  const service = await createService(req.body, req.user._id, req.user.role);

  res.status(201).json(
    new ApiResponse(201, "Service created successfully", service)
  );
});

const getServicesByShopController = asyncHandler(async (req, res) => {
  const { shopId } = req.params;
  const services = await getServicesByShop(shopId);

  res.status(200).json(
    new ApiResponse(200, "Services retrieved successfully", services)
  );
});

const updateServiceController = asyncHandler(async (req, res) => {
  const service = await updateService(
    req.params.id,
    req.user._id,
    req.body,
    req.user.role
  );

  res.status(200).json(
    new ApiResponse(200, "Service updated successfully", service)
  );
});

const deleteServiceController = asyncHandler(async (req, res) => {
  await deleteService(req.params.id, req.user._id, req.user.role);

  res.status(200).json(
    new ApiResponse(200, "Service deleted successfully")
  );
});

export {
  createServiceController,
  getServicesByShopController,
  updateServiceController,
  deleteServiceController,
};
