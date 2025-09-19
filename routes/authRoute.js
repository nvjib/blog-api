const express = require("express")
const router = express.Router()
const { signUp } = require("../controllers/auth.controller")

router.post("/sign-up", signUp)

module.exports = router