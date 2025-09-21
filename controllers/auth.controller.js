const supabase = require("../db")
const { generateToken, comparePassword, hashPassword } = require("../utils/auth.utils")

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

  const hashedPassword = await hashPassword(password)

  const { data: newUser, error: insertError } = await supabase
    .from("users")
    .insert({ name, email: email.toLowerCase(), password: hashedPassword, role})
    .select()

  if (insertError) return res.status(500).json({ error: insertError.message })
  if (!newUser || newUser.length === 0) return res.status(500).json({ error: "User could not be created" })

  const token = generateToken(newUser[0])

  return res.status(201).json({ message: "User created successfully", token })
}

const login = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({ error: "Missing required fields" })
    }

    const { data: users, error } = await supabase
        .from("users")
        .select("*")
        .eq("email", email.toLowerCase())

    if (error) return res.status(500).json({ error: error.message })
    if (!users || users.length === 0) return res.status(404).json({ error: "User does not exist" })

    const user = users[0]

    const isPasswordValid = await comparePassword(password, user.password)
    if (!isPasswordValid) return res.status(401).json({ error: "Invalid password" })

    const token = generateToken(user)
    return res.status(200).json({ message: "Logged in successfully", token })
}

module.exports = {
    signUp,
    login
}