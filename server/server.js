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

app.put('/users/:id', (req, res) => {
    console.log(req.body)
    const body = {
        id: req.body.id,
        authors: req.body.authors,
        contributors: req.body.contributors,
        datePublished: req.body.datePublished,
        description: req.body.description,
        subjects: req.body.subjects,
        title: req.body.title,
        types: req.body.types,
        urls: req.body.urls,
        year: req.body.year,    
    }
    
    collection.updateOne({ _id: objectId(req.params.id)}, {$push: {savedPosts: body}}, (err, result) => {
        if(err) {
            return res.status(500).send(err)
        }
        res.send(res.result)
    })
})

app.delete('/users/:id', (req, res) => {
    collection.deleteOne({ _id: objectId(req.params.id)}, (err, result) => {
        if (err) {
            return res.status(500).send(err)
        }
        res.send(res.result)
    })
})

app.get('/users/:id', (req, res) => {
    collection.findOne({ _id: new objectId(req.params.id) }, (err, result) => {
        if(err){
            return res.status(500).send(err)
        }
        res.send(result)
    })
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