const express = require("express")
const postsRouter = express.Router()
const { createPost, fetchAllPosts, singlePost, updatePost, deletePost } = require("../controllers/post.controller")
const { requireRole, authenticate } = require("../middleware/auth.middleware")

// Public routes (anyone can access)
postsRouter.get("/", authenticate, fetchAllPosts)
postsRouter.get("/:id", authenticate, singlePost)

// Author-only routes (protected)
postsRouter.post("/", authenticate, requireRole("author"), createPost)
postsRouter.put("/:id", authenticate, requireRole("author"), updatePost)
postsRouter.delete("/:id", authenticate, requireRole("author"), deletePost)

module.exports = postsRouter