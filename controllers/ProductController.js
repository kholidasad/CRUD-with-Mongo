const Product = require('../mongodb/models/product')
const User = require('../mongodb/models/users')

module.exports = {
    async create(req, res) {
        let hasil = id
        const productCreate = new Product({
            title: req.body.title,
            desc: req.body.desc,
            price: req.body.price,
            stock: req.body.stock,
            color: req.body.color,
            UID: hasil._id
        })

        await productCreate.save(productCreate).then((data) => {
                res.send({
                    status: 200,
                    message: 'Created Successfully!',
                    result : data
                })
            })
            .catch((err) => {
                res.send({
                    status: 500,
                    message: 'Internal Server Error!'
                })
            })
    },

    async createMany(req, res) {
        let UID = id._id
        let collect = req.body.collection
        for(let i = 0; i < collect.length; i++) {
            collect[i].UID = UID
        }

        await Product.insertMany(collect).then((data) => {
            res.send({
                status: 200,
                message: 'Created Successfully!',
                result: data
            })
        })
        .catch((err) => {
            res.send({
                status: 500,
                message: 'Internal Server Error!'
            })
        })
    },
    
    async index(req, res) {
        const productIndex = await Product.find({})
        .then((data) => {
            res.send({
                status: 200,
                message: 'Index',
                result: data
            })
        })
        .catch((err) => {
            res.send({
                status: 500,
                message: 'Internal Server Error!'
            })
        })
    },

    async findOne(req, res) {
        const productFindOne = await Product.findOne({
            title: req.body.title
        })
        .then((data) => {
            res.send({
                status: 200,
                message: 'Data has been found',
                result: data
            })
        })
        .catch((err) => {
            res.send({
                status: 404,
                message: 'Data not found!'
            })
        })
    },

    async update(req, res) {
        // const productUpdate = await Product.findByIdAndUpdate(req.params.id, req.body)
        await Product.updateOne({_id: req.params.id}, req.body)
        .then((data) => {
            res.send({
                status: 200,
                message: 'Data has been updated'
            })
        })
        .catch((err) => {
            res.send({
                status: 404,
                message: 'Data not found!'
            })
        })
    },

    async delete(req, res) {
        const productDelete = await Product.findByIdAndDelete(req.params.id)
        .then((data) => {
            res.send({
                status: 200,
                message: 'Data has been deleted'
            })
        })
        .catch((err) => {
            res.send({
                status: 404,
                message: 'Data not found!'
            })
        })
    }
}