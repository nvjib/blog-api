const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

const JWT_SECRET = process.env.JWT_SECRET

const generateToken = (user) => {
    return jwt.sign(
        {id: user.id, name: user.name, email: user.email, role: user.role},
        JWT_SECRET,
        { expiresIn: "1h" }
    )
}

const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    return bcrypt.hash(password, salt)
}

const comparePassword = async (password, hash) =>  bcrypt.compare(password, hash)

module.exports = {
    generateToken,
    hashPassword,
    comparePassword
}