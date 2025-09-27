require("dotenv").config()
const express = require("express")
const app = express()
const auth = require("./routes/authRoute")
const posts = require("./routes/postRoute")

app.use(express.json())
app.use("/auth", auth)
app.use("/posts", posts)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`http://localhost:${PORT}`))