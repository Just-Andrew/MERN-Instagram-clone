const express = require('express')
const User = require('../models/User')
const authentificateToken = require('../middleWares/authentificateToken')

const router = express.Router()

router.get('/:username', authentificateToken, async (req, res) => {
    try {
        const usernameRegExp = new RegExp('^' + req.params.username)
        const matches = await User.find({ 'username': usernameRegExp })
        const users = matches.filter(u => u.username !== req.username)
        if (users.length !== 0) res.status(200).json({ resultCode: 0, users })
        else res.status(200).json({ resultCode: 1, message: "No such user was found", users: [] })
    } catch (e) {
        console.log(e)
        res.status(500).json('Server Error')
    }
})

module.exports = router