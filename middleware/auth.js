const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

var privateKey = 'wakswaks'

const verify = async (req, res, next) => {
    const token = req.headers['access_token']
    // const token = req.headers.authorization.split(" ")
    if (!token) {
        return res.status(401).send({
            message: 'Forbidden!'
        })
    }
    jwt.verify(token, privateKey, (err, decoded) => {
        if (err) {
            // console.log(err)
            return res.status(400).json({
                message: 'Invalid Auth!'
            })
        }
        id = decoded
        next()
    })
}

const generate = (payload) => {
    return jwt.sign(payload, privateKey, {
        algorithm: 'HS256'
    })
}

const compare = (hashedPassword, password) => {
    return bcrypt.compareSync(hashedPassword, password)
}

module.exports = {
    verify,
    generate,
    compare
}