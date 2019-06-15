const express = require('express')
const app = express()

const PORT = 3777

app.get('/', (req, res) => {
    console.log('Index')
})

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})