import { body, param } from "express-validator";

export const validateProject = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Project name is required")
    .isLength({ max: 255 })
    .withMessage("Project name cannot exceed 255 characters"),
  body("description")
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage("Description cannot exceed 1000 characters"),
];

export const validateId = [
  param("id").isInt().withMessage("Project ID must be an integer"),
];
