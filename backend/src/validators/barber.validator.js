import { body } from "express-validator";

export const barberCreateValidator = [
  body("user")
    .isMongoId()
    .withMessage("Invalid user ID"),

  body("shop")
    .isMongoId()
    .withMessage("Invalid shop ID"),

  body("specialties")
    .optional()
    .isArray()
    .withMessage("Specialties must be an array of strings"),

  body("availability")
    .optional()
    .isArray()
    .withMessage("Availability must be an array"),
];
