import { body, param } from "express-validator";
import { validateCourse } from "./course-validator.js";
import { validateFields } from "./validate-fields.js";
import { handleErrors } from "./handleErrors.js";

export const isValidPostId = [
    param("id").notEmpty().withMessage("Post ID is required"),
    param("id").isMongoId().withMessage("Invalid Post ID"),
    handleErrors
]

export const updatePostValidator = [
    param("id").notEmpty().withMessage("Post ID is required"),
    param("id").isMongoId().withMessage("Invalid Post ID"),
    body("title").optional().isString().withMessage("Title must be a string"),
    body("content").optional().isString().withMessage("Content must be a string"),
    body("course").optional().isString().withMessage("Course must be a string"),
    validateCourse,
    validateFields,
    handleErrors
]

export const createPostValidator = [
    body("title").notEmpty().isString().withMessage("Title is required"),
    body("content").notEmpty().isString().withMessage("Content is required"),
    body("course").notEmpty().isString().withMessage("Course is required"),
    validateCourse,
    validateFields,
    handleErrors
]

