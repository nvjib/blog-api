const express = require("express")
const router = express.Router()
const { signUp, login } = require("../controllers/auth.controller")
const { createPost, fetchAllPosts, singlePost, updatePost, deletePost } = require("../controllers/post.controller")

router.post("/sign-up", signUp)
router.post("/login", login)

router.post("/posts", createPost)
router.get("/posts", fetchAllPosts)
router.get("/posts/:id", singlePost)
router.put("/posts/:id", updatePost)
router.delete("/posts/:id", deletePost)

module.exports = router