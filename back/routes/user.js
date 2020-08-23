const express = require('express')
const User = require('../models/User')
const authentificateToken = require('../middleWares/authentificateToken')

const router = express.Router()

router.get('/:username', authentificateToken, async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username })
        if (user !== null) {
            /* checking if authorized user follows requested user */
            const followed = user.followers.indexOf(req.username) === -1 ? false : true
            res.status(200).json({ resultCode: 0, user: {...user._doc, followed} })
        }
        else res.status(200).json({ resultCode: 1, message: "User wasn't found" })
    } catch (e) {
        console.log(e)
        res.status(500).json('Server Error')
    }
})

module.exports = router