const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoClient = require('mongodb').MongoClient
const objectId = require('mongodb').ObjectID
const app = express()

const PORT = 3777

const CONNECTION_URL =  'mongodb+srv://diego:diego@users-yms0u.mongodb.net/test?retryWrites=true&w=majority'
const DATABASE_NAME = "mettzer"

app.use(bodyParser.json())
app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))

let database, collection

/**
 * Retorna todos os usuários cadastrados
 */
app.get('/users', (req, res) => {
    console.log("GET")
    collection.find({}).toArray((err, result) => {
        if(err){
            return res.status(500).send(err)
        }
        res.send(result)
    })
})

/**
 * Cadastra novos usuários no banco de dados
 */
app.post('/users', (req, res) => {
    console.log("CREATE_USER")
    collection.insertOne(req.body, (err, result) => {
        if(err){
            return res.status(500).send(err)
        }
        res.send(res.result)
    })
})

/**
 * Salva um novo post na conta
 */
app.put('/users/:id', (req, res) => {
    console.log("SAVE_POST")
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

/**
 * Remove um post salvo da conta
 */
app.delete('/users/:id/savedPosts/:post', (req, res) => {
    collection.updateOne({ _id: objectId(req.params.id)}, {$pull: { savedPosts: {id: req.params.post}}}, (err, result) => {
        if (err) {
            return res.status(500).send(err)
        }
        res.send(res.result)
    })
})

/**
 * Retorna todos os posts de um determinado usuário
 */
app.get('/users/:id', (req, res) => {
    console.log("GET_USER")
    collection.findOne({ _id: new objectId(req.params.id) }, (err, result) => {
        if(err){
            return res.status(500).send(err)
        }
        res.send(result)
    })
})

/**
 * Inicia o servidor
 * Inicia a conexão com o mongoDB
 */
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