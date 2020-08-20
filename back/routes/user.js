const express = require('express')
const User = require('../models/User')

const router = express.Router()

router.get('/:username', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username })
        if (user !== null) res.status(200).json({ resultCode: 0, user })
        res.status(200).json({ resultCode: 1, message: "User wasn't found" })
    } catch (e) {
        console.log(e)
        res.status(500).json('Server Error')
    }
})

module.exports = router