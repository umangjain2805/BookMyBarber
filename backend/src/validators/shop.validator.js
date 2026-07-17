import { body } from "express-validator";

export const shopCreateValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Shop name is required"),

  body("address")
    .trim()
    .notEmpty()
    .withMessage("Shop address is required"),

  body("coordinates")
    .isArray({ min: 2, max: 2 })
    .withMessage("Coordinates must be an array of exactly [longitude, latitude]")
    .custom((value) => {
      const [lng, lat] = value;
      if (typeof lng !== "number" || typeof lat !== "number") {
        throw new Error("Coordinates must be numbers");
      }
      if (lng < -180 || lng > 180 || lat < -90 || lat > 90) {
        throw new Error("Latitude (-90 to 90) or longitude (-180 to 180) out of bounds");
      }
      return true;
    }),

  body("phone")
    .optional()
    .trim(),

  body("description")
    .optional()
    .trim(),

  body("workingHours")
    .optional()
    .isArray()
    .withMessage("workingHours must be an array"),
];
