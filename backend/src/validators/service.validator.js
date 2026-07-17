import { body } from "express-validator";

export const serviceCreateValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Service name is required"),

  body("price")
    .isFloat({ min: 0 })
    .withMessage("Price must be a positive number"),

  body("duration")
    .isInt({ min: 5 })
    .withMessage("Duration must be an integer and at least 5 minutes"),

  body("shop")
    .isMongoId()
    .withMessage("Invalid shop ID"),

  body("description")
    .optional()
    .trim(),
];
