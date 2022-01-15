module.exports = {
    async create(req, res) {
        // res.send('OKE')
        // console.log(req.files)
        let images = req.files.image
        // let path = __dirname + '/public/image'

        images.mv('./public/images/' + images.extension, (err) => {
            if (err) return console.log(err);
        })
        res.send('FileUploaded')
    }
}