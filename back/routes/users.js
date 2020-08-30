const express = require('express')
const User = require('../models/User')
const authentificateToken = require('../middleWares/authentificateToken')

const router = express.Router()

router.get('/:username', authentificateToken, async (req, res) => {
    try {
        const usernameRegExp = new RegExp('^' + req.params.username)
        const matches = await User.find({ 'username': usernameRegExp })
        if (matches.length !== 0) {
            const users = matches
                .filter(u => u.username !== req.username)
                .map(u => {
                    delete u._doc.__v
                    delete u._doc.password
                    delete u._doc.email
                    return { ...u._doc, followed: u.followers.indexOf(req.username) === -1 ? false : true }
                })
            res.status(200).json({ resultCode: 0, users })
        }
        res.status(200).json({ resultCode: 1, message: "No such user was found", users: [] })
    } catch (e) {
        console.log(e)
        res.status(500).json('Server Error')
    }
})

module.exports = router