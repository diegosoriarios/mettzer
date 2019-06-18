const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const mongoClient = require('mongodb').MongoClient
const objectId = require('mongodb').ObjectID

const PORT = 3777

const CONNECTION_URL =  'mongodb+srv://diego:diego@users-yms0u.mongodb.net/test?retryWrites=true&w=majority'
const DATABASE_NAME = "mettzer"


const app = express()

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: [true, 'Username is required']
    },
    email: {
        type: String,
        require: [true, 'Email is required']
    },
    password: {
        type: String,
        require: [true, 'Password is required']
    },
    saves: {
        type: Array,
    }
    ,
    createdAt: {
        type: Date,
        default: new Date()
    }
})

app.use(bodyParser.json())
app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))

let database, collection

app.get('/users', (req, res) => {
    collection.find({}).toArray((err, result) => {
        if(err){
            return res.status(500).send(err)
        }
        res.send(result)
    })
})

app.post('/users', (req, res) => {
    console.log(res)
    collection.insertOne(req.body, (err, result) => {
        if(err){
            return res.status(500).send(err)
        }
        res.send(res.result)
    })
})

app.post('/', (req, res) => {
    console.log(req.body)
})

app.post('/:id', (req, res) => {

})

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
    mongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
        if(error) {
            throw error;
        }
        database = client.db(DATABASE_NAME)
        collection = database.collection("users")
        console.log(`Connection to ${DATABASE_NAME}!`)

    })
})