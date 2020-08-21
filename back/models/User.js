const mongoose = require('mongoose')
const UserSchema = mongoose.Schema({
    email: {
        required: true,
        type: String
    },
    username: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    fullname: {
        required: true,
        type: String
    },
    avatar: {
        type: String,
        default: null
    },
    description: {
        type: String,
        default: null
    },
    posts: [
        {
            text: {
                type: String,
                required: true
            },
            img: {
                type: String,
                required: true
            },
            likes: {
                type: Number,
                default: 0
            },
            comments: [
                {
                    username: { type: String },
                    text: { type: String },
                    commentedOn: { type: String }
                }
            ],
            postedOn: {
                type: String,
                default: ''
            }
        }
    ],
    follows: [
        { type: String }
    ],
    followers: [
        { type: String }
    ]
})

module.exports = mongoose.model('User', UserSchema)