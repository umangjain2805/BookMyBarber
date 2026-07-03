import { body } from "express-validator";

export const registerValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required"),

  body("email")
    .isEmail()
    .withMessage("Invalid email"),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),

  body("phone")
    .optional()
    .isMobilePhone()
    .withMessage("Invalid phone number"),
];
