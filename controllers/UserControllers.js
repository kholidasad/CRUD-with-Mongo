const User = require('../mongodb/models/users')
// const mongo = require('../config/mongo')
const ObjectId = require('mongodb').ObjectId
const bcrypt = require('bcrypt')

module.exports = {
    async index(req, res) {
        try {
            const userIndex = await User.find({})
            res.status(200).json(userIndex)
        } catch (err) {
            console.log(err);
        }
    },

    async findOne(req, res) {
        try {
            const userFind = await User.findOne({
                name: req.body.name
            })
            if (!userFind) {return res.status(404).send({
                message: 'Data not found'
            })}
            res.status(200).json(userFind)
        } catch (err) {
            console.log(err);
        }
    },

    async insert(req, res) {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const userInsert = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })

        try {
            await userInsert.save(userInsert)
            res.status(200).json(userInsert)
        } catch (err) {
            console.log(err);
        }
    },

    async update(req, res) {
        // const userUpdate = new User()

        // try {
        //     await User.findByIdAndUpdate(req.params.id, req.body)
        //     res.status(200).json({
        //         message: 'Data has been updated'
        //     })
        // } catch (err) {
        //     console.log(err);
        // }
        await User.updateOne({_id: req.params.id}, req.body).then((res) => {
            res.status(200).send({
                message: 'Berhasil'
            })
        })
    },

    async delete(req, res) {
        try {
            const food = await User.findByIdAndDelete(req.params.id)

            if (!food) res.status(404).send('Data not found!')
            res.send({
                status: 200,
                message: 'Data has been deeleeted!'
            })
        } catch (err) {
            console.log(err);
        }
    },

    async userDetail(req, res) {
        let name = req.body.name
        const findUser = await User.aggregate([
            {
                $match: {
                    'name': {
                        '$regex': name
                    }
                }
            },
            {
                $lookup: 
                {
                    from: "products",
                    localField: "_id",
                    foreignField: "UID",
                    as: "list_products"
                },
            },
            {
                $lookup:
                {
                    from: 'transactions',
                    localField: '_id',
                    foreignField: 'UID',
                    as: 'detail_transaction'
                }
            }
        ])
        res.send(findUser)
    }
}

// module.exports = {
//     index(req, res) {
//         mongo.getDb().collection('users').find().toArray((err, docs) => {
//                 if (err) {
//                     return res.status(500).send({
//                         error: 'ERRROR',
//                         message: 'Internal Server Error'
//                     })
//                 }
//                 return res.status(200).json(docs)
//             })
//     },

//     insert(req, res) {
//         mongo.getDb().collection('users').insertOne(req.body, (err, data) => {
//             if (err) {
//                 return res.status(500).send({
//                     error: 'ERRROR',
//                     message: 'Internal Server Error'
//                 })
//             }
//             return res.status(200).json(data)
//         })
//     },

//     update(req, res) {
//         mongo.getDb().collection('users').updateOne({ 
//             _id: ObjectId(req.body.id)},
//             { $set: {
//                 name: req.body.name, 
//                 age: req.body.age
//             }
//         }, (err, data) => {
//             if (err) {
//                 return res.status(404).send({
//                     error: 'ERRROR',
//                     message: 'Data not found!'
//                 })
//             }
//             return res.status(200).json(data)
//         })
//     },

//     delete(req, res) {
//         mongo.getDb().collection('users').deleteOne({
//             _id: ObjectId(req.body.id)},
//         (err, data) => {
//             if (err) {
//                 return res.status(404).send({
//                     error: 'ERRROR',
//                     message: 'Data not found!'
//                 })
//             }
//             return res.status(200).json(data)
//         })
//     }
// }

