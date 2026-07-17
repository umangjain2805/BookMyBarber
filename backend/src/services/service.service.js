import Service from "../models/Service.js";
import Shop from "../models/Shop.js";
import ApiError from "../utils/ApiError.js";

const createService = async (serviceData, ownerId, userRole) => {
  const { name, price, duration, description, shop } = serviceData;

  const shopDoc = await Shop.findById(shop);
  if (!shopDoc) {
    throw new ApiError(404, "Shop not found");
  }

  if (shopDoc.owner.toString() !== ownerId.toString() && userRole !== "ADMIN") {
    throw new ApiError(403, "Not authorized to add services to this shop");
  }

  const service = await Service.create({
    name,
    price,
    duration,
    description,
    shop,
  });

  return service;
};

const getServicesByShop = async (shopId) => {
  const services = await Service.find({ shop: shopId });
  return services;
};

const updateService = async (id, ownerId, updateData, userRole) => {
  const service = await Service.findById(id).populate("shop");
  if (!service) {
    throw new ApiError(404, "Service not found");
  }

  if (service.shop.owner.toString() !== ownerId.toString() && userRole !== "ADMIN") {
    throw new ApiError(403, "Not authorized to update this service");
  }

  Object.keys(updateData).forEach((key) => {
    service[key] = updateData[key];
  });

  await service.save();
  return service;
};

const deleteService = async (id, ownerId, userRole) => {
  const service = await Service.findById(id).populate("shop");
  if (!service) {
    throw new ApiError(404, "Service not found");
  }

  if (service.shop.owner.toString() !== ownerId.toString() && userRole !== "ADMIN") {
    throw new ApiError(403, "Not authorized to delete this service");
  }

  await service.deleteOne();
  return { success: true };
};

export { createService, getServicesByShop, updateService, deleteService };
