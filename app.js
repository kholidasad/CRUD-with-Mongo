const express = require('express')
const fileUpload = require('express-fileupload')
const app = express()
const router = require('./routes')
const mongo = require('./mongodb/mongo')
const port = process.env.PORT || 5000

app.use(fileUpload())
mongo.connect()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(router)
// app.use(express-fileupload())
app.use(express.static('public'))

// app.get('/', (req, res) => {
//     let waks = mongo.getDb().collection('users').find().toArray((err, docs) => {
//         return res.status(200).json(docs)
//     })
// })

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
})