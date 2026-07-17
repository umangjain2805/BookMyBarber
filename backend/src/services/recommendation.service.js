import Shop from "../models/Shop.js";
import Barber from "../models/Barber.js";

const getRecommendedShops = async (queryParams) => {
  const { lat, lng, radiusInKm = 15 } = queryParams;

  let query = {};

  if (lat && lng) {
    const parsedLat = parseFloat(lat);
    const parsedLng = parseFloat(lng);

    query.location = {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [parsedLng, parsedLat],
        },
        $maxDistance: radiusInKm * 1000,
      },
    };
  }

  const shops = await Shop.find(query)
    .sort({ rating: -1 })
    .limit(10)
    .populate("owner", "name email");

  return shops;
};

const getRecommendedBarbers = async () => {
  const barbers = await Barber.find()
    .sort({ rating: -1 })
    .limit(10)
    .populate("user", "name email profileImage")
    .populate("shop", "name address");

  return barbers;
};

export { getRecommendedShops, getRecommendedBarbers };
