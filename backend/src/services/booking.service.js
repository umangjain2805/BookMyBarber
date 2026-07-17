import Booking from "../models/Booking.js";
import Barber from "../models/Barber.js";
import Service from "../models/Service.js";
import Shop from "../models/Shop.js";
import ApiError from "../utils/ApiError.js";

const timeToMinutes = (timeStr) => {
  const [hours, minutes] = timeStr.split(":").map(Number);
  return hours * 60 + minutes;
};

const addMinutesToTime = (timeStr, minsToAdd) => {
  const totalMins = timeToMinutes(timeStr) + minsToAdd;
  const hours = Math.floor(totalMins / 60) % 24;
  const minutes = totalMins % 60;
  return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
};

const hasOverlap = (start1, end1, start2, end2) => {
  const s1 = timeToMinutes(start1);
  const e1 = timeToMinutes(end1);
  const s2 = timeToMinutes(start2);
  const e2 = timeToMinutes(end2);
  return Math.max(s1, s2) < Math.min(e1, e2);
};

const createBooking = async (bookingData, customerId) => {
  const { shop, barber, services, date, startTime } = bookingData;

  const shopExists = await Shop.findById(shop);
  if (!shopExists) {
    throw new ApiError(404, "Shop not found");
  }

  const barberDoc = await Barber.findById(barber);
  if (!barberDoc || barberDoc.shop.toString() !== shop.toString()) {
    throw new ApiError(404, "Barber not found at this shop");
  }

  const servicesDocs = await Service.find({ _id: { $in: services }, shop });
  if (servicesDocs.length !== services.length) {
    throw new ApiError(400, "One or more invalid services selected for this shop");
  }

  const duration = servicesDocs.reduce((acc, curr) => acc + curr.duration, 0);
  const totalPrice = servicesDocs.reduce((acc, curr) => acc + curr.price, 0);

  const endTime = addMinutesToTime(startTime, duration);

  const bookingDate = new Date(date);
  bookingDate.setUTCHours(0, 0, 0, 0);

  const activeBookings = await Booking.find({
    barber,
    date: bookingDate,
    status: { $in: ["PENDING", "CONFIRMED"] },
  });

  for (const b of activeBookings) {
    if (hasOverlap(startTime, endTime, b.startTime, b.endTime)) {
      throw new ApiError(
        400,
        `Barber is already booked from ${b.startTime} to ${b.endTime} on this day`
      );
    }
  }

  const booking = await Booking.create({
    customer: customerId,
    shop,
    barber,
    services,
    date: bookingDate,
    startTime,
    endTime,
    totalPrice,
    duration,
  });

  return booking;
};

const getBookings = async (userId, role) => {
  if (role === "ADMIN") {
    return await Booking.find()
      .populate("customer", "name email")
      .populate("shop", "name address")
      .populate("barber")
      .populate("services");
  }

  if (role === "SHOP_OWNER") {
    const shops = await Shop.find({ owner: userId });
    const shopIds = shops.map((s) => s._id);

    return await Booking.find({ shop: { $in: shopIds } })
      .populate("customer", "name email phone")
      .populate("shop", "name address")
      .populate("barber")
      .populate("services");
  }

  return await Booking.find({ customer: userId })
    .populate("shop", "name address")
    .populate("barber")
    .populate("services");
};

const getBookingById = async (id, userId, role) => {
  const booking = await Booking.findById(id)
    .populate("customer", "name email phone")
    .populate("shop", "name address owner")
    .populate("barber")
    .populate("services");

  if (!booking) {
    throw new ApiError(404, "Booking not found");
  }

  const isCustomer = booking.customer._id.toString() === userId.toString();
  const isShopOwner = booking.shop.owner.toString() === userId.toString();
  const isAdmin = role === "ADMIN";

  if (!isCustomer && !isShopOwner && !isAdmin) {
    throw new ApiError(403, "Not authorized to view this booking");
  }

  return booking;
};

const updateBookingStatus = async (id, status, userId, role) => {
  const booking = await Booking.findById(id).populate("shop");
  if (!booking) {
    throw new ApiError(404, "Booking not found");
  }

  const isCustomer = booking.customer.toString() === userId.toString();
  const isShopOwner = booking.shop.owner.toString() === userId.toString();
  const isAdmin = role === "ADMIN";

  if (isCustomer && !isShopOwner && !isAdmin) {
    if (status !== "CANCELLED") {
      throw new ApiError(403, "Customers can only cancel their appointments");
    }
  } else if (!isShopOwner && !isAdmin) {
    throw new ApiError(403, "Not authorized to change booking status");
  }

  booking.status = status;
  await booking.save();
  return booking;
};

export { createBooking, getBookings, getBookingById, updateBookingStatus };
