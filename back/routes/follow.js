const express = require('express')
const User = require('../models/User')
const authentificateToken = require('../middleWares/authentificateToken')

const router = express.Router()

/* follow user */
router.post('/:username', authentificateToken, async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username })
        if (user !== null) {
            if (user.followers.indexOf(req.username) === -1) {
                await User.updateOne({ username: req.params.username }, { $push: { followers: req.username } })
                await User.updateOne({username: req.username }, { $push: { follows: req.params.username } })
                res.json('success')
            } else {
                res.json('you are aready following this user')
            }
        } else {
            res.status(404).json('user doesnt exist')
        }
    } catch (e) {
        console.log(e)
        res.status(500).json('Server Error')
    }
})

/* unfollow user */
router.delete('/:username', authentificateToken, async (req, res) => {
    try {
        console.log(req.username)
    } catch (e) {
        console.log(e)
        res.status(500).json('Server Error')
    }
})

module.exports = router