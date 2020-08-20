const express = require('express')
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require("dotenv/config")
const router = express.Router()

router.post('/', async (req, res) => {
    const emailMatch = await User.findOne({ "email": req.body.email })
    if (emailMatch === null) {
        res.status(200).json({ message: "Incorrect email", resultCode: 1 })
    } else {
        const match = bcrypt.compare(req.body.password, emailMatch.password)
        if (!match) {
            res.status(200).json({ message: "Incorrect password", resultCode: 1 })
        } else {
            try {
                console.log(emailMatch.username)
                var token = await jwt.sign({ "username": emailMatch.username }, process.env.secret_word)
                res.status(200).json({ message: "You have successfully logged in", resultCode: 0, user: emailMatch, token })
            } catch (e) {
                res.status(500).json({ message: "serverError" })
            }
        }
    }
})

module.exports = router