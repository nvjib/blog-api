const jwt = require("jsonwebtoken")
const JWT_SECRET = process.env.JWT_SECRET

const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Unauthorized: No token provided" })
    } 

    const token = authHeader.split(" ")[1]

    try {
        const decoded = jwt.verify(token, JWT_SECRET)
        req.user = decoded
        next()
    } catch (error) {
        res.status(401).json({ error: "Invalid or expired token" })
    }
}

const requireRole = (role) => (req, res, next) => {
    if (req.user.role !== role) {
        return res.status(403).json({ error: `Access denied: ${role}s only` })
    }
    next()
}

module.exports = {
    authenticate,
    requireRole
}