import { body, param } from "express-validator";
import { validateCourse } from "./course-validator.js";
import { validateFields } from "./validate-fields.js";
import { handleErrors } from "./handleErrors.js";
import { postExists } from "../helpers/db-validators.js";

export const isValidCommentId = [
    param("id").notEmpty().withMessage("Comment ID is required"),
    param("id").isMongoId().withMessage("Invalid comment ID"),
    handleErrors
]

export const createCommentValidator = [
    body("postId").notEmpty().isString().withMessage("PostId is required"),
    body("postId").isMongoId().withMessage("Invalid Post ID"),
    body("postId").custom(postExists),
    body("author").notEmpty().isString().withMessage("author is required"),
    body("content").notEmpty().isString().withMessage("Content is required"),
    validateFields,
    handleErrors
]