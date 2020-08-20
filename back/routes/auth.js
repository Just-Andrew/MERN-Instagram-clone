const express = require('express')
const authentificateToken = require('../middleWares/authentificateToken')
const User = require('../models/User')
require("dotenv/config")
const router = express.Router()

router.get('/', authentificateToken, async (req, res) => {
    const user = await User.findOne({ username: req.username })
    res.status(200).json({ message: "You are authorized", authorized: true, user })
})

module.exports = router