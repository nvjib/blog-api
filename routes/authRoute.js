const express = require("express")
const authRouter = express.Router()
const { signUp, login } = require("../controllers/auth.controller")
const validateRequest = require("../middleware/validateRequest")
const { signUpSchema, loginSchema } = require("../validators/auth.validators")

authRouter.post("/sign-up", validateRequest(signUpSchema), signUp)
authRouter.post("/login", validateRequest(loginSchema),  login)

module.exports = authRouter