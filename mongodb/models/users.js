const mongo = require('../mongo')
const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [/.+\@.+\..+/, 'Email format only!']
    },
    password: {
        type: String,
        required: true,
        // min: [8, 'Password to short!'],
        // max: [12, 'Its too much!!?!']
    }
})

const UserModel = mongoose.model('users', UserSchema)

module.exports = UserModel