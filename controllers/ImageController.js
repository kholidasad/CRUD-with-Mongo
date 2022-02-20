module.exports = {
    async create(req, res) {
        let images = req.files.image

        images.mv('./public/images/' + images.name, (err) => {
            if (err) return console.log(err);
        })
        res.send('FileUploaded')
    }
}