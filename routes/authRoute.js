const express = require("express")
const router = express.Router()
const { signUp, login } = require("../controllers/auth.controller")
const { createPost } = require("../controllers/post.controller")

router.post("/sign-up", signUp)
router.post("/login", login)

router.post("/posts", createPost)

module.exports = router