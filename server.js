require("dotenv").config()
const express = require("express")
const app = express()
const auth = require("./routes/authRoute")

app.use(express.json())
app.use("/", auth)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`http://localhost:${PORT}`))