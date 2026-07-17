import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Customer account is required"],
    },
    shop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shop",
      required: [true, "Shop is required"],
    },
    barber: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Barber",
      required: [true, "Barber is required"],
    },
    services: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service",
        required: [true, "At least one service is required for booking"],
      },
    ],
    date: {
      type: Date,
      required: [true, "Booking date is required"],
    },
    startTime: {
      type: String, // "10:30"
      required: [true, "Booking start time is required"],
    },
    endTime: {
      type: String, // "11:00"
      required: [true, "Booking end time is required"],
    },
    totalPrice: {
      type: Number,
      required: [true, "Total price is required"],
    },
    duration: {
      type: Number, // Total duration in minutes
      required: [true, "Total duration is required"],
    },
    status: {
      type: String,
      enum: ["PENDING", "CONFIRMED", "CANCELLED", "COMPLETED"],
      default: "PENDING",
    },
  },
  {
    timestamps: true,
  }
);

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
