import { body } from "express-validator";

export const bookingCreateValidator = [
  body("shop")
    .isMongoId()
    .withMessage("Invalid shop ID"),

  body("barber")
    .isMongoId()
    .withMessage("Invalid barber ID"),

  body("services")
    .isArray({ min: 1 })
    .withMessage("At least one service ID must be provided")
    .custom((value) => {
      const allMongoIds = value.every((id) => /^[0-9a-fA-F]{24}$/.test(id));
      if (!allMongoIds) {
        throw new Error("All services must be valid service IDs");
      }
      return true;
    }),

  body("date")
    .isISO8601()
    .withMessage("Date must be a valid ISO8601 date (YYYY-MM-DD)"),

  body("startTime")
    .matches(/^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage("Start time must be in HH:MM format (24-hour clock)"),
];

export const bookingStatusValidator = [
  body("status")
    .isIn(["PENDING", "CONFIRMED", "CANCELLED", "COMPLETED"])
    .withMessage("Invalid booking status"),
];
