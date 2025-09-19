const supabase = require("../db")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

const JWT_SECRET = process.env.JWT_SECRET

const signUp = async (req, res) => {
  const { name, email, password, role } = req.body

  if (!name || !email || !password || !role) {
    return res.status(400).json({ error: "Missing required fields" })
  }

  const { data: users, error } = await supabase
    .from("users")
    .select()
    .eq("email", email.toLowerCase())
    
  if (error) return res.status(500).json({ error: error.message })
  if (users && users.length > 0) return res.status(400).json({ error: "User already exists" })

  const hashedPassword = await bcrypt.hash(password, 10)

  const { data: newUser, error: insertError } = await supabase
    .from("users")
    .insert({ name, email: email.toLowerCase(), password: hashedPassword, role})
    .select()

  if (insertError) return res.status(500).json({ error: insertError.message })
  if (!newUser || newUser.length === 0) return res.status(500).json({ error: "User could not be created" })

  const token = jwt.sign({ id: newUser[0].id, name: newUser[0].name, email: newUser[0].email, role: newUser[0].role }, JWT_SECRET, { expiresIn: "1h" })

  return res.status(201).json({ message: "User created successfully", token })
}

const login = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({ error: "Missing required fields" })
    }

    const { data: user, error } = await supabase
        .from("users")
        .select("*")
        .eq("email", email.toLowerCase())

    if (error) return res.status(500).json({ error: error.message })
    if (!user || user.length === 0) return res.status(404).json({ error: "User does not exist" })

    const isPasswordValid = await bcrypt.compare(password, user[0].password)
    if (!isPasswordValid) return res.status(401).json({ error: "Invalid password" })

    const token = jwt.sign({ id: user[0].id, name: user[0].name, email: user[0].email, role: user[0].role }, JWT_SECRET, { expiresIn: "1h" })

    return res.status(200).json({ message: "Logged in successfully", token })
}

module.exports = {
    signUp,
    login
}