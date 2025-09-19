const express = require("express")
const router = express.Router()
const { signUp, login } = require("../controllers/auth.controller")
const { createPost, fetchAllPosts, singlePost, updatePost } = require("../controllers/post.controller")

router.post("/sign-up", signUp)
router.post("/login", login)

router.post("/posts", createPost)
router.get("/posts", fetchAllPosts)
router.get("/posts/:id", singlePost)
router.put("/posts/:id", updatePost)

module.exports = router