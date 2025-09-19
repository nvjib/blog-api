const express = require("express")
const router = express.Router()
const { signUp, login } = require("../controllers/auth.controller")
const { createPost, fetchAllPosts } = require("../controllers/post.controller")

router.post("/sign-up", signUp)
router.post("/login", login)

router.post("/posts", createPost)
router.get("/posts", fetchAllPosts)

module.exports = router