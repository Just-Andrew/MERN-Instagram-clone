const express = require('express')
const User = require('../models/User')
const  authentificateToken  = require('../middleWares/authentificateToken')
const { findOne } = require('../models/User')

const router = express.Router()

/* follow user */
router.post('/:username', authentificateToken, async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username })
        if (user !== null) {
            if (user.followers.indexOf(req.username) === -1) {
                await user.update({ $push: { followers: req.username } })
                await User.updateOne({ username: req.username }, { $push: { follows: req.params.username } })
            }
            res.status(200).json({ resultCode: 0, followed: true })
        }
        res.status(404).json(`user doesn't exist`)
    } catch (e) {
        console.log(e)
        res.status(500).json('Server Error')
    }
})

/* unfollow user */
router.delete('/:username', authentificateToken, async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username })
        if (user !== null) {
            await user.update({ $pull: { followers: req.username } })
            await User.updateOne({ username: req.username }, { $pull: { follows: req.params.username } })
            res.status(200).json({ resultCode: 0, followed: false })
        }
        res.status(404).json(`user doesn't exist`)
    } catch (e) {
        console.log(e)
        res.status(500).json('Server Error')
    }
})

module.exports = router