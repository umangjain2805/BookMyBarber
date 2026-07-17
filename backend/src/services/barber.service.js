import Barber from "../models/Barber.js";
import Shop from "../models/Shop.js";
import ApiError from "../utils/ApiError.js";

const createBarber = async (barberData, ownerId, userRole) => {
  const { user, shop, specialties, availability } = barberData;

  const shopDoc = await Shop.findById(shop);
  if (!shopDoc) {
    throw new ApiError(404, "Shop not found");
  }

  if (shopDoc.owner.toString() !== ownerId.toString() && userRole !== "ADMIN") {
    throw new ApiError(403, "Not authorized to add barbers to this shop");
  }

  const existingBarber = await Barber.findOne({ user });
  if (existingBarber) {
    throw new ApiError(400, "This user account is already a registered barber");
  }

  const barber = await Barber.create({
    user,
    shop,
    specialties,
    availability,
  });

  return barber;
};

const getBarbersByShop = async (shopId) => {
  const barbers = await Barber.find({ shop: shopId }).populate("user", "name email profileImage");
  return barbers;
};

const getBarberById = async (id) => {
  const barber = await Barber.findById(id)
    .populate("user", "name email profileImage phone")
    .populate("shop", "name address");
  if (!barber) {
    throw new ApiError(404, "Barber not found");
  }
  return barber;
};

const updateBarber = async (id, ownerId, updateData, userRole) => {
  const barber = await Barber.findById(id).populate("shop");
  if (!barber) {
    throw new ApiError(404, "Barber not found");
  }

  if (barber.shop.owner.toString() !== ownerId.toString() && userRole !== "ADMIN") {
    throw new ApiError(403, "Not authorized to update this barber profile");
  }

  Object.keys(updateData).forEach((key) => {
    barber[key] = updateData[key];
  });

  await barber.save();
  return barber;
};

const deleteBarber = async (id, ownerId, userRole) => {
  const barber = await Barber.findById(id).populate("shop");
  if (!barber) {
    throw new ApiError(404, "Barber not found");
  }

  if (barber.shop.owner.toString() !== ownerId.toString() && userRole !== "ADMIN") {
    throw new ApiError(403, "Not authorized to remove this barber profile");
  }

  await barber.deleteOne();
  return { success: true };
};

export { createBarber, getBarbersByShop, getBarberById, updateBarber, deleteBarber };
