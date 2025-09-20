const express = require("express")
const postsRouter = express.Router()
const { createPost, fetchAllPosts, singlePost, updatePost, deletePost } = require("../controllers/post.controller")

postsRouter.post("/", createPost)
postsRouter.get("/", fetchAllPosts)
postsRouter.get("/:id", singlePost)
postsRouter.put("/:id", updatePost)
postsRouter.delete("/:id", deletePost)

module.exports = postsRouter