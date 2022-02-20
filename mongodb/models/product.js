const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    title: {
        type: String
    },
    desc: {
        type: String
    },
    price: {
        type: Number
    },
    stock: {
        type: Number
    },
    color: {
        type: String
    },
    UID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }
})

const ProductModel = mongoose.model('products', ProductSchema)

module.exports = ProductModel