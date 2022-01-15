// const { MongoClient } = require('mongodb')
// const url = 'mongodb://localhost:27017/local'
// var db

// module.exports = {
//     async connect() {
//         try {
//                 const client = new MongoClient(url, {useNewUrlParser: true})
//                 await client.connect()
//                 const database = client.db('howto')
//                 db = database
//                 return database
//         } catch (err) {
//                 console.error("Error connecting to mongodb");
//                 console.error(err);
//         }

//     },
//     getDb() {
//         return db
//     }
// }

const mongoose = require('mongoose')

async function connect() {
    try {
        const conn = await mongoose.connect(
            "mongodb+srv://kholidasad:wakswaks@cluster0.5d56n.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
        )
        console.log(`Mongo Connected : ${ conn.connection.host }`)
    } catch (err) {
        console.log("Error can't connect");
        console.log(err);
    }
}

module.exports = { connect }