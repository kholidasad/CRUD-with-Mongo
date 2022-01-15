const bcrypt = require('bcrypt')
const { generate, compare } = require('../middleware/auth')
const User = require('../mongodb/models/users')
const cryptr = require('cryptr')
const { response } = require('express')
const CTR = new cryptr('wakswaks')

module.exports = {
    async login (req, res) {
        try {
            const email = req.body.email
            const password = req.body.password

            const data = await User.findOne({
                email
            })

            if (email != data.email || !compare(password, data.password)) {
                return res.json({
                    meesage: "email and password didn't match"                
                })
            } else if (!data) {
                return res.status(404).json({
                    message: 'Data not found!'
                })
            }

            res.status(200).json({
                message: `Login Success! Welcome ${data.name}`,
                token: generate({
                    _id: data._id,
                    name: data.name,
                    email: data.email
                })
            })
        } catch (err) {
            console.log(err);
        }
    },

    async register (req, res) {
        await User.find({ 'email': req.body.email }).then(async data => {
            if (data == 0) {
                const cryptPass = CTR.encrypt(req.body.password)
                const registerUser = new User({
                    'name': req.body.name,
                    'email': req.body.email,
                    'password': cryptPass
                })

                await registerUser.save(registerUser).then(hasil => {
                    res.send({
                        message: 'Data has been created!',
                        status: 200,
                        result: hasil
                    })
                }).catch(err => { 
                    res.send({
                        message: 'Internal Server Error',
                        status: 500,
                        messageErr: err.message
                    })
                })
            } else {
                res.send({
                    message: 'Data exist'
                })
            }
        })
        .catch(err => {
            res.send({
                message: 'Internal Server Error',
                status: 500,
                messageErr: err.message
            })
        })
    }
}