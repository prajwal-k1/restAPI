const express = require("express")
const app = express()
const mongoose = require('mongoose')
require('dotenv').config()

//here localhost didn't work so using 127.0.0.1
mongoose.connect(process.env.DB_URL)
mongoose.connection.once('open', () => console.log('Connected to DB'))
mongoose.connection.on('error', (err) => console.error(err))

//this to to use json formating for data
app.use(express.json())

//import routes
const subRouter = require('./routes/subscribers')
app.use('/subscribers', subRouter)

app.listen(3000, () => console.log("Connected to port 3000"))