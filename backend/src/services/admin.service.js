import User from "../models/User.js";
import Shop from "../models/Shop.js";
import Barber from "../models/Barber.js";
import Booking from "../models/Booking.js";

const getSystemStats = async () => {
  const totalUsers = await User.countDocuments();
  const totalShops = await Shop.countDocuments();
  const totalBarbers = await Barber.countDocuments();
  const totalBookings = await Booking.countDocuments();

  return {
    totalUsers,
    totalShops,
    totalBarbers,
    totalBookings,
  };
};

const getAllUsers = async () => {
  const users = await User.find().select("-password");
  return users;
};

export { getSystemStats, getAllUsers };
