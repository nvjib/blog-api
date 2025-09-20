const express = require("express")
const authRouter = express.Router()
const { signUp, login } = require("../controllers/auth.controller")

authRouter.post("/sign-up", signUp)
authRouter.post("/login", login)

module.exports = authRouter