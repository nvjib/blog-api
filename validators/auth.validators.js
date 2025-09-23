const Joi = require("joi");

const emailSchema = Joi.string().email().required().messages({
    "string.base": "Email must be a string",
    "string.empty": "Email is required",
    "string.email": "Email must be a valid email",
    "any.required": "Email is required"
})

const passwordSchema = Joi.string().min(6).required().messages({
    "string.base": "Password must be a string",
    "string.empty": "Password is required",
    "string.min": "Password must be at least 6 characters",
    "any.required": "Password is required"
})

const signUpSchema = Joi.object({
    name: Joi.string().min(3).max(20).required().messages({
        "string.base": "Name must be a string",
        "string.empty": "Name is required",
        "string.min": "Name must at least be 3 characters",
        "string.max": "Name cannot exceed 20 characters",
        "any.required": "Name is required"
    }),
    email: emailSchema,
    password: passwordSchema,
    role: Joi.string().valid("reader", "author").required().messages({
        "any.only": "Role must be either 'reader' or 'author'",
        "any.required": "Role is required"
    })
})

const loginSchema = Joi.object({
    email: emailSchema,
    password: passwordSchema
})

module.exports = {
    signUpSchema,
    loginSchema
}

