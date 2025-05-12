import { Router } from "express";
import { createComment, getCommentsByPost, deleteComment } from "./comment.controller.js";
import { isValidCommentId, createCommentValidator } from "../middlewares/comment-validators.js";

const router = Router();

/**
 * @swagger
 * /comments:
 *   post:
 *     summary: Create a new comment
 *     tags:
 *       - Comments
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comment'
 *     responses:
 *       201:
 *         description: Comment created successfully
 *       400:
 *         description: Validation error
 */
router.post("/", createCommentValidator, createComment);

/**
 * @swagger
 * /comments:
 *   get:
 *     summary: Get comments by post
 *     tags:
 *       - Comments
 *     responses:
 *       200:
 *         description: A list of comments for a specific post
 */
router.get("/", getCommentsByPost);

/**
 * @swagger
 * /comments/{id}:
 *   delete:
 *     summary: Delete a comment by ID
 *     tags:
 *       - Comments
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the comment
 *     responses:
 *       200:
 *         description: Comment deleted successfully
 *       404:
 *         description: Comment not found
 */
router.delete("/:id", isValidCommentId, deleteComment);

export default router;