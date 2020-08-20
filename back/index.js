const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv/config")
const signupRouter = require("./routes/signup")
const loginRouter = require("./routes/login")
const authRouter = require("./routes/auth")
const usersRouter = require("./routes/users")
const userRouter = require("./routes/user")
const app = express()

/* middlewares */
app.use(cors())
app.use(express.json({ extended: true }))
app.use("/signup", signupRouter)
app.use("/login", loginRouter)
app.use("/auth", authRouter)
app.use("/users", usersRouter)
app.use("/user", userRouter)

/* connection to DB */
async function start() {
    const port = 4000
    try {
        await mongoose.connect(
            process.env.DB_connection,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
            }
        )
        app.listen(port, () => console.log(`App has been run on port ${port}...`))
    } catch (error) {
        console.log("server Err", error.message)
        process.exit(1)
    }
}

start()
