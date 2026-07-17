import Shop from "../models/Shop.js";
import ApiError from "../utils/ApiError.js";

const createShop = async (shopData, ownerId) => {
  const { name, address, coordinates, description, phone, workingHours } = shopData;

  const shop = await Shop.create({
    name,
    owner: ownerId,
    address,
    location: {
      type: "Point",
      coordinates, // [longitude, latitude]
    },
    description,
    phone,
    workingHours,
  });

  return shop;
};

const getAllShops = async (queryParams) => {
  const { lat, lng, radiusInKm = 10 } = queryParams;

  let filter = {};

  if (lat && lng) {
    const parsedLat = parseFloat(lat);
    const parsedLng = parseFloat(lng);

    filter.location = {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [parsedLng, parsedLat],
        },
        $maxDistance: radiusInKm * 1000,
      },
    };
  }

  const shops = await Shop.find(filter).populate("owner", "name email");
  return shops;
};

const getShopById = async (id) => {
  const shop = await Shop.findById(id).populate("owner", "name email");
  if (!shop) {
    throw new ApiError(404, "Shop not found");
  }
  return shop;
};

const updateShop = async (id, ownerId, updateData, userRole) => {
  const shop = await Shop.findById(id);
  if (!shop) {
    throw new ApiError(404, "Shop not found");
  }

  if (shop.owner.toString() !== ownerId.toString() && userRole !== "ADMIN") {
    throw new ApiError(403, "Not authorized to update this shop");
  }

  const { coordinates, ...rest } = updateData;

  if (coordinates) {
    shop.location = {
      type: "Point",
      coordinates,
    };
  }

  Object.keys(rest).forEach((key) => {
    shop[key] = rest[key];
  });

  await shop.save();
  return shop;
};

const deleteShop = async (id, ownerId, userRole) => {
  const shop = await Shop.findById(id);
  if (!shop) {
    throw new ApiError(404, "Shop not found");
  }

  if (shop.owner.toString() !== ownerId.toString() && userRole !== "ADMIN") {
    throw new ApiError(403, "Not authorized to delete this shop");
  }

  await shop.deleteOne();
  return { success: true };
};

export { createShop, getAllShops, getShopById, updateShop, deleteShop };
