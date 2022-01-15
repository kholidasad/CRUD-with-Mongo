const mongoose = require('mongoose')

const Transaction = new mongoose.Schema({
    title: {
        type: String
    },
    kegiatan: {
        type: String
    },
    kebutuhan: {
        type: String
    },
    UID: {
        type: mongoose.Schema.ObjectId
    }
})

const TransactionModel = mongoose.model('transactions', Transaction)

module.exports = TransactionModel