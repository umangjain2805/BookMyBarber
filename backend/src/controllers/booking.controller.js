import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import {
  createBooking,
  getBookings,
  getBookingById,
  updateBookingStatus,
} from "../services/booking.service.js";

const createBookingController = asyncHandler(async (req, res) => {
  const booking = await createBooking(req.body, req.user._id);

  res.status(201).json(
    new ApiResponse(201, "Booking placed successfully", booking)
  );
});

const getBookingsController = asyncHandler(async (req, res) => {
  const bookings = await getBookings(req.user._id, req.user.role);

  res.status(200).json(
    new ApiResponse(200, "Bookings retrieved successfully", bookings)
  );
});

const getBookingByIdController = asyncHandler(async (req, res) => {
  const booking = await getBookingById(req.params.id, req.user._id, req.user.role);

  res.status(200).json(
    new ApiResponse(200, "Booking retrieved successfully", booking)
  );
});

const updateBookingStatusController = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const booking = await updateBookingStatus(
    req.params.id,
    status,
    req.user._id,
    req.user.role
  );

  res.status(200).json(
    new ApiResponse(200, "Booking status updated successfully", booking)
  );
});

export {
  createBookingController,
  getBookingsController,
  getBookingByIdController,
  updateBookingStatusController,
};
