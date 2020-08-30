const express = require('express')
const User = require('../models/User')
const authentificateToken = require('../middleWares/authentificateToken')
const  formatUser  = require('../helpers/formatUser')

const router = express.Router()

router.get('/:username', authentificateToken, async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username })
        if (user !== null) {
            res.status(200).json({
                resultCode: 0,
                user: {
                    ...formatUser(user._doc),
                    followed: user.followers.indexOf(req.username) === -1 ? false : true
                }
            })
        }
        else res.status(200).json({ resultCode: 1, message: "User wasn't found" })
    } catch (e) {
        console.log(e)
        res.status(500).json('Server Error')
    }
})

module.exports = router