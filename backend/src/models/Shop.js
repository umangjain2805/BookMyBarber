import mongoose from "mongoose";

const workingHoursSchema = new mongoose.Schema({
  day: {
    type: String,
    enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    required: true,
  },
  isClosed: {
    type: Boolean,
    default: false,
  },
  open: {
    type: String, // "09:00"
    default: "09:00",
  },
  close: {
    type: String, // "21:00"
    default: "21:00",
  },
}, { _id: false });

const shopSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Shop name is required"],
      trim: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Shop owner is required"],
    },
    address: {
      type: String,
      required: [true, "Shop address is required"],
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: [true, "Coordinates are required"],
      },
    },
    description: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      default: "",
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    images: {
      type: [String],
      default: [],
    },
    workingHours: {
      type: [workingHoursSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

// Create index for geo queries
shopSchema.index({ location: "2dsphere" });

const Shop = mongoose.model("Shop", shopSchema);

export default Shop;
