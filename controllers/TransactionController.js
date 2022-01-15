const Transaction = require('../mongodb/models/transcation')

module.exports = {
    async create(req, res) {
        let hasil = id
        const traCreate = new Transaction({
            title: req.body.title,
            kegiatan: req.body.kegiatan,
            kebutuhan: req.body.kebutuhan,
            UID: hasil._id
        })

        await traCreate.save(traCreate).then((data) => {
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
    }
}